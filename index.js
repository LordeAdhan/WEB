const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());

app.use('/',express.static('static'));

app.use(cors( {origin: 'http://localhost:5173'} ));

app.get('/api/pessoa', async(req,res)=>{
    const results = await db.listarCliente();
    res.json(results);
});

app.get('/api/pessoa/:id', async(req,res)=>{
    const results = await db.buscarCliente(req.params.id);
    res.json(results);
});

app.post('api/pessoa', async (req, res)=>{
    const data = req.body;
    const results = await db.incluirCliente(data.nome, data.email, data.cpf, data.celular, data.pix, data.genero, data.nascimento);
    res.json(results);
});

app.put('api/pessoa', async (req, res)=> {
    const data= req.body;
    const results = await db.atualizarCliente(data.id ,data.nome, data.email, data.cpf, data.celular, data.pix, data.genero, data.nascimento);
    res.json(results);
});

app.delete('api/pessoa/:id', async (req, res)=> {
    const results = await db.removeCliente(req.params.id);
    res.json(results);
});

app.listen(3000);