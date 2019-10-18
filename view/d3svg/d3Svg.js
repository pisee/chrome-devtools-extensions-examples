// var d3 = require("d3");

var svg = d3.select("#mySvg").append("svg")

svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 200)
    .attr("height", 30)
    
svg.append("rect")
    .attr("x", 10)
    .attr("y", 45)
    .attr("width", 30)
    .attr("height", 30)
    .transition()
    .duration(3000)
    .attr("width", 500)
    .style("fill", "red")
    
svg.append("circle")
    .attr("cx", 150)
    .attr("cy", 180)
    .attr("r", 100)
    
svg.append("circle")
    .attr("cx", 150)
    .attr("cy", 180)
    .attr("r", 100)
    .style("fill", "aqua")
    .transition()
    .duration(3000)
    .attr("r", 50)
    .attr("transform", "translate(250, 0)")
    .style("fill", "indigo")

svg.append("path")
    .attr("d","M10,275 L220,475 L280,350")
    
svg.append("path")
    .attr("d","M300,275 L520,475 L580,350")
    .style("fill", "gray")
    .transition()
    .duration(3000)
    .attr("transform", "rotate(90,580,350)")
    .style("fill", "yellow")
    
svg.append("path")
    .attr("d","M10,575 C80,300 120,500 250,575")
    .style("fill", "green")
    
svg.append("path")
    .attr("d","M10,575 C80,300 120,500 250,575")
    .style("fill", "yellow")
    .transition()
    .duration(3000)
    .attr("transform", "translate(230, -287) scale(2,1.5)")
    .attr("d","M10,575 C80,300 120,500 280,575")
    .style("fill", "pink")


// graph
var dataSet = [300, 150, 5, 60, 240]
dataSet = []
axios.get('http://localhost:3000/example1')
    .then(response => {
        dataSet = response.data
        console.log(dataSet)
        
        d3.select("#myGraph")
            .selectAll("rect")
            .data(dataSet)
            .enter()
            .append("rect")
            .attr("x", 10)
            .attr("y", (d,i)=>{return i*25})
            .attr("height", "20")
            .attr("width", "0")
            .transition()
            .delay((d,i)=>{return i*500})
            .duration(2500)
            .attr("width", (d,i)=>{return d})
        
        d3.select("#myGraph")
            .selectAll("rect")
            .on("click", function() {
                d3.select(this)
                    .style('fill', 'darkred');
                });

        var xScale = d3.scaleLinear()
                .domain([0,300])
                .range([0,300])

        var xAxis = d3.axisBottom()
                        .scale(xScale);

        d3.select("#myGraph")
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate(10, "+((1+dataSet.length) * 20 +5) + ")")
            .call(xAxis)
    })


d3.select("#updateButton")
    .on("click", ()=>{
        for(var i=0; i<dataSet.length; i++){
            dataSet[i] = Math.floor(Math.random()*320);
        }
        d3.select("#myGraph")
            .selectAll("rect")
            .data(dataSet)
            .transition()
            .attr("width", (d,i)=>{return d})
    })


// Chart
    var data = [
    ];
    var width = 500;
    var height = 500;
    var globalX = 0;
    var duration = 250;
    var max = 500;
    var step = 10;
    var chart = d3.select('#chart')
    .attr('width', width + 50)
    .attr('height', height + 50);
    var x = d3.scaleLinear().domain([0, 500]).range([0, 500]);
    var y = d3.scaleLinear().domain([0, 500]).range([500, 0]);
    // -----------------------------------
    var line = d3.line()
              .x(function(d){ return x(d.x); })
              .y(function(d){ return y(d.y); });
    // -----------------------------------
    // Draw the axis
    var xAxis = d3.axisBottom().scale(x);
    var axisX = chart.append('g').attr('class', 'x axis')
           .attr('transform', 'translate(0, 500)')
           .call(xAxis);
    // Append the holder for line chart and circles
    var g = chart.append('g');
    // Append path
    var path = g.append('path');
    // Main loop
    function tick() {
      // Generate new data
      var point = {
        x: globalX,
        y: ((Math.random() * 450 + 50) >> 0)
      };
      data.push(point);
      globalX += step;
      // Draw new line
      path.datum(data)
        .attr('class', 'line')
        .attr('d', line);
      // Update circles
      var circles = g.selectAll('circle')
      circles.data(data).enter().append('circle')
        .merge(circles)
        .attr('r',5)
        .attr('cx',(function(d){ return x(d.x); }))
        .attr('cy',(function(d){ return y(d.y); }));     
      circles.exit().remove();
      // Shift the chart left
      x.domain([globalX - (max - step), globalX]);
      axisX.transition()
         .duration(duration)
         .ease(d3.easeLinear,.1)
         .call(xAxis);
      g.attr('transform', null)
        .transition()
        .duration(duration)
        .ease(d3.easeLinear,.1)
        .attr('transform', 'translate(' + x(globalX - max) + ')')
        .on('end', tick)
      // Remote old data (max 50 points)
      if (data.length > 50) data.shift();
    }
    tick();