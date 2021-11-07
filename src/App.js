import React, {useState} from "react";
import axios from 'axios';
import SearchField from "./components/SearchField/SearchField";
import Result from "./components/Result/Result";
import Forecast from "./components/Forecast/Forecast";
import Grid from '@mui/material/Grid';
import cold from './cold.jpg';
import hot from './hot1.jpg';

const api = {
  key: "99ebb03d09cbaf5a293ffc143ecb7fce",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const onSearch = Query => {
    const query= Query.query;
    axios.get(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
      .then(res => {
        // handle success
        setWeather(res.data);
        setError(false);
      })
      .catch(err => {
        // handle Error
        setError(true);
        console.log(err);
      })
  }

  return (
    <div style={{backgroundImage: (typeof weather.list != "undefined")?(weather.list[0].main.temp>20)?`url(${hot})`:`url(${cold})`:`linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) ), url(${cold})`, minHeight:'100vh',backgroundSize: 'cover'}}>
      <Grid container justifyContent="center" spacing={0} >
        <Grid container justifyContent="center" spacing={0}>
          <Grid item xs={11} sm={8} md={4}>
            <SearchField error={error} setError={setError} onSearch={onSearch} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={0}>
          <Grid item>
            <Result weather={weather}/>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2} mb={3}>
          <Forecast weather={weather}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
