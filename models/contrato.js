import conexao from '../config/conexao.js'

const Contrato = conexao.Schema({
    data: {type: Date, required:true},
    valor: {type: Number, required:true},
    saldo: {type: Number, required:true},
    tipo: {type: String, required:true},
    local: [{type: String, required:true}],
    usuario: {type: conexao.Schema.Types.ObjectId, ref:"Usuario", required:true,}  // Associação com o model Usuario  // Associação com o model Usuario  // Associação com o model Usuario  // Associação com o model Usuario  // Associação com o model Usuario  // Associação com o model Usuario  // Associação com o model Usuario  // Associa
    
})

export default conexao.model('Contrato',Contrato);