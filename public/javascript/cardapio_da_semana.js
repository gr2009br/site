var usar_mysql=true
var valores={}
var ingredientes=''
var lista_ingredientes_consulta = []
var estrutura_dicionario = {}

    var socket = io.connect()
    socket.on('ler_mysql_ingredientes',(dado)=>{
    
    lista_ingredientes_consulta.push(dado)
    for(let i=0; i<=dado.length-1;i++){
        ingredientes+=dado[i]['ingredientes']+'_'+dado[i]['tipo_ingrediente']+';'
    
        valores[dado[i]['ingredientes']]={75:dado[i]['75_g'],100:dado[i]['100_g'],150:dado[i]['150_g'],200:dado[i]['200_g'],250:dado[i]['250_g'],300:dado[i]['300_g'],400:dado[i]['400_g']}
    
    
    }
    

var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionados)=>{


let valor_total_=dados_selecionados[0]['valor_total_cardapio_semanal']
let vendas_=dados_selecionados[0]['itens_selecionados_cardapio_semanal']

let vendas__=JSON.parse(vendas_)
let count=0
let soma=0

var ingredientes=''
var valores={}
let usar_mysql=true
var quantidades_base = {100:1,150:2,200:3,300:4}
var lista_ingredientes_consulta = []
var estrutura_dicionario = {}
dia_selecionado=document.getElementById("dia-selecionado")
dia_selecionado.innerText="Dia selecionado: Segunda"

var cardapio_domingo = {
    principal1:'picadinho',
    principal2:'filé de frango',
    padrao1:'arroz/feijão',
    padrao2:'arroz',
    padrao3:'macarrão alho e óleo',
    guarnicao1:'batata rústica',
    guarnicao2:'farofa',
    salada:'salada',
    img1:'./public/images/ingredientes/picadinho.jpg',
    img2:'./public/images/ingredientes/file_de_frango.jpg',
}


var cardapio_segunda_feira = {
    principal1:'picadinho',
    principal2:'filé de frango',
    padrao1:'arroz/feijão',
    padrao2:'arroz',
    padrao3:'macarrão alho e óleo',
    guarnicao1:'batata rústica',
    guarnicao2:'farofa',
    salada:'salada',
    img1:'./public/images/ingredientes/picadinho.jpg',
    img2:'./public/images/ingredientes/file_de_frango.jpg',
}
var cardapio_terca_feira = {
    principal1:'strogonoff de carne',
    principal2:'carne de panela',
    padrao1:'arroz/feijão',
    padrao2:'feijão',
    padrao3:'almondega',
    guarnicao1:'batata frita',
    guarnicao2:'banana',
    salada:'tomate',
    img1:'./public/images/ingredientes/strogonoff_de_carne.jpg',
    img2:'./public/images/ingredientes/carne_de_panela.jpg',
}
var cardapio_quarta_feira = {
    principal1:'lasanha à bolonhesa',
    principal2:'filé de carne',
    padrao1:'arroz/feijão',
    padrao2:'arroz e feijão',
    padrao3:'salsicha',
    guarnicao1:'ovo',
    guarnicao2:'cenoura',
    salada:'alface com  rucula',
    img1:'./public/images/ingredientes/lasanha_a_bolonhesa.jpg',
    img2:'./public/images/ingredientes/file_de_carne.jpg',
}
var cardapio_quinta_feira = {
    principal1:'linguiça toscana',
    principal2:'frango recheado',
    padrao1:'arroz/feijão',
    padrao2:'arroz',
    padrao3:'macarrão',
    guarnicao1:'batata rústica',
    guarnicao2:'pastelzinho',
    salada:'salada',
    img1:'./public/images/ingredientes/linguica_toscana.jpg',
    img2:'./public/images/ingredientes/frango_recheado.jpg',
}
var cardapio_sexta_feira = {
    principal1:'peito de peru',
    principal2:'alcatra',
    padrao1:'arroz/feijão',
    padrao2:'arroz/feijão',
    padrao3:'feijoada',
    guarnicao1:'batata frita',
    guarnicao2:'farofa',
    salada:'tomate e alçafrão',
    img1:'./public/images/ingredientes/peito_de_peru.jpg',
    img2:'./public/images/ingredientes/alcatra.jpg',
}
var cardapio_sabado = {
    principal1:'picadinho',
    principal2:'filé de frango',
    padrao1:'arroz/feijão',
    padrao2:'arroz',
    padrao3:'macarrão alho e óleo',
    guarnicao1:'batata rústica',
    guarnicao2:'farofa',
    salada:'salada',
    img1:'./public/images/ingredientes/picadinho.jpg',
    img2:'./public/images/ingredientes/file_de_frango.jpg',
}

dias_semana=[cardapio_domingo,cardapio_segunda_feira,cardapio_terca_feira,cardapio_quarta_feira,cardapio_quinta_feira,cardapio_sexta_feira,cardapio_sabado]



    if(usar_mysql){



        

document.getElementById("finalizar_kit_marmita").innerText='Selecione um tamanho da marmita'

//INGREDIENTES - FUTURAMENTE ESSAS INFORMAÇÕES NÃO ESTARÃO AQUI, MAS ESTARÃO NUM BANCO DE DADOS






let selecionar_dia_da_semana = document.getElementsByClassName('dia-da-semana')
itens_do_dia = document.getElementsByClassName('texto_itens_do_dia')
imagens_dos_ingredientes = document.getElementsByClassName('imagens_cardapio_semanal')
botao_grande=document.getElementById("btn-grande")
botao_medio=document.getElementById('btn-medio')
botao_pequeno=document.getElementById('botao-pequeno')
informacoes_ingredientes=document.getElementsByClassName('texto_itens_do_dia')
let itens_selecionados=document.getElementById('lista_selecionada')



document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2, maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(dados_selecionados[0]['valor_total_ingredientes_total'])+parseFloat(dados_selecionados[0]['valor_total_cardapio_semanal']))}`



itens_selecionados_salvos=Object.values(vendas__)

for(i in itens_selecionados_salvos){
    texto_pedido = itens_selecionados_salvos[i]
    texto1=texto_pedido.substring(0,texto_pedido.indexOf('subtotal:'))
    texto2=parseFloat(texto_pedido.substring(texto_pedido.indexOf('subtotal:')+10,texto_pedido.length).replace("R$",'').replace(',','.'))
novo_paragrafo=document.createElement("p")
itens_selecionados.appendChild(novo_paragrafo)
novo_paragrafo.innerHTML=`<div class='item_da_lista_selecionada'>${texto1+ "subtotal: R$ "+ Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(texto2)} </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${1}" src='./public/images/btn-excluir.png' onclick="remover(this)">Excluir</div></div>` 

}



