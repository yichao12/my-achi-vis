import React from 'react';
import './list.css';


class ListItem extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    // console.log("props",this.props)
    let data = this.props.data
    const {id, time, positions, category} = data
    return(
      <div className="listItem-out">
        <div className="listItem-in listFirst">
          <div className="textItem">
            {id}
          </div>
        </div>
        <div className="listItem-in listSecond">
          <div className="textItem">
            {time}
          </div>
        </div>
        <div className="listItem-in listThird">
          <div className="textItem">
             {positions}
          </div>
        </div>
        <div className="listItem-in listFourth">
          <div className="textItem">
            {category}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;