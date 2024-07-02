
if (document.referrer.includes('admin') || document.referrer.includes('dashboard')) {


} else {
window.location='admin.html'
}

usar_mysql=true

window.onload = function(e){ 

    var socket = io.connect()     
    






document.getElementById('itens_dashboard1').innerHTML=`<div style='font-size:1.1rem;'>Total de Pedidos<br><br><strong>${0}</div>`
document.getElementById('itens_dashboard2').innerHTML=`<div style='font-size:1.1rem;'>Valor Recebido<br><br><strong>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(0)}</div>`
document.getElementById('itens_dashboard3').innerHTML=`<div style='font-size:1.1rem;'>Valor a receber<br><br><strong>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(0)}</div>`





if(usar_mysql){



//USAR MySQL
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
var troco=[]
var lista_ids_sockets_criados=[]
var listadositenspedidos=''
socket.on('ler_mysql',(dado)=>{
    let i=[]
    
    var id_socket = socket.id
    lista_ids_sockets_criados.push(id_socket)


    for(i of lista_ids_sockets_criados){

        if(lista_ids_sockets_criados[0]==lista_ids_sockets_criados[1]){
            return
        }

    }



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
    troco.push(OBJETO_VALORES['troco'])
    
}


var tudo_foi_entregue=true
lista=itens.split(' ;;; ')

qte_pedidos=lista.length-1


   
    let ii=-1
    for(let i in lista){

        ii+=1


        if(entregue[i-1]===0){
            tudo_foi_entregue=false
        }
        if(tudo_foi_entregue){
        listadositenspedidos=`<div class='msg-erro-mysql'><strong>Não há nenhuma entrega pendente</strong></div>`
        document.getElementById('container').style.visibility='hidden'
        }
        else{
        listadositenspedidos=``
        document.getElementById('container').style.visibility='visible'
        }
        

        

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
            
            texto_ingredientes+='<br>ID: '+id_ingredientes
            for(let k in ingredientes){
                if(k!='qte' && ingredientes[k]!='0'){
               
                    let j = ingredientes[k]+' g'
                    item_ingrediente[k]=j
                    texto_ingredientes+= k+': '+j
                    qte=ingredientes['qte']
                    
                }
            
            }
   

            if(i<chaves.length){
            texto_ingredientes_qte=`<br>quantidade dessa marmita: ${qte}<br>`
   
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
            texto_cardapio_semanal+='<br><br>'
        }
        

        


        let monte_sua_marmita = texto_ingredientes
        let cardapio_da_semana = texto_cardapio_semanal
        let dados_cliente=JSON.stringify(infos[1]).toString().replace('{"','').replace('"}','').replaceAll('___','').replaceAll('"','').replaceAll(',','').replace(":",": ").replace(",",", ")
        .replaceAll('nome','<br>Nome')
        .replaceAll('telefone:','<br>Telefone: ')
        .replaceAll('cpf:','<br>CPF: ')
        .replaceAll('endereco:','<br>Endereço: ')
        .replaceAll('numero:',', número: ')
        .replaceAll('complemento:','<br>Complemento: ')

        
        let data_inicial = infos[0].split(', ')[0]
        let data_atual=new Date().toLocaleString().split(', ')[0]
        let horario_inicial= parseInt(infos[0].split(', ')[1].split(':')[0])*60*60+parseInt(infos[0].split(', ')[1].split(':')[1])*60
        let hora_atual=parseInt(new Date().toLocaleString().split(', ')[1].split(':')[0])*60*60+parseInt(new Date().toLocaleString().split(', ')[1].split(':')[1])*60
        let ha_x_minutos = parseInt((hora_atual-horario_inicial)/60)

        
        if(data_inicial===data_atual){
        if(ha_x_minutos===0){
            ha_x_minutos=` - agora mesmo `
        }
        else if(ha_x_minutos<2 && ha_x_minutos>0){
            ha_x_minutos=` - há ${ha_x_minutos} minuto `
        }else if(ha_x_minutos>=2 && ha_x_minutos<60){
            ha_x_minutos=` - há ${ha_x_minutos} minutos `
        }
        else if(ha_x_minutos==60){
            ha_x_minutos= - `há 1h `
        }
        else if(ha_x_minutos>60){
            ha_x_minutos=` - há mais de 1h `
        }
        else if(ha_x_minutos<0){
            ha_x_minutos=` - há muito tempo`
        }
        }else{
            ha_x_minutos=''
        }
        if(!cardapio_da_semana){

            texto=`ID: ${idd[ii-1]}<br><strong>${infos[0]}</strong> ${ha_x_minutos}<br><i>${dados_cliente}</i><br><br><div class='cardapio'>Monte sua marmita:<br> ${monte_sua_marmita.replaceAll('"','').replaceAll("'","").replaceAll(",","<br>").replaceAll(";","<br>").replaceAll(":",": ")}<br>subtotal: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_mm[ii-1]))}<br><br><strong><text style="color:red">Valor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}</strong></text></div>`
        }else if(!monte_sua_marmita || monte_sua_marmita==='"0"'){

            texto=`ID: ${idd[ii-1]}<br><strong>${infos[0]}</strong> ${ha_x_minutos}<br><i>${dados_cliente}</i><br><br><div class='cardapio'>Cardápio da Semana:<br><br> ${cardapio_da_semana.replaceAll(' ; ','<br>').replaceAll('; ','<br>')}<br><strong><text style="color:red">Valor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}</strong></text></div>`
        }else if(cardapio_da_semana && monte_sua_marmita){
          
            texto=`ID: ${idd[ii-1]}<br><strong>${infos[0]}</strong> ${ha_x_minutos}<br><i>${dados_cliente}</i><br><br><div class='cardapio'>Cardápio da Semana:<br><br> ${cardapio_da_semana.replaceAll(' ; ','<br>').replaceAll('; ','<br>')}<br><br>Monte sua marmita:<br> ${monte_sua_marmita.replaceAll('"','').replaceAll("'","").replaceAll(",","<br>").replaceAll(";","<br>").replaceAll(":",": ")}<br>subtotal: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(valoressssss_mm[ii-1])}<br><br><strong><text style="color:red">Valor total do pedido: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(parseFloat(valoressssss_cs[ii-1])+parseFloat(valoressssss_mm[ii-1]))}</strong></text></div>`
      
        }
 
        
        if(parseFloat(troco[ii-1])===0){

            listadositenspedidos+=`<div><hr><br><br>${texto}<br><br><div class='forma_pagamento'>Forma de pagamento: ${tipo_pagamento[ii-1]}<br></div><div class='forma_pagamentoo'><button class="botao_marcar_como_entregue" onclick="marcar_como_entregue(this)">Marcar como entregue</button></div></div>`
        


        }else{

            listadositenspedidos+=`<div><hr><br><br>${texto}<br><br><div class='forma_pagamento'>Forma de pagamento: ${tipo_pagamento[ii-1]}<br>Troco: R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
                minimumFractionDigits:2,maximumFractionDigits:2,
                useGrouping:'always'}).format(parseFloat(troco[ii-1]-(valoressssss_cs[ii-1]+parseFloat(valoressssss_mm[ii-1]))))}</div><div class='forma_pagamentoo'><button class="botao_marcar_como_entregue" onclick="marcar_como_entregue(this)">Marcar como entregue</button></div></div>`
        


        }
        console.log(listadositenspedidos)
        document.getElementById("itens_dashboard").innerHTML+=listadositenspedidos


        }

        
        document.getElementById('container').style.visibility='visible'
        
    }
    

    


document.getElementById('itens_dashboard1').innerHTML=`<div style='font-size:1.1rem;'>Total de Pedidos<br><br><strong>${qte_pedidos}</div>`
document.getElementById('itens_dashboard2').innerHTML=`<div style='font-size:1.1rem;'>Valor Recebido<br><br><strong>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(soma_valor_recebido)}</div>`
document.getElementById('itens_dashboard3').innerHTML=`<div style='font-size:1.1rem;'>Valor a receber<br><br><strong>R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(soma_valor_a_receber)}</div>`

let r=soma_valor_a_receber/(soma_valor_recebido+soma_valor_a_receber)



var chart = new CanvasJS.Chart("container", {
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title: {
		text: "Valores recebidos x Valores a entregar → R$",
        fontSize:20,
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: R$ {t}",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		indexLabel: "{y}%",
		dataPoints: [
			{ y: Intl.NumberFormat("en-US",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(soma_valor_recebido/(soma_valor_a_receber+soma_valor_recebido)*100), label: "Valor recebido",color: '#98FB98',t:Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(soma_valor_recebido) },
			{ y: Intl.NumberFormat("en-US",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(soma_valor_a_receber/(soma_valor_a_receber+soma_valor_recebido)*100), label: "Valor a receber",color: "#e57373",t:Intl.NumberFormat("pt-BR",{style:'decimal',
            minimumFractionDigits:2,maximumFractionDigits:2,
            useGrouping:'always'}).format(soma_valor_a_receber) },

		]
	}]
})
chart.render()


  //Render Chart
  chart.render()


    }

   
})}

socket.emit('atualizar_itens_vendidos')
}


    
   
 







function marcar_como_entregue(elemento){

    var resposta = confirm("Marcar como entregue?");

    if(resposta){
     let id = elemento.parentNode.parentNode.childNodes[3].data.replace("ID: ","")
     var socket = io.connect({'forceNew': true}) 
     socket.on('connect',()=>{
     socket.emit("marcar_entregue",id)

     })
     socket.on('ir_para_tela_final',(msg)=>{
        window.location='dashboard.html'
        })
     
    }

}


function  QRCODE(){


    let texto_qr_code=`https://site-82eg.onrender.com`
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(texto_qr_code);
    qr.make();
    let formatar_HTML = qr.createImgTag().replace("img ","img id='qrCodeSite'")
    document.getElementById('qrCodeSite').innerHTML =formatar_HTML
    document.getElementById('qrCodeSite').classList.add("qr_code-site")
    

    
    }

    QRCODE()