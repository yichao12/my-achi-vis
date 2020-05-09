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
    let data = makeData(500)
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


export default CategoryList;