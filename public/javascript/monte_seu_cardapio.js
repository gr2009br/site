var usar_mysql=true
var valores={}
var ingredientes=''
var lista_ingredientes_consulta = []
var estrutura_dicionario = {}


if(usar_mysql){

var socket = io.connect()
socket.on('ler_mysql_ingredientes',(dado)=>{

lista_ingredientes_consulta.push(dado)
for(let i=0; i<=dado.length-1;i++){
    ingredientes+=dado[i]['ingredientes']+'_'+dado[i]['tipo_ingrediente']+';'

    valores[dado[i]['ingredientes']]={75:dado[i]['75_g'],100:dado[i]['100_g'],150:dado[i]['150_g'],200:dado[i]['200_g'],250:dado[i]['250_g'],300:dado[i]['300_g'],400:dado[i]['400_g']}


}

//funcionamento
        
//PREENCHER ITENS PROTEÍNAS/CARBOIDRATOS/LEGUMES NA TELA
function preencherItens(){

    


let count=0

item=ingredientes.split(';') 



for(let i=0;i<item.length;i++){

variavel=count+1
if(item[i].includes('proteinas')){
lista=document.getElementById('lista_proteinas')
item_lista =document.createElement("p")
lista.appendChild(item_lista)   
item_lista.innerHTML=`<div><button class="ingredientes" onclick="obter_valor(this)"  class="botao_selecionar_ing" >${item[i].replace("_proteinas","")}</button>
<select id="${variavel+i}" name="qte_ingrediente_selecionada_por_botao" onchange="quantidade_ingrediente_selecionado(this)">
<option value=0>0 g</option>

</select><p>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(/*valores[item[i].replace("_proteinas","")])*/0))}</p></div>` 
gramas = Object.keys(valores[item[i].replace("_proteinas","")])
lista_gramas_valores = valores[item[i].replace("_proteinas","")]
for(k of gramas){
    if(lista_gramas_valores[k]!=0){
        gramas_disponiveis =document.createElement("option")
        document.getElementById(variavel+i).appendChild(gramas_disponiveis)
        gramas_disponiveis.innerHTML=`<option value=${k}>${k} g</option>`


    }
}
}
else if(item[i].includes('carboidratos')){
lista=document.getElementById('lista_carboidratos')
item_lista =document.createElement("p")
lista.appendChild(item_lista)   
item_lista.innerHTML=`<div><button class="ingredientes" onclick="obter_valor(this)"  class="botao_selecionar_ing" >${item[i].replace("_carboidratos","")}</button>
<select id="${variavel+i}" name="qte_ingrediente_selecionada_por_botao" onchange="quantidade_ingrediente_selecionado(this)">
<option value=0>0 g</option>
</select><p>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(/*valores[item[i].replace("_proteinas","")])*/0))}</p></div>` 
gramas = Object.keys(valores[item[i].replace("_carboidratos","")])
lista_gramas_valores = valores[item[i].replace("_carboidratos","")]
for(k of gramas){
    if(lista_gramas_valores[k]!=0){
        gramas_disponiveis =document.createElement("option")
        document.getElementById(variavel+i).appendChild(gramas_disponiveis)
        gramas_disponiveis.innerHTML=`<option value=${k}>${k} g</option>`


    }
}

}
else if(item[i].includes('legumes')){
lista=document.getElementById('lista_legumes')
item_lista =document.createElement("p")
lista.appendChild(item_lista)   
item_lista.innerHTML=`<div><button class="ingredientes" onclick="obter_valor(this)"  class="botao_selecionar_ing" >${item[i].replace("_legumes","")}</button>
<select id="${variavel+i}" name="qte_ingrediente_selecionada_por_botao" onchange="quantidade_ingrediente_selecionado(this)">
<option value=0>0 g</option>
</select><p>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(/*valores[item[i].replace("_proteinas","")])*/0))}</p></div>` 
gramas = Object.keys(valores[item[i].replace("_legumes","")])
lista_gramas_valores = valores[item[i].replace("_legumes","")]
for(k of gramas){
    if(lista_gramas_valores[k]!=0){
        gramas_disponiveis =document.createElement("option")
        document.getElementById(variavel+i).appendChild(gramas_disponiveis)
        gramas_disponiveis.innerHTML=`<option value=${k}>${k} g</option>`


    }
}


}




}


}

//ZERAR GRAMAS DOS COMBOBOX'S
function zerarItens(){

itens_gramas=document.getElementsByName("qte_ingrediente_selecionada_por_botao")
for(let i=0;i<itens_gramas.length;i++){

    itens_gramas[i].text='0 g'
}}


//FINALIZAR KITS DE MARMITAS
document.getElementById("finalizar_marmitas").addEventListener('click',(e)=>{


ID=localStorage.getItem("ID SESSÃO")
numero_randomico=parseInt(Math.random()*100000)
socket = io()
socket.on('connect',()=>{  
socket.emit('LER_DADOS_SELECIONADOS_KITS_MARMITAS',{idd:ID, n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_FINALIZAR_KIT_MARMITAS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{

 

  valores_gramas=Object.values(JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes']))
  ingredientes=Object.keys(JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes']))

  
  let k=0
  for(i of ingredientes){
    


    if(i.includes('PROTEINAS')){
        k=k+1
    
    }

  }


  for(i of ingredientes){

  
    if(i.includes('CARBOIDRATOS')){
        k=k+1

    }

  }


  for(i of ingredientes){

    if(i.includes('LEGUMES')){
        k=k+1

    }

  }





  for(i in valores_gramas){
    if((parseInt(valores_gramas[i])<250 && parseInt(valores_gramas[i])>75 &&k!=3)){

        alert("Você tem itens menores que 250 gramas!\nSelecione mais que 250 gramas de apenas 1 ingrediente\n\n ou \n\nSelecione pelo menos 1 ingrediente de cada categoria para que seja possível finalizar o kit de marmita")
        return
      
    }
  }


if (dados_selecionadoss_atualizar_tela[0]["edit_monte_seu_cardapio_final_inteiro"]!="true"){

document.getElementById("finalizar_marmitas").innerText="Finalizar esse kit de marmita"
var itens_marmitas_fechadas=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'])          
id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["qte_marmitas_fechadas"])+1

itens_marmitas_fechadas[id_]=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes'])
itens_marmitas_fechadas[id_]['qte']=document.getElementById("qte_marmitas_a_fazer").value
valores_inseridos_na_marmita_fechada=itens_marmitas_fechadas




}else{


if(Object.keys(JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"])).length===1){


document.getElementById("finalizar_marmitas").innerText="Editando itens da marmita (Clique aqui para salvar as alterações)"
id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["id_edit_monte_seu_cardapio_final_inteiro"])
var itens_marmitas_fechadas=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'])
delete itens_marmitas_fechadas[id_]
var valores_inseridos_na_marmita_fechada=itens_marmitas_fechadas


}else{

document.getElementById("finalizar_marmitas").innerText="Editando itens da marmita (Clique aqui para salvar as alterações)"
id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["id_edit_monte_seu_cardapio_final_inteiro"])
var itens_marmitas_fechadas=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'])           
itens_marmitas_fechadas[id_]=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes'])
itens_marmitas_fechadas[id_]['qte']=document.getElementById("qte_marmitas_a_fazer").value
valores_inseridos_na_marmita_fechada=itens_marmitas_fechadas


}

}


let valor_total_ingredientes_total=0
let v=[]
let valor_total_ingredientes_totall=0
for(i of Object.values(valores_inseridos_na_marmita_fechada)){


if(parseFloat(i.qte)>=1){
itens=Object.keys(i)
for(k of itens){

if(k!='qte'){
    let VALOR=valores[k.replace(";LEGUMES ","").replace(";CARBOIDRATOS ","").replace(";PROTEINAS ","")][i[k]]
    
    
    valor_total_ingredientes_total+=VALOR
}else{
    valor_total_ingredientes_total=valor_total_ingredientes_total*parseInt(i[k])
    valor_total_ingredientes_totall+=valor_total_ingredientes_total
    valor_total_ingredientes_total=0
}


}





}


}




document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor_total_ingredientes_totall+parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']))}`



elementos_a_remover = document.getElementById("lista_selecionada")
elementos_a_remover.innerHTML=`<div id="itens_carrinho">`


document.getElementById('lista_proteinas').parentNode.classList.add('blocos')
document.getElementById('lista_proteinas').parentNode.classList.remove('escurecer_bloco')  
document.getElementById('lista_proteinas').parentNode.childNodes[3].innerText='Selecione o peso e clique no ingrediente desejado:'
document.getElementById('lista_carboidratos').parentNode.classList.add('blocos')
document.getElementById('lista_carboidratos').parentNode.classList.remove('escurecer_bloco') 
document.getElementById('lista_carboidratos').parentNode.childNodes[3].innerText='Selecione o peso e clique no ingrediente desejado:' 
document.getElementById('lista_legumes').parentNode.classList.add('blocos')
document.getElementById('lista_legumes').parentNode.classList.remove('escurecer_bloco')   
document.getElementById('lista_legumes').parentNode.childNodes[3].innerText='Selecione o peso e clique no ingrediente desejado:'    

var socket = io.connect(/*{'forceNew': true}*/) 

socket.on('connect',()=>{

socket.emit("INSERINDO_DADOS",{
    

    



    i0:ID,
    i1:'',
    i2:0,
    i3:JSON.stringify(valores_inseridos_na_marmita_fechada),
    i4:'',
    i5:parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']),
    i6:'',
    i7:'',
    i8:'{}',
    i9:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal'],
    i10:'',
    i11:id_,
    i12:0,
    i13:valor_total_ingredientes_totall,
    i14:'false',
    i15:0

    

/*

id_edit_monte_seu_cardapio_final_inteiro            1
valor_total_de_todos_os_pedidos                     2
itens_selecionados_ingredientes_mar_fechada         3
tipo_pagamento                                      4
valor_total_cardapio_semanal                        5
dados_cliente                                       6
msg_coleta_dados                                    7
itens_selecionados_ingredientes                     8
itens_selecionados_cardapio_semanal                 9
vendas_finalizadas                                  10
qte_marmitas_fechadas                               11
valor_total_ingredientes                            12
valor_total_ingredientes_total                      13
edit_monte_seu_cardapio_final_inteiro               14
valor_total_TUDO                                    15
qte_cliques                                         16    

*/

})
    document.getElementById("finalizar_marmitas").classList.remove('pisca_pisca_aviso')
    document.getElementById("finalizar_marmitas").innerText='Finalizar este kit de marmita'

}
)}

)





window.scrollTo(0,0,"smooth")
})

})
 
//MUDANDO A QUANTIDADE DE MARMITAS -> QTE DESSA MARMITA
qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").addEventListener('change',()=>{




var socket = io.connect(/*{'forceNew': true}*/)  
var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{



qte_marmitas_a_fazer_=document.getElementById("qte_marmitas_a_fazer").value
let valores_da_marmita_sendo_montada_agora=Object.values(JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"]))


let itens_da_marmita_sendo_montada_agora=Object.keys(JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"]))

let soma=0
for(valor_marmita_atual in valores_da_marmita_sendo_montada_agora){

ingrediente = itens_da_marmita_sendo_montada_agora[valor_marmita_atual].replace(";PROTEINAS ","").replace(";CARBOIDRATOS ","").replace(";LEGUMES ","")
valor =valores_da_marmita_sendo_montada_agora[valor_marmita_atual]


if(itens_da_marmita_sendo_montada_agora[valor_marmita_atual]!="qte"){
soma+=parseFloat(valores[ingrediente][valor])
}
}
soma=soma*parseFloat(qte_marmitas_a_fazer_)


document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(soma)}`

})

})


preencherItens()
window.scrollTo(0,10000,"smooth")
zerarItens()

})}

//FECHAR TELA CARRINHO
function fecharTela(){
elemento=document.getElementById("itens_carrinho_fechado").parentNode
elemento.innerHTML="<div id='itens_carrinho_fechado' style='background-color: white;'>"

}



//EDITA UM ITEM DO CARRINHO
function editar(elemento){

if(elemento.parentNode.childNodes.length===1){
var id_selecionado = parseFloat(elemento.parentNode.parentNode.childNodes[1].innerText)
var ID=localStorage.getItem('ID SESSÃO')
socket = io.connect()  
socket.on('connect',()=>{

numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{

    

//qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").value



let id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["qte_marmitas_fechadas"])
let  itens_selecionados_ingredientes=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'])
ISI = itens_selecionados_ingredientes[id_selecionado]


    
socket.emit("INSERINDO_DADOS",{


    i0:ID,
    i1:id_selecionado,
    i2:0,
    i3:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'],
    i4:'',
    i5:parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']),
    i6:'',
    i7:'',
    i8:JSON.stringify(ISI),
    i9:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal'],
    i10:'',
    i11:id_,
    i12:0,
    i13:0,
    i14:'true',
    i15:0




/*

id_edit_monte_seu_cardapio_final_inteiro            1
valor_total_de_todos_os_pedidos                     2
itens_selecionados_ingredientes_mar_fechada         3
tipo_pagamento                                      4
valor_total_cardapio_semanal                        5
dados_cliente                                       6
msg_coleta_dados                                    7
itens_selecionados_ingredientes                     8
itens_selecionados_cardapio_semanal                 9
vendas_finalizadas                                  10
qte_marmitas_fechadas                               11
valor_total_ingredientes                            12
valor_total_ingredientes_total                      13
edit_monte_seu_cardapio_final_inteiro               14
valor_total_TUDO                                    15
qte_cliques                                         16

*/

})

window.location="monte_seu_cardapio.html"
})

})






}
else{
window.location="cardapio_da_semana.html"


}}

function telaInicial(){
window.location="./"
}

//VAI PARA A TELA DO PAGAMENTO
function irTelaPagamento(soma){

if (soma===0){
alert('Nenhum item adicionado no carrinho! Adicione algum item no carrinho!')
return
}else{
window.location="pagamento.html"  
}

}

//VAI PARA A TELA DE CADASTRO
function irParaOCadastro(soma){
if (soma===0){
alert('Nenhum item adicionado no carrinho! Adicione algum item no carrinho!')
return
}else{


socket.emit('ATUALIZAR_DADOS_VALOR_COMPRA', {id:localStorage.getItem('ID SESSÃO'), valor:soma});


}

window.location="cadastro.html"  
}

function quantidade_ingrediente_selecionado(elemento){



botoes_valores_selecionados=document.getElementsByName("qte_ingrediente_selecionada_por_botao")


for(i of botoes_valores_selecionados){



valores_gramas_ingredientes=i.parentNode.getElementsByTagName('button')[0].parentNode.childNodes[2].value


if(valores_gramas_ingredientes==='0'){


    i.parentNode.getElementsByTagName('p')[0].innerHTML= `R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
        minimumFractionDigits:2, maximumFractionDigits:2,
    useGrouping:'always'}).format(0*parseFloat(0))}`
    i.parentNode.classList.remove('ingrediente_gramas_maior_que_zero')
    

}else{
    i.parentNode.getElementsByTagName('p')[0].innerHTML= `R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
        minimumFractionDigits:2, maximumFractionDigits:2,
    useGrouping:'always'}).format(parseFloat(valores[i.parentNode.getElementsByTagName('button')[0].innerHTML][i.value.replace(" g","")]))}`
    i.parentNode.classList.add('ingrediente_gramas_maior_que_zero')
    

}


}
  
}

//OBTER GRAMA SELECIONADA AO CLICAR NO INGREDIENTE
function obter_valor(elemento){


var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket = io()
socket.on('connect',()=>{   
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{



qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").value
elemento.parentNode.classList.remove('ingrediente_gramas_maior_que_zero')


let id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["qte_marmitas_fechadas"])


ing=elemento.innerHTML    
let gramas = elemento.parentNode.childNodes[2].value.replace(" g","")

let valor=valores[ing][gramas]

qte = elemento.parentNode.getElementsByTagName("select")[0].value
categoria=elemento.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText

secao=elemento.parentNode.parentNode.parentNode.parentNode

botoes=elemento.parentNode.parentNode.parentNode.getElementsByTagName('button')



if(elemento.parentNode.childNodes[2].value==='0'){

alert('Selecione uma quantidade! Quantidade de gramas não pode ser 0g!')
return
}




itens_ja_armazenados=Object.keys(JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"]))


for(i in itens_ja_armazenados){
if(itens_ja_armazenados[i]===ing){

alert("O item já foi selecionado! Verifique a lista!")
window.scrollTo(0,10000,"smooth")
return 
}
}


for(let i=0;i<botoes.length;i++){
botoes[i].classList.add('desativar_clique')
secao.classList.add('escurecer_bloco')
secao.childNodes[3].textContent="Impossível selecionar novos itens, para isso, exclua o item adicionado"

}



if(!(ing in itens_ja_armazenados)){
lista=document.getElementById('lista_selecionada')
novoItem=document.createElement("p")
lista.appendChild(novoItem)


valor_total= parseFloat(dados_selecionadoss_atualizar_tela[0]["valor_total_ingredientes"])+valor*qte_marmitas_a_fazer

let vendas={alimento_selecionado:"",valor:""}



count =parseInt(dados_selecionadoss_atualizar_tela[0]["qte_cliques"])+1





lista_id_ingredientes = document.getElementsByTagName('label')









elemento.parentNode.childNodes[2].value='0'
switch(gramas){
case '75':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"   >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]

for(k of gramas_){
if(k!='75'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}


break
case '100':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" "  >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){
if(k!='100'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
case '150':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"   >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){
if(k!='150'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k 
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
case '200':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"  >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){
if(k!='200'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k 
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
case '250':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"   >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){
if(k!='250'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k 
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
case '300':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"   >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){
if(k!='300'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k 
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
case '400':

novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}"   >${categoria+' '+ing+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
</select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        gramas_ = Object.keys(valores[ing])
lista_gramas_valores = valores[ing]
for(k of gramas_){

if(k!='400'){
if(lista_gramas_valores[k]!=0){
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k
    gramas_disponiveis.innerText=k+' g'


}
}else{
    gramas_disponiveis =document.createElement("option")
    document.getElementById(200000+count).appendChild(gramas_disponiveis)
    gramas_disponiveis['value']=k 
    gramas_disponiveis['selected']='selected'
    gramas_disponiveis.innerText=k+' g'
}
}

break
}



let qte_itens_adicionados = document.getElementsByClassName("btn-excluir").length

itens_ja_armazenados=JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"])


itens_ja_armazenados[';'+categoria+' '+ing]=gramas


document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(valor_total)}`
qte_itens_lista = Object.keys(itens_ja_armazenados).length


}



