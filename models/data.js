const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Data = new Schema({
    nome:{
        type:String,
        required: true
    },
    nome_peixe:{
        type:String,
        required:true
    },
    tamanho:{
        type:Number,
        required:true
    },
    peso:{
        type:Number,
        required:true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})
mongoose.model('Data',Data)