const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors')
app.use(express.json());

app.use('/', express.static('static'));

app.use(cors({ origin:'http://localhost:5173'}));

app.get('/api/pessoa', async (req, res) => {
    const results = await db.listPessoa();
    res.json(results);
});

//{"id": 1,"nome": "Adhan Felipe","email": "adhan.benbites@ifms.edu.br"}

app.post('/api/pessoa', async (req, res)=>{
    let param = req.body;
    const data = await db.incluiPessoa(param.nome, param.email);
    res.json(data);
});
app.put('/api/pessoa', async (req   , res)=>{
    let param = req.body;
    const data = await db.atualizarPessoa(param.id, param.nome, param.email);
    res.json(data);
});
app.delete('/api/pessoa/:id', async (req,res) => {
    const results = db.removePessoa(req.params.id);
    res.json(results);
});

app.get('/api', async (req, resp)=> {
    resp.send('Olá Mundo');
});
app.listen(3000);
console.log('Servidor rodando na porta 3000');
