## Dependencies and set up

from flask import Flask, render_template, jsonify, request, redirect
import numpy as np
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

postgres_uri = 'postgresql://irkqykpauqvpzm:b6a2bf95436de0394e29cb2c7b916b56f18fe92c6a3f5ac85638d94c4a93b081@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d5tqri7nt2h2k0'
engine = create_engine(postgres_uri)
Base = automap_base()
Base.prepare(engine, reflect=True)

north_table = Base.classes.north
stations = Base.classes.stations

## Routes

app = Flask(__name__)
db = SQLAlchemy(app)




@app.route("/")
def home():
    return render_template("index.html")


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



####
# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 15,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

#     return jsonify(pet_data)
