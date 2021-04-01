const path = require('path')
const express = require('express')
const geocoding = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
//app.com app.com/help, app.js/about
//app.get('route', cb function(req,res))
//console.log(__dirname)
const publicFolderPath = path.join(__dirname,'../public')

//setting a template engine
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname, '../templates/views/')) //set the path to the views folder
//app.set('views',path.join(__dirname, '../templates/partials/ ')) //set the path to the partial folder folder

//setting the dirctory for the use of partials
hbs.registerPartials(path.join(__dirname, '../templates/partials/'))

//serving up static files
app.use(express.static(publicFolderPath))

//setting up our routes
app.get('', (req,res)=>{
    res.render('index', { 
        title:'weather app',
        name: 'francine Diamond'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'about me ',
        name: 'francine idene'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title:' help',
        msg:'this is the help page to use our app',
        name: 'Francine Diamond'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.adress){
        return res.send('you must provide a valid location')
    }
    
geocoding(req.query.adress, (error, {latitude,longitude,location}={/*default params handler*/})=>{
        if(error){
            return res.send(error)
        }
        //callback chaining
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                adress:req.query.adress
            })
        })
    })    
})
app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send('you must provide a seach term')
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg: 'help article not found',
        name:'Francine Idene',
        title:'404'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg:'page not found',
        name:'Francine Idene',
        title:'404'
    })
})

//listen to our port
app.listen(port, ()=>{
    console.log('server is up on port'+ port+ '...')
})