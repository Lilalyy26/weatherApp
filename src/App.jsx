
import './App.css'
import SearchBar from './components/SearchBar'
import Weather from './components/Weather'
import {Provider} from "react-redux";
import {store} from "./Store/store";
function App() {

  return (
    <>
   
    <div className="app-container">
      <div className='Container'> 
        <Provider store={store}>
<SearchBar></SearchBar>
<Weather></Weather>
</Provider>
</div>

</div>
</>
  )
}

export default App
