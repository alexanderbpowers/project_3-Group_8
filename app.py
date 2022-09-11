from operator import index
from flask import Flask, render_template, jsonify, request, redirect
import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

postgres_uri = 'postgresql://irkqykpauqvpzm:b6a2bf95436de0394e29cb2c7b916b56f18fe92c6a3f5ac85638d94c4a93b081@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d5tqri7nt2h2k0'
engine = create_engine(postgres_uri)
Base = automap_base()
Base.prepare(engine, reflect=True)

north_table = Base.classes.north
stations = Base.classes.stations

session = Session(engine)


## Routes

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/north")
def merged():
    results = session.query(north_table.index,
        ).all()


    north_data = []

    for index, station_id, date, hour, total_precipitation, max_temperature, min_temperature, max_humidity, min_humidity, wind_speed, station, year, month, index, station_id, station, region, state, first_date, height, longitude, latitude  in results:
        north_dict = {}
        stations_dict = {}
        all_dict = {}
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
        stations_dict['index'] = index
        stations_dict['station_id'] = station_id
        stations_dict['station'] = station
        stations_dict['region'] = region
        stations_dict['state'] = state
        stations_dict['first_date'] = first_date
        stations_dict['height'] = height
        stations_dict['longitude'] = longitude
        stations_dict['latitude'] = latitude
        all_dict["north"] = north_dict
        all_dict["station"] = stations_dict
        north_data.append(all_dict)

    return jsonify(north_data)


if __name__ == "__main__":
    app.run(debug=False)

