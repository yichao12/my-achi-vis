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

  return {xScale,yScale,tScale}
  
}

export function makeData(n){
  let data = []
  let i = 0
  while(i<n){
    data.push({
      id:Math.floor(Math.random()*5000),
      x:Math.floor(Math.random()*100),
      y:Math.floor(Math.random()*100),
      time:Math.floor(Math.random()*10),
    })
    i++
  }
  return data
}