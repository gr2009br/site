//AO FINALIZAR O PAGAMENTO, ESSE CÓDIGO É CHAMADO

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function atualizarRelatoriosAutomaticamente(){
let i=0


    for (let i = 6000; i >0; i--) {
        
        
        await sleep(60*1000);
        
        window.location.href = 'dashboard.html'
    }
}
atualizarRelatoriosAutomaticamente()