//AO ATUALIZAR A PÁGINA (F5) ESSA FUNÇÃO É CHAMADA, PARA EXIBIR O CARDÁPIO DO DIA ATUAL
function diaDaSemana(){
    const diasSemana=['Domingo','Segunda-Feira','Terça-Feira','Quarta-feira','Quinta-Feira','Sexta-Feira','Sábado']
    const date = new Date()
    let i=date.getDay()
    i=i-1
    if(i===-1){
        i=i+1
    }else{
        i=i
    }
    itens_do_dia[0].innerText='Principal'
    itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
    itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
    itens_do_dia[3].innerText='Padrão'
    itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
    itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
    itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
    itens_do_dia[7].innerText='Guarnição'
    itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
    itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
    itens_do_dia[10].innerText='Salada'
    itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)

    
    imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
    imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2


    switch(i+1){
        case 0:
            selecionar_dia_da_semana[0].classList.add('dia_destaque')
            selecionar_dia_da_semana[0].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+0]
        break
        case 1:
            selecionar_dia_da_semana[0].classList.add('dia_destaque')
            selecionar_dia_da_semana[0].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+1]
        break
        case 2:
            selecionar_dia_da_semana[1].classList.add('dia_destaque')
            selecionar_dia_da_semana[1].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+1]
        break
        case 3:
            selecionar_dia_da_semana[2].classList.add('dia_destaque')
            selecionar_dia_da_semana[2].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+1]
        break
        case 4:
            selecionar_dia_da_semana[3].classList.add('dia_destaque')
            selecionar_dia_da_semana[3].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+1]
        break
        case 5:
            selecionar_dia_da_semana[4].classList.add('dia_destaque')
            selecionar_dia_da_semana[4].classList.remove('b0')
            dia_selecionado.innerText="Hoje é "+diasSemana[i+1]
        break
    }
  
}



