//AO FINALIZAR O PAGAMENTO, ESSE CÓDIGO É CHAMADO

if (document.referrer.includes('cadastro') || document.referrer.includes('obrigado')) {


} else {
window.location='index.html'
}

id=localStorage.getItem("ID SESSÃO")
document.getElementById("main").innerHTML=`Seu pedido chegará em breve!<br><a  href='./comprovante${id}.txt' download>Faça o download dos itens da sua compra</a><br><br><br><br><button id='voltar_pagina_inicial' onclick="inicio()">Voltar para a página inicial</button>`
        
function inicio(){
    document.getElementById("voltar_pagina_inicial").innerText='Aguarde . . .'
    socket = io.connect()
    socket.emit("apagar_arquivo",{arquivo:`comprovante${localStorage.getItem("ID SESSÃO")}.txt`})
    setTimeout(()=>{
        /*localStorage.setItem("valor_total_cardapio_semanal",0)
        localStorage.setItem("valor_total_ingredientes",0)
        localStorage.setItem("valor_total_ingredientes_total",0)
        localStorage.setItem("itens_selecionados_cardapio_semanal",JSON.stringify({}))
        localStorage.setItem("itens_selecionados_ingredientes",JSON.stringify({}))
        localStorage.setItem("itens_selecionados_ingredientes_mar_fechada",JSON.stringify({'a':'0','qte':'0'}))
        localStorage.setItem("qte_marmitas_fechadas",0)
        localStorage.setItem("edit_monte_seu_cardapio_final_inteiro",false)
        localStorage.setItem("id_edit_monte_seu_cardapio_final_inteiro",false)
        localStorage.setItem("msg_coleta_dados",false)
        localStorage.setItem("tipo_pagamento",'')
        localStorage.setItem('vendas_finalizadas',JSON.stringify({}))
        localStorage.setItem("valor_total_de_todos_os_pedidos",0)
        localStorage.setItem("dados_cliente",0)
        localStorage.setItem("valor_total_TUDO",0)
        localStorage.setItem("preencheu_formulario",false)*/
        localStorage.setItem("ID SESSÃO",'')
        window.location.href='/'
        },3000)
    
    

}






