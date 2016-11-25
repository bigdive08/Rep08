
// select the svg container
var svg = d3.select('svg')
		

// create the node dataset
var data_nodes = d3.range(20).map(function(d){
	return {amount:2+Math.random()*20}
})


// create the links dataset
var data_links = []
for (var i = 0; i < 100; i++) {
	var s = parseInt(Math.random()*data_nodes.length)
	var t = parseInt(Math.random()*data_nodes.length)
	if(s != t) data_links.push({target:t, source:s})
};


// create the layout
var force = d3.layout.force()
			.nodes(data_nodes)
			.links(data_links)
			.size([500,400])
			.on('tick', tick)

// some settings:
force.charge(-150)
force.friction(.9)
force.linkDistance(100)
force.linkStrength(.1)
force.theta(.2)
force.gravity(.1)

// start the simulation
force.start();



var links = svg.selectAll('line')
			.data(force.links())
			.enter()
			.append('line')
			.style('stroke', '#ccc')



// reference the selection to a variable
var nodes = svg.selectAll('circle')
	.data(force.nodes())
	.enter()
	.append('circle')
	.style('fill', 'steelblue')
	.attr('r', function(d){
		return d.amount
	})
	.call(force.drag)






// this function will be called each frame
function tick(){

	// this update the circle positions
	nodes.attr('cx', function(d){
			return d.x;
		})
		.attr('cy', function(d){
			return d.y;
		})


	// this update the line positions
	links.attr('x1', function(d){
			return d.source.x
		})
		.attr('y1', function(d){
			return d.source.y
		})
		.attr('x2', function(d){
			return d.target.x
		})
		.attr('y2', function(d){
			return d.target.y
		})
}	
		
