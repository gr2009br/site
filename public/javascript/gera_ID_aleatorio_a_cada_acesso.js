var l=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var n=['0','1','2','3','4','5','6','7','8','9','10']
var id=''


for(i=0;i<=3;i++){
    id+=(Math.random()*10).toString()+l[parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*4)]

}

var socket = io.connect({'forceNew': true})     
socket.on('connect',()=>{
    socket.emit('GRAVAR_NOVO_USUARIO', {id:id, valor:0});
    

}) 

if (localStorage.getItem("ID SESSÃO")===''){
localStorage.setItem("ID SESSÃO",id)
}