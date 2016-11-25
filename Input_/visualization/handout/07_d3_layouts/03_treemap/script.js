
var data = d3.range(10).map(function(d, i){
  return {name:i, size:Math.random()};
})



var nest = d3.nest()
	.key(function(d){
	  return d.id;
	})
	.entries(data)

var root = {'key':'root', values:nest}

var tree = d3.layout.treemap()
	.size([300,300])
	.value(function(d){
	  return d.size;
	})
	.sticky(true)
	.children(function(d){
	  return d.values;
	})

console.log( tree(root) )

var cols = d3.scale.category20()

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(150,150)')
	.selectAll('rect')
	.data(tree(root))
	.enter()
	.append('rect')
	.attr('width', function(d){
	  return d.dx;
	})
	.attr('height', function(d){
	  return d.dy;
	})
	.attr('x', function(d){
	  return d.x;
	})
	.attr('y', function(d){
	  return d.y;
	})
	.style('fill', function(d, i){
	  return cols(i)
	})
	