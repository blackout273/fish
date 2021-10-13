const path = require('path')
const handlebars = require('express-handlebars')
const express = require('express')
const app = express()
const arrow = require('./routes/arrow')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

porta = process.env.PORT || 3000

//BODYPARSER
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//Handlebars Engine
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')
//PUBLIC
app.use(express.static(path.join(__dirname,"public")))
//MONGOOSE
mongoose.connect('mongodb+srv://blackout273:yprM2yNYyJucbvfh@machina.4uwtt.mongodb.net/flow?retryWrites=true&w=majority').then(()=>{
    console.log('Conectado ao Mongo')
}).catch((err)=>{
    console.log('Erro Ao Conectar ao banco: '+err)
})
//ROTAS
app.use('/',arrow)


app.listen(porta,()=>{console.log('Servidor Online')})