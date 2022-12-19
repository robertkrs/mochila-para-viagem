const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];


itens.forEach((e) =>{
    criaElemento(e);
}) 

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find( e => e.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual;
    } else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    };

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value ="";

});


function criaElemento(item){

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    
    lista.appendChild(novoItem);
    novoItem.appendChild(botaoDeleta(item.id));

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoDeleta = document.createElement('button');
    elementoDeleta.innerText = "X";

    elementoDeleta.addEventListener('click', function () {
        deletaElemento(this.parentNode, id);
    })


    return elementoDeleta;
}

function deletaElemento(e, id){
    e.remove();

    itens.splice(itens.findIndex(e => e.id === id), 1);
    console.log(itens);

    localStorage.setItem("itens", JSON.stringify(itens));

}