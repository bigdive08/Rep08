var svg = d3.select('svg');

var width = 600;
var height = 300;

var ddarea = d3.range(12).map(function(d){
	return -Math.PI/2 + (Math.PI*2 / 12) * d;
});

var blob = svg.append("path")
    .attr('transform', 'translate(300,300)')
    .style('stroke-width', 1)
    .style('fill', 'orange')
    

function trans(){

	var areablob = d3.svg.line()
	    .x(function(d) { return Math.sin(d) * 100+Math.random()*20; })
	    .y(function(d) { return Math.cos(d) * 100+Math.random()*20; })
	    .interpolate('basis-closed')

	blob.transition()
		.duration(2000)
		.ease('elastic')
		.attr("d", areablob(ddarea))
		.each('end', function(){
			trans();
		});
}

trans();

