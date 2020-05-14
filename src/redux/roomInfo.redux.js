import axios from 'axios'

const INIT_ROOMINFO = "INIT_ROOMINFO"

const initState = []

export function roomInfo(state = initState,action){
  switch(action.type){
    case INIT_ROOMINFO:
      return action.data
    default:
      return state
  }
}

export function initRoomInfo(){
  return dispatch=>{
    axios.get('/roomInfo')
      .then(res=>{
        if(res.status===200&&res.data.code===0){
            dispatch(roomInfoInit(res.data.data))
        }
      })
  }
}

function roomInfoInit(data){
  return {type:INIT_ROOMINFO,data}
}