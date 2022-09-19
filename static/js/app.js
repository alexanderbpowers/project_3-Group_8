const url = "https://project-3-group-8.herokuapp.com/api/north"
const northdatafile = "./northdata.csv"
const stations_url = "https://project-3-group-8.herokuapp.com/api/north"

var svgHeight = 600
var svgWidth = 1000

var margin = {
    top: 20,
    bottom: 100,
    left: 100,
    right: 80,
}

var width = (svgWidth - margin.left) - margin.right
var height = (svgHeight - margin.bottom) - margin.top

var svg = d3.select("#lineplot").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .classed("bg1", true);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("fill","rgb(246, 209, 249)");


// GAUGE AND PLOT
function init() {
      d3.json(url, function(data) {

        function demoInfo() {
          var input = d3.select('#selDataset').property("value")
          var demographicArr = data.filter(d => d.station_id == input)
          console.log(data)
          console.log(demographicArr)
          var station_id = demographicArr[0].station_id
          var station = demographicArr[0].station
      
          var list = d3.select("#sample-metadata")
              list.html("")
              list.empty()
              list.append("ul").text(`Station ID: ${station_id}`)
              list.append("ul").text(`Station: ${station}`)
          };

          demoInfo();
      ////////////////////////////////////////////////////////////////////////////
        /////////// LINE PLOT
        console.log("working")
    
        var input = d3.select('#selDataset').property("value")
    
        // GRAB TEMPERATURES
        var maxTempArr = []
        for (var x = 0; x < data.length; x++) {
          if (data[x].station_id == input) {
            maxTempArr.push(data[x].max_temperature)
          }
        }
        maxTempArr.sort((a,b) => a - b)
    
        var minTempArr = []
        for (var x = 0; x < data.length; x++) {
          if (data[x].station_id == input) {
            minTempArr.push(data[x].min_temperature)
          }
        }
        minTempArr.sort((a,b) => a - b)
    
        // GRAB MAX HUMIDITY
        var maxHumidityArr = []
        for (var x = 0; x < data.length; x++) {
          if (data[x].station_id == input) {
            maxHumidityArr.push(data[x].max_humidity)
          }
        }
        maxHumidityArr.sort((a,b) => a - b)
    
        // GRAB MIN HUMIDITY
        var minHumidityArr = []
        for (var x = 0; x < data.length; x++) {
          if (data[x].station_id == input) {
            minHumidityArr.push(data[x].min_humidity)
          }
        }
        minHumidityArr.sort((a,b) => a - b)
    
        // DECLARE LABEL
        yLabel = "temperature"
    
        // CREATE PLOT
    
        var x = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var y1 = maxTempArr
        var y2 = minTempArr
        
        var yScale = d3.scaleLinear().domain([(d3.min(y2) - 5), (d3.max(y1) + 2)]).range([height,0])
        var xScale = d3.scaleBand().domain(x).range([0, width]) 
    
        var leftAxis = d3.axisLeft(yScale)
        var bottomAxis = d3.axisBottom(xScale)
    
        var yAxis = chartGroup.append("g")
          .classed("yAxis", true)
          .call(leftAxis);
    
        chartGroup.append("g")
          .attr("transform", `translate(0,${height})`)
          .classed("xAxis", true)
          .call(bottomAxis)
    
        var lineMax = d3.line()
          .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
          .y((d,i) => yScale(y1[i]))
          .curve(d3.curveCatmullRom.alpha(.5))
    
        var lineMin = d3.line()
          .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
          .y((d,i) => yScale(y2[i]))
          .curve(d3.curveCatmullRom.alpha(.5))
    
        var maxPath = chartGroup.append("path")
          .datum(maxTempArr)
          .attr("fill","none")
          .attr("stroke","white")
          .attr("stroke-width", 2)
          .classed("maxPath", true)
          .attr("d", lineMax)
          
        maxPath.transition()
          .duration(2000)
          .attr("stroke","yellow")
    
        var minPath = chartGroup.append("path")
          .datum(minTempArr)
          .attr("fill","none")
          .attr("stroke","white")
          .attr("stroke-width", 2)
          .classed("minPath", true)
          .attr("d", lineMin)
        
        minPath.transition()
          .duration(2000)
          .attr("stroke","blue")
    
    
          // LEGEND
          chartGroup.append("circle").attr("cx", (width - 40)).attr("cy", (height - 42)).attr("r", 6).style("fill", "yellow")
          chartGroup.append("circle").attr("cx", (width - 40)).attr("cy", (height - 22)).attr("r", 6).style("fill", "blue")
          chartGroup.append("text").attr("x", (width - 20)).attr("y", (height - 40)).text("Maximum").style("font-size", "15px").attr("alignment-baseline","middle")
          chartGroup.append("text").attr("x",(width - 20)).attr("y", (height - 20)).text("Minimum").style("font-size", "15px").attr("alignment-baseline","middle")
    
        chartGroup.append("g")
          .append("text")
          .attr("transform", `translate(${width/2}, ${height + 40})`)
          .classed("aText active", true)
          .attr("id", "months")
          .text("Month")
    
        var ylabelsGroup = chartGroup.append("g");
    
        var temperatureLabel = ylabelsGroup
          .append("text")
          .attr("transform", `rotate(-90)`)
          .attr("y", 0 - margin.left + 60)
          .attr("x",  0 - (height / 2))
          .attr("id", "temperature")
          .classed("aText active", true)
          .text("Average Temperature C°")
    
        var humidityLabel = ylabelsGroup
          .append("text")
          .attr("transform", `rotate(-90)`)
          .attr("y", 0 - margin.left + 40)
          .attr("x",  0 - (height / 2))
          .attr("id", "humidity")
          .classed("aText inactive", true)
          .text("Average Humidity %")
    
    
        // FUNCTIONS
    
        // yScale function
        function yLinearScale(y1,y2) {
          yScale = d3.scaleLinear().domain([(d3.min(y2) - 5), (d3.max(y1) + 2)]).range([height,0])
          return yScale
        };
        // yAxis function
        function renderYAxes(newyScale, yAxis) {
          leftAxis = d3.axisLeft(newyScale);
          yAxis.transition()
            .duration(1000)
            .call(leftAxis)
          return yAxis
        };
        // line functions
        function updateLineMax(y1) {
          var lineMax = d3.line()
          .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
          .y((d,i) => yScale(y1[i]))
          .curve(d3.curveCatmullRom.alpha(.5))
    
          return lineMax
        };
    
        function updateLineMin(y2) {
          var lineMin = d3.line()
          .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
          .y((d,i) => yScale(y2[i]))
          .curve(d3.curveCatmullRom.alpha(.5))  
    
          return lineMin
        };
        // update plot function
        function updatePlotHumidity(y1,y2) {
          newyScale = yLinearScale(y1,y2);
          yAxis = renderYAxes(newyScale, yAxis);
          lineMax = updateLineMax(y1)
          lineMin = updateLineMin(y2)
    
          maxPath.transition()
            .duration(1000)
            .attr("d", lineMax)
    
          minPath.transition()
            .duration(1000)
            .attr("d", lineMin)
    
          temperatureLabel.classed("aText active", false).classed("aText inactive", true)
          humidityLabel.classed("aText inactive", false).classed("aText active", true)
        };
        function updatePlotTemperature(y1,y2) {
          newyScale = yLinearScale(y1,y2);
          yAxis = renderYAxes(newyScale, yAxis);
          lineMax = updateLineMax(y1)
          lineMin = updateLineMin(y2)
    
          maxPath.transition()
            .duration(1000)
            .attr("d", lineMax)
    
          minPath.transition()
            .duration(1000)
            .attr("d", lineMin)
    
          temperatureLabel.classed("aText inactive", false).classed("aText active", true)
          humidityLabel.classed("aText active", false).classed("aText inactive", true)
        };
    
        // INTERACTIVE
        ylabelsGroup.selectAll("text").on("click", function() {
          
          var value = d3.select(this).attr("id");
          if (value == 'humidity') {
            y1 = maxHumidityArr
            y2 = minHumidityArr
    
            updatePlotHumidity(y1,y2)
          } else if (value == 'temperature') {
            y1 = maxTempArr
            y2 = minTempArr
            updatePlotTemperature(y1,y2)
          };
    
        });
      ////////////////////////////////////////////////////////////////////////////
        var input = d3.select('#selDataset').property("value")
    
        function windSpeed(input) {
          var north_objects = []
          for (var x = 0; x < data.length; x++) {
            if (data[x].station_id == input) {
              north_objects.push(data[x].wind_speed)
            }
          }
          // console.log(north_objects)
          var sum = 0
          for (var m = 0; m < north_objects.length; m++){
            sum = sum + north_objects[m]
            }
            // console.log(sum)
            // console.log(north_objects.length)
          var avgspeed = Math.round(sum / north_objects.length);
          return avgspeed
        }
    
        avgspeed = windSpeed(input)
    
        // GRAB ARRAY OF NORTH OBJECTS FOR STATION ID
        
          console.log(`Average wind speed: ${avgspeed}`)
        var gaugetrace = [{
          type: "indicator",
          mode: "gauge+number",
          value: avgspeed,
          title: { 'text': "Average Wind Speed" },
          gauge: {
            axis: {
              range: [null, 9],
              tickmode: "linear",
              tickfont: { size: 15 },
            },
            bar: { color: "red" },
            steps: [
              { range: [null, 1], color: "#99FFBB" },
              { range: [1, 2], color: "#88FEAA" },
              { range: [2, 3], color: "#77ED99" },
              { range: [3, 4], color: "#66DC88" },
              { range: [4, 5], color: "#55CB77" },
              { range: [5, 6], color: "#44BA66" },
              { range: [6, 7], color: "#33A955" },
              { range: [7, 8], color: "#229844" },
              { range: [8, 9], color: "#118733" }
            ],
          }
        }];
        var layout = {
          shapes: [{
            type: "path",
            path: "M -.0 -0.05 L .0 0.05 L",
            fillcolor: "850000",
            line: {
              color: "850000"
            }
          }],
          width: 600, height: 400
        };
        Plotly.newPlot("gauge", gaugetrace, layout);
      ////////////////////////////////////////////////////////////////////////////

     ////////////////////////////////////////////////////////////////////////////
    
    d3.select('#selDataset').on("change", function() {

      demoInfo()

      var input = d3.select('#selDataset').property("value")
    
      // GRAB TEMPERATURES
      var maxTempArr = []
      for (var x = 0; x < data.length; x++) {
        if (data[x].station_id == input) {
          maxTempArr.push(data[x].max_temperature)
        }
      }
      maxTempArr.sort((a,b) => a - b)

      var minTempArr = []
      for (var x = 0; x < data.length; x++) {
        if (data[x].station_id == input) {
          minTempArr.push(data[x].min_temperature)
        }
      }
      minTempArr.sort((a,b) => a - b)

      // GRAB HUMIDITY
      var maxHumidityArr = []
      for (var x = 0; x < data.length; x++) {
        if (data[x].station_id == input) {
          maxHumidityArr.push(data[x].max_humidity)
        }
      }
      maxHumidityArr.sort((a,b) => a - b)

      var minHumidityArr = []
      for (var x = 0; x < data.length; x++) {
        if (data[x].station_id == input) {
          minHumidityArr.push(data[x].min_humidity)
        }
      }
      minHumidityArr.sort((a,b) => a - b)

      // GRAB OTHER VALUES
      var x = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      var y1 = maxTempArr
      var y2 = minTempArr
      var yScale = d3.scaleLinear().domain([(d3.min(y2) - 5), (d3.max(y1) + 2)]).range([height,0])
      var xScale = d3.scaleBand().domain(x).range([0, width]) 
      var leftAxis = d3.axisLeft(yScale)

          yAxis.transition()
        .duration(1000)
        .call(leftAxis)

      var lineMax = d3.line()
        .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
        .y((d,i) => yScale(y1[i]))
        .curve(d3.curveCatmullRom.alpha(.5))

      var lineMin = d3.line()
        .x((d,i) => xScale(x[i]) + xScale.bandwidth() / 2)
        .y((d,i) => yScale(y2[i]))
        .curve(d3.curveCatmullRom.alpha(.5))

          console.log(lineMax)
      
          maxPath.transition()
        .duration(1000)
        .attr("d", lineMax)

          minPath.transition()
      .duration(1000)
      .attr("d", lineMin)

          temperatureLabel.classed("aText inactive", false).classed("aText active", true)
          humidityLabel.classed("aText active", false).classed("aText inactive", true)

          ylabelsGroup.selectAll("text").on("click", function() {
        console.log(d3.select(this).attr("id"))
        
      var value = d3.select(this).attr("id");
      if (value == 'humidity') {
        y1 = maxHumidityArr
        y2 = minHumidityArr

        updatePlotHumidity(y1,y2)
      } else if (value == 'temperature') {
        y1 = maxTempArr
        y2 = minTempArr
        updatePlotTemperature(y1,y2)
      };
      
      });
      ////////////////////////////////////////////////////////////////////////////
      avgspeed = windSpeed(input)
      Plotly.restyle("gauge", "value", avgspeed)
      ////////////////////////////////////////////////////////////////////////////
        // demoInfo(input)
     ////////////////////////////////////////////////////////////////////////////
        });
      });
    };


// DROPDOWN
function dropMenu() {
  d3.json(stations_url, function(data) {
    arr = []
    
    for (var x = 0; x < data.length; x++) {
      var ids = data[x].station_id
      arr.push(ids)
    }
    // console.log(arr)
    var dropDown = ""
    for (var x = 0; x < arr.length; x++) {
      dropDown += '<option>' + arr[x] + '</option>'
    }
    document.getElementById("selDataset").innerHTML = dropDown;
  })
};



///// DEMOGRAPHIC BOX


function initialise() {
  dropMenu();
  init();
};

initialise();

// >>>







