# Project2_GroupI

Project Abstract: Design a visual decision-aid for entrepreneurs interested in opening a new museum,
to include interactive map displaying a heat map layer of museums across the United States,
a search tool to determine the number of museums and relevant information in a particular radius,
and an overlay choropleth layer displaying the average revenue of museums by zip code, and a bar chart for revenue, 
and a bar chart for income. If time allows, we could also add population data from the census to compute a revenue 
by population ratio for a zip code. 

![alt text](http://url/to/Project2_Architecture.png)

In terms of the project requirements, we will be building a dashboard/map page using leaflet and 
plotly, pulling from a mysql db. The app will run on a local web server. We will pay particular
attention to styling and effective visual display of info relevant to our prospective user. 

Raw Data: Museums, Aquariums, and Zoos
Name, location, and revenue for every museum in the United States
https://www.kaggle.com/imls/museum-directory
Source: Institute of Museum and Library Services (https://www.kaggle.com/imls)

THINGS WE NEED TO DETERMINE/REMEMBER: 
What additional JS library should we use, and for what purpose? 
Make sure we include user-driven interaction in the map
How to get zip code boundaries to use in the map
Add a column for non-profits, to be able to filter them out

Project steps: 

1. Complete project abstract and chart list (basic goal: 2 charts [revenue and income] and one map layer, tbd), and get approval
2. Filter only for data required for the analysis/charts/etc we require using tool of choice
3. Create mysql database and load filtered data
4. Complete "app.py" flask app file for communication between mysql and flask, and flask 
and javascript in the browser (via API)
5. Complete html.index for communication between flask app and the browser
6. Compose rough wireframe of HTML index page
7. Complete "app.js" file to bring in data from mysql via flask, build the charts and
maps, enable user selections, and add visual styling to all charts
8. Complete "style.css" to customize styling of the HTML index page
9. Prepare presentation (theme & user story, coding approach, data munging required, and
discussion/demo of visualization choices)

---Project is due and will be presented on February 20th, 2019---
