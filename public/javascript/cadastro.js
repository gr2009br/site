//ARQUIVO QUE GERENCIA A TELA DE CADASTRO


if (document.referrer.includes('cadastro') || document.referrer.includes('monte') || document.referrer.includes('cardapio')) {


} else {
window.location='index.html'
}

var vendas_finalizadas=''
var vendas_finalizada={}
var valor_total=0
var socket = io.connect()
ID=localStorage.getItem("ID SESSÃO")
socket.emit('VERIFICAR_VALOR_TOTAL',{id:ID})
socket.on('VERIFICOU_VALOR',(dados)=>{


valor_total=dados[0]['valor_total']


let validar_complemento=()=>{
let campo=document.getElementById('complemento').value
if(campo===''){
document.getElementById("verificou_complemento").innerText='Insira o complemento'
return false
}else{
document.getElementById("verificou_complemento").innerText=''   
return true     
}
}
let validar_endereco=()=>{
let campo=document.getElementById('endereco').value
if(campo===''){
document.getElementById("verificou_endereco").innerText='Insira um endereço'
return false
}else{
document.getElementById("verificou_endereco").innerText=''   
return true     
}
}
let validar_endereco_numero=()=>{
let campo=document.getElementById('numero').value
if(campo===''){
document.getElementById("verificou_numeroendereco").innerText='Insira o número do endereço'
return false
}else{
document.getElementById("verificou_numeroendereco").innerText=''   
return true     
}
}
let validar_nome=()=>{
let campo=document.getElementById('nome').value
if(campo===''){
document.getElementById("verificou_nome").innerText='Insira um nome'
return false
}else{
document.getElementById("verificou_nome").innerText=''  
return true      
}
}
let validar_telefone=()=>{
let campo=document.getElementById('telefone').value
let apenas_numero=campo.replaceAll("(","").replace("-","").replace(")",'')
let tem_texto_que_nao_e_numero=apenas_numero.search('[^0-9(-) ]')

if(campo===''){
document.getElementById("verificou_telefone").innerText='Insira um telefone'
return false
}else if(tem_texto_que_nao_e_numero>=0){
document.getElementById("verificou_telefone").innerText='Telefone inválido'
return false
}
else{
document.getElementById("verificou_telefone").innerText=''   
return true     
}
}
function validar_cpf(cpf){

let cpf_separado=[]
let primeiro_digito_verificador=0
let segundo_digito_verificador=0
cpf_separado=cpf.split("")

let primeiro_digito=0
for(let i =0 ;i<=8;i++){
primeiro_digito+=parseInt(cpf_separado[i])*(10-i)   
}
let quociente=parseInt(primeiro_digito/11)
let resto=parseInt(primeiro_digito%11)

if(resto>=2){
primeiro_digito_verificador=(11-resto)
}

else{
primeiro_digito_verificador=0
}
let segundo_digito=0
cpf_separado.push(primeiro_digito_verificador)

for(let i =0 ;i<=9;i++){
segundo_digito+=parseInt(cpf_separado[i])*(11-i)
}

quociente=parseInt(segundo_digito/11)
resto=parseInt(segundo_digito%11)

if(resto>=2){
segundo_digito_verificador=(11-resto)
}

else{
segundo_digito_verificador=0
}

if (parseInt(cpf_separado[9])===primeiro_digito_verificador && parseInt(cpf_separado[10])===segundo_digito_verificador){
document.getElementById("verificou_cpf").innerText='CPF OK!'
return true
}

else{
document.getElementById("verificou_cpf").innerText='CPF inválido!'
}

}
//MÁSCARA TELEFONE AO COLAR O TELEFONE COM COLAR E CTRL V
document.getElementById('telefone').addEventListener('input',(e)=>{
let campo=document.getElementById('telefone').value
let apenas_numero=campo.replaceAll("(","").replace("-","").replace(")",'')
let tem_texto_que_nao_e_numero=apenas_numero.search('[^0-9(-) ]')


if(campo.length===11){
telefone_=document.getElementById('telefone').value.split('')
let novo_telefone=''

for(let i=0;i<=telefone_.length-1;i++){

if(i===0){
novo_telefone+="("+telefone_[i]
}

else if(i===1){
novo_telefone+=telefone_[i]+") "
}

else if(i!=6){
novo_telefone+=telefone_[i]
}

else if(i===6){
novo_telefone+=telefone_[i]+'-'
}

}
if(tem_texto_que_nao_e_numero>=0){
document.getElementById("verificou_telefone").innerText='Telefone inválido'
}

else{
document.getElementById("verificou_telefone").innerText=''       
}

document.getElementById('telefone').value=novo_telefone
}})

//MÁSCARA TELEFONE AO DIGITAR O TELEFONE
document.getElementById('telefone').addEventListener('keyup',(e)=>{
let campo=document.getElementById('telefone').value
let apenas_numero=campo.replaceAll("(","").replace("-","").replace(")",'')
let tem_texto_que_nao_e_numero=apenas_numero.search('[^0-9(-) ]')



if(campo.length>0 && campo.length<=2){
document.getElementById('telefone').value="("+document.getElementById('telefone').value
}

else if(campo.length<5 && campo.length>2){
document.getElementById('telefone').value+=") "
}

else if(campo.length<11 && campo.length>9){
document.getElementById('telefone').value+="-"
}

if(tem_texto_que_nao_e_numero>=0){
document.getElementById("verificou_telefone").innerText='Telefone inválido'
}

else{
document.getElementById("verificou_telefone").innerText=''       
}


if(e.key==='Delete' || e.key==='Backspace'){
document.getElementById('telefone').value=''
}

if(e.key==='Enter'){

cpf=document.getElementById('cpf').value
cpf=cpf.replaceAll('.','').replace('-','')
v1=validar_nome()
v2=validar_telefone()
v3=validar_endereco()
v4=validar_cpf(cpf)
v5=validar_endereco_numero()
v6=validar_complemento()
//VALIDANDO FORMULÁRIO
if (v1 && v2 && v3 && v4 && v5){
let tipo_pagamento=document.getElementById("forma_de_pagamento").value

let dados_cliente={nome___:'',telefone___:'',cpf___:'',endereco___:'',numero___:'',complemento___:''}

let nome=document.getElementById('nome').value
let telefone=document.getElementById('telefone').value
let cpf=document.getElementById('cpf').value
let endereco=document.getElementById('endereco').value
let numero=document.getElementById('numero').value
let complemento=document.getElementById('complemento').value


dados_cliente.nome___=nome
dados_cliente.telefone___=telefone
dados_cliente.cpf___=cpf
dados_cliente.endereco___=endereco
dados_cliente.numero___=numero
dados_cliente.complemento___=complemento



if(tipo_pagamento==='Pix'){
document.getElementsByClassName("itens_cadastro")[0].classList.add("itens_cadastro_apos_validar")
document.getElementsByClassName("pgto")[0].classList.add("pgto_visivel")
QRCODE()
}
}

}
})

//MÁSCARA CPF AO COLAR O CPF COM COLAR E CTRL V
document.getElementById('cpf').addEventListener('input',(e)=>{

let campo=document.getElementById('cpf').value
let apenas_numero=campo.replaceAll(".","").replace("-","")
let tem_texto_que_nao_e_numero=campo.search('[^0-9.-]')

if(campo.length===11 && !campo.includes('.')){
cpf_=document.getElementById('cpf').value.split('')
let novo_cpf=''

for(let i=0;i<=cpf_.length-1;i++){
if(i===2){
novo_cpf+=cpf_[i]+'.'
}

else if(i===5){
novo_cpf+=cpf_[i]+"."
}

else if(i===8){
novo_cpf+=cpf_[i]+'-'
}

else if(i!=2 && i!=5 && i!=8){
novo_cpf+=cpf_[i]
}

}


document.getElementById('cpf').value=novo_cpf
validar_cpf(apenas_numero)
}
if(tem_texto_que_nao_e_numero>=0){
document.getElementById("verificou_cpf").innerText='CPF inválido!'
}

else if(tem_texto_que_nao_e_numero<0 && (apenas_numero.length>=11 && apenas_numero.length<=12)){
document.getElementById("verificou_cpf").innerText='CPF OK!'       
}
})
//MÁSCARA CPF AO DIGITAR O CPF
document.getElementById('cpf').addEventListener('keyup',(e)=>{
let tamanho_cpf=0
let campo=document.getElementById('cpf').value
let apenas_numero=campo.replaceAll(".","").replace("-","")
let tem_texto_que_nao_e_numero=apenas_numero.search('[^0-9.-]')


tamanho_cpf=campo.length


if(campo.length<4 && campo.length>2){
document.getElementById('cpf').value+="."

}

else if(campo.length<8 && campo.length>6){
document.getElementById('cpf').value+="."

}
else if(campo.length<12 && campo.length>10){
document.getElementById('cpf').value+="-"

}

if(tamanho_cpf===14  && tem_texto_que_nao_e_numero===-1){
validar_cpf(apenas_numero)
}

if(tem_texto_que_nao_e_numero>=0){
document.getElementById("verificou_cpf").innerText='CPF inválido!'
}


if(e.key==='Delete' || e.key==='Backspace'){
document.getElementById('cpf').value=''
}

if(e.key==='Enter'){

cpf=document.getElementById('cpf').value
cpf=cpf.replaceAll('.','').replace('-','')
v1=validar_nome()
v2=validar_telefone()
v3=validar_endereco()
v4=validar_cpf(cpf)
v5=validar_endereco_numero()
v6=validar_complemento()
//VALIDANDO FORMULÁRIO
if (v1 && v2 && v3 && v4 && v5){
tipo_pagamento=document.getElementById("forma_de_pagamento").value



let dados_cliente={nome___:'',telefone___:'',cpf___:'',endereco___:'',numero___:'',complemento___:''}

let nome=document.getElementById('nome').value
let telefone=document.getElementById('telefone').value
let cpf=document.getElementById('cpf').value
let endereco=document.getElementById('endereco').value
let numero=document.getElementById('numero').value
let complemento=document.getElementById('complemento').value


dados_cliente.nome___=nome
dados_cliente.telefone___=telefone
dados_cliente.cpf___=cpf
dados_cliente.endereco___=endereco
dados_cliente.numero___=numero
dados_cliente.complemento___=complemento


if(tipo_pagamento==='Pix'){
document.getElementsByClassName("itens_cadastro")[0].classList.add("itens_cadastro_apos_validar")
document.getElementsByClassName("pgto")[0].classList.add("pgto_visivel")
QRCODE()
}
}

}
})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O NOME
document.getElementsByClassName('borracha_formulario')[0].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[0].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[0].parentNode.childNodes[1].select()
document.getElementById("verificou_nome").innerText='Insira um nome'

})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O TELEFONE
document.getElementsByClassName('borracha_formulario')[1].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[1].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[1].parentNode.childNodes[1].select()
document.getElementById("verificou_telefone").innerText='Insira um telefone'
})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O CPF
document.getElementsByClassName('borracha_formulario')[2].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[2].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[2].parentNode.childNodes[1].select()
document.getElementById("verificou_cpf").innerText='Insira o CPF'
})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O NÚMERO DO ENDEREÇO
document.getElementsByClassName('borracha_formulario')[3].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[3].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[3].parentNode.childNodes[1].select()
document.getElementById("verificou_endereco").innerText='Insira o endereço'
})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O COMPLEMENTO
document.getElementsByClassName('borracha_formulario')[4].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[4].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[4].parentNode.childNodes[1].select()
document.getElementById("verificou_numeroendereco").innerText='Insira o número do endereço'
})

