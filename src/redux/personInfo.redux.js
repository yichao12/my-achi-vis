import axios from 'axios'

const INIT_PERSONINFO = "INIT_PERSONINFO"

const initState = []

export function personInfo(state = initState,action){
  switch(action.type){
    case INIT_PERSONINFO:
      return action.data
    default:
      return state
  }
}

export function initPersonInfo(){
  console.log("调用initPersonInfo")
  return (dispatch) => {
    console.log("res---personInfo--过了dispatch")
    axios.get('/personInfo')
      .then(res=>{
        console.log("res,personInfo",res)
        if(res.status===200&&res.data.code===0){
            dispatch(personInfoInit(res.data.data))
        }
      })
  }
}

function personInfoInit(data){
  return {type:INIT_PERSONINFO,data}
}