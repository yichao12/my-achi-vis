import React from 'react';
import './secondPanel.css';



class SecondPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="second-panel">
        <div className="second-up">
            secondUp
        </div>
        <div className="second-down">
            secondDown
        </div>
      </div>
    )
  }
} 
export default SecondPanel;