var ID=localStorage.getItem("ID SESSÃO")
var socket = io.connect(/*{'forceNew': true}*/) 
socket.on('connect',()=>{

    
socket.emit("INSERINDO_DADOS",{


    i0:ID,
    i1:dados_selecionadoss_atualizar_tela[0]['id_edit_monte_seu_cardapio_final_inteiro'],
    i2:0,
    i3:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'],
    i4:'',
    i5:parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']),
    i6:'',
    i7:'',
    i8:JSON.stringify(itens_ja_armazenados),
    i9:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal'],
    i10:'',
    i11:id_,
    i12:valor_total,
    i13:valor_total,
    i14:dados_selecionadoss_atualizar_tela[0]['edit_monte_seu_cardapio_final_inteiro'],
    i15:0,
    i16:count




/*

id_edit_monte_seu_cardapio_final_inteiro            1
valor_total_de_todos_os_pedidos                     2
itens_selecionados_ingredientes_mar_fechada         3
tipo_pagamento                                      4
valor_total_cardapio_semanal                        5
dados_cliente                                       6
msg_coleta_dados                                    7
itens_selecionados_ingredientes                     8
itens_selecionados_cardapio_semanal                 9
vendas_finalizadas                                  10
qte_marmitas_fechadas                               11
valor_total_ingredientes                            12
valor_total_ingredientes_total                      13
edit_monte_seu_cardapio_final_inteiro               14
valor_total_TUDO                                    15
qte_cliques                                         16

*/

})


})

})

}
)
window.scrollTo(0,4000)
}
//REMOVER INGREDIENTE ADICIONADO
function remover_(elemento){

   

    
                                

var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_REMOVER`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{



id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["qte_marmitas_fechadas"])
id__=parseFloat(dados_selecionadoss_atualizar_tela[0]['id_edit_monte_seu_cardapio_final_inteiro'])


lista_itens=JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'])



qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").value
    
nome_elemento=elemento.parentNode.getElementsByTagName("label")[0].textContent
nome_elemento = nome_elemento.substring(0,nome_elemento.indexOf("  ")-1)


let vendas = JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"])

delete vendas[`;${nome_elemento.substring(0,nome_elemento.length)}`] 



elemento.parentNode.remove()




let valor_total_elemento=document.getElementById("valor_total")



let valores__ = vendas

itensss_=Object.keys(valores__)
valores_=Object.values(valores__)
let i=0
let valor
let soma=0


for(valor of valores_){
    

    if(itensss_[i]!="qte"){                
    soma+=parseFloat(valores[itensss_[i].replace(";LEGUMES ","").replace(";PROTEINAS ","").replace(";CARBOIDRATOS ","")][valores_[i]])
                
    }
i+=1
}
soma=soma*parseFloat(qte_marmitas_a_fazer)


valor_total_elemento.textContent=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(soma)}`




const proteinas_______ = ingredientes.split(';').filter(i=>{return i.includes('proteinas')})
const carboidratos_______ = ingredientes.split(';').filter(i=>{return i.includes('carboidratos')})
const legumes_______ = ingredientes.split(';').filter(i=>{return i.includes('legumes')})


for(k in proteinas_______){
nome_elemento=nome_elemento.replace("CARBOIDRATOS ",'').replace("PROTEINAS ",'').replace("LEGUMES ",'')
    if(nome_elemento === proteinas_______[k].replace("_proteinas",'')){

    
        document.getElementById('lista_proteinas').parentNode.classList.remove('escurecer_bloco') 
        document.getElementById('lista_proteinas').parentNode.classList.add('blocos')
        document.getElementById('lista_proteinas').parentNode.childNodes[3].textContent='Selecione o peso e clique no ingrediente desejado:'
        
    }
}
for(k in carboidratos_______){
    if(nome_elemento === carboidratos_______[k].replace("_carboidratos",'')){

        document.getElementById('lista_carboidratos').parentNode.classList.remove('escurecer_bloco')
        document.getElementById('lista_carboidratos').parentNode.classList.add('blocos')
        document.getElementById('lista_carboidratos').parentNode.childNodes[3].textContent='Selecione o peso e clique no ingrediente desejado:'
    
    }
}
for(k in legumes_______){
    if(nome_elemento === legumes_______[k].replace("_legumes",'')){

        document.getElementById('lista_legumes').parentNode.classList.remove('escurecer_bloco')
        document.getElementById('lista_legumes').parentNode.classList.add('blocos')
        document.getElementById('lista_legumes').parentNode.childNodes[3].textContent='Selecione o peso e clique no ingrediente desejado:'
        
        
    }
}

edit_monte_seu_cardapio_final_inteiro = dados_selecionadoss_atualizar_tela[0]['edit_monte_seu_cardapio_final_inteiro']
var ID=localStorage.getItem("ID SESSÃO")
var socket = io.connect() 
socket.on('connect',()=>{
socket.emit("INSERINDO_DADOS",{

    i0:ID,
    i1:id__,
    i2:0,
    i3:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'],
    i4:'',
    i5:parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']),
    i6:'',
    i7:'',
    i8:JSON.stringify(vendas),
    i9:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal'],
    i10:'',
    i11:id_,
    i12:soma,
    i13:0,
    i14:edit_monte_seu_cardapio_final_inteiro,
    i15:0


/*

id_edit_monte_seu_cardapio_final_inteiro            1
valor_total_de_todos_os_pedidos                     2
itens_selecionados_ingredientes_mar_fechada         3
tipo_pagamento                                      4
valor_total_cardapio_semanal                        5
dados_cliente                                       6
msg_coleta_dados                                    7
itens_selecionados_ingredientes                     8
itens_selecionados_cardapio_semanal                 9
vendas_finalizadas                                  10
qte_marmitas_fechadas                               11
valor_total_ingredientes                            12
valor_total_ingredientes_total                      13
edit_monte_seu_cardapio_final_inteiro               14
valor_total_TUDO                                    15
qte_cliques                                         16


*/

})


})

    })
}

//ALTERAR GRAMAS DO INGREDIENTE
function alterar(elemento){   


var socket = io.connect()  
var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{

id_ = parseFloat(dados_selecionadoss_atualizar_tela[0]["qte_marmitas_fechadas"])



qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").value

let qte= elemento.value.replace(" g","")

nome_elemento=elemento.parentNode.getElementsByTagName("label")[0].textContent
let soma=0

let vendas = JSON.parse(dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"])

nome_elemento = nome_elemento.substring(0,nome_elemento.indexOf("  ")-1)
vendas[';'+nome_elemento]=qte

let valor_total_elemento=document.getElementById("valor_total")


let valores_=vendas

itensss_=Object.keys(valores_)
valores_=Object.values(valores_)
let i=0
let valor

for(valor of valores_){
    

    if(itensss_[i]!="qte"){                
    soma+=parseFloat(valores[itensss_[i].replace(";LEGUMES ","").replace(";PROTEINAS ","").replace(";CARBOIDRATOS ","")][valores_[i]])
                
    }
i+=1
}
soma=soma*parseFloat(qte_marmitas_a_fazer)

valor_total_elemento.textContent=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(soma)}`


valor_total_de_todos_os_pedidos	= dados_selecionadoss_atualizar_tela[0]['valor_total_de_todos_os_pedidos']
itens_selecionados_ingredientes_mar_fechada =dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada']
valor_total_cardapio_semanal = dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']
msg_coleta_dados = dados_selecionadoss_atualizar_tela[0]['msg_coleta_dados']
itens_selecionados_ingredientes = dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes']
itens_selecionados_cardapio_semanal = dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal']
qte_marmitas_fechadas = dados_selecionadoss_atualizar_tela[0]['qte_marmitas_fechadas']
valor_total_ingredientes = dados_selecionadoss_atualizar_tela[0]['valor_total_ingredientes']
valor_total_ingredientes_total = dados_selecionadoss_atualizar_tela[0]['valor_total_ingredientes_total']
valor_total_TUDO = dados_selecionadoss_atualizar_tela[0]['valor_total_TUDO']
edit_monte_seu_cardapio_final_inteiro = dados_selecionadoss_atualizar_tela[0]['edit_monte_seu_cardapio_final_inteiro']

var ID=localStorage.getItem("ID SESSÃO")
var socket = io.connect() 
socket.on('connect',()=>{
socket.emit("INSERINDO_DADOS",{

    i0:ID,
    i1:dados_selecionadoss_atualizar_tela[0]['id_edit_monte_seu_cardapio_final_inteiro'],
    i2:0,
    i3:dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada'],
    i4:'',
    i5:parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']),
    i6:'',
    i7:'',
    i8:JSON.stringify(vendas),
    i9:itens_selecionados_cardapio_semanal,
    i10:'',
    i11:id_,
    i12:0,
    i13:0,
    i14:edit_monte_seu_cardapio_final_inteiro,
    i15:0


/*

id_edit_monte_seu_cardapio_final_inteiro            1
valor_total_de_todos_os_pedidos                     2
itens_selecionados_ingredientes_mar_fechada         3
tipo_pagamento                                      4
valor_total_cardapio_semanal                        5
dados_cliente                                       6
msg_coleta_dados                                    7
itens_selecionados_ingredientes                     8
itens_selecionados_cardapio_semanal                 9
vendas_finalizadas                                  10
qte_marmitas_fechadas                               11
valor_total_ingredientes                            12
valor_total_ingredientes_total                      13
edit_monte_seu_cardapio_final_inteiro               14
valor_total_TUDO                                    15
qte_cliques                                         16 


*/

})

})

})


}


//EXIBIR O CARRINHO DE COMPRAS
document.getElementById('exibir-carrinho').addEventListener("click",()=>{
    


    var ID=localStorage.getItem('ID SESSÃO')
    numero_randomico=parseInt(Math.random()*100000)
    socket = io()   
    socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
    socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{

    


    let ITEM_PROTEINA=''
    let ITEM_CARBOIDRATO=''
    let ITEM_LEGUME=''
    let VALOR_PROTEINA=''
    let VALOR_CARBOIDRATO=''
    let VALOR_LEGUME=''
    
            let lista_=[]
            let vv=0
            let j=1
            let  VALOR_TOTAL=0
            let soma4=0

            let vendas_=dados_selecionadoss_atualizar_tela[0]['itens_selecionados_cardapio_semanal']

            let vendas___=JSON.parse(vendas_)
    
            let vendas_1=dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada']

            



            let vendas___1=JSON.parse(vendas_1)

            for(item in vendas___1){
                qtes_itens_da_marmita=vendas___1[item]
                itens_dos_itens_da_marmita_= Object.keys(JSON.parse(JSON.stringify(vendas___1[item])))
                
                valores_dos_itens_da_marmita_= Object.values(JSON.parse(JSON.stringify(vendas___1[item])))
                
                
                for(valor of valores_dos_itens_da_marmita_){
      
                    
                    if(itens_dos_itens_da_marmita_[j-1]!="qte" || itens_dos_itens_da_marmita_[j-1]!="0" ){
        
                    if(valor>=75 && !isNaN(valor)){
                VALOR_TOTAL+=parseFloat(valores[itens_dos_itens_da_marmita_[j-1].replace(";CARBOIDRATOS ","").replace(";PROTEINAS ","").replace(";LEGUMES ","")][valor])
                    }
                    }
                else{
                    VALOR_TOTAL=VALOR_TOTAL*parseFloat(valor)
                    soma4+=VALOR_TOTAL
             
                }
        
        
                j+=1  
                
                }
                j=1
                VALOR_TOTAL=0
            }
            
            let VALORR_TOTAL=0
            let itens=[]
            let valoresssss =[]
            let soma=0
            let soma1=0
            let soma2=0
            let multiplicador=0
        
        
            for(item of Object.values(vendas___)){
        
                itens.push(item.substring(0,item.indexOf("R$")-5).replace("Pedido","Pedido %%%%").replace("TRADICIONAL","%%%% TRADICIONAL"))
                valoresssss.push(item.substring(item.indexOf('R$')+3,item.length).replace(",",'.'))
                soma2+=parseFloat(item.substring(item.indexOf('R$')+3,item.length).replace(",",'.'))
                }
                id_marmita=0
                let QTE_MARMITAS_FECHADAS=""
                id_verdadeiro=Object.keys(vendas___1)
            for(item of Object.values(vendas___1)){
                
                itens_dessa_marmita=Object.keys(item)
                valores_dessa_marmita=Object.values(item)
                texto=""
                j=1
                
                
                for(v in item){
                    vv+=parseFloat(item[v])           
                }
                
                if(vv!=0){
                soma_todos_os_itens_da_marmita_por_marmita=0
                for(item in valores_dessa_marmita){
                    
                    if(itens_dessa_marmita[j-1]!="qte"){

                        texto=texto+" |"+itens_dessa_marmita[j-1]+" |R$ "
                        +Intl.NumberFormat("pt-BR",{style:'decimal',
                            minimumFractionDigits:2, maximumFractionDigits:2,
                        useGrouping:'always'}).format(valores_dessa_marmita[j-1])+" "
                        soma_todos_os_itens_da_marmita_por_marmita+=parseFloat(valores[itens_dessa_marmita[j-1].replace(";CARBOIDRATOS ","").replace(";PROTEINAS ","").replace(";LEGUMES ","")][valores_dessa_marmita[j-1]])                    
        
                        j+=1
                    
                    }
                    else if(itens_dessa_marmita[j-1]==="qte" && j===0){
                        multiplicador=parseFloat(valores_dessa_marmita[j-1])
                        QTE_MARMITAS_FECHADAS=" MONTE SUA MARMITA, qte: "+valores_dessa_marmita[j-1]
                        j+=1
                    }
                    else if(itens_dessa_marmita[j-1]==="qte" && j!=0){
                        multiplicador=parseFloat(valores_dessa_marmita[j-1])
                        QTE_MARMITAS_FECHADAS=" MONTE SUA MARMITA, qte: "+valores_dessa_marmita[j-1]
                        j+=1
                    }
                    
    
                }
               
         
                soma_todos_os_itens_da_marmita_por_marmita=soma_todos_os_itens_da_marmita_por_marmita*multiplicador
                soma1+=soma_todos_os_itens_da_marmita_por_marmita
                itens.push("Nº marmita: %%%%"+id_verdadeiro[id_marmita]+"%%%% "+QTE_MARMITAS_FECHADAS+'(((('+texto+'((((')
                valoresssss.push(soma_todos_os_itens_da_marmita_por_marmita)
            }
            vv=0
            id_marmita+=1

        }
        
    
            soma=soma1+soma2
            somatoria_tudo=soma
            lista=document.getElementById('itens_carrinho_fechado')
            lista.style="background-color: blue;"
            lista.innerHTML=`<div id="itens_carrinho_aberto" class="">
            <img id="fechar_tela" onclick="fecharTela()" class="btn-excluir" src="./public/images/btn-excluir.png" alt="">
            <button id="end-all" onclick='irParaOCadastro(${soma})'>Finalizar todos os pedidos</button><a/>
    Lista dos itens selecionados:</div> <h4>Valor Total: R$
            ${Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(soma)}
            </h4> <h6>(Monte sua marmita R$ 
            ${Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(soma1)}
            , Cardápio da Semana R$
            ${Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(soma2)})</h6>
            </div>`
        
    
    
    
    lista=document.getElementById('itens_carrinho_fechado')
    
    for(item in itens){
    var novoItem=document.createElement(`p`)
    lista.appendChild(novoItem)
    lista_.push(itens[item]+', subtotal: '+valoresssss[item])
    soma+=valoresssss[item]
    }



    if (parseFloat(soma)===0){
        novoItem.innerHTML=''
        
    }
    else if(soma2===0){
    
        novoItem.innerHTML=`<table id='tabela-carrinho-monte_sua_marmita' border="1px solid black">
        <tr class="linhas_tabela">
        <td class="cabecalho_tabela">ID</td><td class="cabecalho_tabela">TIPO MARMITA</td><td class="cabecalho_tabela">QTE</td><td class="cabecalho_tabela">PROTEINA</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">CARBOIDRATO</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">LEGUMES/SALADAS</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">VALOR TOTAL</td><td class="cabecalho_tabela">OPÇÕES</td>
        </tr>
        </table>
        `
    
    }
    else if(soma1===0){
    
        novoItem.innerHTML=`<table id='tabela-carrinho-cardapio-semanal' border="1px solid black">
        <tr class="linhas_tabela">
        <td class="cabecalho_tabela">ID</td><td class="cabecalho_tabela">TIPO MARMITA</td><td class="cabecalho_tabela">QTE</td><td class="cabecalho_tabela">TAMANHO</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">PRINCIPAL 1</td><td class="cabecalho_tabela">PRINCIPAL 2</td><td class="cabecalho_tabela">PADRÃO</td><td class="cabecalho_tabela">GUARNIÇÃO 1</td><td class="cabecalho_tabela">GUARNIÇÃO 2</td><td class="cabecalho_tabela">VALOR TOTAL</td>
        </tr>
        </table>
        <button onclick="editar(this)" title='Clique aqui para editar esse item'>EDITAR <img id="editar_item"  class="btn-editar_item" src="./public/images/btn-editar_item.jpg" alt=""></button>
        `
    }
    else if(soma1>0 && soma2>0){
    
        novoItem.innerHTML=`<table id='tabela-carrinho-cardapio-semanal' border="1px solid black">
        <tr class="linhas_tabela">
        <td class="cabecalho_tabela">ID</td><td class="cabecalho_tabela">TIPO MARMITA</td><td class="cabecalho_tabela">QTE</td><td class="cabecalho_tabela">TAMANHO</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">PRINCIPAL 1</td><td class="cabecalho_tabela">PRINCIPAL 2</td><td class="cabecalho_tabela">PADRÃO</td><td class="cabecalho_tabela">GUARNIÇÃO 1</td><td class="cabecalho_tabela">GUARNIÇÃO 2</td><td class="cabecalho_tabela">VALOR TOTAL</td>
        </tr>
        </table>
        <button onclick="editar(this)" title='Clique aqui para editar esse item'>EDITAR <img id="editar_item"  class="btn-editar_item" src="./public/images/btn-editar_item.jpg" alt=""></button>
        <br>
        <br>
        <table id='tabela-carrinho-monte_sua_marmita' border="1px solid black">
        <tr class="linhas_tabela">
        <td class="cabecalho_tabela">ID</td><td class="cabecalho_tabela">TIPO MARMITA</td><td class="cabecalho_tabela">QTE</td><td class="cabecalho_tabela">PROTEINA</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">CARBOIDRATO</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">LEGUMES/SALADAS</td><td class="cabecalho_tabela">VALOR</td><td class="cabecalho_tabela">VALOR TOTAL</td><td class="cabecalho_tabela">OPÇÕES</td>
        </tr>
        </table>
        `
    
    }
        
        for(let k=0;k<=lista_.length-1;k++){
        itemmmmmmmmmmm=lista_[k]
        if (itemmmmmmmmmmm.includes('TRADICIONAL')){
        tabela_cardapio_semanal=document.getElementById('tabela-carrinho-cardapio-semanal')
        nova_linha=document.createElement('tr')
        tabela_cardapio_semanal.appendChild(nova_linha)
        tabela_cardapio_semanal.innerHTML+=`<tr class="linhas_tabela">
        <td id='c${(k*10)+0}'></td>
        <td id='c${(k*10)+1}'></td>
        <td id='c${(k*10)+2}'></td>
        <td id='c${(k*10)+3}'></td>
        <td id='c${(k*10)+4}'></td>
        <td id='c${(k*10)+5}'></td>
        <td id='c${(k*10)+6}'></td>
        <td id='c${(k*10)+7}'></td>
        <td id='c${(k*10)+8}'></td>
        <td id='c${(k*10)+9}'></td>
        <td id='c${(k*10)+10.1}'></td>
        </tr>`
        let qte_inicio=lista_[k].indexOf('quantidade: ')+12
        let qte_fim = qte_inicio+1
        let ingredientes_inicio=lista_[k].indexOf('TRADICIONAL')-1
        let ingredientes_fim = lista_[k].indexOf('quantidade: ')
        let tamanho_inicio=lista_[k].indexOf('Tamanho')+8
        let tamanho_fim = tamanho_inicio+1
        let valor_inicio=lista_[k].indexOf('subtotal: ')+10
        let valor_fim = valor_inicio+5
        let lista_ingredientes=itemmmmmmmmmmm.substring(ingredientes_inicio+24,ingredientes_fim).split(";")
        let obter_qtde=itemmmmmmmmmmm.substring(qte_inicio,qte_fim)
        let obter_tamanho=itemmmmmmmmmmm.substring(tamanho_inicio,tamanho_fim)
        let obter_valor=itemmmmmmmmmmm.substring(valor_inicio,valor_fim)
        let obterID_T=itemmmmmmmmmmm.split("%%%%")[1]
        document.getElementById(`c${(k*10)+0}`).innerText=obterID_T
        document.getElementById(`c${(k*10)+1}`).innerText='TRADICIONAL'
        document.getElementById(`c${(k*10)+2}`).innerText=obter_qtde
        document.getElementById(`c${(k*10)+3}`).innerText=obter_tamanho
        document.getElementById(`c${(k*10)+4}`).innerText=Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
        useGrouping:'always'}).format(obter_valor/obter_qtde)
        for(i of lista_ingredientes){
            
            if(i.includes('PRINCIPAL')){
                if(i.includes(' e ')){
                ipp=i.replace("PRINCIPAL:",'').split(' e ')
                }   
                else{

                    ipp=(i.replace("PRINCIPAL:",'')+' e ').split(' e ')
        

                }

                
                }
                else if(i.includes('PADRÃO')){
                    if(i.includes(' e ')){
                    ip=i.replace("PADRÃO:",'').split(' e ')
                }   
                else{
                    ip=(i.replace("PADRÃO:",'')+' e ').split(' e ')
                }
                
                }
                else if(i.includes('GUARNIÇÃO')){
                    if(i.includes(' e ')){
                    ig=i.replace("GUARNIÇÃO:",'').split(' e ')
                }   
                else{
                    ig=(i.replace("GUARNIÇÃO:",'')+' e ').split(' e ')
                }
                    
                }
        }
        document.getElementById(`c${(k*10)+5}`).innerText=ipp[0]
        document.getElementById(`c${(k*10)+6}`).innerText=ipp[1]
        document.getElementById(`c${(k*10)+7}`).innerText=ip[0]
        document.getElementById(`c${(k*10)+8}`).innerText=ig[0].replace(",","")
        document.getElementById(`c${(k*10)+9}`).innerText=ig[1].replace(",","")
        document.getElementById(`c${(k*10)+10.1}`).innerText=Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
        useGrouping:'always'}).format(obter_valor)
        }
        else{
          var  tabela_monte_sua_marmita=document.getElementById('tabela-carrinho-monte_sua_marmita')
        nova_linha=document.createElement('tr')
        tabela_monte_sua_marmita.appendChild(nova_linha)
        tabela_monte_sua_marmita.innerHTML+=`<tr class="linhas_tabela">
        <td id='c${(k*10)+0}'></td>
        <td id='c${(k*10)+1}'></td>
        <td id='c${(k*10)+2}'></td>
        <td id='c${(k*10)+3}'></td>
        <td id='c${(k*10)+4}'></td>
        <td id='c${(k*10)+5}'></td>
        <td id='c${(k*10)+6}'></td>
        <td id='c${(k*10)+7}'></td>
        <td id='c${(k*10)+8}'></td>
        <td id='c${(k*10)+9}'></td>
        <td id='c${(k*10)+10.1}'></td>
        </tr>`
        
            let qte_inicio=lista_[k].indexOf('qte')+5
            let qte_fim = qte_inicio+1
            let ingredientes=lista_[k].split('((((')[1].split('|')
            let obter_qtde=itemmmmmmmmmmm.substring(qte_inicio,qte_fim)

            let obterID_M=itemmmmmmmmmmm.split("%%")[2]
            for(let i=0;i<ingredientes.length;i++){
                if (ingredientes[i].includes("PROTEINA")){
                    ITEM_PROTEINA=ingredientes[i].replace(";PROTEINAS ",'')
                    VALOR_PROTEINA=ingredientes[i+1].replace("R$ ",'')
                }
                if (ingredientes[i].includes("CARBOIDRATO")){
                    ITEM_CARBOIDRATO=ingredientes[i].replace(";CARBOIDRATOS ",'')
                    VALOR_CARBOIDRATO=ingredientes[i+1].replace("R$ ",'')
                }
                if (ingredientes[i].includes("LEGUME")){
                    ITEM_LEGUME=ingredientes[i].replace(";LEGUMES ",'')
                    VALOR_LEGUME=ingredientes[i+1].replace("R$ ",'')
                }
            }
        
    
            document.getElementById(`c${(k*10)+0}`).innerText=obterID_M
            document.getElementById(`c${(k*10)+1}`).innerText='MONTE SUA MARMITA'
            document.getElementById(`c${(k*10)+2}`).innerText=obter_qtde

            if(ITEM_PROTEINA){
            document.getElementById(`c${(k*10)+3}`).innerText=ITEM_PROTEINA
            document.getElementById(`c${(k*10)+4}`).innerText=Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valores[ITEM_PROTEINA.slice(0,-1)][parseFloat(VALOR_PROTEINA)])
            valooooooooooor_proteinas=valores[ITEM_PROTEINA.slice(0,-1)][parseFloat(VALOR_PROTEINA)]
            }
            else{
                valooooooooooor_proteinas=0
            }

            if(ITEM_CARBOIDRATO){
            document.getElementById(`c${(k*10)+5}`).innerText=ITEM_CARBOIDRATO       
            document.getElementById(`c${(k*10)+6}`).innerText=Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valores[ITEM_CARBOIDRATO.slice(0,-1)][parseFloat(VALOR_CARBOIDRATO)])  
            valooooooooooor_carboidratos= valores[ITEM_CARBOIDRATO.slice(0,-1)][parseFloat(VALOR_CARBOIDRATO)]  
            }
            else{
                valooooooooooor_carboidratos=0
            }
            
            if(ITEM_LEGUME){
            document.getElementById(`c${(k*10)+7}`).innerText=ITEM_LEGUME
            document.getElementById(`c${(k*10)+8}`).innerText=Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valores[ITEM_LEGUME.slice(0,-1)][parseFloat(VALOR_LEGUME)])
            valooooooooooor_legumes=valores[ITEM_LEGUME.slice(0,-1)][parseFloat(VALOR_LEGUME)]

            }
            else{
                valooooooooooor_legumes=0
            }

 
            


            document.getElementById(`c${(k*10)+9}`).innerText= Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(obter_qtde)*(valooooooooooor_legumes+valooooooooooor_carboidratos+valooooooooooor_proteinas))
            document.getElementById(`c${(k*10)+10.1}`).innerHTML=`<button onclick="editar(this)" title='Clique aqui para editar esse item'>EDITAR <img id="editar_item"  class="btn-editar_item" src="./public/images/btn-editar_item.jpg" alt=""></button>`
            VALOR_PROTEINA=''
            VALOR_CARBOIDRATO=''
            VALOR_LEGUME=''
            ITEM_PROTEINA=''
            ITEM_CARBOIDRATO=''
            ITEM_LEGUME=''
        
        }
        
        }
        }
        
            )

            window.scrollTo(0,0,"smooth")
})

//AO CARREGAR/RECARREGAR A PÁGINA(F5)
var socket = io.connect()  
var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionadoss_atualizar_tela)=>{



if(dados_selecionadoss_atualizar_tela[0]["edit_monte_seu_cardapio_final_inteiro"]==="true"){




           


    ID_____=parseFloat(dados_selecionadoss_atualizar_tela[0]['id_edit_monte_seu_cardapio_final_inteiro'])
       
  

    itens_selecionados_ingredientes_lida=dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada']

    
    objeto_itens_ja_salvos=JSON.parse(itens_selecionados_ingredientes_lida)
    qte_dessa_marmita=objeto_itens_ja_salvos[ID_____].qte

    


    itens_ja_salvos=Object.keys(objeto_itens_ja_salvos[ID_____])
    valores_ja_salvos=Object.values(objeto_itens_ja_salvos[ID_____])
    let s=0

    for(itenssss in valores_ja_salvos){
        if(itens_ja_salvos[itenssss]!="qte"){
            
    s+=parseFloat(valores[itens_ja_salvos[itenssss].replace(";CARBOIDRATOS ","").replace(";LEGUMES ","").replace(";PROTEINAS ","")][valores_ja_salvos[itenssss]])
        }
    }
    
    


    document.getElementById("finalizar_marmitas").innerText="Editando itens da marmita (Clique aqui para salvar as alterações)"
       
        document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
        useGrouping:'always'}).format(s*qte_dessa_marmita)}`

    

}else{






    ID_____=99999

    let itens_selecionados_ingredientes_lida=dados_selecionadoss_atualizar_tela[0]["itens_selecionados_ingredientes"]

    itens_ja_salvos=Object.keys(JSON.parse(itens_selecionados_ingredientes_lida))
    valores_ja_salvos=Object.values(JSON.parse(itens_selecionados_ingredientes_lida))
    objeto_itens_ja_salvos=""
    qte_dessa_marmita=document.getElementById("qte_marmitas_a_fazer").value
   



    const monte_sua_marmita_total_geral=Object.values(JSON.parse(dados_selecionadoss_atualizar_tela[0]['itens_selecionados_ingredientes_mar_fechada']))
    
    let soma_monte_sua_marmita_total_geral=0
    let u=0
    for(i in monte_sua_marmita_total_geral){
        
        val=Object.values(monte_sua_marmita_total_geral[i])   
        ite=Object.keys(monte_sua_marmita_total_geral[i])   
        if(val.length>1){     
        u=0


        
    
        
    }
}


    


   
        document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
        useGrouping:'always'}).format(parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_ingredientes_total'])+parseFloat(dados_selecionadoss_atualizar_tela[0]['valor_total_cardapio_semanal']))}`
    

    


}
lista=document.getElementById('lista_selecionada')

