const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express();

//Connecting to MongoDB
const dbURI = 'mongodb+srv://kudakai:Theansweris43!@cluster0.ge6bi.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connection to the DB has been established')
        app.listen(3000, () => {
            console.log('Server up and listening to port 3000')
        })
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

//Adding static files server
app.use(express.static('public'))

app.get(`/blogs/create`, (req, res) => {
    res.render(`create`, {title: 'Create a new blog'})
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        }).catch((err) => {
            console.log(err)
        })
})


app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All blogs', blogs: result})
        }).catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title: 'Blog Details'})
        }).catch((err) => {
            console.log(err)
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: '/blogs'})
        }).catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    res.render(`about`, {title: 'About'})
})

app.get('/about-us', (req, res) => {
    res.redirect(`/about`)
})

app.delete('/')

app.get(`/add-blog`, (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
})

app.use((req, res) => {
    res.status(404).render(`404`, {title: '404'}) 
})

