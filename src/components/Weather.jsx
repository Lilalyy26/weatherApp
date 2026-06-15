import { Card, CardBody } from "react-bootstrap";
import styles from './Weather.module.css'
import PositionSvg from   './Svg/PositionSvg'
import Time from './Svg/Time'
import DefaultWeather from  './Svg/DefaultWeather'
import Thermometer from  './Svg/Thermometer'
import Wind from './Svg/Wind'
import {useDispatch, useSelector} from "react-redux"
import Moment from 'react-moment';
import Humidity from  './Svg/Humidity'
import SpeedoMeter from  './Svg/SpeedoMeter'
import { useState } from "react";


function Weather(){
  const weather=useSelector(({weather})=>weather);
    return(
    
<Card className={styles.card}>

{weather.isLoaded ?

<Card.Body className={styles.contenu}>
<Card.Title >
  {weather.name} , 
  {weather.sys.country} 
  <PositionSvg></PositionSvg>
  <div className={styles.date}>
    <Moment  format={'llll'}>
  
  </Moment>
    
    
     <Time></Time></div>

  </Card.Title>
 <Card.Text as={'div'} className={styles.Cardtext} >
<div className={styles.imageIcon}>
  <img 
    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
    style={{ width: '200px', height: '200px'}} // 👈 Test en ligne direct
    alt="Météo" 
  />
</div>


<div className={styles.temperature}>{weather.main.feels_like} °C</div>
<div className={styles.info}>
<div className={styles.prop}>
    <div ><DefaultWeather width={50 } height={50}  animations={'none'}/></div>
<div>Sunrise </div>
<div><Moment unix={true} format={'hh:mm'}>
    {weather.sys.sunrise}
  
  </Moment></div>


</div>

  <div className={styles.prop}>
    <div><Wind /></div>
    <div> Wind </div>
    <div>{weather.wind.speed }  m/s</div>
  </div>


  <div className={styles.prop}>
    <div><Humidity /></div>
    <div> Humidity </div>
    <div>{weather.wind.speed }  m/s</div>
  </div>


  <div className={styles.prop}>
    <div><SpeedoMeter /></div>
    <div> Wind </div>
    <div>{weather.wind.speed }  m/s</div>
  </div>


  <div className={styles.prop}>
    <div><Thermometer /></div>
    <div>temperature</div>
<div>{weather.main.temp_max} </div>
  </div>

</div>
    </Card.Text>


</Card.Body>
 : 




 <Card.Body>
<Card.Title>
Please choose your city
</Card.Title>
 </Card.Body>
 }
   </Card>


);

}
export default Weather;