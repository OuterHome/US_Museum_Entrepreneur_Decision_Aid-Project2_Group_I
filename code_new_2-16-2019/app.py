# Import Dependencies
import os
import numpy as np
import pandas as pd
import threading
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///museum.sqlite", connect_args={'check_same_thread': False}, echo=True)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Museum = Base.classes.museum_table

# Create our session (link) from Python to the DB
##session = scoped_session(sessionmaker(bind=engine))
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

""" @app.teardown_request
def remove_session(ex=None):
    session.remove() """

@app.route("/")
def home():
    return render_template("index.html")

""" @app.route("/states")
def income():
     results = session.query(func.sum(Museum.income).label("income")).all()
     return str(results) """

@app.route("/map/")
def museumsMap():
    results = session.query(Museum).all()
    mapData = []
    for result in results:
        mapDataDict = {}
        mapDataDict["museum_id"] = result.museum_id
        mapDataDict["museum_name"] = result.museum_name
        mapDataDict["museum_type"] = result.museum_type
        mapDataDict["latitude"] = result.latitude
        mapDataDict["Longitude"] = result.Longitude
        mapDataDict["Income"] = result.income
        mapDataDict["Revenue"] = result.Revenue
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        mapDataDict["State"] = result.state

=======
        mapDataDict["state"] = result.state
>>>>>>> Stashed changes
=======
        mapDataDict["state"] = result.state
>>>>>>> Stashed changes
        mapData.append(mapDataDict)
    return jsonify(mapData)

if __name__ == '__main__':
    app.run(debug=True)
