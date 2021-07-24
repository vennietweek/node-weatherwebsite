// Define required modules 
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up server to send a response when someone tries to get something at a specific route. Use get method

// Handlebars compiles templates into JavaScript functions. This makes the template execution faster than most other template engines.

// The app object refers to the Express application.

// Setup handlebars engine and view location. 
// app.set(): Using hbs as the default view engine requires just one line of code in your app setup. This will render .hbs files when res.render is called.

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.use(): Configure express to serve the directory. Setup static directory to serve

app.use(express.static(publicDirectoryPath))

// app.get(): Routes HTTP GET requests to the specified path with the specified callback functions.
// res.render(): Reviews a view and sends the rendered HTML string to the client

app.get('',(req,res) => {
    res.render('index', {
        title: 'Get Weather',
        name: 'Venessa'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Venessa'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'Please call 911'
    })
})

// Get location from user, convert to latlong, and retrieve forecast

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
})

// * wildcard url: match anything that hasn't been matched so far

app.get('*', (req,res) => {
    res.render('404',{
        errorMessage:'Page not found'
    })
})

// Start server up; have it listen on a specific port
// 3000 is for Local development environment

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 

// Note that node process is never going to be closed unless we stop it, since its job is to stay up and running to process requests
// Shut it down using ctrl + c

// Serve up HTML and JSON

