
var w = 600;
var h = 600;
		
// select the svg container
var svg = d3.select('svg')

// create the node dataset
var data = d3.range(100).map(function(d){
	return {amount:2+Math.random()*20}
})










// create the pack layout
var pack = d3.layout.pack()
			.sort(null) // by default it order the set by the specified value
			.size([w, h])
			.value(function(d){
				return d.amount; // specify the field that must be used to compute the size
			})
			.padding(1.5)


console.log( pack(data) )

// since pack return the parent array, we must splice it in order to get the children array
var packed_data = pack.nodes({children: data}).splice(1)
console.log( packed_data ) 


// reference the selection to a variable
var nodes = svg.selectAll('circle')
	.data( packed_data )
	.enter()
	.append('circle')
	.style('fill', 'skyblue')

	.attr("cx", function(d) { 
		return d.x; 
	})
	 .attr("cy", function(d) { 
	 	return d.y; 
	})

	.attr('r', 0) // initial radius
	.transition()
	.delay(function(d, i){
		return i*50
	})

	// final radius
	.attr('r', function(d){
		return d.r
	})
	
