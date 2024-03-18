//inserir dados - ADMIN
function inserirDados(){
    let dados=document.getElementsByClassName("texto_preencher_alimentos")[0]
    let linhas = dados.value.split(";")


    coluna1=[]
    coluna2=[]
    coluna3=[]
    coluna4=[]        

    let count=0
    for(let i=0;i<=linhas.length-1;i++){
        let itens_linha = linhas[i].split(',')
        count++

        let item=`item_${count}`
        coluna1[i]=itens_linha[0]
        coluna2[i]=itens_linha[1]
        coluna3[i]=itens_linha[2]
        coluna4[i]=itens_linha[3]
        localStorage.setItem(item,coluna1[i])


    }

    preencherItens()

}

let botaoInserirDados=document.getElementById("inserir")
botaoInserirDados.addEventListener("click",inserirDados)



//excluir dados - ADMIN
function excluirDados(){
    localStorage.clear()
}
let botaoexcluir=document.getElementById("excluir")
botaoexcluir.addEventListener("click",excluirDados)

