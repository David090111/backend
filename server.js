const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// app.get("/weather", (req, res) => {
//   const city = req.query.city;
//   // TODO - Make a request to the openweathermap.org API
//   // TODO - Return the weather data
//   res.json({ msg: `Hello World. ${city} weather data will be returned.` });
// });

const axios = require("axios");
app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b7e6e6bafd8d40de4cfc9188a90420a`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      console.log(weatherData);
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});
