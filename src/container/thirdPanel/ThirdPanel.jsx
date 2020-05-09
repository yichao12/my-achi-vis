import React from 'react';
import './thirdPanel.css';
// import Stacked from '../../component/lineChart/Stacked'
import StackChart from '../../component/lineChart/StackChart'

class ThirdPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let lineChartData = [1,2]
    let style={
      height:200,
      width:200
    }
    let rooms = {

    }
    return (
      <div className="third-panel">
        <div className="panel-header">
          timeCheckBox
        </div>
        <div className="line-chart-container">
          {
            lineChartData.map((v,i)=>(<div 
                className="line-chart-single"
                key={`line-chart-${i}`}>
                <StackChart
                  style={style}
                  rooms={rooms}
                ></StackChart>
              </div>))
          }
        </div>
      </div>
    )
  }
} 
export default ThirdPanel;