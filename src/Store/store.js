import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../Features/WeatherSlice";

export const store = configureStore({
  reducer: {
    weather: WeatherSlice
  }
});