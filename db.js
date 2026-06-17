const mysql = require('mysql2/promise');
const cliente = mysql.createPool("mysql://root@localhost:3306/restaurante");

async function listarCliente(){
    const res = await cliente.query('select * from cliente');
    return res[0];
};

async function buscarCliente(id){
    const res = await cliente.query(`select * from cliente where id=${id}`);
    return res[0];
};

async function incluirCliente(nome, email, cpf, celular, pix, genero, nascimento){
    const res = await cliente.query(`insert into (nome, email, cpf, celular, pix, genero, nascimento) values ('${nome}', '${email}', '${cpf}', '${celular}', '${pix}', '${genero}', '${nascimento}')`);
    return res[0];
};

async function atualizarCliente(id, nome, email, cpf, celular, pix, genero, nascimento){
    const res = await cliente.query(`update cliente set nome='${nome}', email='${email}', cpf='${cpf}', celular='${celular}', pix='${pix}', genero='${genero}', nascimento='${nascimento}' where id=${id}`);
    return res[0];
};

async function removeCliente(id){
    const data = await client.query(`delete from cliente where id=${id}`)
    return data[0];
};

module.exports = {
    atualizarCliente,
    buscarCliente,
    incluirCliente,
    listarCliente,
    removeCliente
}