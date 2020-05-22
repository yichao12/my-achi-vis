import React from 'react';
import './list.css';
import ListItem from './ListItem'
import {makeData} from './util.js'
import { connect } from 'react-redux';

class CategoryList extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    // let data = this.props.selectListData
    // 对selectList数据进行去重
    if(this.props.personInfo.length===0){
      return null
    }
    let data = this.props.personInfo.map(v=>{
      return {
        id:v.personId,
        time:Math.floor((v.endTime-v.startTime)/60),
        positions:v.roomNum,
        category:v.category,
      }
    }) 
    console.log("data***",data)
    const titleData={
      id:"Id",
      time:"TotalTime/mins",
      positions:"Positions",
      category:"Category"
    }
    
    return(
      <div className="categoryList-chart-wrapper">
        <div className="categoryList-title">
          <ListItem
            data={titleData}
          ></ListItem>
        </div>
        <div className="categoryList-container"> 
          {
            data&&data.map((v,i)=>(
              <ListItem 
                data={v}
                key={`ListItem_${i}`}
              ></ListItem>
             )
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state=>({
  personInfo:state.dayInfo.personInfo
})

export default connect(mapStateToProps)(CategoryList);