## Dependencies and set up

import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

postgres_uri = ""
engine = create_engine(postgres_uri)
Base = automap_base()
Base.prepare(engine, reflect=True)

north_table = Base.classes.north
stations = Base.classes.stations



## Routes

app = Flask(__name__)

@app.route("/")
def home():
    print("Home")
    return (
        f"Available routes:<br/>"
        f"/api/north<br/>"
        f"/api/stations")


@app.route("/api/north")
def north():
    session = Session(engine)
    results = session.query(north_table).all()
    session.close()
    all_north = list(np.ravel(results))

    return jsonify(all_north)

@app.route("/api/stations")
def merged():
    session = Session(engine)
    results = session.query(north.city, north.max_temp, north.min_temp, stations.station_name, stations.station_code).all()
    session.close()
    merged_stations = []
    for city, max_temp, min_temp, station_name, station_code in results:
        station_dict = {}
        station_dict["city"] = city
        station_dict["max_temp"] = max_temp
        station_dict["min_temp"] = min_temp
        merged_stations.append(station_dict)

    return jsonify(merged_stations)

if __name__ == "__main__":
    app.run(debug=False)