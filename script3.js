
let vendas={}

function obter_valor(elemento){

    valor_total=document.getElementById('valor_total')
    count=0
    dia_da_semana=elemento.parentNode.getElementsByTagName("div")[0].innerHTML.replace("R$","")
    qte_selecionada=elemento.parentNode.getElementsByTagName("select")[0].value.replace("R$","")
    valor=elemento.innerHTML
    item_selecionado=dia_da_semana+" "+valor
    valorr=parseFloat(item_selecionado.substring(item_selecionado.indexOf("R$"),item_selecionado.length).replace("R$ ","")).toFixed(2)
    lista=document.getElementById('lista_selecionada')
    novoItem=document.createElement("p")
    lista.appendChild(novoItem)
    novoItem.innerHTML=`<label id="${100000+count}" name="l_p"  >${dia_da_semana} ${valor}</label><select name="pets" id="${200000+count}" onchange="alterar(this)">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    </select> <img class='btn-excluir1' id ="${100000+count}" src='botao_excluir.png' onclick="remover(this)"> `
    vendas[item_selecionado]=valorr
    let valores_vendas = Object.values(vendas)
    console.log(vendas)
     if(valores_vendas.length===0){
         let soma=0
         valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`

         
     }
     else{
    let soma=0
    for(item of valores_vendas){
        soma+=parseFloat(item)
        valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`

    }
 }

}


function remover(elemento){   
    valor_total=document.getElementById('valor_total')
    nome_elemento=elemento.parentNode.getElementsByTagName("label")[0].textContent
    console.log(nome_elemento,vendas)
    elemento.parentNode.remove()  
    let soma=0
    delete vendas[`${nome_elemento}`]
    console.log(vendas)
    let valores_vendas = Object.values(vendas)
     if(valores_vendas.length===0){
         soma=0
         valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`
     }
     else{
    for(item of valores_vendas){
        soma+=parseFloat(item)
        valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`
    }
 }
 }
 
 
 
 
 function alterar(elemento){   
    let soma=0
    valor_total=document.getElementById('valor_total')
    nome_elemento=elemento.parentNode.getElementsByTagName("label")[0].textContent
    valor_elemento=nome_elemento.substring(nome_elemento.indexOf("R$"),nome_elemento.length).replace("R$ ",'')
    qte_selecionada=elemento.value
    novoValor=parseFloat(valor_elemento)* parseInt(qte_selecionada)
    vendas[`${nome_elemento}`]=novoValor
    console.log(novoValor)
    console.log(vendas)
    let valores_vendas = Object.values(vendas)
     console.log(valores_vendas)
     if(valores_vendas.length===0){
         soma=0
         valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`
         
     }
     else{
    for(item of valores_vendas){
     console.log(item)
        soma+=parseFloat(item)
        valor_total.innerHTML=`Valor total: ${soma.toFixed(2)}`
        console.log(valor_total)
    }
 }
 }
 