itens_principal=document.getElementsByName('principal')
itens_principal[0].classList.add('usario_pode_selecionar')
itens_principal[1].classList.add('usario_pode_selecionar')

itens_principal=document.getElementsByName('padrao')
itens_principal[0].classList.add('usario_pode_selecionar')
itens_principal[1].classList.add('usario_pode_selecionar')
itens_principal[2].classList.add('usario_pode_selecionar')

itens_principal=document.getElementsByName('guarnicao')
itens_principal[0].classList.add('usario_pode_selecionar')
itens_principal[1].classList.add('usario_pode_selecionar')


diaDaSemana()


//FINALIZAR KIT DE MARMITA
document.getElementById("finalizar_kit_marmita").addEventListener("click",()=>{



var ID=localStorage.getItem('ID SESSÃO')
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionados)=>{
   
    let tem_algum_item_selecionado=0
    let secao_item_selecionado=0
    let ingrediente_selecionado1=''
    let ingrediente_selecionado2=''
    let ingrediente_selecionado3=''
    let TODOS_OS_ingrediente_selecionado=''

    itens_principal1=document.getElementsByName('principal')
   

    for(i of itens_principal1){
        
        if(itens_principal1.length===2){
   
        if(i.checked){
            ingrediente_selecionado1+=i.parentNode.childNodes[3].innerText+' e '
            i.checked=false
            tem_algum_item_selecionado=1
            
        }
    }
    if(itens_principal1.length===1){
        if(i.checked){
            ingrediente_selecionado1+=i.parentNode.childNodes[3].innerText+' '
            i.checked=false
            tem_algum_item_selecionado=1
        }
    }


        i.classList.add('usario_pode_selecionar')
        
    }
        
    secao_item_selecionado+=tem_algum_item_selecionado
    TODOS_OS_ingrediente_selecionado+='; PRINCIPAL: '+ingrediente_selecionado1.slice(0, -3)+' '

    itens_principal2=document.getElementsByName('padrao')
    tem_algum_item_selecionado=0
    
    for(i of itens_principal2){

        if(itens_principal2.length===3){
            if(i.checked){
      
                ingrediente_selecionado2+=i.parentNode.childNodes[3].innerText+' e '
                i.checked=false
                tem_algum_item_selecionado=1
            }

        }

        if(itens_principal2.length===2){
         
        if(i.checked){
            
            ingrediente_selecionado2+=i.parentNode.childNodes[3].innerText+' e '
            i.checked=false
            tem_algum_item_selecionado=1
        }
    }
        if(itens_principal2.length===1){
            if(i.checked){
           
                ingrediente_selecionado2+=i.parentNode.childNodes[3].innerText+'  '
                i.checked=false
                tem_algum_item_selecionado=1
            }
        
    }
    i.classList.add('usario_pode_selecionar')
    }

    secao_item_selecionado+=tem_algum_item_selecionado
    TODOS_OS_ingrediente_selecionado+='; PADRÃO: '+ingrediente_selecionado2.slice(0, -3)+' '

    itens_principal3=document.getElementsByName('guarnicao')
    tem_algum_item_selecionado=0

    for(i of itens_principal3){
        if(itens_principal3.length===2){
           
        if(i.checked){
            ingrediente_selecionado3+=i.parentNode.childNodes[3].innerText+' e '
            i.checked=false
            tem_algum_item_selecionado=1
        }
    }
        if(itens_principal3.length===1){
            if(i.checked){
                ingrediente_selecionado3+=i.parentNode.childNodes[3].innerText+'  '
                i.checked=false
                tem_algum_item_selecionado=1
            }
        
    }
    i.classList.add('usario_pode_selecionar')

}
    
    
    secao_item_selecionado+=tem_algum_item_selecionado

    if (secao_item_selecionado!=3){
        alert("Nenhum item selecionado (PRINCIPAL, PADRÃO E GUARNIÇÕES), ou você não selecionou todas as opções")
        return
    }


TODOS_OS_ingrediente_selecionado+='; GUARNIÇÃO: '+ingrediente_selecionado3.slice(0, -3)+''
valores_marmitas = {Grande:21.99,Media:19.99,Pequena:17.99}
tamanho_marmita=document.getElementById("finalizar_kit_marmita").innerText.replace("Finalizar marmita ",'').replace('média','media')
tamanho_marmita=tamanho_marmita.charAt(0).toUpperCase()+tamanho_marmita.slice(1)
qte_marmitas = document.getElementById('quantidade_marmitas_semanais_cardapio_semanal').value



itens_ja_adicionados=Object.values(JSON.parse(dados_selecionados[0]['itens_selecionados_cardapio_semanal']))

for(let i=0;i<itens_ja_adicionados.length;i++){

    const pos_ini=itens_ja_adicionados[i].indexOf('TRADICIONAL')
    const pos_fin=itens_ja_adicionados[i].indexOf('quantidade')
    texto_a_verificar=itens_ja_adicionados[i].substring(pos_ini,pos_fin-1)
    if(texto_a_verificar ===`TRADICIONAL, Tamanho ${marmita.charAt(0)} ${TODOS_OS_ingrediente_selecionado}`){
        //alert("Item ja adicionado! Verifique a lista abaixo!")
        window.scrollTo(0,10000,"smooth")
        //return
    }
}
let id_item =Object.keys(JSON.parse(dados_selecionados[0]['itens_selecionados_cardapio_semanal']))
let id_item_tamanho=id_item.length+1

texto_pedido = `Pedido ${id_item_tamanho} TRADICIONAL, Tamanho ${marmita.charAt(0)} ${TODOS_OS_ingrediente_selecionado}; quantidade: ${qte_marmitas}; subtotal: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(qte_marmitas*valores_marmitas[tamanho_marmita])}`
novo_paragrafo=document.createElement("p")
itens_selecionados.appendChild(novo_paragrafo)
novo_paragrafo.innerHTML=`<div class='item_da_lista_selecionada'>${texto_pedido} </select> <div onclick="remover_(this)" class='btn-excluir_EXCLUIR'><img class='btn-excluir' id ="${1}" src='./public/images/btn-excluir.png' onclick="remover(this)">Excluir</div>` 
vendas__=JSON.parse(dados_selecionados[0]['itens_selecionados_cardapio_semanal'])

vendas__[id_item_tamanho]=texto_pedido
valores_totais_cardapio_semanal=Object.values(vendas__)
let soma=0
for(i of valores_totais_cardapio_semanal){
    valor_a_somar=parseFloat(i.substring(i.indexOf("subtotal:")+10,i.length).replace('R$','').replace(',','.')  )  
    soma+=valor_a_somar
}

itens_selecionados_cardapio_semanal=JSON.stringify(vendas__)
valor_total_cardapio_semanal=soma

document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(dados_selecionados[0]['valor_total_ingredientes_total'])+valor_total_cardapio_semanal)}`

window.scrollTo(0,10000,'smooth')


document.getElementById("finalizar_kit_marmita").innerText='Selecione um tamanho da marmita'

id_selecionado=dados_selecionados[0]['id_edit_monte_seu_cardapio_final_inteiro']
id_=dados_selecionados[0]['qte_marmitas_fechadas']
valor_total_ingredientes_total=dados_selecionados[0]['valor_total_ingredientes_total']
    socket.emit("INSERINDO_DADOS",{
    
    
        i0:ID,
        i1:id_selecionado,
        i2:0,
        i3:dados_selecionados[0]['itens_selecionados_ingredientes_mar_fechada'],
        i4:'',
        i5:valor_total_cardapio_semanal,
        i6:'',
        i7:'',
        i8:dados_selecionados[0]['itens_selecionados_ingredientes'],
        i9:itens_selecionados_cardapio_semanal,
        i10:'',
        i11:id_,
        i12:0,
        i13:valor_total_ingredientes_total,
        i14:'false',
        i15:0


}
)



})}

)}})})


//EXIBIR O CARRINHO DE COMPRAS
document.getElementById('exibir-carrinho').addEventListener("click",()=>{
    


    var ID=localStorage.getItem('ID SESSÃO')
    numero_randomico=parseInt(Math.random()*100000)
    socket = io()   
    socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
    socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionados)=>{

    


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

            let vendas_=dados_selecionados[0]['itens_selecionados_cardapio_semanal']
            let vendas___=JSON.parse(vendas_)


            let vendas_1=dados_selecionados[0]['itens_selecionados_ingredientes_mar_fechada']
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



//EDITA UM ITEM DO CARRINHO
function editar(elemento){

    if(elemento.parentNode.childNodes.length===1){
    var id_selecionado = parseFloat(elemento.parentNode.parentNode.childNodes[1].innerText)
    var ID=localStorage.getItem('ID SESSÃO')
    socket = io.connect()  
    socket.on('connect',()=>{
    
    numero_randomico=parseInt(Math.random()*100000)
    socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
    socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionados)=>{
    
        
    
    //qte_marmitas_a_fazer=document.getElementById("qte_marmitas_a_fazer").value
    
    
    
    let id_ = parseFloat(dados_selecionados[0]["qte_marmitas_fechadas"])
    let  itens_selecionados_ingredientes=JSON.parse(dados_selecionados[0]['itens_selecionados_ingredientes_mar_fechada'])
    ISI = itens_selecionados_ingredientes[id_selecionado]
    
    
        
    socket.emit("INSERINDO_DADOS",{
    
    
        i0:ID,
        i1:id_selecionado,
        i2:0,
        i3:dados_selecionados[0]['itens_selecionados_ingredientes_mar_fechada'],
        i4:'',
        i5:parseFloat(dados_selecionados[0]['valor_total_cardapio_semanal']),
        i6:'',
        i7:'',
        i8:JSON.stringify(ISI),
        i9:dados_selecionados[0]['itens_selecionados_cardapio_semanal'],
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
    
//FECHA A TELA DO CARRINHO  
function fecharTela(){
elemento=document.getElementById("itens_carrinho_fechado").parentNode
elemento.innerHTML="<div id='itens_carrinho_fechado' style='background-color: white;'>"

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

        ID=localStorage.getItem('ID SESSÃO')
        socket.emit('ATUALIZAR_DADOS_VALOR_COMPRA', {id:ID, valor:soma});
        

    }
window.location="cadastro.html"  
}
    
//AO CLICAR NO BOTÃO DA MARMITA, (GRANDE, MÉDIA, OU PEQUENA) ESSA FUNÇÃO É EXECUTADA
function obter_valor(elemento){



marmita=elemento.innerText
tamanho_marmita =marmita.substring(0, marmita.indexOf(' '))
dia_da_semana = elemento.innerText
const date = new Date()
let i=date.getDay()
i=i-1

if(i===-1){
i=i+1
}

dia_selecionado.innerText="Marmita selecionada: "+dia_da_semana

if(tamanho_marmita==='Grande'){
document.getElementById('finalizar_kit_marmita').innerText='Finalizar marmita grande'
document.getElementsByClassName('informacao_cardapio_do_dia')[0].innerHTML=
`
<p id="dia-selecionado">${dia_da_semana}</p>
<p class="texto_itens_do_dia outra">Principal</p>
<span>
<input type="checkbox" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)}</p>
</span>
<span>
<input type="checkbox" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Padrão</p>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Guarnições</p>
<span>
<input type="checkbox" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)}</p>
</span>
<span>
<input type="checkbox" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Salada</p>
<span>
<p class="texto_itens_do_dia">Salada</p>
</span>
</div>
</div>

