### Dependencies and set up
from flask import Flask, render_template, jsonify, request, redirect
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

postgres_uri = 'postgresql://irkqykpauqvpzm:b6a2bf95436de0394e29cb2c7b916b56f18fe92c6a3f5ac85638d94c4a93b081@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d5tqri7nt2h2k0'
engine = create_engine(postgres_uri)
Base = automap_base()
Base.prepare(engine, reflect=True)

north_table = Base.classes.north
stations = Base.classes.stations


### Routes

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.html")
def returnhome():
    return render_template("index.html")

@app.route("/map.html")
def map():
    return render_template("map.html")

@app.route("/dashboard.html")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api/stations")
def merged():
    session = Session(engine)
    results = session.query(stations.station_id, 
        stations.station, 
        stations.state, 
        stations.first_date, 
        stations.height, 
        stations.longitude, 
        stations.latitude).all()
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

@app.route("/api/north")
def north():
    session = Session(engine)
    results = session.query(north_table.index,
            north_table.station_id,
            north_table.date,
            north_table.hour,
            north_table.total_precipitation,
            north_table.max_temperature,
            north_table.min_temperature,
            north_table.max_humidity,
            north_table.min_humidity,
            north_table.wind_speed,
            north_table.station,
            north_table.year,
            north_table.month
            ).all()
    session.close()
    north_data = []
    for index, station_id, date, hour, total_precipitation, max_temperature, min_temperature, max_humidity, min_humidity, wind_speed, station, year, month in results:
        north_dict = {}
        north_dict['index'] = index
        north_dict['station_id'] = station_id
        north_dict['date'] = date
        north_dict['hour'] = hour
        north_dict['total_precipitation'] = total_precipitation
        north_dict['max_temperature'] = max_temperature
        north_dict['min_temperature'] = min_temperature
        north_dict['max_humidity'] = max_humidity
        north_dict['min_humidity'] = min_humidity
        north_dict['wind_speed'] = wind_speed
        north_dict['station'] = station
        north_dict['year'] = year
        north_dict['month'] = month
        north_data.append(north_dict)

    return jsonify(north_data)


if __name__ == "__main__":
    app.run(debug=False)

# 
