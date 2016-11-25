var svg = d3.select('svg');
		
svg.append('circle')		
		// initial properties
		.attr('cx', 50)
		.attr('cy', 50)
		.attr('r', 40)
		.transition()
        .duration(2000)
        .ease('bounce')
		.attr('r', 20)
		.each('end', endTransition);



function endTransition(){
	console.log('endTransition');
}