`

}
else if(tamanho_marmita==='Media'){
document.getElementById('finalizar_kit_marmita').innerText='Finalizar marmita média'
document.getElementsByClassName('informacao_cardapio_do_dia')[0].innerHTML=
`
<p id="dia-selecionado">${dia_da_semana}</p>
<p class="texto_itens_do_dia outra">Principal</p>
<span>
<input type="radio" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Padrão</p>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Guarnições</p>
<span>
<input type="checkbox" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)}</p>
</span>
<span>
<input type="checkbox" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Salada</p>
<span>
<p class="texto_itens_do_dia">Salada</p>
</span>
</div>
`
}
else{
document.getElementById('finalizar_kit_marmita').innerText='Finalizar marmita pequena'
document.getElementsByClassName('informacao_cardapio_do_dia')[0].innerHTML=
`
<p id="dia-selecionado">${dia_da_semana}</p>
<p class="texto_itens_do_dia outra">Principal</p>
<span>
<input type="radio" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="principal"/>
<p class="texto_itens_do_dia">${dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Padrão</p>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="padrao"/>
<p class="texto_itens_do_dia">${dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Guarnições</p>
<span>
<input type="radio" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)}</p>
</span>
<span>
<input type="radio" id="item" name="guarnicao"/>
<p class="texto_itens_do_dia">${dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)}</p>
</span>
<p class="texto_itens_do_dia outra">Salada</p>
<span>
<p class="texto_itens_do_dia">Salada</p>
</span>
</div>
`
}
}
    
//REMOVE A MARMITA SELECIONADA
function remover_(elemento){

ID=localStorage.getItem("ID SESSÃO")
numero_randomico=parseInt(Math.random()*100000)
socket.emit(`LER_DADOS_SELECIONADOS_OBTER_VALOR`,{idd:ID,n:numero_randomico})
socket.on(`SELECIONANDO_DADOS_OBTIDOS${numero_randomico}`,(dados_selecionados)=>{

vendas__=JSON.parse(dados_selecionados[0]['itens_selecionados_cardapio_semanal'])


elemento.parentNode.remove()
id_pedido=elemento.parentNode.textContent.replace("Excluir",'').indexOf('TRADICIONAL')
id_pedido=parseInt(elemento.parentNode.textContent.replace("Excluir",'').substring(7,id_pedido))

delete vendas__[`${id_pedido}`]
itens_selecionados_cardapio_semanal=JSON.stringify(vendas__)



valores_totais_cardapio_semanal=Object.values(vendas__)
let soma=0
for(i of valores_totais_cardapio_semanal){
valor_a_somar=parseFloat(i.substring(i.indexOf("subtotal:")+10,i.length).replace('R$','').replace(',','.')  )  
soma+=valor_a_somar
}
itens_selecionados_cardapio_semanal=JSON.stringify(vendas__)


valor_total_cardapio_semanal=soma


valor_total_TUDO=parseFloat(dados_selecionados[0]['valor_total_ingredientes_total'])+soma


document.getElementById("valor_total").innerHTML=`Valor total: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(parseFloat(dados_selecionados[0]['valor_total_ingredientes_total'])+parseFloat(dados_selecionados[0]['valor_total_cardapio_semanal']))}`

id_selecionado=dados_selecionados[0]['id_edit_monte_seu_cardapio_final_inteiro']
id_=dados_selecionados[0]['qte_marmitas_fechadas']
valor_total_ingredientes_total=dados_selecionados[0]['valor_total_ingredientes_total']
socket.emit("INSERINDO_DADOS",{


i0:ID,
i1:id_selecionado,
i2:0,
i3:dados_selecionados[0]['itens_selecionados_ingredientes_mar_fechada'],
i4:'',
i5:valor_total_cardapio_semanal,
i6:'',
i7:'',
i8:dados_selecionados[0]['itens_selecionados_ingredientes'],
i9:itens_selecionados_cardapio_semanal,
i10:'',
i11:id_,
i12:0,
i13:valor_total_ingredientes_total,
i14:'false',
i15:0


}
)

window.scrollTo(0,0,'smooth')

}

)}

//SELECIONAR DIA DA SEMANA (SEGUNDA, TERÇA, ...)
function selecionarDiaDaSemana(elemento){
    
    dia_da_semana = elemento.innerText
    

    if(dia_da_semana==='Segunda'){
        i=0
        itens_do_dia[0].innerText='Principal'
        itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
        itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
        itens_do_dia[3].innerText='Padrão'
        itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
        itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
        itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
        itens_do_dia[7].innerText='Guarnição'
        itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
        itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
        itens_do_dia[10].innerText='Salada'
        itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)
        imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
        imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2
        dia_selecionado.innerText="Dia selecionado: "+dia_da_semana

    }

    if(dia_da_semana==='Terça'){
        i=1
        itens_do_dia[0].innerText='Principal'
        itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
        itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
        itens_do_dia[3].innerText='Padrão'
        itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
        itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
        itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
        itens_do_dia[7].innerText='Guarnição'
        itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
        itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
        itens_do_dia[10].innerText='Salada'
        itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)
        imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
        imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2
        dia_selecionado.innerText="Dia selecionado: "+dia_da_semana

    }
    
    if(dia_da_semana==='Quarta'){
        i=2
        itens_do_dia[0].innerText='Principal'
        itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
        itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
        itens_do_dia[3].innerText='Padrão'
        itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
        itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
        itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
        itens_do_dia[7].innerText='Guarnição'
        itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
        itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
        itens_do_dia[10].innerText='Salada'
        itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)
        imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
        imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2
        dia_selecionado.innerText="Dia selecionado: "+dia_da_semana

    }

    if(dia_da_semana==='Quinta'){
        i=3
        itens_do_dia[0].innerText='Principal'
        itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
        itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
        itens_do_dia[3].innerText='Padrão'
        itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
        itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
        itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
        itens_do_dia[7].innerText='Guarnição'
        itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
        itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
        itens_do_dia[10].innerText='Salada'
        itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)
        imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
        imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2
        dia_selecionado.innerText="Dia selecionado: "+dia_da_semana

    }

    if(dia_da_semana==='Sexta'){
        i=4
        itens_do_dia[0].innerText='Principal'
        itens_do_dia[1].innerText=dias_semana[i].principal1.charAt(0).toUpperCase()+dias_semana[i].principal1.slice(1)
        itens_do_dia[2].innerText=dias_semana[i].principal2.charAt(0).toUpperCase()+dias_semana[i].principal2.slice(1)
        itens_do_dia[3].innerText='Padrão'
        itens_do_dia[4].innerText=dias_semana[i].padrao1.charAt(0).toUpperCase()+dias_semana[i].padrao1.slice(1)
        itens_do_dia[5].innerText=dias_semana[i].padrao2.charAt(0).toUpperCase()+dias_semana[i].padrao2.slice(1)
        itens_do_dia[6].innerText=dias_semana[i].padrao3.charAt(0).toUpperCase()+dias_semana[i].padrao3.slice(1)
        itens_do_dia[7].innerText='Guarnição'
        itens_do_dia[8].innerText=dias_semana[i].guarnicao1.charAt(0).toUpperCase()+dias_semana[i].guarnicao1.slice(1)
        itens_do_dia[9].innerText=dias_semana[i].guarnicao2.charAt(0).toUpperCase()+dias_semana[i].guarnicao2.slice(1)
        itens_do_dia[10].innerText='Salada'
        itens_do_dia[11].innerText=dias_semana[i].salada.charAt(0).toUpperCase()+dias_semana[i].salada.slice(1)
        
        imagens_dos_ingredientes[0].childNodes[1].src=dias_semana[i].img1
        imagens_dos_ingredientes[0].childNodes[3].src=dias_semana[i].img2
        dia_selecionado.innerText="Dia selecionado: "+dia_da_semana

    }

}

function telaInicial(){
    window.location="./"
}
