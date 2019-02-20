import pandas as pd
import json
from pprint import pprint
import numpy as np
from sqlalchemy import create_engine
import pymysql

############# ATTENTION! ##################################################################
### UPON CREATION OF THE SQLITE FILE, PLEASE DOWNLOAD DB BROWSER FOR SQLITE 
### https://sqlitebrowser.org/dl/ and change the "museum_id" column to be 
### the database primary key. This is a workaround for a known problem with 
### .to_sql that doesn't allow for setting the primary key during database creation. 
############################################################################################

#save .csv file as pandas df
museum_data = pd.read_csv("museums.csv")

# Remove duplicate rows by position, and then by name
museum_data.drop_duplicates(subset=["Latitude", "Longitude"], keep='first', inplace=True)
museum_data.drop_duplicates(subset="Museum Name", keep='first', inplace=True)

museum_data = museum_data.drop(axis=1,columns=['Locale Code (NCES)',
                                               'County Code (FIPS)',
                                               'State Code (FIPS)',
                                               'Region Code (AAM)',
                                               'Employer ID Number',
                                               'Tax Period',
                                               'Institution Name',
                                               'Street Address (Physical Location)',
                                               'City (Physical Location)',
                                               'State (Physical Location)',
                                               'Zip Code (Physical Location)',
                                               'Phone Number'])

museum_data = museum_data.rename(index=str,columns={'Museum ID':'museum_id', 
                      'Museum Name':'museum_name',
                      'Legal Name':'legal_name', 
                      'Alternate Name':'alternate_name',
                      'Museum Type':'museum_type', 
                      'Street Address (Administrative Location)':'street_address', 
                      'City (Administrative Location)':'city', 
                      'State (Administrative Location)':'state',
                      'Zip Code (Administrative Location)':'zip_code',
                      'Latitude':'latitude',
                      'Logitude':'logitude',
                      'Income':'income'})

#converting the cleaned data to a new csv file
museum_data.to_csv("museum_2.csv", index=False)

museum_2 = pd.read_csv("museum_2.csv")

# make/connect to sqlite
engine = create_engine('sqlite:///museum.sqlite')

# transfer dataframes to sqlite db
# Applying index as name to try and get around numerical primary key/index sqlite error
museum_2.to_sql('museum_table', con=engine, index=True, index_label='Latitude')

############# ATTENTION! ##################################################################
### UPON CREATION OF THE SQLITE FILE, PLEASE DOWNLOAD DB BROWSER FOR SQLITE 
### https://sqlitebrowser.org/dl/ and change the "museum_id" column to be 
### the database primary key. This is a workaround for a known problem with 
### .to_sql that doesn't allow for setting the primary key during database creation. 
############################################################################################

#select all from sql
##pd.read_sql_query('select * from museum', con=engine).head()
