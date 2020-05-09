

export function makeData(n){
  let data = []
  let i = 0
  while(i<n){
    data.push({
      id:Math.floor(Math.random()*5000),
      time:Math.floor(Math.random()*5000),
      positions:Math.floor(Math.random()*30),
      category:Math.floor(Math.random()*4),
    })
    i++
  }
  data.sort((a,b)=>b.time-a.time)
  return data
}