import { createConnection } from './node_modules/mysql/index.js';
import express from 'express'
import http from 'http'
import fs from 'node:fs'
import bcrypt from 'bcrypt';
const app = express();
const server = http.createServer(app);
import {Server} from 'socket.io'


var environment_var=0
var porta
//1 - usar credenciais locais
//~ - usar variáveis de ambiente

if(environment_var===1){
porta=80
//usar quando o site está local
}else{
porta=3306
//usar quando o site está publicado
}



app.use(express.static('.' + '/'));

const io = new Server(server)

app.use(function(req, res, next) {
res.status(404).sendFile('erro.html', { root: '.' });
});

app.route('/')
//PÁGINA PRINCIPAL
.get((req, res) => {
res.sendFile('index.html', { root: '.' })
res.sendFile('estilos_css.css', { root: '.' })
})

app.route('/monte_seu_cardapio.html')
//PÁGINA MONTE SEU CARDÁPIO
.get((req, res) => {
res.sendFile('monte_seu_cardapio.html', { root: '.' })
res.sendFile('estilos_css.css', { root: '.' })
})

app.route('/cardapio_da_semana.html')
//PÁGINA CARDÁPIO DA SEMANA
.get((req, res) => {
res.sendFile('cardapio_da_semana.html', { root: '.' })
res.sendFile('estilos_css.css', { root: '.' })
})

app.route('/cadastro.html')
//PÁGINA CADASTRO
.get((req, res) => {
res.sendFile('estilos_css.css', { root: '.' })
res.sendFile('cadastro.html', { root: '.' })
})

app.route('/obrigado_pela_compra.html')
//PÁGINA OBRIGADO PELA COMPRA
.get((req, res) => {
res.sendFile('obrigado_pela_compra.html', { root: '.' })
res.sendFile('estilos_css.css', { root: '.' })
})

app.route('/dashboard.html')
//PÁGINA DASHBOARD
.get((req, res) => {
res.sendFile('estilos_css.css', { root: '.' })
res.sendFile('dashboard.html', { root: '.' })
})



server.listen(porta,()=>{

})


//ENVIAR DADOS DO BACK-END PARA O FRONT-END
io.on('connection',(socket)=>{  
  socket.on('atualizar_itens_vendidos',(msg)=>{ 
  
  ler_dados_vendas()
  
  })
  })
  
  //ENVIAR DADOS DO FRONT-END PARA O BACK-END
  io.on('connection',(socket)=>{  
  socket.on('frontendbackend',(msg)=>{ 
  gravar_dados_vendas(msg)
  setTimeout(function() {
    ler_dados_vendas_gerar_relatorio(msg)
  }, 1000);
  
  socket.emit('ir_para_tela_final')
  
  })
  })
  
  
  
  
  
  //MARCAR VENDA COMO ENTREGUE
  io.on('connection',(socket)=>{  
  socket.on('marcar_entregue',(id)=>{ 
  atualizar_dados_vendas(id)
  socket.emit('ir_para_tela_final')
  
  })
  })
  
  
  //ENVIAR DADOS DO BACK-END PARA O FRONT-END
  function ler_dados_vendas(){
  
  if(environment_var===1){
  var connection = createConnection({
  host      :         'localhost',
  user      :         'root',
  password  :         '7Xwf@2x@',
  database  :         'id22369894_dados'
  })
    }else{    
  var connection = createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
  })
  }
  
  
  
  connection.query('select ID, VENDAS, VALOR_TOTAL, entregue from VENDAS;', function (error, results, fields) {
  if (error) throw error;
  
  
  io.emit('ler_mysql',results)
  
  
  })
  
  
  
  connection.end();
  }
  
  //LÊ OS DADOS PARA PREENCHIMENTO DOS INGREDIENTES
  function ler_dados_ingredientes(){
  if(environment_var===1){
  var connection = createConnection({
  host      :         'localhost',
  user      :         'root',
  password  :         '7Xwf@2x@',
  database  :         'id22369894_dados'
  })
    }else{    
  var connection = createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
  })
  }
  
  connection.query('select ingredientes,75_g,100_g,150_g,200_g,250_g,300_g,400_g,tipo_ingrediente from PRODUTOS as  solution;', function (error, results, fields) {
  if (error) throw error;
  io.on('connection',(socket)=>{
  socket.emit('ler_mysql_ingredientes',results)
  
  
  })
  
  
  });
  
  
  
  connection.end();
  }
  
  ler_dados_ingredientes()
  
  


