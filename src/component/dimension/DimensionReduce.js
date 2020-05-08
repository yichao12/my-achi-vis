import React from 'react'
import { dimensionScale, makeData} from './util'
import './dimensionReduce.css'

const WIDTH = 340
const HEIGHT = 300
const margin = {left:40,right:20,top:40,bottom:40}

class DimensionReduce extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    let data = makeData(150)
    const width = WIDTH - margin.left - margin.right
    const height = HEIGHT - margin.top - margin.bottom
    const{xScale,yScale,tScale} = dimensionScale(data,width,height)
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
                fill={"red"}
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

export default DimensionReduce

