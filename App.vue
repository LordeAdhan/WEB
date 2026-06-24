<script setup>

import {onMounted, ref, useTemplateRef} from "vue";

const lista = ref([]);
const reg = ref( {undefined} );
const form1= useTemplateRef("form1")




function listar(){
  fetch('http://localhost:3000/api/pessoa').
  then(resp=>resp.json()).
  then(dt=>{
    lista.value = dt;
  })
}

onMounted(async ()=>{
  listar()
});
function salvar(){
  const p = reg.value;

  let metodo = "POST";
  if(p.id){
    metodo = "PUT";
  };
  fetch('http://localhost:3000/api/pessoa', {
    method: metodo,
    body:JSON.stringify(reg.value),
    headers:{"content-type": "Application/Json"}
  }).
  then(resp=>resp.json()).
  then(dt=>{
    listar();
    reg.value={}
  });
};

function excluir(id){
  fetch(`http://localhost:3000/api/pessoa/${id}`, {method:"DELETE"}).
  then(resp=>resp.json()).
  then(dt=>{
    listar();
  });
};
</script>

<template>
  <h1>Tabela Pessoa</h1>
  <form v-if="reg!==undefined" ref="form1">
    <label>Nome: <input v-model="reg.nome" /> </label>
    <label>Email: <input v-model="reg.email" /></label>
    <br>
    <button type="button" @click="salvar()">Salvar</button>
    <button type="button" @click="reg=undefined; form1.reset()">Cancelar</button>
  </form>
  <button type="button" v-if="reg===undefined" @click="reg={}">Inserir</button>
  <br/>
  <br/>
  <table>
    <thead>
    <th>Nome</th>
    <th>Email</th>
    <th>Excluir</th>
    </thead>
    <tbody>
    <tr v-for="pessoa in lista" @click="reg=pessoa">
      <td> {{ pessoa.nome }} </td>
      <td> {{ pessoa.email }} </td>
      <button type="button" @click.stop="()=>excluir(pessoa.id)">X</button>
    </tr>
    </tbody>
  </table> <br>

  {{reg}}

</template>

<style scoped>
input{
  display: block;
  width: 20em;
}
form{
  border: 1px solid blue;
  display: inline-block;
  padding: 0.3em;
  -webkit-box-shadow: rgb(255, 128, 128) 5px 5px 15px 5px, rgb(255, 228, 136) -9px 5px 15px 5px, rgb(140, 255, 133) -7px -5px 15px 5px, rgb(128, 199, 255) 12px -5px 15px 5px, rgb(228, 136, 255) 12px 10px 15px 7px, rgb(255, 97, 107) -10px 10px 15px 7px, rgb(142, 92, 255) -10px -7px 27px 1px, 1px -2px 46px 28px rgba(0,0,0,0);
  box-shadow: rgb(255, 128, 128) 5px 5px 15px 5px, rgb(255, 228, 136) -9px 5px 15px 5px, rgb(140, 255, 133) -7px -5px 15px 5px, rgb(128, 199, 255) 12px -5px 15px 5px, rgb(228, 136, 255) 12px 10px 15px 7px, rgb(255, 97, 107) -10px 10px 15px 7px, rgb(142, 92, 255) -10px -7px 27px 1px, 1px -2px 46px 28px rgba(0,0,0,0);
}
</style>