var width = 850
var height = 500

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)

d3.csv('dataset/athletes_sochi.csv', function(data){
  
    console.log(data)
    
    //il tuo codice qui
    
    function HeightAvg(arr){
                    var average = d3.mean(arr, function(d){
                        return d.height ;
                    })
                    return average
                }
    
    function WeightAvg(arr){
                    var average = d3.mean(arr, function(d){
                        return d.weight ;
                    })
                    return average
                }
    
    var newData = d3.nest()
                .key(function(d){
                    return d.sport
                })
                .rollup(function(d){
                    return {
                        Height: HeightAvg(d),
                        Weight: WeightAvg(d)
                    } /* distrugge la composizione dell'oggeto iniziale per crearne un'altra*/
                })
                .entries(data)
                
    console.log(newData)
    

//Grafico pesi per sport

    var GroupW = d3.select('svg')
                .selectAll('g')
                .data(newData)
                .enter()
                .append('g')
                .attr('transform',function(d,i){
                    return 'translate('+ i*50+ ', 250)'
                })
    
 /*   var ScaleWeight = d3.scale.linear()
                .domain([0,100])
                .range([0,100])*/
    
    GroupW.append('rect')
                .attr('width','20')
                .attr('height',function(d,i){
                    return d.values.Weight
                })
                .attr('x',25)
                .attr('y',0)
                .attr('y', function(d,i){
                    return d.values.Weight
                })
                .attr('fill','#4863A0')
                
    GroupW.append('text')
                .text(function(d){
                    return d.values.Weight
                })
                .attr('x',25)
                .attr('y',function(d,i){
                    return d.values.Weight
                })
                .attr('font-size',10)
                .attr('font-family','arial')
                .attr('font-style','bold')
    
  var LabGroupW = GroupW
                .append('g')
                .attr('transform','translate(25, 140) rotate(45)')
                .append('text')
                .text(function(d){
                    return d.key
                })
                .attr('font-size',10)
                .attr('font-family','arial')
                .attr('font-style','bold')
                

    
    
}) // chiusura del CVS