//AO CLICAR O ÍCONE DA BORRACHA, APAGAR O CPF
document.getElementsByClassName('borracha_formulario')[5].addEventListener('click',()=>{
document.getElementsByClassName('borracha_formulario')[5].parentNode.childNodes[1].value=''
document.getElementsByClassName('borracha_formulario')[5].parentNode.childNodes[1].select()
document.getElementById("verificou_complemento").innerText='Insira o complemento'
})

function  QRCODE(){

soma1=parseFloat(dados[0]['valor_total_ingredientes_total'])
soma2= parseFloat(dados[0]['valor_total_cardapio_semanal'])


soma=soma1+soma2
let texto_qr_code=`MARMITASalimentos&alimentos${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(soma).toString().replace(',','')}`
let typeNumber = 4;
let errorCorrectionLevel = 'L';
let qr = qrcode(typeNumber, errorCorrectionLevel);
qr.addData(texto_qr_code);
qr.make();
let formatar_HTML = qr.createImgTag().replace("img ","img id='qrCode'")
document.getElementById('qrCode').innerHTML =formatar_HTML
document.getElementsByTagName('img')[0].classList.add("qr_code")
document.getElementsByClassName('texto1')[0].innerText=`Pagamento: Valor Total R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(soma)}`
document.getElementsByClassName('texto2')[0].innerHTML=`Copia e Cola QR Code: ${texto_qr_code}  <button id="btn-copiarQRCode" onclick="copiar_QRCODE(this)"> Copiar QR Code</button>`


}

