
var widthGraph = 600;
var heightGraph = 250;

var svg = d3.select('svg')

var layer = svg.append('g')
	.attr('transform', 'translate(10,10)')

layer.append('rect')
	.attr('width', widthGraph)
	.attr('height', heightGraph)
	.attr('fill', '#eee')

// create a dataset, an array of arrays
function createDataset()
{
	var dd = d3.range(3).map(function(){
		return d3.range(10).map(function(){
			return Math.random();
		})
	})
	return dd;
}
data = createDataset();
console.log(data);


// create the map functions
var area_mapx = d3.scale.linear()
			.domain([0, 9]) // why it needs 9 instead 10 ??
			.range([0, widthGraph])
			
var area_mapy = d3.scale.linear()
			.domain([0, 1])
			.range([0, heightGraph])
    
var area = d3.svg.area()
    .x(function(d,i) { return area_mapx(i); })
    .y1(function(d) { return area_mapy(d); })
    .y0(heightGraph)
    .interpolate('basis')
    
    
// d3 helpful object to create a color category range
var col_scale = d3.scale.category10();

var areas = layer.selectAll('path')
		.data(data)
		.enter()
			.append('path')
			.attr("d", function(d){
				return area(d);
			})
			.style('fill', function(d,i){
				return col_scale(i)
			})
			.style('opacity', .9)


layer.on('click', function(){

	var newdata = createDataset();
	
	d3.select(this).selectAll("path")
	    .data(newdata)
	.transition()
	    .duration(1000)
	    .ease('elastic')
	    .attr("d", function(d){
	    	return area(d);
	    })
	
});