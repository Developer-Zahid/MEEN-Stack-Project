const express = require('express')
const mongoose =  require('mongoose')
require('dotenv').config()

// express app
const app = express()

// connect to mongodb
const dbURI = process.env.DB_URI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    console.log('Connected to db')
    // listen for requests
    app.listen(3000)
})
.catch((err)=> console.log(err));

// register view engine
app.set('view engine', 'ejs')

// app.get('/', (req, res)=>{
//     res.sendFile('/views/index.html', {root: __dirname})
// })

// Middleware & static files
app.use(express.static('public'))

app.use((req, res, next)=>{
    console.log("Run Middleware")
    next()
})

app.get('/', (req, res)=>{
    res.render('index', {
        pageTitle: 'Home',
        blogs: [
            {
                title: 'New Blog 1',
                description: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, neque.'
            },
            {
                title: 'New Blog 2',
                description: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, neque.'
            },
            {
                title: 'New Blog 3',
                description: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, neque.'
            }
        ]
    })
})

app.get('/create', (req, res)=>{
    res.render('create', {
        pageTitle: 'Blog Create'
    })
})

app.get('/details', (req, res)=>{
    res.render('details', {
        pageTitle: 'Blog Details'
    })
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {
        pageTitle: '404'
    })
})