function  DINHEIRO(){

soma1=parseFloat(dados[0]['valor_total_ingredientes_total'])
soma2= parseFloat(dados[0]['valor_total_cardapio_semanal'])


soma=soma1+soma2

document.getElementById('qrCode').innerHTML =`<div id='dinheiro'>Troco<input type='number' id='troco'></div>`
document.getElementsByTagName('img')[0].classList.add("qr_code")
document.getElementsByClassName('texto1')[0].innerText=`Pagamento: Valor Total R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
minimumFractionDigits:2,maximumFractionDigits:2,
useGrouping:'always'}).format(soma)}`
document.getElementById('finalizar_compra').classList.add('botao_finalizar_compra_dinheiro')
document.getElementsByClassName('pgto')[0].classList.add('pgto_dinheiro')

    
    document.getElementById('dinheiro').style.left='0rem'
    document.getElementById('finalizar_compra').style.top='2.5rem'

}

function  NAOEDINHEIRONEMPIX(){

    soma1=parseFloat(dados[0]['valor_total_ingredientes_total'])
    soma2= parseFloat(dados[0]['valor_total_cardapio_semanal'])
    
    
    soma=soma1+soma2
    
    document.getElementById('qrCode').innerHTML =`<div id='cartao'>Pagando com ${localStorage.getItem("tipo_pagamento")}</div>`
    document.getElementsByTagName('img')[0].classList.add("qr_code")
    document.getElementsByClassName('texto1')[0].innerText=`Pagamento: Valor Total R$ ${Intl.NumberFormat("pt-BR",{style:'decimal',
    minimumFractionDigits:2,maximumFractionDigits:2,
    useGrouping:'always'}).format(soma)}`
    document.getElementById('finalizar_compra').classList.add('botao_finalizar_compra_dinheiro')
    document.getElementsByClassName('pgto')[0].classList.add('pgto_dinheiro')
    document.getElementById('qrCode').classList.add('cartao')

    document.getElementById('finalizar_compra').style.top='1rem'
    document.getElementsByClassName('cartao')[0].style.top='3rem'
    }