function gravar_dados_vendas(mensagem){
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
if(mensagem!=''){
connection.query(`INSERT INTO VENDAS(VENDAS, VALOR_TOTAL, entregue, ID_USUARIO_COOKIE) VALUES ('${mensagem['venda']}',${mensagem['valor_total']},0,'${mensagem['id']}')`)
}
connection.end();
}

function atualizar_dados_vendas(id){
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}

connection.query(`update VENDAS set entregue=1 where id = ${id}`)
connection.query(`SELECT ID_USUARIO_COOKIE from VENDAS WHERE id=${id}`,function (error, results, fields) {
if (error) throw error;
limpar_armazenameno_local(`comprovante${results[0]['ID_USUARIO_COOKIE']}.txt`)
})
connection.end();
io.on('connection',(socket)=>{  
socket.emit('atualizar_tela_pedidos')
})
}

//GERAR RELATÓRIO DAS COMPRAS - comprovante.txt
function ler_dados_vendas_gerar_relatorio(dados_){
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}


connection.query(`select ID, VENDAS, VALOR_TOTAL, entregue from VENDAS where ID_USUARIO_COOKIE = "${dados_['id']}"`, function (error, dado, fields) {

if (error) throw error
var entregue=[]
var idd=[]
var dados=[]
var lista=[]
var itens=''
var soma_valor_recebido=0
var soma_valor_a_receber=0
var qte_pedidos=0
var texto=''
var valoressssss_cs=[]
var valoressssss_mm=[]
var tipo_pagamento=[]




for(let i in dado){

    
  itens=itens+' ;;; '+dado[i]['VENDAS']
  if (dado[i]['entregue']!=0){
    
      soma_valor_recebido+=dado[i]['VALOR_TOTAL']
  }
  if (dado[i]['entregue']===0){
      soma_valor_a_receber+=dado[i]['VALOR_TOTAL']
  }

  idd.push(dado[i]['ID'])
 
  entregue.push(dado[i]['entregue'])
  let OBJETO_VALORES = JSON.parse(dado[i]['VENDAS'])


  if(OBJETO_VALORES['valor_total_marmitas_da_semana']){
      valoressssss_cs.push(OBJETO_VALORES['valor_total_marmitas_da_semana'])
      
  }else{
      valoressssss_cs.push(0)
  }
  if(OBJETO_VALORES['valor_total_ingredientes_marmitas']){
  valoressssss_mm.push(OBJETO_VALORES['valor_total_ingredientes_marmitas'])

  }else{
      valoressssss_mm.push(0)
 
  }
  tipo_pagamento.push(OBJETO_VALORES['tipo_pagamento'])
  
}

lista=itens.split(' ;;; ')

qte_pedidos=lista.length-1



    let ii=-1
    for(let i in lista){
  


    

        ii+=1
       valoressssss_mm
        if(entregue[i-1]===0){
      

        if(lista[i]!=''){
         
        let itenss=lista[i]

        
        let infos=Object.values(JSON.parse(itenss))


        let chaves=Object.values(infos[2])
        let ingredientes
        let item_ingrediente=[]
        let texto_ingredientes=''
        let texto_cardapio_semanal=''
        let qte=''
        let texto_ingredientes_qte=''
        let id_ingredientes=''
        for(i in chaves){
            ingredientes = Object.values(infos[2])[i]
            id_ingredientes = Object.keys(infos[2])[i]
            texto_ingredientes+='\nID: '+id_ingredientes
            for(let k in ingredientes){
                if(k!='qte' && ingredientes[k]!='0'){
               
                    let j = ingredientes[k]+' g'
                    item_ingrediente[k]=j
                    texto_ingredientes+= k+': '+j
                    qte=ingredientes['qte']
                    
                }
            
            }
   

            if(i<chaves.length){
            texto_ingredientes_qte=`\nquantidade dessa marmita: ${qte}\n`
   
            texto_ingredientes+=`${texto_ingredientes_qte}`
  
            }
       
            
        }

        chaves=Object.values(infos[3])
        ingredientes
        item_ingrediente=[]
        texto_cardapio_semanal=''
        for(i in chaves){
            
            ingredientes = Object.values(infos[3])[i]
            for(let k in ingredientes){

             
                    texto_cardapio_semanal+=ingredientes[k]
      
            
            }
            texto_cardapio_semanal+='\n\n'
        }
        

        

        
        let monte_sua_marmita = texto_ingredientes
        let cardapio_da_semana = texto_cardapio_semanal
        let dados_cliente=JSON.stringify(infos[1]).toString().replace('{"','').replace('"}','').replaceAll('___','').replaceAll('"','').replaceAll(',','').replace(":",": ").replace(",",", ")
        .replaceAll('nome','\nNome')
        .replaceAll('telefone:','\nTelefone: ')
        .replaceAll('cpf:','\nCPF: ')
        .replaceAll('endereco:','\nEndereço: ')
        .replaceAll('numero:',', número: ')
        .replaceAll('complemento:','\nComplemento: ')

        
        let data_inicial = infos[0].split(', ')[0]
        let data_atual=new Date().toLocaleString().split(', ')[0]
        let horario_inicial= parseInt(infos[0].split(', ')[1].split(':')[0])*60*60+parseInt(infos[0].split(', ')[1].split(':')[1])*60
        let hora_atual=parseInt(new Date().toLocaleString().split(', ')[1].split(':')[0])*60*60+parseInt(new Date().toLocaleString().split(', ')[1].split(':')[1])*60
        let ha_x_minutos = parseInt((hora_atual-horario_inicial)/60)


        if(!cardapio_da_semana){

            texto=`${infos[0]} \n${dados_cliente}\n\nMonte sua marmita:\n ${monte_sua_marmita.replaceAll('"','').replaceAll("'","").replaceAll(",","\n").replaceAll(";","\n").replaceAll(":",": ")}\nsubtotal: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_mm[ii-1]))}\n\nValor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}`
        
        
          }else if(!monte_sua_marmita || monte_sua_marmita==='"0"'){

            texto=`${infos[0]} \n${dados_cliente}\n\nCardápio da Semana:\n\n${cardapio_da_semana.replaceAll(' ; ','\n').replaceAll('; ','\n')}\nValor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}`
       
          }else if(cardapio_da_semana && monte_sua_marmita){
          
            texto=`${infos[0]} \n${dados_cliente}\n\nCardápio da Semana:\n\n${cardapio_da_semana.replaceAll(' ; ','\n').replaceAll('; ','\n')}\n\nMonte sua marmita:\n ${monte_sua_marmita.replaceAll('"','').replaceAll("'","").replaceAll(",","\n").replaceAll(";","\n").replaceAll(":",": ")}\nsubtotal: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(valoressssss_mm[ii-1])}\n\nValor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}`
      
        }

     
        texto=`${texto}\n\nForma de pagamento: ${tipo_pagamento[ii-1]}`
      }
   

      }
        
      }
      
    

   
fs.writeFile(`comprovante${dados_['id']}.txt`, texto,'latin1', (err) => err && 0)




connection.end();
})}

