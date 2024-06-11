import express from 'express';
import Weather from '../models/search.model.js';

const router = express.Router();


router.get('/weather', async (req, res) => {
    try {
        const weatherData = await Weather.find().sort({ date: -1 });
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/weather', (req, res) => {
    const {city, country} = req.body;
    let date = Date.now();
    const newWeather = new Weather({city, country, date})

    newWeather.save().then((data) => res.json(data)).catch((err) => res.status(400).json({message: err.message}))

})

export default router