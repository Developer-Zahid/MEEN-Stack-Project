const express = require('express')
const mongoose =  require('mongoose')
const Blog = require('./models/blog')
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
app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=>{
    console.log("Run Middleware")
    next()
})

app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'My First Blog Title',
        description: 'My First Blog Description'
    })
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.error(err)
    })
})

app.get('/', (req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {
            pageTitle: 'Home',
            blogs: result
        })
    })
    .catch((err)=>{
        console.error(err)
    })
})

app.get('/create', (req, res)=>{
    res.render('create', {
        pageTitle: 'Blog Create'
    })
})

app.post('/create-blog', (req, res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.error(err)
    })
})

app.get('/details/:id', (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {
            pageTitle: 'Blog Details',
            blog: result
        })
    })
    .catch((err)=>{
        res.status(404).render('404', {
            pageTitle: '404'
        })
        console.error(err)
    })
})

app.delete('/delete-blog/:id', (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/'})
    })
    .catch((err)=>{
        console.error(err)
    })
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {
        pageTitle: '404'
    })
})