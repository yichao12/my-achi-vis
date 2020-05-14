import * as d3 from 'd3';

export function dimensionScale(data,width,height){

  let maxX = d3.max(data,function(layer){return layer.x})
  let minX = d3.min(data,function(layer){return layer.x})

  let maxY = d3.max(data,function(layer){return layer.y})
  let minY = d3.min(data,function(layer){return layer.y})

  let maxT = d3.max(data,function(layer){return layer.time})
  let minT = d3.min(data,function(layer){return layer.time})

  let xScale = d3.scaleLinear()
    .domain([minX,maxX])
    .range([0,width])

  let yScale = d3.scaleLinear()
      .domain([minY,maxY])
      .range([0,height])

  let tScale = d3.scaleLinear()
  .domain([minT,maxT])
  .range([5,10])

  let cScale = d3.schemeCategory10
  console.log(cScale)

  return {xScale,yScale,tScale,cScale}
  
}

export function extractData(originData){
  return originData.map(v=>{
    return {
      id:v.personId,
      x:v.dimX,
      y:v.dimY,
      time:v.totalTime,
      category:v.category
    }
  })
}