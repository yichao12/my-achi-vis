function makeData1(n){
  let data = []
  let i = 0
  while(i<n){
    let trajs = []
    let j = Math.ceil(Math.random()*50)
    while(j>0){
      let tempTraj = {
        time:Math.floor(Math.random()*5000),
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
  makeData1
}