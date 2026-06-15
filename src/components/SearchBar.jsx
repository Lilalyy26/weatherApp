import { Button, Form } from 'react-bootstrap';
import { Autocomplete, TextField } from "@mui/material";
import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { SetData, resetData } from '../Features/WeatherSlice';
import { useDispatch } from "react-redux";

const GEOAPIFY_KEY = process.env.REACT_APP_GEOAPIFY_KEY || "1b5200e258b043cb9a1442ff01ef6806";
const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_KEY || "7916beba2bf7d2bc4c94d3ba5f45540c";

function SearchBar() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [unity] = useState('metric');
  const [geoLocation, setGeoLocation] = useState(null); 

  const hasGeolocation = () => {
    return !!navigator.geolocation;
  };

  const getGeoLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    }, (error) => {
      console.error("Erreur de géolocalisation locale :", error);
    });
  };

  useEffect(() => {
    if (hasGeolocation()) {
      getGeoLocation();
    }
  }, []);

  useEffect(() => {
    if (!geoLocation) return; 

    const getWeatherData = async () => {
      try {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${OPENWEATHER_KEY}`
        );
        let resultat = await response.json();
        
        if (response.ok) {
          let { clouds, main, name, sys, weather, wind } = resultat;
          dispatch(SetData({ clouds, main, name, sys, weather, wind }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération météo :", error);
      }
    };

    getWeatherData();
  }, [geoLocation, unity, dispatch]); 

  const handleInputChange = async (event, value) => {
    if (!value) return;

    try {
      let response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEOAPIFY_KEY}`
      );
      let resultat = await response.json();
      if (resultat.results) {
        setCities(resultat.results.map((data) => ({
          lat: data.lat,
          lon: data.lon,
          city: data.city,
          country: data.country,
          formatted: data.formatted
        })));
      }
    } catch (error) {
      console.error("Erreur Autocomplete :", error);
    }
  };

  const handleAutocompleteSelect = (e, value) => {
    if (!value) {
      dispatch(resetData());
      return;
    }
    setGeoLocation({
      lat: value.lat,
      lon: value.lon
    });
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="d-flex align-items-center gap-2">
        <Autocomplete
          className={styles.search}
          options={cities}
          getOptionLabel={(option) => option.formatted || ""}
          isOptionEqualToValue={(option, value) => option.lat === value.lat && option.lon === value.lon}
          onChange={handleAutocompleteSelect}
          onInputChange={handleInputChange}
          clearOnBlur={false}
          renderInput={(params) => <TextField {...params} label="Enter Your city" />}
          style={{ flexGrow: 1 }}
        />
        <Button variant="primary" size="lg" onClick={getGeoLocation}>Ma position</Button>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;