if (localStorage.getItem('msg_coleta_dados')==='false'){
document.getElementById('msg').classList.remove('msg')
document.getElementById('msg').classList.add('msg_visivel')

}else{

document.getElementById('msg').classList.add('msg')
document.getElementById('msg').classList.remove('msg_visivel')

}

if(localStorage.getItem("tipo_pagamento")===''){
document.getElementById("formularioo").classList.remove("formulario_oculto")
document.getElementById('sem_selecionar').classList.remove('sem_selecionarr')
}

if(localStorage.getItem("tipo_pagamento")==='Pix'){

document.getElementById("formularioo").classList.add("formulario_oculto")
document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
QRCODE()


}else{
if(localStorage.getItem("tipo_pagamento")==='Dinheiro'){


document.getElementById("formularioo").classList.add("formulario_oculto")
document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
DINHEIRO()


}
if(localStorage.getItem("tipo_pagamento")==='Cartão'){


document.getElementById("formularioo").classList.add("formulario_oculto")
document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
NAOEDINHEIRONEMPIX()


}
if(localStorage.getItem("tipo_pagamento")==='Cartão de crédito'){


document.getElementById("formularioo").classList.add("formulario_oculto")
document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
NAOEDINHEIRONEMPIX()


}
}
document.getElementById('checkbox').addEventListener('click',()=>{
let marcado=document.getElementById('checkbox').checked
localStorage.setItem('msg_coleta_dados','true')

if(marcado){
document.getElementById('msg').classList.add('msg')
document.getElementById('msg').classList.remove('msg_visivel')
document.getElementById('sem_selecionar').classList.remove('sem_selecionarr')

}
})




