import { createSlice} from "@reduxjs/toolkit";

const initialState={
clouds : undefined,
main : undefined,
name : undefined,
sys :undefined,
weather :undefined, 
wind: undefined,
isLoaded: false
 }

 export const WeatherSlice=createSlice(

{
name :'weather',
initialState,
reducers:{
 SetData :(state,action)=>{
  const {clouds, main, name, sys, weather, wind  }=action.payload
state.clouds= clouds
state.main =main
state.name = name
state.sys =sys
state.weather= weather
state.wind = wind
state.isLoaded  = true

 },
 resetData:(state)=>
{

return initialState;

}


}

}



 )
 export const {SetData,resetData}=WeatherSlice.actions
 export default WeatherSlice.reducer