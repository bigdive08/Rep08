var svg = d3.select('svg');

var width = 600;
var height = 300;

var data = d3.range(20).map(function(d){
	return Math.random();
});



var mapx = d3.scale.linear()
			.domain([0, data.length])
			.range([0, width]);

var extent = d3.extent(data, function(d){
	return d;
});

var mapy = d3.scale.linear()
			.domain(extent)
			.range([0, height]);

var myArea = d3.svg.area()
			.x(function(d, i){
				return mapx(i)
			})
			.y1(function(d, i){
				return mapy(d);
			})
			.y0(height)
			.interpolate('basis');

svg.append('path')
	.attr('d', myArea(data))
	.style('fill', 'orange')
	.style('stroke', 'purple')
    .style('stroke-width', 2);

