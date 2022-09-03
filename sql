
CREATE DATABASE WeatherData;
CREATE TABLE Weather (
	
	index INT,
	TotalPrecip INT,
	MaxTemp INT,
	Mintemp INT,
	RelativeHumidityMin INT,
	RelativeHumidityMax INT,
	WindSpeed INT,
	Region VARCHAR,
 	state VARCHAR,
	Station VARCHAR, 
	StationCode VARCHAR,
	Lat INT,
	Long INT,
	Height INT,
	Date_time DATETIME, 


	PRIMARY KEY index

);
DROP TABLE Weather;

-- SpLit into two tables?

CREATE TABLE Weather (
	
	index INT,
	TotalPrecip INT,
	MaxTemp INT,
	Mintemp INT,
	RelativeHumidityMin INT,
	RelativeHumidityMax INT,
	WindSpeed INT, 
    PRIMARY KEY (index)
);
CREATE TABLE locations(
	index INT,
	Region VARCHAR,
 	StationCode VARCHAR,
	state VARCHAR,
	Station VARCHAR, 
	Lat INT,
	Long INT,
	Height INT,
	Date_time DATETIME,
	FOREIGN KEY (index)
);