import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

const fetchWeather = async (searchtext) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchtext}&units=imperial&limit=1&appid=${process.env.WEATHER_API_KEY}`;
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get('/', (req, res) => {
  res.json({ success: 'Whatsapp Weather!' });
});

router.get('/:searchtext', async (req, res) => {
  const searchtext = req.params.searchtext;
  const data = await fetchWeather(searchtext);
  res.json(data);
});

router.post('/', async (req, res) => {
  const searchtext = req.body.searchtext;
  const data = await fetchWeather(searchtext);
  res.json(data);
});

export default router;
