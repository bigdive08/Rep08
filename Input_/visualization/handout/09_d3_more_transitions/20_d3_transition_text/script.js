d3.select('svg')
    .append('text')
    .attr({x:100, y:100})
    .text('Hei')

var tx = d3.select('text')

tx.text('The value is: 0').datum('The value is: 100')
  .transition()
  .duration(3000)
  .tween('text', function(d){
	
	var i = d3.interpolate(this.textContent, d)
	
	return function(t){
		this.textContent = i(t)
	}
})