
var svg = d3.select('svg');

var data = d3.range(12).map(function(d){
  return {value:Math.random()*2-1}	
});

var scaler = d3.scale.linear()
  .domain([-1, 1])
  .range([-15,15])


var r = 100;
var pad = 40

var pathGen = d3.svg.area()
  .x1(function(d, i){
	  var ang = (Math.PI * 2) / data.length;
	  var x = Math.cos(ang*i) * r+scaler(d.value);
	  return x
  })
  .x0(function(d, i){
	  var ang = (Math.PI * 2) / data.length;
	  var x = Math.cos(ang*i) * (r+scaler(d.value) - pad)
	  return x
  })
  .y1(function(d, i){
	  var ang = (Math.PI * 2) / data.length;
	  var y = Math.sin(ang*i) * r+scaler(d.value)
	  return y
  })
  .y0(function(d, i){
	  var ang = (Math.PI * 2) / data.length;
	  var y = Math.sin(ang*i) * (r+scaler(d.value) - pad)
	  return y
  })
  .interpolate('basis-closed')
  


svg.append('g')
  .attr('transform', 'translate(300,300)')
  .append('path')
  .attr('d', pathGen(data))
  .style('stroke', 'black')
  .style('fill', 'orange')


