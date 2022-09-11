var url = "http://127.0.0.1:5000/api/north"

d3.json(url).then(function(response) {
  console.log(response);
});




// d3.json("/api/north.json").then((response) =>
//   console.log(response)
//   );

// d3.json("/api/north.json", function(response) {
//   console.log("hello");
// });







// // Create listner function for changes on dropdown
// function optionChanged(weatherDate) {
//   demoInfo(station);
//   hBar(station);
//   bubble(station);
//   gauge(station);
// }

// // dropdown select function for selecting/ refreshing page
// function dropMenu() {

//   // create id dropdown list
//   var selection = d3.select("#selDataset");

//   d3.json("/api/north").then((data) => {
//     var date = data.date;
//     station.forEach((day) => {
//       selection
//         .append("option")
//         .text(days)
//         .property("value", ndayame);
//     });

//     //set default value
//     var defaultDate = date[0];
//     hBar(defaultDate);
//     demoInfo(defaultDate);
//     bubble(defaultDate);
//     gauge(defaultDate);
//   });
// }

// // used sample id to poplate infoPanel with details
// function demoInfo(id) {
//   d3.json("merged_stations.json").then((data) => {
//     var filtered = data.metadata;
//     // console.log(metadata);
//     var info = filtered.filter(sampleId => sampleId.id.toString() === id)[0];
//     // console.log(info)

//     // Populate demoInfo panel with id information
//     var infoPanel = d3.select('#sample-metadata');
//     infoPanel.html("");
//     Object.entries(info).forEach(([key, value]) => {
//       infoPanel.append("h6").text(`${key}:${value}`);
//       console.log(`key:${key} and value:${value}`);
//     });
//   });
// }

// // Horizontal Bar chart variables
// function hBar(id) {
//   d3.json("all_north.json").then((data) => {
//     var bardata = data.samples;
//     console.log(bardata);
//     var filtered = bardata.filter(sampleId => sampleId.id.toString() === id)[0];
//     console.log(filtered)
//     var sample_values = filtered.sample_values;
//     var otu_ids = filtered.otu_ids;
//     var otu_labels = filtered.otu_labels;


//     // Create bar chart
//     var traceBar = [{
//       x: sample_values.slice(0, 10).reverse(),
//       y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
//       type: "bar",
//       text: otu_labels.slice(0, 10).reverse(),
//       orientation: "h",

//       marker: {
//         color: otu_ids,
//         colorscale: [
//           ['0.0', 'rgb(40, 190, 220)'],
//           ['0.1', 'rgb(51, 175, 221)'],
//           ['0.2', 'rgb(62, 160, 222)'],
//           ['0.3', 'rgb(73, 145, 223)'],
//           ['0.4', 'rgb(84, 130, 224)'],
//           ['0.5', 'rgb(95, 115, 225)'],
//           ['0.6', 'rgb(106, 100, 226)'],
//           ['0.7', 'rgb(117, 85, 227)'],
//           ['0.8', 'rgb(128, 70, 228)'],
//           ['0.9', 'rgb(139, 55, 229)'],
//           ['1.0', 'rgb(150, 40, 230)'],
//         ]
//       }

//     }]

//     var layout = {
//       title: "Top 10 OTU",
//       xaxis: { title: "OTU (Operational Taxonomic Unit) Labels" },
//       yaxis: { title: "OTU (Operational Taxonomic Unit) IDs" }
//     }

//     Plotly.newPlot("bar", traceBar, layout);
//   })
// };

// // Create bubble plot
// function bubble(id) {
//   d3.json("all_north.json").then((data) => {
//     var bubbledata = data.samples;
//     // console.log(bubbledata);
//     var filtered = bubbledata.filter(sampleId => sampleId.id.toString() === id)[0];
//     // console.log(filtered)
//     var sample_values = filtered.sample_values;
//     var otu_ids = filtered.otu_ids;
//     var otu_labels = filtered.otu_labels;

//     var size = sample_values;
//     var bubbleTrace = [{
//       x: otu_ids,
//       y: sample_values,
//       type: "bubble",
//       text: otu_labels,
//       mode: "markers",

//       marker: {
//         size: size,
//         color: otu_ids,
//         colorscale: "Earth",
//       }
//     }]

//     var layout = {
//       title: "Top 10 OTU",
//       xaxis: { title: "OTU (Operational Taxonomic Unit) Labels" },
//       yaxis: { title: "OTU (Operational Taxonomic Unit) IDs" }
//     }

//     Plotly.newPlot("bubble", bubbleTrace, layout);
//   })
// };

// // Create Gauge chart
// function gauge(id) {
//   d3.json("all_north.json").then((data) => {
//     var gaugedata = data.metadata;
//     // console.log(gaugedata);
//     var filtered = gaugedata.filter(sampleId => sampleId.id.toString() === id)[0];
//     // console.log(filtered)
//     var wfreq = filtered.wfreq
//     // console.log(wfreq)

//     // assign 0 to null value to make sure it the gauge works properly
//     if (wfreq == null){
//       wfreq=0;
//     }
    
//     var gaugetrace = [{
//       type: "indicator",
//       mode: "gauge+number",
//       value: wfreq,
//       title: { 'text': "Belly Button Washing Frequency<br>Scrubs per Week" },

//       gauge: {
//         axis: { range: [null, 9],
//           tickmode: "linear",
//           tickfont: {size: 15},
//         },
//         bar:{color: "red"},
//         steps: [
//           { range: [null, 1], color: "#99ffbb" },
//           { range: [1, 2], color: "#88feaa" },
//           { range: [2, 3], color: "#77ed99" },
//           { range: [3, 4], color: "#66dc88" },
//           { range: [4, 5], color: "#55cb77" },
//           { range: [5, 6], color: "#44ba66" },
//           { range: [6, 7], color: "#33a955" },
//           { range: [7, 8], color: "#229844" },
//           { range: [8, 9], color: "#118733" }
//         ],
//       }
//     }];
    
//     var layout = {
//       shapes: [{type: "path",
//       path: "M -.0 -0.05 L .0 0.05 L",
//       fillcolor: "850000",
//       line: {
//         color: "850000"
//       } }],
//       width: 600, height: 400
//     };

//     Plotly.newPlot("gauge", gaugetrace, layout);
//   });
// };

// // Initiate refresh of html
// dropMenu()




