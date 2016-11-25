var width = 850
var height = 500

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)

var loadcsv = d3.dsv(';')

var myG = d3.select('svg').append('g')

loadcsv('dataset/athletes_sochi.csv', function(data){
  
    //console.log(data)
    var data = data
  
    
            var rectFiltroLarghezza= 150
            var xBarraComandi = 50 
            var yBarrraComandi = 400
            var txtPrimoFiltro="by sport"
            var txtSecondoFiltro="by gender"
            var txtTerzoFiltro="..."
            var txtQuartoFiltro="..."
            // primo filtro
            
            
            var groupPrimoFiltro = d3.select('svg').append('g')
                    .attr('transform','translate ('+rectFiltroLarghezza+', 0)')
            var rectPrimoFiltro = groupPrimoFiltro
                .append('rect')
                .attr('fill','red')
                .attr('width', rectFiltroLarghezza )
                .attr('height', 50)
                .attr('x', rectFiltroLarghezza/2*-1)
                .attr('y', yBarrraComandi)
            
            var textPrimoFiltro = groupPrimoFiltro
                .append('text')
                .text(txtPrimoFiltro)
                .attr('text-anchor', 'middle')
                .style('color', 'white')
                .attr('height', '20')
                //.attr('x', xBarraComandi+ 5)
                .attr('y', yBarrraComandi+25)

            // secondo filtro
            var groupSecondoFiltro = d3.select('svg').append('g')
                .attr('transform','translate ('+rectFiltroLarghezza*2 +', 0)')
            var rectSecondoFiltro = groupSecondoFiltro
                .append('rect')
                .attr('fill','green')
                .attr('width', rectFiltroLarghezza )
                .attr('height', 50)
                .attr('x', rectFiltroLarghezza/2*-1)
                .attr('y', yBarrraComandi)
            
            var textSecondoFiltro = groupSecondoFiltro
                .append('text')
                .text(txtSecondoFiltro)
                .attr('text-anchor', 'middle')
                .style('color', 'white')
                .attr('height', '20')
                //.attr('x', xBarraComandi+ 5)
                .attr('y', yBarrraComandi+25)

                  // terzo filtro
            var groupTerzoFiltro = d3.select('svg').append('g')
                .attr('transform','translate ('+rectFiltroLarghezza*3 +', 0)')
            var rectTerzoFiltro = groupTerzoFiltro
                .append('rect')
                .attr('fill','yellow')
                .attr('width', rectFiltroLarghezza )
                .attr('height', 50)
                .attr('x', rectFiltroLarghezza/2*-1)
                .attr('y', yBarrraComandi)
            
            var textTerzoFiltro = groupTerzoFiltro
                .append('text')
                .text(txtTerzoFiltro)
                .attr('text-anchor', 'middle')
                .style('color', 'white')
                .attr('height', '20')
                //.attr('x', xBarraComandi+ 5)
                .attr('y', yBarrraComandi+25)

               // Quarto filtro
            var groupQuartoFiltro = d3.select('svg').append('g')
                .attr('transform','translate ('+rectFiltroLarghezza*4 +', 0)')
            var rectQuartoFiltro = groupQuartoFiltro
                .append('rect')
                .attr('fill','orange')
                .attr('width', rectFiltroLarghezza )
                .attr('height', 50)
                .attr('x', rectFiltroLarghezza/2*-1)
                .attr('y', yBarrraComandi)
            
            var textQuartoFiltro = groupQuartoFiltro
                .append('text')
                .text(txtQuartoFiltro)
                .attr('text-anchor', 'middle')
                .style('color', 'white')
                .attr('height', '20')
                //.attr('x', xBarraComandi+ 5)
                .attr('y', yBarrraComandi+25)

//******************************************************    
//            
//            var mapx = d3.scale.linear()
//                .domain([0,20])
//                .range([0,500])
//            var mapy = d3.scale.linear()
//                .domain([0,1])
//                .range([0,50])
            
    function draw(key) {

        
            var byContinent = d3.nest().key(function(d,i){
                return d.Continent;
            })
            .key(function(d){
                return d[key]
            })
            .entries(data)

            
        console.log(byContinent)
        
            var genArc = d3.svg.arc()
                .innerRadius(function(d,i){
                    return 40;  
                })
                .outerRadius(function(d,i){
                    return 80;  
                })
//                .startAngle(function(d,i){
//                    return 0;  
//                })
//                .endAngle(function(d,i){
//                    return Math.PI;  
//                })
            
            //console.log(data)
            var myPie = d3.layout.pie()
                .value(function(d,i){
                    return d.values.length;  
                })
            
            var colors = d3.scale.category20()
            

            var myCont = myG
                .selectAll('g')
                //.data(d0)
                .data(byContinent)
            
            myCont.enter()
                .append('g')
                .attr('transform', function(d,i) {
                    var pari = (i%2 == 1 ? true : false);
                    if (pari == true) {                                     return 'translate('+(100+(i*80))+',300)' 
                    }
                    else {
                        return 'translate('+(100+(i*80))+',200)' 
                    }
                })
                
            var paths = myCont.selectAll('path')
                .data(function(d, i){
                    return myPie(d.values)
                })
                
            paths.enter()
                .append('path') // qui crea una lista di path
            
            paths.exit().remove()
                
            paths.transition().attr('d', function(d,i) {
                        return genArc(d)
                })
                .attr('fill', function(d,i) {
                    console.log('color: ' + colors(i))
                    return colors(i)
                })

            myCont
// se scommento sotto creo una lista di text sovrapposti --> wrong
//                .selectAll('text')
//                .data(function(d, i){
//                    return myPie(d.values)
//                })
//                .enter()            
                .append('text')
                .attr('text-anchor', 'middle')
                .text(function(d,i) {
                    return d.key
                })
                        
           }
       
//            function draw(d1) {
//                myPaths.transition()
//                    .attr('d', function(d,i) {
//                        return genArc(d)
//                    })
//                    //.attr('fill', 'none')
//                    //.attr('stroke', 'red')
////                    .attr('fill', function(d,i) {
////                        console.log('color: ' + colors(i))
////                        return colors(i)
////                    })
//            }
            

    
    
    
            
//        d3.select('svg')
//        .on('click', function(){
//            var x = parseInt(Math.random()*20) + 3
//            var data = d3.range(x).map(function(){
//                return Math.random()
//                })
            
            //var maxVal = d3.max(data, function(d,i){
            //    return d;
            //})                

            
            //draw(d1)
      //  })


        
            rectPrimoFiltro.on('click',function(){
                          draw('sport');
                        //textTitoloGrafico = "Continents " + txtPrimoFiltro;   
                          })
            rectSecondoFiltro.on('click',function(){
                          //cerchio.attr('fill','green')
                draw('gender')
                          })
            rectTerzoFiltro.on('click',function(){
                          //cerchio.attr('fill','yellow')
                          })
            rectQuartoFiltro.on('click',function(){
                          //cerchio.attr('fill','orange')
                          })
        
//******************************************************    
    
    
    
}) // chiusura del CVS