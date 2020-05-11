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