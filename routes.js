import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './config.js'

const poolConexao = new sql.ConnectionPool(sqlConfig)
await poolConexao.connect();
export const rotasAPI = express.Router()

rotasAPI.get('/', async (req, res)=>{
    try{
        const { resultadoConsulta } = await poolConexao.query`select * from Tarefas`
        return res.status(201).json(resultadoConsulta)
    }
    catch(erro){
        return res.status(501).json('Erro')
    }
})

rotasAPI.get('/chamado/:id', async (req,res)=>{
    try{
            const { id } = req.params
            const { resultadoConsulta } = await poolConexao.query`select * from Tarefas where IdChamado = ${id}`
            return res.status(201).json(resultadoConsulta)
    }
    catch(erro){
        return res.status(501).json('Erro')
    }
})

rotasAPI.post('/chamado/novo', async (req, res)=>{
    try{
        const { id, DataChamado, NomeCliente, Descricao } = req.body
        await poolConexao.query`insert into Tarefas values(${id}, ${DataChamado}, ${NomeCliente}, ${Descricao})`
        return res.status(201).json('Cadastrado')
    }
    catch(erro){
        return res.status(501).json('Erro ao cadastrar')
    }
})

export default rotasAPI