let venda_finalizada = {data_hora:'',dados_usuario:'',monte_sua_marmita:'',cardapio_da_semana:'',valor_total_ingredientes_marmitas:'',valor_total_marmitas_da_semana:'',tipo_pagamento:'',troco:0}
        
//AO FINALIZAR O CADASTRO
document.getElementById("cadastro").addEventListener('click',()=>{

    var resposta = confirm("Os dados estão corretos?");

    if(resposta){
let cpf=document.getElementById('cpf').value
cpf=cpf.replaceAll('.','').replace('-','')
let v1=validar_nome()
let v2=validar_telefone()
let v3=validar_endereco()
let v4=validar_cpf(cpf)
let v5=validar_endereco_numero()

    if (v1 && v2 && v3 && v4 && v5){
        let tipopagamento=document.getElementById("forma_de_pagamento").value
        localStorage.setItem("tipo_pagamento",tipopagamento)
        
        
        let dados_cliente={nome___:'',telefone___:'',cpf___:'',endereco___:'',numero___:'',complemento___:''}

        let nome=document.getElementById('nome').value
        let telefone=document.getElementById('telefone').value
        let cpf=document.getElementById('cpf').value
        let endereco=document.getElementById('endereco').value
        let numero=document.getElementById('numero').value
        let complemento=document.getElementById('complemento').value
        
        dados_cliente.nome___=nome
        dados_cliente.telefone___=telefone
        dados_cliente.cpf___=cpf
        dados_cliente.endereco___=endereco
        dados_cliente.numero___=numero
        dados_cliente.complemento___=complemento
        
        
        
        
        tipo_pagamento = document.getElementById('forma_de_pagamento').value
        let data_venda=new Date().toLocaleString() 
        venda_finalizada['data_hora']=data_venda
        venda_finalizada['monte_sua_marmita']= JSON.parse(dados[0]['itens_selecionados_ingredientes_mar_fechada'])   
        venda_finalizada['cardapio_da_semana']= JSON.parse(dados[0]['itens_selecionados_cardapio_semanal'].replace("vlr",",Subtotal"))
        venda_finalizada['dados_usuario']= dados_cliente
        venda_finalizada['valor_total_ingredientes_marmitas']=dados[0]['valor_total_ingredientes_total']
        venda_finalizada['valor_total_marmitas_da_semana']=dados[0]['valor_total_cardapio_semanal']
        venda_finalizada['tipo_pagamento']=tipo_pagamento  

        

        if(localStorage.getItem("tipo_pagamento")==='Pix'){

            document.getElementById("formularioo").classList.add("formulario_oculto")
            document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
            QRCODE()

            
            
            }else{
            if(localStorage.getItem("tipo_pagamento")==='Dinheiro'){
            
            
            document.getElementById("formularioo").classList.add("formulario_oculto")
            document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
            DINHEIRO()

            
            
            }
            if(localStorage.getItem("tipo_pagamento")==='Cartão'){
            
            
            document.getElementById("formularioo").classList.add("formulario_oculto")
            document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
            NAOEDINHEIRONEMPIX()

            
            
            }
            if(localStorage.getItem("tipo_pagamento")==='Cartão de crédito'){
            
            
            document.getElementById("formularioo").classList.add("formulario_oculto")
            document.getElementsByClassName('pgto')[0].classList.add('pgto_visivel')
            NAOEDINHEIRONEMPIX()

            
            
            }
        }
    }
    }
})

