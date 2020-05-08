import * as d3 from 'd3';

export function singleTrajScale(data,width,height){

  let len = data.length 

  let maxY = d3.max(data,function(layer){return layer.last})
  let minY = d3.min(data,function(layer){return layer.last})

  let xScale = d3.scaleLinear()
    .domain([0,len])
    .range([0,width])

  let yScale = d3.scaleLinear()
    .domain([minY,maxY])
    .range([5,height])

  const transWidth = len>1? width/(len*2):len/2


  return {xScale,yScale,transWidth}
}

export function makeData(n){
  let data = []
  let i = 0
  while(i<n){
    data.push({
      index:i,
      id:Math.floor(Math.random()*20),
      roomName:`room_${Math.floor(Math.random()*20)}`,
      startTime:Math.floor(Math.random()*100),
      last:Math.floor(Math.random()*150),
    })
    i++
  }
  return data
}