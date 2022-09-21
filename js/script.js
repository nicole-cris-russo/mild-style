//-------------SEÇÃO DA VITRINE------------------

let sectionVitrine = document.querySelector(".vitrine");
let buttonAdd = document.querySelector(".adicionar-ao-carrinho");

//------------CRIAÇÃO DO CARD
function cardProduto(product) {
  let section = document.createElement("section");
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let div = document.createElement("div");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let pDescricao = document.createElement("p");
  let pPreco = document.createElement("p");
  let buttom = document.createElement("button");

  section.className = "produto";
  div.className = "info-produto";
  a.className = "link-categoria-produto";
  h2.className = "nome-produto";
  pDescricao.className = "paragrafo-produto";
  pPreco.className = "preco-produto";
  buttom.className = "adicionar-ao-carrinho";

  section.appendChild(figure);
  section.appendChild(div);
  figure.appendChild(img);
  div.appendChild(a);
  div.appendChild(h2);
  div.appendChild(pDescricao);
  div.appendChild(pPreco);
  div.appendChild(buttom);

  img.src = product.img;
  a.href = "#";
  a.innerText = product.tag;
  h2.innerText = product.nameItem;
  pDescricao.innerText = product.description;
  pPreco.innerText = "R$ " + product.value;
  buttom.innerText = product.addCart;
  buttom.id = product.id;

  buttom.addEventListener("click", () => {
    addInArrayCart(product);
  });

  return section;
}

//------------LISTAGEM DE PRODUTOS
function listarProdutos(arrayProdutos) {
  for (let i = 0; i < arrayProdutos.length; i++) {
    let produto = arrayProdutos[i];

    const card = cardProduto(produto);
    sectionVitrine.appendChild(card);
  }
}

listarProdutos(data);

//-------------SEÇÃO DO CARRINHO DE COMPRAS-------

let arrayCart = [];
let ulCart = document.querySelector(".ulCart");
let emptyElem = document.querySelector(".empty");

// card do carrinho

function cardProductCar(product) {
  let cardCar = document.createElement("li");
  cardCar.className = "divCardCart";
  let divRight = document.createElement("div");
  divRight.className = "divRightCard";
  let divImg = document.createElement("div");
  divImg.classList.add("divCardCard", "divImg");
  let divTitleRemove = document.createElement("div");
  divTitleRemove.classList.add("divCardCard", "divTitle");
  let divPreco = document.createElement("div");
  divPreco.classList.add("divCardCard", "divPreco");
  let img = document.createElement("img");
  let title = document.createElement("span");
  let buttonRemove = document.createElement("button");
  let preco = document.createElement("span");
  let trashIcon = document.createElement("img");

  cardCar.append(divImg, divRight);
  divRight.append(divTitleRemove, divPreco);
  divImg.appendChild(img);
  divTitleRemove.append(title, buttonRemove);
  divPreco.appendChild(preco);
  buttonRemove.appendChild(trashIcon);

  buttonRemove.addEventListener("click", () => {
    removeInCart(product.valueIndex);
  });

  cardCar.id = product.id;
  img.src = product.img;
  title.innerText = product.nameItem;
  trashIcon.src = "../img/delete.svg";
  preco.innerText = "R$ " + product.value;

  return cardCar;
}

//  evento de add no carrinho

function cartEmpty() {
  if (arrayCart.length == 0) {
    emptyElem.style.display = "flex";
  }
}
cartEmpty();

function addInArrayCart(prod) {
  emptyElem.style.display = "none";
  let product = data.find((elem) => elem == prod);
  const productNew = {
    ...product,
    valueIndex: arrayCart.length,
  };
  arrayCart.push(productNew);
  addListCart();
  someValues();
  showValueTotal();
}

function addListCart() {
  ulCart.innerHTML = "";
  arrayCart.map((elem) => ulCart.appendChild(cardProductCar(elem)));
}

// remover do carrinho

function removeInCart(value) {
  const product = arrayCart.find((elem) => elem.valueIndex == value);
  const index = arrayCart.indexOf(product);
  arrayCart.splice(index, 1);
  addListCart();
  someValues();
  showValueTotal();
  if (arrayCart.length == 0) {
    emptyElem.style.display = "flex";
    divTotal.style.display = "none";
  }
}

// value total

const divTotal = document.querySelector(".valueTotal");
let valueTotal = 0;

function divValueTotal() {
  let container = document.createElement("div");
  let text = document.createElement("span");
  let value = document.createElement("span");

  container.append(text, value);

  text.innerText = "Valor total";
  value.innerText = "R$ " + valueTotal;

  return container;
}

function someValues() {
  valueTotal = arrayCart.reduce((prev, curr) => prev + curr.value, 0);
  console.log(valueTotal);
}

function showValueTotal() {
  divTotal.innerHTML = "";
  let div = divValueTotal();
  divTotal.appendChild(div);
  divTotal.style.display = "flex";
}
