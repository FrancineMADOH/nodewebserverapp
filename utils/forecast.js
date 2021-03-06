const request = require('postman-request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (longitude,latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5b7c4662b324dc438e0f5f7da9239c95&query=' + latitude + ','+ longitude + '&units=f'
request({url, json: true}, (error,{body})=>{
    if(error){
        callback('please connect weather server', undefined)
    }else if(body.error === 0){
        callback('please provide a valid location',undefined)
    } else{
        callback(undefined,
body.current.weather_descriptions[0] +
 ' It is currently ' + body.current.temperature + 
 ' degree outside. But it feels like it is '  + 
 body.current.feelslike + ' degree' + 
 ' the humidity is ' + body.current.humidity + '%'
            )
    }
})
}


module.exports = forecast