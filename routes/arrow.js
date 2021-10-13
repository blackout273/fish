const cookie = require('cookie')
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
require('../models/data')
const Data = mongoose.model('Data')

router.get('/',(req,res)=>{
    res.render('receiver')
})
router.get('/home',(req,res)=>{
    // res.render('main')
    res.render('portal')
})
//ROUTE_ADD
router.post('/candidato',(req,res)=>{
    const novosDados={
        nome: req.body.nome,
        nome_peixe: req.body.nome_peixe,
        tamanho: req.body.tamanho,
        peso: req.body.peso
    }
     
    try {
        //SET COOKIES
        res.setHeader('Set-Cookie', cookie.serialize('usuario',novosDados, {
            httpOnly: true,
            maxAge: 60 // 1 minute
          }));
        //VALIDAR ENTRADAS
          if(!req.body.nome || req.body.nome==null || typeof req.body.nome == undefined){
              
            res.render('portal',{msg:'erro'})
        }
          else{
            //SAVE DATA
            new Data(novosDados).save().then(()=>{
              //LIST AFTER SAVE
                Data.find().lean().sort({date:'desc'}).then((novosDados)=>{
                    res.redirect('/mostra')
                }).catch((err)=>{
                    console.log('Erro ao Listar Dados'+err)
                    res.redirect('/')
                })

            }).catch((err)=>{
                console.log('erro ao Salvar: '+err)
            })

            
          }

    } catch (error) {
        console.log('Erro sério: '+error)
        res.redirect('/')
    }
    
    
})
//ROUTE_SHOW
router.get('/mostra',((req,res)=>{
    Data.find().lean().sort({date:'desc'}).then((novosDados)=>{
        res.render('mostra',{novosDados: novosDados})
    }).catch((err)=>{
        console.log('Erro ao Listar Dados'+err)
        res.redirect('/')
    })
}))
//ROUTE_DELETE
router.post('/delete',((req,res)=>{
    Data.deleteOne({_id:req.body.id}).then((novosDados)=>{
        //LISTAR APOS DELETAR
        Data.find().lean().sort({date:'desc'}).then((novosDados)=>{
            res.render('mostra',{novosDados: novosDados})
        }).catch((err)=>{
            console.log('Erro ao Listar Dados'+err)
            res.redirect('/')
        })
    }).catch((err)=>{
        console.log('Erro ao DELETAR Dados'+err)
        res.redirect('/')
    })
}))
module.exports=router