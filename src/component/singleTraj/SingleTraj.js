import React from 'react'
import { singleTrajScale, makeData} from './util'
import './singleTraj.css'
import {connect} from 'react-redux'

const WIDTH = 860
const HEIGHT = 115
const margin = {left:10,right:50,top:10,bottom:10}

class SingleTraj extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    if(this.props.personInfo.length==0){
      return null
    }
    let data = makeData(this.props.personInfo[0])

    const width = WIDTH - margin.left - margin.right
    const height = HEIGHT - margin.top - margin.bottom
    const{xScale,yScale,transWidth} = singleTrajScale(data,width,height)
    return(
      data&&<svg  
        width="100%"
        height="100%" 
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMinYMin"
        className = "singleTraj-svg"
      >
        <g
          transform={`translate(${margin.left},${HEIGHT/2})`}
        >
          <defs>
            <marker 
              id="arrow_r"
              markerUnits="strokeWidth"
              markerWidth="20"
              markerHeight="20"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto">
                <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="gray"/>
            </marker>
          </defs>
          <g>
            
            <text
              transform={`translate(0,-5)`}
              y={-5}
              x={5}
              fontSize="12px"
            >
              Start
            </text>
            <line
              x1={0}
              x2={width+margin.right*2/3}
              y1={0}
              y2={0}
              strokeWidth="1px"
              stroke="gray"
              // strokeDasharray = "4 6"
              markerEnd={`url(#arrow_r)`}
            >
            </line>
            <text
              transform={`translate(${width},-5)`}
              y={-5}
              x={5}
              fontSize="12px"
            >
              End
            </text>
            <circle
              r={4}
              fill="white"
              stroke="gray"
              strokeWidth ="1px"
            >
            </circle>

          </g>
          <g
          >
          {
            data.map((v,i)=>
              <g
                transform={`translate(${xScale(i)},0)`}
                index = {`${i}_${v.id}`}
                key={`singleTraj_${v.roomName}_${v.startTime}_${v.last}`}
              >
                <text
                  y={yScale(v.last)/2>12?12:-3}
                  textAnchor="middle"
                  transform={`scale(0.85)`}
                  fontSize="12px"
                  transform={`translate(${transWidth*3/2},${-1*yScale(v.last)/2})`}
                >
                  {v.last}
                </text>
                <rect
                  transform={`translate(${transWidth},${-1*yScale(v.last)/2})`}
                  key= {`single_rect_${i}`}
                  width={transWidth}
                  height = {yScale(v.last)}
                  fill="red"
                  opacity={0.5}
                  stroke={"black"}
                  discription={`id:${v.id},time:${v.time}`}
                  className="dimension-circle"
                >
                </rect>
                <text
                  textAnchor="middle"
                  y={12}
                  transform={`translate(${transWidth/2},0) scale(0.85)`}
                  fontSize="12px"
                >
                  {v.startTime}
                </text>
                <text
                  textAnchor="middle"
                  y={12}
                  y={yScale(v.last)/2>12?12:(12+yScale(v.last)/2)}
                  transform={`translate(${transWidth*3/2},0) scale(0.85)`}
                  fontSize="12px"
                >
                  {v.roomName}
                </text>
              </g>)
          }
          </g>
        </g>
      </svg>
    )
  }
}

const mapStateToProps = state=>({
  personInfo:state.personInfo
})

export default connect(mapStateToProps)(SingleTraj)

