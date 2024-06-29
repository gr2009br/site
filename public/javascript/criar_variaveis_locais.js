//AO CARREGAR O SITE (ARQUIVO INDEX.HTML) ESSE ARQUIVO É CHAMADO

if(!localStorage.getItem("valor_total_cardapio_semanal")){
localStorage.setItem("valor_total_cardapio_semanal",0)
}
if(!localStorage.getItem("valor_total_ingredientes")){
localStorage.setItem("valor_total_ingredientes",0)
}
if(!localStorage.getItem("valor_total_ingredientes_total")){
localStorage.setItem("valor_total_ingredientes_total",0)
}
if(!localStorage.getItem("itens_selecionados_cardapio_semanal")){
localStorage.setItem("itens_selecionados_cardapio_semanal",JSON.stringify({}))
}
if(!localStorage.getItem("itens_selecionados_ingredientes")){
localStorage.setItem("itens_selecionados_ingredientes",JSON.stringify({}))
}
if(!localStorage.getItem("itens_selecionados_ingredientes_mar_fechada")){
localStorage.setItem("itens_selecionados_ingredientes_mar_fechada",JSON.stringify({'a':'0','qte':'0'}))
}
if(!localStorage.getItem("qte_marmitas_fechadas")){
localStorage.setItem("qte_marmitas_fechadas",0)
}
if(!localStorage.getItem("edit_monte_seu_cardapio_final_inteiro")){
localStorage.setItem("edit_monte_seu_cardapio_final_inteiro",false)
}
if(!localStorage.getItem("id_edit_monte_seu_cardapio_final_inteiro")){
localStorage.setItem("id_edit_monte_seu_cardapio_final_inteiro",false)
}
if(!localStorage.getItem("msg_coleta_dados")){
    localStorage.setItem("msg_coleta_dados",false)
}
if(!localStorage.getItem("tipo_pagamento")){
    localStorage.setItem("tipo_pagamento",'')
}

if(!localStorage.getItem('vendas_finalizadas')){
    localStorage.setItem('vendas_finalizadas',JSON.stringify({}))
}
if(!localStorage.getItem("valor_total_de_todos_os_pedidos")){
    localStorage.setItem("valor_total_de_todos_os_pedidos",0)
}
if(!localStorage.getItem("dados_cliente")){
    localStorage.setItem("dados_cliente",0)
}
if(!localStorage.getItem("valor_total_TUDO")){
    localStorage.setItem("valor_total_TUDO",0)
}
if(!localStorage.getItem("ID SESSÃO")){
    localStorage.setItem("ID SESSÃO",'')
}
if(!localStorage.getItem("preencheu_formulario")){
    localStorage.setItem("preencheu_formulario",false)
}
if(!localStorage.getItem("tipo_pagamento")){
    localStorage.setItem("tipo_pagamento",'')
}


