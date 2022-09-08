










## Dependencies and set up

import numpy as np
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
<<<<<<< Updated upstream
=======
import numpy as np
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
>>>>>>> Stashed changes

# postgres_uri = ""
# engine = create_engine(postgres_uri)
# Base = automap_base()
# Base.prepare(engine, reflect=True)

<<<<<<< Updated upstream
# north_table = Base.classes.north
# stations = Base.classes.stations
=======
# north_table = Base.classes.North
# stations = Base.classes.Stations

print(Base.classes.keys())

# inspector = inspect(engine)
# print(inspector.get_table_names())
# columns = inspector.get_columns('TABLENAME')
>>>>>>> Stashed changes

## Routes

app = Flask(__name__)

postgres_uri = 'postgresql://irkqykpauqvpzm:b6a2bf95436de0394e29cb2c7b916b56f18fe92c6a3f5ac85638d94c4a93b081@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d5tqri7nt2h2k0'

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(postgres_uri, '')  # or "sqlite:///db.sqlite"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from .models import North
from .models import Stations




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
    results = session.query(north_table.city, north_table.max_temp, north_table.min_temp, stations.station_name, stations.station_code).all()
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
