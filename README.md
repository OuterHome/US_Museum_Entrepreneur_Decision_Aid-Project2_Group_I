# Project2_GroupI

Project Abstract: Design a visual decision-aid for entrepreneurs interested in opening a new museum,
to include interactive map displaying museums by typeacross the United States, a layer displaying population density,
a search tool to navigate to particular areas of interest, a box plot for revenue by type, and a box plot for income by type. 

![alt text](https://github.com/PrairieDogCity/Project2_GroupI/blob/master/project2_architecture_timeline_GroupI.PNG)

In terms of the project requirements, we will be building a dashboard/map page using leaflet and 
plotly, pulling from a sqlite db. The app will run on a local web server. We will pay particular
attention to styling and effective visual display of info relevant to our prospective user. 

Raw Data: Museums, Aquariums, and Zoos
Name, location, and revenue for every museum in the United States
https://www.kaggle.com/imls/museum-directory
Source: Institute of Museum and Library Services (https://www.kaggle.com/imls)

THINGS WE NEED TO DETERMINE/REMEMBER: 
What additional JS library should we use, and for what purpose? (We are using esri-leaflet, and a lot of leaflet plugins)
Make sure we include user-driven interaction in the map

Project steps: 

~~1. Complete project abstract and chart list (basic goal: 2 charts [revenue and income] and one map layer, museum display by type), and get approval

~~2. Filter only for data required for the analysis/charts/etc we require using tool of choice

~~3. Create mysql database and load filtered data

~~4. Complete "app.py" flask app file for communication between mysql and flask, and flask 
and javascript in the browser (via API)

~~5. Complete html.index for communication between flask app and the browser

~~6. Compose rough wireframe of HTML index page

~~7. Complete "app.js" file to bring in data from mysql via flask, build the charts and
maps, enable user selections, and add visual styling to all charts

~~8. Complete "style.css" to customize styling of the HTML index page

~~9. Prepare presentation (theme & user story, coding approach, data munging required, and
discussion/demo of visualization choices)

---Project is due and will be presented on February 20th, 2019---

############# ATTENTION! ##################################################################
### UPON CREATION OF THE SQLITE FILE, PLEASE DOWNLOAD DB BROWSER FOR SQLITE 
### https://sqlitebrowser.org/dl/ and change the "museum_id" column to be 
### the database primary key. This is a workaround for a known problem with 
### .to_sql that doesn't allow for setting the primary key during database creation. 
############################################################################################
