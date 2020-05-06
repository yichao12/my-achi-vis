import React from 'react';
import './firstPanel.css';



class FirstPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="first-panel">
        <div className="first-up">
            firstUp
        </div>
        <div className="first-down">
            firstDown
        </div>
      </div>
    )
  }
} 
export default FirstPanel;