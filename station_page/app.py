
import sqlalchemy
from flask import Flask, render_template, jsonify, request, redirect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

app = Flask(__name__)

#########################################
## Flask app to render html
#########################################

@app.route("/")
def home():
    return render_template("index.html")

#########################################
## Flask app to read database
#########################################

postgres_uri = 'postgresql://irkqykpauqvpzm:b6a2bf95436de0394e29cb2c7b916b56f18fe92c6a3f5ac85638d94c4a93b081@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d5tqri7nt2h2k0'
engine = create_engine(postgres_uri)
Base = automap_base()
Base.prepare(engine, reflect=True)

stations = Base.classes.stations

#########################################
## Create API call
#########################################
@app.route("/api/stations")
def merged():
    session = Session(engine)
    results = session.query(stations.station_id, stations.station, stations.state, stations.first_date, stations.height, stations.longitude, stations.latitude).all()
    session.close()

    station_data = []
    for id, station, state, date, height, longitude, latitude in results:
        station_dict = {}
        station_dict["station_id"] = id
        station_dict["station"] = station
        station_dict["state"] = state
        station_dict["first_date"] = date
        station_dict["height"] = height
        station_dict["longitude"] = longitude
        station_dict["latitude"] = latitude
        station_data.append(station_dict)

    return jsonify(station_data)

if __name__ == "__main__":
    app.run(debug=False)
    