import Usuario from '../models/usuario.js';
import Movimento from '../models/movimento.js';
import Contrato from '../models/contrato.js';

export async function listarusuarios(req, res) {
    const usuarios = await Usuario.find({}).catch(function (err) { console.log(err) });
    res.render('admin/usuarios/lst', { Usuario: usuarios });
}

export async function detalhe(req, res) {
    try {
        // Buscar o usuário pelo ID
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Buscar os movimentos do usuário (depositos e saques)
        const movimentos = await Movimento.find({ usuario: usuario._id });

        // Calcular o saldo: somar os depósitos e subtrair os saques
        let saldo = 0;

        movimentos.forEach(movimento => {
            if (movimento.operacao === 'deposito') {
                saldo += parseFloat(movimento.valor);
            } else if (movimento.operacao === 'saque') {
                saldo -= parseFloat(movimento.valor);
            }
        });

        // Renderizar a página de detalhes, passando o usuário e o saldo
        res.render('admin/usuarios/detalhe', {
            usuario: usuario,
            saldo: saldo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar a solicitação');
    }
}

export async function filtrarlistarusuarios(req, res) {
    const usuarios = await Usuario.find({ nome: new RegExp(req.body.pesquisar, "i") })
    res.render('admin/usuarios/lst', { Usuario: usuarios });
}

export async function abreaddmovimento(req, res) {
    const usuarios = await Usuario.find({})
    res.render('admin/movimento/add', { usuarios: usuarios });
}

export async function addmovimento(req, res) {
    const usuario = await Usuario.findById(req.body.usuario);
    // Buscar os movimentos do usuário (depositos e saques)
    const movimentos = await Movimento.find({ usuario: usuario._id });
    // Calcular o saldo: somar os depósitos e subtrair os saques
    let saldo = 0;
    movimentos.forEach(movimento => {
        if (movimento.operacao === 'deposito') {
            saldo += parseFloat(movimento.valor);
        } else if (movimento.operacao === 'saque') {
            saldo -= parseFloat(movimento.valor);
        }
    });

    if (req.body.operacao === 'saque') {
        if (saldo < parseFloat(req.body.valor)) {
            res.send("Saldo insuficiente. \n Seu saldo no momento é de:" + saldo + "R$");
        } else {
            await Movimento.create({
                data: req.body.data,
                valor: req.body.valor,
                operacao: req.body.operacao,
                usuario: req.body.usuario,
            });
            res.redirect('/admin/movimento/add');
        }
    } else {
        await Movimento.create({
            data: req.body.data,
            valor: req.body.valor,
            operacao: req.body.operacao,
            usuario: req.body.usuario,
        });
        res.redirect('/admin/movimento/add');
    }
}

export async function listarmovimento(req, res) {
    const movimentos = await Movimento.find({}).populate("usuario");
    res.render('admin/movimento/lst', { Movimentos: movimentos });
}

export async function filtrarmovimento(req, res) {
    // Procurar os movimentos onde o nome do usuário corresponde ao valor da pesquisa
    const movimentos = await Movimento.find()
        .populate({
            path: 'usuario', // Nome do campo de referência no modelo Movimento
            match: { nome: new RegExp(req.body.pesquisar, 'i') }, // Pesquisa no nome do usuário (campo 'nome')
            select: 'nome' // Somente retornar o campo 'nome' do usuário (opcional)
        })
        .exec();

    // Filtrando movimentos que têm usuário correspondente à pesquisa
    const movimentosFiltrados = movimentos.filter(movimento => movimento.usuario);

    // Renderizando a página com os movimentos filtrados
    res.render('admin/movimento/lst', { Movimentos: movimentosFiltrados });
}

export async function deletamovimento(req, res) {
    await Movimento.findByIdAndDelete(req.params.id);
    res.redirect('/admin/movimento/lst');
}

export async function abreedtmovimento(req, res) {
    const movimento = await Movimento.findById(req.params.id);
    res.render('admin/movimento/edt.ejs', { Movimento: movimento });
}

export async function edtmovimento(req, res) {
    await Movimento.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/movimento/lst');
}

export async function abreaddcontrato(req, res) {
    const usuarios = await Usuario.find({});
    res.render('admin/contrato/add', { usuarios: usuarios });
}

export async function addcontrato(req, res) {
    await Contrato.create({
        usuario: req.body.usuario,
        valor: req.body.valor,
        data: req.body.data,
        saldo: req.body.saldo,
        local: req.body.local,
        tipo: req.body.tipo,
    });
    res.redirect('/admin/contrato/add');
}

export async function listarcontrato(req, res) {
    const contratos = await Contrato.find({}).populate("usuario");
    res.render('admin/contrato/lst', { Contratos: contratos });
}

export async function filtrarcontrato(req, res) {
    const contratos = await Contrato.find()
        .populate({
            path: 'usuario', // Nome do campo de referência no modelo Contrato
            match: { nome: new RegExp(req.body.pesquisar, 'i') }, // Pesquisa no nome do usuário (campo 'nome')
            select: 'nome' // Retorna somente o campo 'nome' do usuário (opcional)
        })
        .exec();

    // Filtra contratos que têm um usuário correspondente à pesquisa
    const contratosFiltrados = contratos.filter(contrato => contrato.usuario);

    // Renderiza a página com os contratos filtrados
    res.render('admin/contrato/lst', { Contratos: contratosFiltrados });
}

export async function deletacontrato(req, res) {
    await Contrato.findByIdAndDelete(req.params.id);
    res.redirect('/admin/contrato/lst');
}

export async function abreedtcontrato(req, res) {
    try {
        // Buscar o contrato específico pelo ID
        const contrato = await Contrato.findById(req.params.id);
        
        if (!contrato) {
            return res.status(404).send('Contrato não encontrado');
        }

        // Buscar todos os contratos para renderizar a lista
        const contratos = await Contrato.find({}).populate("usuario");

        // Renderizar a página de edição de contrato, passando o contrato específico e a lista de contratos
        res.render('admin/contrato/edt.ejs', { Contrato: contrato });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar a solicitação');
    }
}

export async function edtcontrato(req, res) {
    await Contrato.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/contrato/lst');
}
