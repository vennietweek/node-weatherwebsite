// Define required modules 
const request = require('postman-request')

// Geocoding

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmVubmlldHdlZWsiLCJhIjoiY2tyOHluNzl1MGkxMjJvbmp3cmRhMmoyNiJ9.AskHT6GEI4auFsXa3NzBxQ&limit=1'
    request ({ url:geocodeURL, json:true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location - try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode