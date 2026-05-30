{var varVar = 10}
console.log(varVar); // saida 10
//{let varLet = 10}
//console.log(varLet) // saida varLet is not defined


if(x === undefined){
    console.log("x is undefined"); // hoisting
}
//let x = 101; // Cannot access 'x' before initialization
var x = 101;
console.log(x);
//Variáveis globais são propriedades do objeto global. 
/*window.varGlobal = "var Global"
{
    console.log(window.varGlobal)
}
*/


//Convertendo strings para números
var x = "2"
var y = "3";
console.log(x+y); // 23
console.log((+x) + (+y)); // 5

var produtos = ["Mouse",,"teclado"];
console.log(produtos[0]);
console.log(produtos);


var usuario1 = {
    nome: "Pedro", cpf: "121.242.323.21",idade: 19,
};


var usuario2 = {
    nome: "Fernando", cpf: "131.232.323.21",idade: 19,
};
var usuarios = [usuario1, usuario2];

// objeto literal
var pedido = { pedidos: {usuarios, preco: 15.4}}
console.log(pedido.pedidos.usuarios[0]);
