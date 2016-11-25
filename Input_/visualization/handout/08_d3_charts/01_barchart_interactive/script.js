
var widthGraph = 200;
var heightGraph = 100;

var svg = d3.select('svg')

layer = svg.append('g')
						.attr('transform', 'translate(10, 20)')

var scaleColors = d3.scale.category20()

var objData = [
				{label:"Text 1", cat:1},
				{label:"Text 2", cat:3},
				{label:"Text 3", cat:1},
				{label:"Text 4", cat:1}
			  ]

var objects = layer.selectAll('g')
				.data(objData)
				
// object creation
// now it is a group
objects.enter().append('g')

// append the rect
objects.append('rect')
		.attr('x', function(d, i){
			return i*80;
		})		
		.attr('y', 0)			  
		.attr('width', 70)
		.attr('height', 30)	
		.style('fill', function(d,i){
			console.log(d.cat)
			return scaleColors(i/objData.length);
		})
		
// append a text
objects.append('text')
		.text(function(d){
			return d.label;
		})
		.attr('x', function(d, i){
			return i*80;
		})
		.attr('opacity', 0)
		
// interaction
objects.on('mouseover', function(d,i){
			d3.select(this)
				.select('rect')
				.transition()
				.duration(300)
				.ease('exp')
				.attr('height', function(){
					return 40 + i*20;
				})
			d3.select(this)	
				.select('text')
				.transition()
				.duration(300)
				.ease('exp')
				.attr('opacity', 1)
		})
  		.on('mouseout', function(){
				d3.select(this)
					.select('rect')
					.transition()
					.duration(1000)
					.ease('bounce')
					.attr('height', 30)
				d3.select(this)
					.select('text')
					.transition()
					.duration(1000)
					.attr('opacity', 0)
			})