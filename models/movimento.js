import conexao from '../config/conexao.js'

const Movimento = conexao.Schema({
    data: {type: Date, required:true},
    valor: {type: Number, required:true},
    operacao: {type: String, },
    usuario: {type: conexao.Schema.Types.ObjectId, ref:"Usuario", required:true,}
})

export default conexao.model('Movimento',Movimento)