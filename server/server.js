const express = require('express')

let app = express()

app.get('/',function(req,res){
  res.send('<h1>hello Wodfd********sfrld</h1>')
})

// 监听端口是9093
app.listen(9093,function(){
  console.log('MyArchiVis app start at port 9093')
})