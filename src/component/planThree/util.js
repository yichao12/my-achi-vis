export function nextPosition(pos,speed){
  let newPos = [...pos]
  
  let addOrMinus = Math.random
  if(addOrMinus>=0.5){
      speed=-1*speed
  }

  if(pos[0]>230){
      newPos[0] = 8
  }

  if(pos[2]<-120){
      newPos[2] = -8
  }

  let temp = Math.random()

  if(temp>=0.5){
      newPos[0]+=speed
  }else{
      newPos[2]-=speed
  }
//   console.log("nextPosition",[...pos],[...newPos])

  return newPos

}

export function makeData(n,m){
    let heatMapData = [], motionData = []
    let i = 0
    // 热力图数据
    while(i<n){ 
      heatMapData.push({
        id:Math.floor(Math.random()*5000),
        x:Math.floor(Math.random()*30),
        z:Math.floor(Math.random()*16),
        value:Math.floor(Math.random()*100)
      })
      i++
    }

    i = 0
    // 运动数据
    while(i<m){
      motionData.push({
        id:Math.floor(Math.random()*5000),
        x:Math.floor(Math.random()*30),
        z:Math.floor(Math.random()*16),
        tx:Math.floor(Math.random()*30),
        tz:Math.floor(Math.random()*16),
      })
      i++
    }
    
    return {heatMapData,motionData}
  }