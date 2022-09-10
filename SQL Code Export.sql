-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "North" (
    "ID" int   NOT NULL,
    "station_id" VARCHAR(10)   NOT NULL,
    "date" DATE   NOT NULL,
    "hour" TIME   NOT NULL,
    "total_precipitation" FLOAT   NOT NULL,
    "max_temperature" FLOAT   NOT NULL,
    "min_temperature" FLOAT   NOT NULL,
    "max_humidity" FLOAT   NOT NULL,
    "min_humidity" FLOAT   NOT NULL,
    "wind_speed" FLOAT   NOT NULL,
    "station" VARCHAR(20)   NOT NULL,
    "year" YEAR   NOT NULL,
    "month" INT   NOT NULL,
    CONSTRAINT "pk_Central_west" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Stations" (
    "station_id" VARCHAR(10)   NOT NULL,
    "station" VARCHAR(20)   NOT NULL,
    "region" VARCHAR(10)   NOT NULL,
    "state" VARCHAR(10)   NOT NULL,
    "first_date" DATE   NOT NULL,
    "height" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    CONSTRAINT "pk_Stations" PRIMARY KEY (
        "station_id"
     )
);

ALTER TABLE "north" ADD CONSTRAINT "fk_north_station_id" FOREIGN KEY("station_id")
REFERENCES "stations" ("station_id");

