import React from 'react'
import { dimensionScale, extractData} from './util'
import './dimensionReduce.css'

import {connect} from 'react-redux'
import {initPersonInfo } from '../../redux/personInfo.redux'
import {initDayInfo,queryDayInfo} from '../../redux/dayInfo.redux'

const WIDTH = 340
const HEIGHT = 300
const margin = {left:40,right:20,top:40,bottom:40}

class DimensionReduce extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.initDayInfo()
    
  }
  render() {
    console.log("this.props.personInfo",this.props.personInfo)
    let data = extractData(this.props.personInfo)
    console.log("d--data",data)
    // let data = this.props.personInfo
    const width = WIDTH - margin.left - margin.right
    const height = HEIGHT - margin.top - margin.bottom
    const{xScale,yScale,tScale,cScale} = dimensionScale(data,width,height)
    return(
      <svg  
        width="100%"
        height="100%" 
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMinYMin"
        className = "dimension-reduce-svg"
      >
        <g
          transform={`translate(${margin.left},${margin.top})`}
        >
          {
            data.map((v,i)=>
              <circle
                key= {`dimension_circle_${i}`}
                cx={xScale(v.x)}
                cy={yScale(v.y)}
                r={tScale(v.time)}
                fill={cScale[v.category]}
                opacity={0.5}
                stroke={"black"}
                discription={`id:${v.id},time:${v.time}`}
                className="dimension-circle"
              >
              </circle>
            )
          }
        </g>
        
      </svg>
    )
  }
}

const mapStateToProps = state=>{
  console.log("state.dayInfo",state.dayInfo)
  return {
    personInfo:state.dayInfo.personInfo
  }
}
  

const mapDispatchToProps = {
  initDayInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(DimensionReduce)

