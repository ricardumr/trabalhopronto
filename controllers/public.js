import usuario from '../models/usuario.js'
import Contrato from '../models/contrato.js'


export async function abrecadastro(req, res){
    res.render('cadastro')
}

export async function cadastro(req, res){
    //esse comando equivale a um if
    const admin = req.body.admin=="on" ? true : false;

    const novousuario = new usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        nascimento: req.body.nascimento,
        admin: admin
    })

    await novousuario.save();
    res.send("Cadastrado com sucesso!")
}

export async function abrelogin(req, res){
    res.render('login')
}

export async function login(req, res){
    res.redirect('/admin/usuarios/lst')
}

export async function abreindex(req, res){
    const contratos = await Contrato.find({})
    res.render('public/index.ejs', {Contratos:contratos}, {contratos})
}