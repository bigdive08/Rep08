
var w = 600;
var h = 600;
		
// select the svg container
var svg = d3.select('svg')
			.attr('width', w)
			.attr('height', h)

// create the projection system
// mercator
// orthographic
// stereographic 
// equirectangular
var proj = d3.geo.mercator()
			.scale( (w + 1) / 2 / Math.PI )
			.translate( [w / 2, h / 2] )
			
			

			
			
// create the path generator
// using the projection system
var path = d3.geo.path()
			.projection(proj)

		

// load the geoJSON US description file and display it 
d3.json('oceans.geo.json', function(map){
	
	svg.selectAll('.ocean')
		.data(map.features)
		.enter()
		.append('path')
		.attr('class', 'ocean')
		.attr('d', path)
		.style('stroke', 'none')
		.style('fill', 'skyblue')
	



	d3.json('cities.geo.json', function(map){
	
        svg.selectAll('.cities')
            .data(map.features)
            .enter()
            .append('path')
            .attr('class', 'cities')
            .attr('d', path)
            .style('stroke', 'red')
            .style('fill', 'none')

    });


});