const valores = {'Filé de frango grelhado':'1.50',
' Filé de frango a milanesa':'2.00',
' Filé de frango a parmegiana':'2.50',
' Filé de carne grelhado':'3.00',
' Filé de carne a milanesa':'3.50',
' Filé de carne a parmegiana':'4.00',
' Ovo':'4.50',
' Arroz integral':'1.50',
' Arroz comum':'2.00',
' Farofa':'2.50',
' Mandioca':'3.00',
' Batata':'1.00',
' Beterraba':'1.50',
' Abobrinha':'2.00',
' Alface':'2.50'}



const quantidades = {'Filé de frango grelhado':'50 g',
'Filé de frango a milanesa':'75 g',
'Filé de frango a parmegiana':'100 g',
'Filé de carne grelhado':'150 g',
'Filé de carne a milanesa':'200 g',
'Filé de carne a parmegiana':'250 g',
'Ovo':'300 g',
'Arroz integral':'100 g',
'Arroz comum':'150 g',
'Farofa':'200 g',
'Mandioca':'250 g',
'Batata':'50 g',
'Beterraba':'75 g',
'Abobrinha':'100 g',
'Alface':'150 g'}

let vendas ={}

let valor_total=document.getElementById("valor_total22")
function remover(elemento){   
   posicao_virgula=elemento.parentNode.textContent.indexOf(',')
   nome_elemento=""+elemento.parentNode.textContent.substring(0,posicao_virgula)
   elemento.parentNode.remove()  
   let soma=0
   console.log(`"${nome_elemento}"`,vendas)
   delete vendas[`${nome_elemento}`]
   console.log(vendas)
   let valores_vendas = Object.values(vendas)
    console.log(valores_vendas)
    if(valores_vendas.length===0){
        soma=0
        valor_total.textContent=`Valor total: ${soma.toFixed(2)}`
    }
    else{
   for(item of valores_vendas){
    console.log(item)
       soma+=item
       valor_total.textContent=`Valor total: ${soma.toFixed(2)}`
   }
}
}




function alterar(elemento){   
   posicao_virgula=elemento.parentNode.textContent.indexOf(',')
   posicao_cifrao=elemento.parentNode.textContent.indexOf('R$ ')
   nome_elemento=""+elemento.parentNode.textContent.substring(0,posicao_virgula) 
   valor_elemento=parseFloat(elemento.parentNode.textContent.substring(posicao_cifrao+3,elemento.parentNode.length))
   console.log(valor_elemento)
   let soma=0
   console.log(`"${nome_elemento}"`,vendas)
   qte_selecionada=elemento.value
   novoValor=valor_elemento* parseInt(qte_selecionada)
   vendas[`${nome_elemento}`]=novoValor
   console.log(novoValor)
   console.log(vendas)
   let valores_vendas = Object.values(vendas)
    console.log(valores_vendas)
    if(valores_vendas.length===0){
        soma=0
        valor_total.textContent=`Valor total: ${soma.toFixed(2)}`
    }
    else{
   for(item of valores_vendas){
    console.log(item)
       soma+=item
       valor_total.textContent=`Valor total: ${soma.toFixed(2)}`
   }
}
}




let soma=0
const botaoSelecionar=document.getElementById('selecionar')
const itens_alimentos = document.getElementsByTagName('p')


botaoSelecionar.addEventListener('click',function(){


    for(let count=1; count<=itens_alimentos.length;count++){

    let botao_opcao_selecionado=document.getElementById(count)
    
    if(botao_opcao_selecionado.checked===true){
        
        alimento=botao_opcao_selecionado.parentNode.innerText
        vendas[alimento]=parseFloat(valores[alimento])
        let valores_vendas = Object.values(vendas)
        //localStorage.setItem('valor_total',soma)
        lista=document.getElementById("itens_lista")
        novoItem=document.createElement('p')
        lista.appendChild(novoItem)    
        novoItem.innerHTML=`<label id="${100000+count}" name="l_p"  />${alimento}, R$ ${(valores[alimento])}<select name="pets" id="${200000+count}" onchange="alterar(this)">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        </select> <img class='btn-excluir' id ="${100000+count}" src='botao_excluir.png' onclick="remover(this)"> `

        console.log(vendas)
        let soma=0
        for(item of valores_vendas){
            soma+=item

            valor_total.textContent=`Valor total: ${soma.toFixed(2)}`
        }
            
        }

    }


})




//botão monte sua marmita
function preencherItens(){

    let count=0
    console.log(localStorage.length)
    for(let i=0;i<=localStorage.length;i++){

        count++
        item=localStorage.getItem(localStorage.key((i)))
        
    if(item.includes('proteinas')){
        lista=document.getElementById('lista_proteinas')
        item_lista=document.createElement('p')
        lista.appendChild(item_lista)    
        item_lista.innerHTML=`<input type="radio" id="${count}" name="l_p"  />${item.replace("_proteinas","")}`
    }
    else if(item.includes('carboidratos')){
        lista=document.getElementById('lista_carboidratos')
        item_lista=document.createElement('p')
        lista.appendChild(item_lista)  
        item_lista.innerHTML=`<input type="radio" id="${count}" name="l_p"  />${item.replace("_carboidratos","")}` 
    }
    else{
        lista=document.getElementById('lista_legumes')
        item_lista=document.createElement('p')
        lista.appendChild(item_lista)     
        item_lista.innerHTML=`<input type="radio" id="${count}" name="l_p"  />${item.replace("_legumes","")}`
    }

    }

}

preencherItens()

