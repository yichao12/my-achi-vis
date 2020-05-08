import React from 'react';
import './firstPanel.css';
import Donut from '../../component/categoryDonut/CategoryDonut'
import DimensionReduce from '../../component/dimension/DimensionReduce'


class FirstPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="first-panel">
        <div className="first-up single-panel">
          <div className="panel-header">
            firstUp
          </div>
          <div className="panel-container">
            <DimensionReduce/> 
          </div>
        </div>
        <div className="first-down single-panel">
            <div className="panel-header">
              firstDown
            </div>
            <div className="panel-container">
              <Donut></Donut>
            </div>
        </div>
      </div>
    )
  }
} 
export default FirstPanel;