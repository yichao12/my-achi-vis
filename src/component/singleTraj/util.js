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

export function makeData(pData){
  let data = []
  let i = 1
  let trajs = pData.trajs
  trajs.sort((a,b)=>a.time-b.time)
  const len = trajs.length
  let index = 0
  let lastRoomId = trajs[0].roomId
  let startTime = trajs[0].time
  let lastTime = 0
  while(i<len){
    lastTime+=trajs[i].time-trajs[i-1].time
    if(trajs[i].roomId!==lastRoomId){
      data.push({
        index:index++,
        id:lastRoomId,
        roomName:trajs[i-1].roomName,
        startTime:startTime,
        last:lastTime,
      })
      lastRoomId = trajs[i].roomId
      startTime = trajs[i].time
      lastTime = 0
    }
    i++
  }
  return data
}