const proteinas_______ = ingredientes.split(';').filter(i=>{return i.includes('proteinas')})
const carboidratos_______ = ingredientes.split(';').filter(i=>{return i.includes('carboidratos')})
const legumes_______ = ingredientes.split(';').filter(i=>{return i.includes('legumes')})



for(item in itens_ja_salvos){
    ing=itens_ja_salvos[item]
    ing=ing.replace(";CARBOIDRATOS ",'').replace(";LEGUMES ",'').replace(";PROTEINAS ",'')
    
for(k in proteinas_______){

    if(ing === proteinas_______[k].replace("_proteinas",'')){
        document.getElementById('lista_proteinas').parentNode.childNodes[3].textContent='Impossível selecionar novos itens, para isso, exclua o item adicionado'
        document.getElementById('lista_proteinas').parentNode.classList.add('blocos')
        document.getElementById('lista_proteinas').parentNode.classList.add('escurecer_bloco')   
        
    
    }
}
for(k in carboidratos_______){
    if(ing === carboidratos_______[k].replace("_carboidratos",'')){
        document.getElementById('lista_carboidratos').parentNode.childNodes[3].textContent='Impossível selecionar novos itens, para isso, exclua o item adicionado'
        document.getElementById('lista_carboidratos').parentNode.classList.add('blocos')
        document.getElementById('lista_carboidratos').parentNode.classList.add('escurecer_bloco')

    }
}
for(k in legumes_______){
    if(ing === legumes_______[k].replace("_legumes",'')){
        document.getElementById('lista_legumes').parentNode.childNodes[3].textContent='Impossível selecionar novos itens, para isso, exclua o item adicionado'
        document.getElementById('lista_legumes').parentNode.classList.add('blocos')
        document.getElementById('lista_legumes').parentNode.classList.add('escurecer_bloco')

    }
}
}


for(item in itens_ja_salvos){




if(!(itens_ja_salvos[item]==="qte")){
ing=itens_ja_salvos[item]
ingg=ing.replace(";",'').replace(";",'').replace(";",'')
ing=ing.replace(";CARBOIDRATOS ",'').replace(";LEGUMES ",'').replace(";PROTEINAS ",'')


qte=  valores_ja_salvos[item]
let valor=valores[ing][qte]
novoItem=document.createElement("p")
lista.appendChild(novoItem)
let count=item
qte_ing='100 g'




switch(qte){
    case '75':
        count++
        novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
        <option selected="selected" value=100>100 g</option>
        <option value=75 selected>75 g</option>
        <option value=100>100 g</option>
        <option value=150>150 g</option>
        <option value=200>200 g</option>
        <option value=250>250 g</option>
        <option value=300>300 g</option>
        <option value=400>400 g</option>
        </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        break
    case '100':
        count++
        novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
        <option value=75>75 g</option>
        <option value=100 selected>100 g</option>
        <option value=150>150 g</option>
        <option value=200>200 g</option>
        <option value=250>250 g</option>
        <option value=300>300 g</option>
        <option value=400>400 g</option>
        </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        break
    case '150':
        count++
        novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
        <option value=75>75 g</option>
        <option value=100>100 g</option>
        <option value=150 selected>150 g</option>
        <option value=200>200 g</option>
        <option value=250>250 g</option>
        <option value=300>300 g</option>
        <option value=400>400 g</option>
        </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        break
    case '200':
        count++
        novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
            useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
        <option value=75>75 g</option>
        <option value=100>100 g</option>
        <option value=150>150 g</option>
        <option value=200 selected>200 g</option>
        <option value=250>250 g</option>
        <option value=300>300 g</option>
        <option value=400>400 g</option>
        </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
        break
        case '250':
            count++
            novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2, maximumFractionDigits:2,
                useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
            <option value=75>75 g</option>
            <option value=100>100 g</option>
            <option value=150>150 g</option>
            <option value=200>200 g</option>
            <option value=250 selected>250 g</option>
            <option value=300>300 g</option>
            <option value=400>400 g</option>
            </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
            break
            case '300':
                count++
                novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
                    minimumFractionDigits:2, maximumFractionDigits:2,
                    useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
                <option value=75>75 g</option>
                <option value=100>100 g</option>
                <option value=150>150 g</option>
                <option value=200>200 g</option>
                <option value=250>250 g</option>
                <option value=300 selected>300 g</option>
                <option value=400>400 g</option>
                </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
                break
                case '400':
                    count++
                    novoItem.innerHTML=`<div class = 'item_da_lista_selecionada'> <label id="${100000+count}" name="l_p"  >${ingg+",  "} ${"Vlr un: R$ "+Intl.NumberFormat("pt-BR",{style:'decimal',
                        minimumFractionDigits:2, maximumFractionDigits:2,
                        useGrouping:'always'}).format(valor)+", qte sel: "}</label><select name="all" id="${200000+count}"  onchange="alterar(this)">
                    <option value=75>75 g</option>
                    <option value=100>100 g</option>
                    <option value=150>150 g</option>
                    <option value=200>200 g</option>
                    <option value=250>250 g</option>
                    <option value=300>300 g</option>
                    <option value=400 selected>400 g</option>
                    </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${100000+count}" src='./public/images/btn-excluir.png' >Excluir</div>`
                    break

}

}else{

    document.getElementById("qte_marmitas_a_fazer").value=qte_dessa_marmita
}
}
window.scrollTo(0,6000)
})
