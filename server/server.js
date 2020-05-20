const util = require('./util')
const {makeData1,handleDayData,handleSensorData} = util

const express = require('express')
const path = require('path')
const fs = require('fs')
const readline = require('readline')

let app = express()
let Router = express.Router()

const DATA_DIR = path.join(__dirname,'../data')
const SENSOR_POSITION = path.join(DATA_DIR,'sensorPosition.csv')
const LOGFILE = path.join(DATA_DIR,'/sensorLog')

const DAY_PATH = []
for(let i=1;i<=3;i++){
  let tempPath = path.join(LOGFILE,`/day${i}.csv`)
  DAY_PATH.push(tempPath)
}

async function readCSV(path,firstRow = true){
  const rl = readline.createInterface({
    input:fs.createReadStream(path),
    crlfDelay:Infinity
  })
  const data = []
  let lineIndex = 0
  let colNames = null
  for await(const line of rl){
    ++lineIndex
    const values = line.split(',')
    if(lineIndex===1&&firstRow){
      colNames = values
      continue
    }
    if(colNames){
      data.push(colNames.reduce((obj,v,vIndex)=>{
        obj[v] = values[vIndex]
        return obj
      },{}))
    }else{
      data.push(line)
    }
  }
  return data
}

app.get('/initDayInfo',async function(req,res){
  // 获取参数
  console.log("begin--time",Date.now())
  const  sData = await readCSV(SENSOR_POSITION,true)
  // console.log("sData",sData)
  handleSensorData(sData)
  const trajsData = await readCSV(DAY_PATH[1],true)
  // console.log("trajsData",trajsData)
  res.send({
    data:handleDayData(trajsData),
    code:0
  })
  console.log("end--time",Date.now())
})

app.get('/dayInfo',function(req,res){
  // 获取参数
  const {day} = req.query
  const trajsData = readCSV(DAY_PATH[Number(day)],true)
  res.send({
    data:handleDayData(trajsData),
    code:0
  })
})


app.get('/',function(req,res){
  res.send('<h1>hello Wodfd********sfrld</h1>')
})

app.get('/roomInfo',function(req,res){
  res.send({
    roomId:Math.floor(Math.random()*20),
    time2Num:[
      {
        time:Math.floor(Math.random()*5000),
        number:Math.floor(Math.random()*5000),
      },
      {
        time:Math.floor(Math.random()*5000),
        number:Math.floor(Math.random()*5000),
      },
      {
        time:Math.floor(Math.random()*5000),
        number:Math.floor(Math.random()*5000),
      },
    ]
  })
})

app.get('/personInfo',function(req,res){
  res.send({data:makeData1(50),code:0})
})

// 监听端口是9093
app.listen(9093,function(){
  console.log('MyArchiVis app start at port 9093')
})