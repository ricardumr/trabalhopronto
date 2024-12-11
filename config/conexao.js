import mongoose from 'mongoose';

const conexao=await mongoose.connect("mongodb://aluno:aluno@cluster0-shard-00-00.zuo1w.mongodb.net:27017,cluster0-shard-00-01.zuo1w.mongodb.net:27017,cluster0-shard-00-02.zuo1w.mongodb.net:27017/?ssl=true&replicaSet=atlas-ox2mvd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
//const conexao= await mongoose.connect("mongodb://localhost:27017/ifstore');
export default conexao


