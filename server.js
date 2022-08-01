require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const port = process.env.PORT
const cors = require('cors')

const app = express()

//Eneble CORS Policy
app.use( cors({ origin: "http://localhost:3000 " }))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json()) // parse json bodies in the request object
app.use('/uploads', express.static('uploads'))

app.use('/api/user', require('./router/user'))
app.use('/api/song', require('./router/song'))
app.use('/api/artist', require('./router/artist'))

app.use((err, res) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went really wrong"
    })
})


app.listen(port, ()=>{
    console.log(`app listing at http://localhost:${port}`);
})