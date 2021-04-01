const request = require('postman-request')

const geocoding = (adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZnJhbmNpbmVtIiwiYSI6ImNqemlxbTUyaDAxZjgzY216cmpoN2xidzQifQ.eYCF221S6vTCAhOrQGf3Kg&limit=1'

    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('unable to connect to internet', undefined)
        }else if(body.features.length === 0){
            callback('please provide a valid location', undefined)
        }else{
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}



module.exports = geocoding