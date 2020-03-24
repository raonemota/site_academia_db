const { age, date, typeBlood } = require('../../lib/utils')

const Member = require('../models/Member')

module.exports = { 

    //Dados para pagina inicial de membros. Lista de membros.
    index(req, res){
        Member.all(function(members) {
            return res.render("members/index", { members     })
        })
        

    },
    //Prepara pagina para criação de membro.
    create(req, res){

        Member.instructorSelectOptions(function(options){
            return res.render("members/create", { instructorOptions: options })
        })

    },
    //Mostra dados do membro
    show(req, res){

        Member.find(req.params.id, function(member){
            if (!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay
            member.blood = typeBlood(member.blood)

            return res.render("members/show", { member })

        })

    },
    //Envia dados para cadastro na base de dados
    post(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields!!")
            }
        }
        
        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })

    },
    //Mostra pagina de edição dos dados
    edit(req, res){

        Member.find(req.params.id, function(member){
            if (!member) return res.send("Member not found")

            member.birth = date(member.birth).iso

            return res.render("members/edit", { member })

        })

    },
    //Solicitação de atualização dos dados vindo do Edit
    put(req, res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields!!")
            }
        }

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })

    },
    //Solicitação de apagar dado vindo do Edit
    delete(req, res){

        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })

    },
}