//AO FINALIZAR A COMPRA
document.getElementById('finalizar_compra').addEventListener('click',()=>{
 
    var resposta = confirm("Finalizar compra?");

    if(resposta){
    tipo_pagamento = document.getElementById('forma_de_pagamento').value

    

    if(localStorage.getItem("tipo_pagamento")==='Pix'){
        
        venda_finalizada['troco']=0
        vendas_finalizadas = JSON.stringify(venda_finalizada)
    }
    else if(localStorage.getItem("tipo_pagamento")==='Dinheiro'){
    
        troco_para=document.getElementById('troco').value.replace(",",'.')  
        valor_cobrado=document.getElementsByClassName("texto1")[0].innerText
        valor_cobrado=parseFloat(valor_cobrado.replace("Pagamento: Valor Total R$ ",'').replace(",",'.'))

        if(troco_para<valor_cobrado){

            alert("Valor do troco está menor do que o valor cobrado")
            document.getElementById('troco').select()
            return
  
            
        }
        venda_finalizada['troco']=troco_para
        vendas_finalizadas = JSON.stringify(venda_finalizada)
        document.getElementById("finalizar_compra").innerText='Aguarde . . . '
        document.getElementById("finalizar_compra").style.pointerEvents='none'

    }
    else if(localStorage.getItem("tipo_pagamento")==='Cartão'){
    
        venda_finalizada['troco']=0
        vendas_finalizadas = JSON.stringify(venda_finalizada)   
        document.getElementById("finalizar_compra").innerText='Aguarde . . . '
        document.getElementById("finalizar_compra").style.pointerEvents='none' 
    
    }
    else if(localStorage.getItem("tipo_pagamento")==='Cartão de crédito'){

        venda_finalizada['troco']=0
        vendas_finalizadas = JSON.stringify(venda_finalizada)
        document.getElementById("finalizar_compra").innerText='Aguarde . . . '
        document.getElementById("finalizar_compra").style.pointerEvents='none'
    }


    var socket = io.connect()   
    ID=localStorage.getItem("ID SESSÃO")  
    socket.on('connect',()=>{
    socket.emit('frontendbackend', {venda: vendas_finalizadas,valor_total: parseFloat(valor_total), id:ID});
    socket.emit('gerarrelatorio',{id:ID});

})  

socket.on('ir_para_tela_final',(msg)=>{
window.location='obrigado_pela_compra.html'

})

    }else{
        localStorage.setItem('tipo_pagamento','')
        window.location='/'
    }
})})


//BOTÃO VOLTAR NA TELA
function voltar(){
window.location='monte_seu_cardapio.html'
}

async function copiar_QRCODE(elemento){

    let btn_copiarQRCode=document.getElementById("btn-copiarQRCode")
    texto_qr_code_copiado=elemento.parentNode.innerText.replace('Copia e Cola QR Code: ','').replace("Copiar QR Code",'')
    
    try {
    if (navigator?.clipboard?.writeText) {
    btn_copiarQRCode.innerText='QR Code copiado!'
    btn_copiarQRCode.classList.add('qr_code_copiado')
    await navigator.clipboard.writeText(texto_qr_code_copiado);
    
    setTimeout(()=>{
    btn_copiarQRCode.innerText='Copiar QR Code' 
    btn_copiarQRCode.classList.remove('qr_code_copiado')},2000);
    
    }
    } catch (err) {
    
    }
    }