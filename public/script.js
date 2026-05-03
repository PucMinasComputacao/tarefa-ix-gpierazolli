const data = {
  produtos: [
    { id: 1, nome: "iPhone", preco: 5000, categoria: "Celulares", imagem: "https://via.placeholder.com/100", descricao: "Celular top", emEstoque: true },
    { id: 2, nome: "Samsung", preco: 3000, categoria: "Celulares", imagem: "https://via.placeholder.com/100", descricao: "Android bom", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 4000, categoria: "Notebooks", imagem: "https://via.placeholder.com/100", descricao: "Notebook potente", emEstoque: false },
    { id: 4, nome: "Mouse", preco: 100, categoria: "Acessórios", imagem: "https://via.placeholder.com/100", descricao: "Mouse simples", emEstoque: true },
    { id: 5, nome: "Teclado", preco: 200, categoria: "Acessórios", imagem: "https://via.placeholder.com/100", descricao: "Teclado mecânico", emEstoque: true },
    { id: 6, nome: "PS5", preco: 4500, categoria: "Games", imagem: "https://via.placeholder.com/100", descricao: "Console Sony", emEstoque: true },
    { id: 7, nome: "Xbox", preco: 4200, categoria: "Games", imagem: "https://via.placeholder.com/100", descricao: "Console Microsoft", emEstoque: false },
    { id: 8, nome: "MacBook", preco: 9000, categoria: "Notebooks", imagem: "https://via.placeholder.com/100", descricao: "Notebook Apple", emEstoque: true }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.margin = "10px";

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}" width="100">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="details">Ver detalhes</button>
    <button class="highlight">Destacar</button>
  `;

  card.querySelector(".details").addEventListener("click", () => {
    showProductDetails(produto);
  });

  card.querySelector(".highlight").addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log(card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = ["Todas"];

  data.produtos.forEach(p => {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  categorySelect.innerHTML = "";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h3>${produto.nome}</h3>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "Todas" || p.categoria === categoria;
    return matchNome && matchCategoria;
  });
}

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);