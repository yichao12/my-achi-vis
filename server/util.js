function makeData1(n){
  let data = []
  let i = 0
  while(i<n){
    let trajs = []
    let j = Math.floor(Math.random()*50)
    while(j>0){
      trajs.push({
        time:Math.floor(Math.random()*5000),
        x:Math.floor(Math.random()*30),
        y:Math.floor(Math.random()*2),
        z:Math.floor(Math.random()*16),
        roomId:Math.floor(Math.random()*16),
      })
      j--
    }
    data.push({
      personId:Math.floor(Math.random()*5000),
      totalTime:Math.floor(Math.random()*5000),
      roomNum:Math.floor(Math.random()*30),
      category:Math.floor(Math.random()*10),
      dimX:Math.floor(Math.random()*100),
      dimY:Math.floor(Math.random()*100),
      trajs,
    })
    i++
  }
  return data
}

module.exports = {
  makeData1
}