//INSERIR DADOS - gravar novo cliente -> script0.js
io.on('connection',(socket)=>{  
socket.on('GRAVAR_NOVO_USUARIO',(dados_selecionados)=>{ 
gravar_novo_usuario(dados_selecionados)
})})


function gravar_novo_usuario(dados) {
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
    
    
let comando=`INSERT INTO USUARIOS (ID_USUARIO_COOKIE) VALUES ("${dados['id']}")`
let comando1=`INSERT INTO DADOS_SELECIONADOS (ID_USUARIO_COOKIE) VALUES ("${dados['id']}")`
  connection.query(comando)
  connection.query(comando1)
  connection.end();
  
}


//ATUALIZAR DADOS - ler valor total -> cadastro.js
io.on('connection',(socket)=>{  
  socket.on('VERIFICAR_VALOR_TOTAL',(dados_selecionados)=>{ 
  ler_valor_final_da_compra(dados_selecionados)
})})

function ler_valor_final_da_compra(dados){
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
    
    
let comando=`SELECT \
tabela_com_informacoes.tipo_pagamento, \
tabela_com_informacoes.itens_selecionados_ingredientes_mar_fechada, \
tabela_com_informacoes.itens_selecionados_cardapio_semanal, \
tabela_com_informacoes.dados_cliente, \
tabela_com_informacoes.valor_total_ingredientes_total, \
tabela_com_informacoes.valor_total_cardapio_semanal, \
tabela_users.valor_total \
FROM USUARIOS tabela_users INNER JOIN DADOS_SELECIONADOS tabela_com_informacoes ON tabela_users.ID_USUARIO_COOKIE = tabela_com_informacoes.ID_USUARIO_COOKIE WHERE tabela_users.ID_USUARIO_COOKIE ="${dados['id']}"`


connection.query(comando, function (error, results, fields) {
if (error) throw error;
io.emit(`VERIFICOU_VALOR`,results)

connection.end();
})
}

