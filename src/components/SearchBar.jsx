import { Button, Form } from 'react-bootstrap';
import { Autocomplete, TextField } from "@mui/material";
import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { SetData, resetData } from '../Features/WeatherSlice';
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [unity] = useState('metric');
  // Initialisé à null pour éviter les crashs au démarrage
  const [geoLocation, setGeoLocation] = useState(null); 

  const hasGeolocation = () => {
    return !!navigator.geolocation;
  };

  // Ne fait QUE récupérer les coordonnées GPS
  const getGeoLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        lat: position.coords.latitude,  // Corrigé : 'lat' au lieu de 'lan'
        lon: position.coords.longitude
      });
    }, (error) => {
      console.error("Erreur de géolocalisation locale :", error);
    });
  };

  // 1. Au montage du composant : on demande la position de l'appareil
  useEffect(() => {
    if (hasGeolocation()) {
      getGeoLocation();
    }
  }, []);

  // 2. Dès que 'geoLocation' change (et qu'il n'est pas nul), on appelle l'API Météo
  useEffect(() => {
    if (!geoLocation) return; // Sécurité : évite le crash au premier rendu inutile

    const getWeatherData = async () => {
      try {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=7916beba2bf7d2bc4c94d3ba5f45540c`
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
  }, [geoLocation, unity, dispatch]); // Dépendances requises

  // Recherche textuelle pour l'autocomplétion
  const handleInputChange = async (event, value) => {
    if (!value) return;

    try {
      let response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=73a931bce1484b9d803ea6367efc35ee`);
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

  // Quand on sélectionne une ville dans la liste
  const handleAutocompleteSelect = (e, value) => {
    if (!value) {
      dispatch(resetData());
      return;
    }
    // Mettre à jour geoLocation va automatiquement déclencher le 2ème useEffect météo !
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
        <Button variant="primary" size="lg" onClick={getGeoLocation}>Search</Button>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;