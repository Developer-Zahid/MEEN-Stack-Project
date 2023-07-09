const express = require('express')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000)

// app.get('/', (req, res)=>{
//     res.sendFile('/views/index.html', {root: __dirname})
// })

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