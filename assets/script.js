//DECLARANDO VARIAVEIS
const imagemItens = document.querySelectorAll(".image-item img");
const imagem = document.querySelector(".imagens-meio");
const imagemAtual = document.querySelector(".imagens-meio .image");
const imagens = document.querySelectorAll(".imagens-meio img");
const arrowLeft = document.querySelector(".fa-arrow-left");
const arrowRight = document.querySelector(".fa-arrow-right");
const cart = document.querySelector(".cart .carrinho");
const closer = document.querySelector(".fa-xmark");
const botaoAdicionarCarrinho = document.querySelector(".add-cart");
const mostrarCarinho = document.querySelector(".cart-itens");
const carrinhoVazio = document.querySelector(".cart-vazio");
const adicionarCarrinho = document.querySelector(".cart-itens ul");
const body = document.querySelector("body");
const trash = document.querySelector(".fa-trash-can");
const btnCheckout = document.querySelector(".checkout");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(" .close_menu");
let idx = 0;

imagem.addEventListener("click", function () {
  if (document.body.clientWidth > 768) {
    // Adiciona a classe "all" para exibir todas as imagens
    imagem.classList.add("all");
    closer.classList.remove("inactive"); // Remove a classe "inactive" do ícone de fechar

    // Exibe apenas a primeira imagem
    imagens.forEach((img, i) => {
      img.classList.toggle("inactive", i !== 0);
    });

    // Adiciona evento de clique no ícone de fechar
    closer.addEventListener("click", function () {
      // Esconde todas as imagens exceto a primeira
      imagens.forEach((i, index) => {
        i.classList.toggle("inactive", index !== 0);
      });
      imagem.classList.remove("all"); // Remove a classe "all" da imagem
      closer.classList.add("inactive"); // Adiciona a classe "inactive" ao ícone de fechar

      // Chama a função para ativar as setas de navegação
      active();
    });

    inactive(); // Ativa as setas de navegação
  }
});

//ITENS IMAGE

imagemItens.forEach((img, index) => {
  // Para cada item da lista de imagens
  img.addEventListener("click", () => {
    // Adiciona um event listener de clique
    imagemItens.forEach((itens) => {
      // Para cada item da lista de imagens
      itens.classList.remove("selected-item"); // Remove a classe "selected-item"
    });
    img.classList.add("selected-item"); // Adiciona a classe "selected-item" ao item clicado

    // Seleciona a imagem correspondente ao item clicado
    switch (index) {
      case 0:
        imagemAtual.src = "/images/image-product-1.jpg";
        break;
      case 1:
        imagemAtual.src = "/images/image-product-2.jpg";
        break;
      case 2:
        imagemAtual.src = "/images/image-product-3.jpg";
        break;
      case 3:
        imagemAtual.src = "/images/image-product-4.jpg";
        break;
      default:
        break;
    }
  });
});

function inactive() {
  arrowRight.classList.remove("inactive");
  arrowLeft.classList.remove("inactive");
}
function active() {
  arrowRight.classList.add("inactive");
  arrowLeft.classList.add("inactive");
}

// Adiciona um ouvinte de eventos ao botão de seta direita
arrowRight.addEventListener("click", () => {
  // Incrementa o índice e garante que ele volte ao início se exceder o número de imagens
  idx = (idx + 1) % imagens.length;
  // Atualiza a exibição do carousel
  updateCarousel();
});

// Adiciona um ouvinte de eventos ao botão de seta esquerda
arrowLeft.addEventListener("click", () => {
  // Decrementa o índice e garante que ele volte ao fim se for menor que zero
  idx = (idx - 1 + imagens.length) % imagens.length;
  // Atualiza a exibição do carousel
  updateCarousel();
});

// Função para atualizar a exibição do carousel
function updateCarousel() {
  // Percorre todas as imagens
  imagens.forEach((img, i) => {
    // Se o índice da imagem for igual ao índice ativo
    if (i === idx) {
      // Remove a classe "inactive" para torná-la visível
      img.classList.remove("inactive");
    } else {
      // Adiciona a classe "inactive" para torná-la invisível
      img.classList.add("inactive");
    }
  });
}

//MAIS E MENOS
const maisProdutos = document.querySelector(".mais");
const menosProdutos = document.querySelector(".menos");
let quantidadeProdutos = document.querySelector(".quantity p");
function atualizarQuantidade(operacao) {
  let produto = parseInt(quantidadeProdutos.textContent);
  let quantidade;

  if (operacao === "incrementar" && produto < 99) {
    quantidade = produto + 1;
  } else if (operacao === "decrementar" && produto > 0) {
    quantidade = produto - 1;
  } else {
    return;
  }

  quantidadeProdutos.textContent = quantidade;
  let valor = 125;
  let valorCalculado = quantidade * valor;
  // Atualiza o valor da quantidade no parágrafo
  let produtoParagrafo = document.querySelector(".quantidade");
  produtoParagrafo.textContent = `x${quantidade.toString()}`;
  let valorFinal = document.querySelector(".valor-final");
  valorFinal.textContent = `$${valorCalculado}.00`;
}

maisProdutos.addEventListener("click", () => {
  atualizarQuantidade("incrementar");
});

menosProdutos.addEventListener("click", () => {
  atualizarQuantidade("decrementar");
});

//CART

cart.addEventListener("click", () => {
  mostrarCarinho.classList.toggle("inactive");
});

botaoAdicionarCarrinho.addEventListener("click", () => {
  if (quantidadeProdutos.textContent === "0") {
    alert("Escolha pelo menos 1 item antes de adicionar ao carrinho!");
  } else {
    mostrarCarinho.classList.remove("inactive");
    carrinhoVazio.classList.add("inactive");
    adicionarCarrinho.classList.remove("inactive");
  }
});

trash.addEventListener("click", () => {
  adicionarCarrinho.classList.add("inactive");
  carrinhoVazio.classList.remove("inactive");
});

menu.addEventListener("click", () => {
  document.querySelector(".navigation").style.display = "block";
});

closeMenu.addEventListener("click", () => {
  document.querySelector(".navigation").style.display = "none";
});