//ATUALIZAR DADOS - atualizar valor total de todos os pedidos -> cadastro.js
io.on('connection',(socket)=>{  
  socket.on('ATUALIZAR_DADOS_VALOR_COMPRA',(dados_selecionados)=>{ 
  gravar_usuario_e_seu_valor_final(dados_selecionados)
})})
  
  
function gravar_usuario_e_seu_valor_final(dados) {
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
    
    
let comando=`UPDATE USUARIOS SET VALOR_TOTAL= ${dados['valor']} WHERE ID_USUARIO_COOKIE = "${dados['id']}"`
  connection.query(comando)
  connection.end();
  
}

//LER DADOS - obter_valor
io.on('connection',(socket)=>{  
socket.on('LER_DADOS_SELECIONADOS_OBTER_VALOR',(dados_selecionados)=>{ 
ler_dados(dados_selecionados)


})})

//GRAVAR DADOS - obter_valor
io.on('connection',(socket)=>{  
socket.on('INSERINDO_DADOS',(dados_selecionados)=>{ 
gravar_dados(dados_selecionados)


})})
//GRAVAR DADOS - remover_
io.on('connection',(socket)=>{  
  socket.on('ATUALIZANDO_DADOS',(dados_selecionados)=>{ 
  gravar_dados(dados_selecionados)
  
  
})})

//LER DADOS - remover_
io.on('connection',(socket)=>{  
socket.on('LER_DADOS_SELECIONADOS_REMOVER',(dados_selecionados)=>{ 
ler_dados(dados_selecionados)


})})

//LER DADOS - FINALIZAR KITS DE MARMITAS
io.on('connection',(socket)=>{  
  socket.on('LER_DADOS_SELECIONADOS_KITS_MARMITAS',(dados_selecionados)=>{ 
  ler_dados_finanizar_marmitas(dados_selecionados)
  
  
})})


//LER DADOS - FINALIZAR KITS DE MARMITAS
io.on('connection',(socket)=>{  
  socket.on('LER_DADOS_SELECIONADOS_KITS_MARMITAS',(dados_selecionados)=>{ 
  ler_dados(dados_selecionados)
  
  
})})


async function gravar_dados(dados) {
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}



if(dados['i16']){

let comando=`UPDATE DADOS_SELECIONADOS set \
id_edit_monte_seu_cardapio_final_inteiro = '${dados['i1']}', \
valor_total_de_todos_os_pedidos = '${dados['i2']}', \
itens_selecionados_ingredientes_mar_fechada = '${dados['i3']}', \
tipo_pagamento = '${dados['i4']}', \
valor_total_cardapio_semanal = '${dados['i5']}', \
dados_cliente = '${dados['i6']}', \
msg_coleta_dados = '${dados['i7']}', \
itens_selecionados_ingredientes = '${dados['i8']}', \
itens_selecionados_cardapio_semanal = '${dados['i9']}', \
vendas_finalizadas = '${dados['i10']}', \
qte_marmitas_fechadas = '${dados['i11']}', \
valor_total_ingredientes = '${dados['i12']}', \
valor_total_ingredientes_total = '${dados['i13']}', \
edit_monte_seu_cardapio_final_inteiro = '${dados['i14']}', \
valor_total_TUDO = '${dados['i15']}', \
qte_cliques = '${dados['i16']}' where ID_USUARIO_COOKIE ="${dados['i0']}"`
await connection.query(comando)


}else{
let comando=`UPDATE DADOS_SELECIONADOS set \
  id_edit_monte_seu_cardapio_final_inteiro = '${dados['i1']}', \
  valor_total_de_todos_os_pedidos = '${dados['i2']}', \
  itens_selecionados_ingredientes_mar_fechada = '${dados['i3']}', \
  tipo_pagamento = '${dados['i4']}', \
  valor_total_cardapio_semanal = '${dados['i5']}', \
  dados_cliente = '${dados['i6']}', \
  msg_coleta_dados = '${dados['i7']}', \
  itens_selecionados_ingredientes = '${dados['i8']}', \
  itens_selecionados_cardapio_semanal = '${dados['i9']}', \
  vendas_finalizadas = '${dados['i10']}', \
  qte_marmitas_fechadas = '${dados['i11']}', \
  valor_total_ingredientes = '${dados['i12']}', \
  valor_total_ingredientes_total = '${dados['i13']}', \
  edit_monte_seu_cardapio_final_inteiro = '${dados['i14']}', \
  valor_total_TUDO = '${dados['i15']}'  where ID_USUARIO_COOKIE ="${dados['i0']}"`
 await connection.query(comando)

}



