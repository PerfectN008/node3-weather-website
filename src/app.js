const path = require('path')
const express = require('express');
const hbs = require('hbs')

const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to Work
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yashwanth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yashwanth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yashwanth',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }
    forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        res.send(data)
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Help', {
        title: 404,
        message: 'Help article not found',
        name: 'Yashwanth'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Page not found!',
        name: 'Yashwanth'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})