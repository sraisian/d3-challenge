// @TODO: YOUR CODE HERE!
// @TODO: YOUR CODE HERE!
var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 3.5;
var margin = 20;
var labelArea = 110;
var tPadBot = 40;
var tPadLeft = 40;
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
var circRadius = 10;
svg.append("g").attr("class", "x_axis");
var x_axis = d3.select(".x_axis");
x_axis
  .append("text")
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - 70) +
      ")"
  )
  .text("In Poverty (%)");
svg.append("g").attr("class", "y_axis");
var y_axis = d3.select(".y_axis");
y_axis
  .append("text")
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  )
  .text("Lacks Heathcare (%)");
d3.csv("assets/data/data.csv").then(function(data) {
  visualize(data);
});
function visualize(data) {
  var x_value = "poverty";
  var y_value = "healthcare";
  var xMin;
  var xMax;
  var yMin;
  var yMax;
  function xMinMax() {
    xMin = d3.min(data, function(d) {
      return parseFloat(d[x_value]) * 0.9;
    });
    xMax = d3.max(data, function(d) {
      return parseFloat(d[x_value]) * 1.1;
    });
  }
  function yMinMax() {
    yMin = d3.min(data, function(d) {
      return parseFloat(d[y_value]) * 0.9;
    });
    yMax = d3.max(data, function(d) {
      return parseFloat(d[y_value]) * 1.1;
    });
  }
  xMinMax();
  yMinMax();
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "y axis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
  var theCircles = svg
    .selectAll("g theCircles")
    .data(data)
    .enter();
  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[x_value]);
    })
    .attr("cy", function(d) {
      return yScale(d[y_value]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    });
  theCircles
    .append("text")
    .text(function(d) {
      return d.abbr;
    })
    .attr("dx", function(d) {
      return xScale(d[x_value]) - circRadius / 1.5;
    })
    .attr("dy", function(d) {
      return yScale(d[y_value]) + circRadius / 2.5;
    })
    .attr("font-size", circRadius);
}