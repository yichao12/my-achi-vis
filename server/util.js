const roomId2Name = [
  "签到处",//0
  "分会场A", //1
  "分会场B", //2 
  "分会场C",  //3
  "分会场D", //4
  "海报区", //5
  "扶梯",//6
  "厕所1",//7
  "厕所2", //8
  "厕所3", //9
  "room1", //10
  "room2", //11
  "room3", //12
  "room4", //13
  "room5", //14
  "room6", //15
  "展厅", //16
  "主会场", //17
  "服务台", //18
  "餐厅", //19
  "休闲区", //20
  "过道", //21
]
let sensor2Room = new Map()
let sensor2Position = new Map()


// 数据流入，先处理传感器数据，为其添加该传感器所在房间的编号
// 先将轨迹数据按人为第一标尺，时间为第二标尺排序
// 给轨迹数据，添加roomId
// 依据轨迹数据，统计出人物信息，和房间信息

// 房间数据是人数随时间变化的数据，时间单位是分钟，每天共：24*60min
// 计算房间信息时，需要整体按照时间进行排序

function handleSensorData(sData){
  sData.forEach((v,i)=>{
    v.roomId = position2RoomId(v.x, v.floor, v.y)
    v.roomName = roomId2Name[v.roomId]
    sensor2Room.set(v.sid,v.roomId)
    sensor2Position.set(v.sid,[v.x, v.floor, v.y])
  })
}

function handleDayData(trajData){
  trajData.sort(trajCmp)

  // 以人物为单位的轨迹数据
  let personInfo = []
  // 房间中的人数随时间变化的数据，二维数组
  // 第一维是房间编号，第二维是时间，以分钟为单位，值是人数
  let roomInfo = new Array(21)
  for(let i=0;i<=21;i++){
    roomInfo[i] = new Array(24*60).fill(0)
  }
  // roomInfo.forEach((v,i)=>{
  //   v = new Array(24*60).fill(0)
  // })

  // console.log("roomInfo",roomInfo)
  
  let person2Index = {}
  let pIndex = 0
  let lastPersonId = -1
  let lastRoomId = -1
  let lastTime = -1

  trajData.forEach((v,i)=>{
    v.time = Number(v.time)
    if(person2Index[v.id]==undefined){
      person2Index[v.id] = pIndex
      const rs = new Set()
      personInfo[pIndex] = {
        personId:v.id,
        startTime:v.time,
        endTime:v.time,
        roomSet:rs,
        dimX:Math.floor(Math.random()*100),
        dimY:Math.floor(Math.random()*100),
        category:Math.floor(Math.random()*10),
        trajs:[]
      }
      console.log(personInfo[pIndex].roomSet)
      pIndex++
    }
    let tempIndex = person2Index[v.id]
    personInfo[tempIndex].trajs.push({
      sId:v.sid,
      time:v.time,
      room:sensor2Room.get(v.sid),
      position:sensor2Position.get(v.sid)
    })
    personInfo[tempIndex].endTime = v.time

    let roomId = sensor2Room.get(v.sid)
    let trajNow = Math.floor(v.time/60)

    personInfo[tempIndex].roomSet.add(roomId)
    console.log(personInfo[tempIndex].roomSet)
    if(v.id!==lastPersonId){
      // 下一个人的轨迹
      roomInfo[roomId][trajNow]++
      lastTime = trajNow
      lastRoomId = roomId 
      lastPersonId = v.id
    }else if(roomId!==lastRoomId){
      // 同一个人，移动到另一个房间
      for(let j = lastTime+1;j<trajNow;j++){
        roomInfo[lastRoomId][j]++
      }
      roomInfo[roomId][trajNow]++
      lastTime = trajNow
      lastRoomId = roomId
    }else{
      // 同一个人，同一个room编号,即没有离开那个房间
      for(let j = lastTime+1;j<=trajNow;j++){
        roomInfo[lastRoomId][j]++
      }
      lastTime = trajNow
    }
  })
  personInfo.forEach(v=>{
    v.roomNum = v.roomSet.size
  })
  return {personInfo,roomInfo}
}

// 将轨迹数据，先按人排序，再按时间排序
function trajCmp(a,b){
  if(a.id!==b.id){
    return a.id-b.id
  }else{
    return a.time-b.time
  }
}




function makeroomInfo(){

}


function makeData1(n){
  let data = []
  let i = 0
  while(i<n){
    let trajs = []
    let j = Math.ceil(Math.random()*15)+2
    let singel
    while(j>0){
      let tempTraj = {
        time:Math.floor(Math.random()*3600*13)+3600*7,
        y:Math.ceil(Math.random()*2),
        z:Math.ceil(Math.random()*16)
      }
      if(tempTraj.y==1){
        tempTraj.x = Math.ceil(Math.random()*30)
      }else{
        tempTraj.x = Math.ceil(Math.random()*12)
      }

      tempTraj.roomId = position2RoomId(tempTraj.x,tempTraj.y,tempTraj.z)
      tempTraj.roomName = roomId2Name[tempTraj.roomId]||"不存在的房间"

      trajs.push(tempTraj)
      j--
    }
    // 将假数据的轨迹按照时间顺序进行排序
    trajs.sort((a,b)=>a.time-b.time)
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





function position2RoomId(x,y,z){
  if(y===1){
    if(x>=2&&x<=6){
      if(x>=3&&z>=13&&z<=14){
        return 0
      }else if(z>=3&&z<=4){
        return 1
      }else if(z>=5&&z<=6){
        return 2
      }
      else if(z>=7&&z<=8){
        return 3
      }
      else if(z>=9&&z<=10){
        return 4
      }else{
        return 21
      }
    }else if(x>=8&&x<=9&&z>=4&&z<=10){
      return 5
    }else if(x>=11&&x<=12){
      if(z===2||z==15){
        return 6
      }else if(z>=5&&z<=6){
        return 7
      }else if(z>=7&&z<=10){
        return 10
      }else if(z>=11&&z<=12){
        return 11
      }else{
        return 21
      }
    }else if(x>=16&&x<=19){
      if(z>=3&&z<=12){
        return 16
      }else{
        return 21
      }
    }else if(x>=20&&x<=29){
      if(z>=3&&z<=12){
        return 17
      }
      if(z>=15&&z<=16){
        if(x>=20&&x<=21){
          return 18
        }else if(x>=22&&x<=25){
          return 12
        }else if(x>=26&&x<=27){
          return 13
        }else{
          return 8
        }
      }else{
        return 21
      }
    }else{
      return 21
    }
  }else {
    if(x>=1&&x<=6&&z>=14&&z<=16){
      return 20
    }else if(x>=2&&x<=6){
      if(z>=3&&z<=10){
        return 19
      }else if(z>=11&&z<=12){
        return 14
      }else{
        return 21
      }
    }else if(x>=11&&x<=12){
      if(z==1||z==15){
        return 6
      }else if(z>=5&&z<=6){
        return 9
      }else if(z>=7&&z<=8){
        return 15
      }else{
        return 21
      }
    }else{
      return 21
    }
  }
}

module.exports = {
  makeData1,
  handleDayData,
  handleSensorData
}