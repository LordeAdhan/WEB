const mysql = require('mysql2/promise');

const client = mysql.createPool('mysql://root@localhost:3306/pessoas');

async function listPessoa(){

    const res = await client.query('SELECT * FROM pessoa');

    return res[0];
};
async function buscaPessoa(id){
    const data = await client.query(`select * from pessoa where id = ${id}`);
    return data[0];
};
async function incluiPessoa(nome,email){
    const data = await client.query(`insert into pessoa (nome, email) values ('${nome}','${email}')`);
    return data[0];
};
async function atualizarPessoa(id, nome, email){
    const data = await client.query(`update pessoa set nome='${nome}', email='${email}' where id = ${id}`)
    return data[0];
};
async function removePessoa(id){
    const data = await client.query(`delete from pessoa where id=${id}`)
};

module.exports = {
    listPessoa,
    atualizarPessoa,
    buscaPessoa,
    incluiPessoa,
    removePessoa
};
