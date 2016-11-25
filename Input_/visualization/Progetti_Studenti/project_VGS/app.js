var width = 850
var height = 800

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
    
    
    
//Grafico altezze per sport
    
    var Group = d3.select('svg')
                .selectAll('g')
                .data(newData)
                .enter()
                .append('g')
  
                
    
    var ScaleHeight = d3.scale.linear()
                .domain([0,2])
                .range([0,100])
    
    var GroupH = Group.append('g')
                .attr('transform',function(d,i){
                    return 'translate('+ i*50+ ', 10)'
                })
    
    GroupH.append('rect')
                .attr('width','20')
                .attr('height',function(d,i){
                    return ScaleHeight(d.values.Height)
                })
                .attr('x',25)
                .attr('y',0)
                .attr('y', function(d,i){
                    return 130-ScaleHeight(d.values.Height)
                })
                .attr('fill','#4863A0')
    
                
    GroupH.append('text')
                .text(function(d){
                    return parseFloat(d.values.Height).toFixed(2)
                })
                .attr('x',25)
                .attr('y',function(d,i){
                    return 120 -ScaleHeight(d.values.Height)
                })
                .attr('font-size',10)
                .attr('font-family','arial')
                .attr('font-style','bold')
    
    var LabGroupH = GroupH
                .append('g')
                .attr('transform','translate(25, 140) rotate(45)')
                .append('text')
                .text(function(d){
                    return d.key
                })
                .attr('font-size',10)
                .attr('font-family','arial')
                .attr('font-style','bold')
    

//Grafico pesi per sport

    var GroupW = Group.append('g')
                .attr('transform',function(d,i){
                    return 'translate('+ i*50+ ', 230)'
                })
    
    GroupW.append('rect')
                .attr('width','20')
                .attr('height',function(d,i){
                    return d.values.Weight
                })
                .attr('x',25)
                .attr('y',0)
                .attr('y', function(d,i){
                    return 130-d.values.Weight
                })
                .attr('fill','#4863A0')
                
    GroupW.append('text')
                .text(function(d){
                    return parseFloat(d.values.Weight).toFixed(1)
                })
                .attr('x',25)
                .attr('y',function(d,i){
                    return 120 -d.values.Weight
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
 
    
    
    function CountrySumMed(arr){
                    var somma = d3.sum(arr, function(d){
                        return d.total_medals ;
                    })
                    return somma
                }
    
    function CountrySumPax(arr){
                var somma = d3.sum(arr, function(d){
                        return 1 ;
                    })
                    return somma
                }
    
    
    function contasport(arr){
        var sport = d3.nest()
                .key(function(d){
                                return d.sport
                            })
                .entries(arr)
        return sport.length
    }
    
    
    //console.log(somma)
                
    var newData2 = d3.nest()
                .key(function(d){
                    return d.country
                })
                .rollup(function(d){
                    return {
                        NumMed: CountrySumMed(d),
                        NumPax: CountrySumPax(d),
                        NumSpt: contasport(d)
                    } 
                })
                .entries(data)
        
    console.log(newData2)
    
     var GroupC = Group.append('g')
                .selectAll('g')
                .data(newData2)
                .enter()
                .append('g')
                .attr('transform',function(d,i){
                    return 'translate('+ i*50+ ', 550)'
                })
     
     var axg = d3.select('svg')
                .append('g')
                .attr('class','axis') /*l'elemento appartiene alla classe axis definita nell'head*/
                .attr('transform','translate(0,550)')
        
    var ayg = d3.select('svg')
                .append('g')
                .attr('class','axis')
                .attr('transform','translate(10,0)')
     
     var colors = d3.scale.category20()
     
     GroupC.append('circle')
            .attr('r', function(d,i){
                return d.values.NumMed
            })
            .attr('cx',function(d,i){
                return d.values.NumPax
            })
            .attr('cy', function(d,i){
                return d.values.NumSpt})
            .attr('fill',function(d,i){
                return colors(i)
            })
     
     var LabGroupC = GroupC
                .append('g')
                //.attr('transform','translate(25, 120) rotate(45)')
                .append('text')
                .text(function(d){
                    return d.key
                })
                .attr('x',function(d,i){
                return d.values.NumPax
                })
                .attr('y',function(d,i){
                return d.values.NumSpt+d.values.NumMed })
                .attr('font-size',10)
                .attr('font-family','arial')
                
     
    
    
    
}) // chiusura del CVS