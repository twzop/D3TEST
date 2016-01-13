var bardata = [],
    height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

// Generate x numbers of random data to use for our charts via this loop
for (var i=0; i < 15; i++) {
    bardata.push(Math.round(Math.random() * 30) + 20)
}

// Scales the Height of Data to size of svg area
var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height]);

// Scales the Width of Data to size of svg area
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, bardata.length)) // Use D3 Range method and the length of elements in bardata array
    .rangeBands([0, width]);

// Color Values
var colors = d3.scale.linear()
    .domain([0, bardata.length * 0.33, bardata.length * 0.66, bardata.length])// at 25% map to first color at 50% map to next color, etc.
    .range(['#B58929', '#C61C6F', '#268BD2',  '#85992C']); // The range of color from color x1 to color x2

var tempColor;

var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('border-radius', '3px')
    .style('font-family', 'sans-serif')
    .style('font-size', '15px')
    .style('color', '#444444')
    .style('box-shadow', '1px 2px 3px rgba(0,0,0,0.4)')
    .style('opacity', '0');

var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        }) // Use Colors variable to fill colors from the range (these are autofilled from range)
        .attr('width', xScale.rangeBand())
        .attr('x', function(d,i) {
            return xScale(i); // Update x position (Ordinal scale)
        })
    .attr('height', 0)
    .attr('y', height)

    // Events

    .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', 0.9);

        tooltip.html(d)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px');

        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', 0.5)
            .style('fill', 'yellow')
    })
    .on('mouseout', function() {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor);

        tooltip.transition()
            .style('opacity', 0);
    });


// Transition Effect for var myChart
myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease('elastic');