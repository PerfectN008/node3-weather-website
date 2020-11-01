const request = require('request');

const forecast = (city, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1c7dc8b25d88c003dd9a67a8ed4bb401&units=metric';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect!', undefined);
        } else if (body.cod === '404') {
            callback('City not found!', undefined);
        } else {
            const { weather, main: properties, name } = body
            const { main: weatherMain, description: weatherDescription } = weather[0]
            callback(undefined, {
                location: name,
                message: weatherMain + '- ' + weatherDescription + '. It is currently ' + properties.temp + ' degrees out.'
            })
        }
    })
}

module.exports = forecast