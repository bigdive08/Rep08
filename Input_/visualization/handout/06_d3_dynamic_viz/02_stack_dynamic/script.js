var w = 600;
var h = 600;
        
// select the svg container
var svg = d3.select('svg')


// structure of the data set needs in order to use it with stack layout
/*
var data = [{key:"it", values:[{x:10, y:50},{x:50, y:10}]},
            {key:"en", values:[{x:10, y:50},{x:50, y:90}]}
            ]
*/      
var data = d3.range(5).map(function(d){
    return {key:Math.random(), values:d3.range(40).map(function(c, j){
        return {x:j, y:Math.random()}
    })}
})


var mapx = d3.scale.linear()
            .domain([0,data.length])
            .range([0,w])

var mapy = d3.scale.linear()
            .domain([0,1])
            .range([0,10])

// create the stack layout function
var stack = d3.layout.stack()
            .values(function(d){
                return d.values;
            })


// transform the dataset
var newdata = stack(data);


// create the area path generator
var area = d3.svg.area()
            .x(function(d){
                return mapx(d.x);
            })
            .y0(function(d){
                return 200-mapy(d.y0);
            })
            .y1(function(d){
                return 200-mapy(d.y)-mapy(d.y0);
            })
            .interpolate('monotone')
            
// some colors
var cols = d3.scale.category20()
            
            
// draw the paths
var graph = svg.selectAll('path')
    .data(newdata)
    .enter()
    .append('path')
    .attr('d', function(d){
        return area(d.values)
    })
    .style('fill', function(d, i){
        return cols(i)
    })
                
    
    
    
function change(){
    mapy = d3.scale.linear()
                .domain([0,1])
                .range([0,100])
                
    graph.transition()
        .duration(1000)
        .delay(function(d,i){
            return 800-i*200
        })
        .attr('d', function(d){
            return area(d.values)
        })
        
}
svg.on('click', function(){
    change();
});