connection.end();
}

async function ler_dados(dados) {
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
    
    
let comando=`SELECT \
id_edit_monte_seu_cardapio_final_inteiro, \
valor_total_de_todos_os_pedidos, \
itens_selecionados_ingredientes_mar_fechada, \
tipo_pagamento, \
valor_total_cardapio_semanal, \
dados_cliente, \
msg_coleta_dados, \
itens_selecionados_ingredientes, \
itens_selecionados_cardapio_semanal, \
vendas_finalizadas, \
qte_marmitas_fechadas, \
valor_total_ingredientes, \
valor_total_ingredientes_total, \
edit_monte_seu_cardapio_final_inteiro, \
valor_total_TUDO, \
qte_cliques from DADOS_SELECIONADOS as resultado where ID_USUARIO_COOKIE ="${dados['idd']}"`


await connection.query(comando, function (error, results, fields) {
if (error) throw error;
io.emit(`SELECIONANDO_DADOS_OBTIDOS${dados['n']}`,results)


})
connection.end();
}



async function ler_dados_finanizar_marmitas(dados) {
if(environment_var===1){
var connection = createConnection({
host      :         'localhost',
user      :         'root',
password  :         '7Xwf@2x@',
database  :         'id22369894_dados'
})
  }else{    
var connection = createConnection({
host     : process.env.host,
user     : process.env.user,
password : process.env.password,
database : process.env.database
})
}
    
    
let comando=`SELECT \
id_edit_monte_seu_cardapio_final_inteiro, \
valor_total_de_todos_os_pedidos, \
itens_selecionados_ingredientes_mar_fechada, \
tipo_pagamento, \
valor_total_cardapio_semanal, \
dados_cliente, \
msg_coleta_dados, \
itens_selecionados_ingredientes, \
itens_selecionados_cardapio_semanal, \
vendas_finalizadas, \
qte_marmitas_fechadas, \
valor_total_ingredientes, \
valor_total_ingredientes_total, \
edit_monte_seu_cardapio_final_inteiro, \
valor_total_TUDO, \
qte_cliques from DADOS_SELECIONADOS as resultado where ID_USUARIO_COOKIE ="${dados['idd']}"`


await connection.query(comando, function (error, results, fields) {
if (error) throw error;
io.emit(`SELECIONANDO_DADOS_FINALIZAR_KIT_MARMITAS${dados['n']}`,results)}) 

connection.end();
}



const saltRounds=10
//VERIFICAR DADOS
io.on('connection',(socket)=>{  
  socket.on('verificar',(id)=>{    

    bcrypt.hash(id['senha'], saltRounds).then(hash =>{
      bcrypt.compare(id['senha'],'$2b$10$JVZyoEA4bTEIYI4xyzZLI.RK7Jk7bbRScNPzDwFedoc8pbVdyDx6a',(erro,resultado)=>{

        if(id['email']==='marmitas@site.com.br' && resultado){
        socket.emit('status',true)
        }else{
          socket.emit('status',false)
        }
      })
    
    }).catch(erro=>{
     
    })

   
  }
      
  )
  })




io.on('connection',(socket)=>{  
  socket.on('apagar_arquivo',(id)=>{ 
    limpar_armazenameno_local(id)
  })})

  function limpar_armazenameno_local(arquivo){
    let nome_arquivo=''
    if(!arquivo['arquivo']){
    nome_arquivo=arquivo
    }else{
      nome_arquivo=arquivo['arquivo']
    }
    
  
    var dir=process.cwd()
    let caminho_do_arquivo=`${dir}\\${nome_arquivo}`

    fs.unlink(`${caminho_do_arquivo}`, (err) => {
        if (err) {
          return;
        }
})
}