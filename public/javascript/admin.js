    
    let email=document.getElementsByClassName('caixa1-pagina-admin')[0]
    email.select()
    document.getElementsByClassName('botao-pagina-admin')[0].addEventListener('click',()=>{
    let email=document.getElementsByClassName('caixa1-pagina-admin')[0].value
    let senha=document.getElementsByClassName('caixa2-pagina-admin')[0].value

    var socket = io.connect()
    socket.emit('verificar',{email:email, senha:senha})
    socket.on('status',dados=>{
        if(dados){
            window.location='dashboard.html'
        }else{
            alert("Acesso negado!")
            email.value=''
            senha.value=''
            email.select()
        }


    })

}

)

document.getElementsByClassName('caixa2-pagina-admin')[0].addEventListener('keyup',(e)=>{



    if(e.key==='Enter'){

    let email=document.getElementsByClassName('caixa1-pagina-admin')[0].value
    let senha=document.getElementsByClassName('caixa2-pagina-admin')[0].value

    var socket = io.connect()
    socket.emit('verificar',{email:email, senha:senha})
    socket.on('status',dados=>{
      
        if(dados){
            window.location='dashboard.html'
        }else{
            alert("Acesso negado!")
            email.value=''
            senha.value=''
            email.select()
        }


    })
}

}
)

document.getElementById('email').addEventListener('click',()=>{

document.getElementsByClassName("caixa1-pagina-admin")[0].value=''
document.getElementsByClassName("caixa1-pagina-admin")[0].select()
})

document.getElementById('senha').addEventListener('click',()=>{

    document.getElementsByClassName("caixa2-pagina-admin")[0].value=''
    document.getElementsByClassName("caixa2-pagina-admin")[0].select()
    })


    document.getElementsByClassName('ir-para-tela-inicial-pagamento')[0].addEventListener('click',()=>{
        window.location='/'
    })
