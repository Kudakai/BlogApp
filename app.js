const express = require('express');
const morgan = require('morgan')

const app = express();

app.set('view engine', 'ejs')

app.use(morgan('dev'))

//Adding static files server
app.use(express.static('public'))

app.get(`/blogs/create`, (req, res) => {
    res.render(`create`, {title: 'Create a new blog'})
})


app.get('/', (req, res) => {
    const blogs = [
        {title: "Tale about two beasts", snippet: "Lorem ipsum doler sit amet concestatur"},
        {title: "Summoning the devil", snippet: "Lorem ipsum doler sit amet concestatur"},
        {title: "Leaving all behind", snippet: "Lorem ipsum doler sit amet concestatur"}
    ]
    res.render(`index`, {title: 'Home', blogs: blogs})
})

app.get('/about', (req, res) => {
    res.render(`about`, {title: 'About'})
})

app.get('/about-us', (req, res) => {
    res.redirect(`/about`)
})

app.use((req, res) => {
    res.status(404).render(`404`, {title: '404'}) 
})

app.listen(3000)