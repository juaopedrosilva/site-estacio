document.addEventListener('DOMContentLoaded', async function () {
	try {
		const response = await fetch('products.json');

		if (!response.ok) throw new Error(`Erro ao carregar produtos: ${response.statusText}`);

		const produtos = await response.json();

		const container = document.getElementById('produtos-container');

		const fragment = document.createDocumentFragment();

		produtos.forEach(produto => {
			const produtoDiv = document.createElement('div');
			produtoDiv.classList.add('produto');

			produtoDiv.innerHTML = `
          <h3>${produto.nome}</h3>
          <img src="${produto.urlImagem}" alt="${produto.nome}" width="150" height="150" />
          <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          <p>${produto.descricao}</p>
        `;

			fragment.appendChild(produtoDiv);
		});



container.appendChild(fragment);
	} catch (error) {
		console.error('Erro ao carregar produtos:', error);
		document.getElementById('produtos-container').innerHTML = `<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>`;
	}
});
