const util = require('./util')
const makeData1  = util.makeData1

const express = require('express')

let app = express()
let Router = express.Router()




app.get('/',function(req,res){
  res.send('<h1>hello Wodfd********sfrld</h1>')
})

app.get('/roomInfo',function(req,res){
  return res.send({
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
  res.send({data:makeData1(30),code:0})
})

// 监听端口是9093
app.listen(9093,function(){
  console.log('MyArchiVis app start at port 9093')
})