import axios from 'axios'

const CHANGE_DAYINFO = "CHANGE_DAYINFO"

const initState = {
  personInfo:[],
  roomInfo:[]
}

export function dayInfo(state = initState,action){
  switch(action.type){
    case CHANGE_DAYINFO:
      return action.data
    default:
      return state
  }
}

export function initDayInfo(){
  return dispatch=>{ 
    axios.get('/initDayInfo')
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          console.log("res.data.data",res.data.data)
            dispatch(changeDayInfo(res.data.data))
        }
      })
  }
}

export function queryDayInfo(dayIndex){
  return dispatch=>{ 
    axios.get('/dayInfo?day='+dayIndex)
      .then(res=>{
        if(res.status===200&&res.data.code===0){
            dispatch(changeDayInfo(res.data.data))
        }
      })
  }
}

function changeDayInfo(data){
  return {type:CHANGE_DAYINFO,data}
}