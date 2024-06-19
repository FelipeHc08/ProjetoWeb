const Produto = require('../model/produto');

// Abrir a página de pulseira
function pulseiraView(req, res) {
  res.render('pulseira.html');
}

// Abrir a página de criação de pulseira
function criarView(req, res){
  res.render('cadastrar-pulseira.html');
}

// Cria o produto corretamente e redireciona para a página de produtos
async function cadastrarProduto(req, res) {
  let produto = {
    cor: req.body.cor,
    quantidade: req.body.quantidade,
    status: req.body.status
  };

  try {
    await Produto.create(produto);
    console.log(produto);
    res.redirect('/produto'); // Redireciona para a página de listagem de produtos
  } catch (err) {
    console.log(err);
    res.render('cadastrar-pulseira.html', { erro: true }); // Renderiza a página de cadastro com erro
  }
}

function listarProdutos(req, res) {
  Produto.findAll()
    .then((produtos) => {
      res.render('listar-produtos.html', { produtos }); // Renderiza a página de listagem de produtos
    })
    .catch((err) => {
      console.log(err);
      res.render('listar-produtos.html', { erro: err }); // Renderiza a página de listagem com erro
    });
}

function renderizarPaginaEdicaoProduto(req, res) {
  const id = req.body.produtoIdEditar;
  res.render('editar-pulseira.html', { id }); // Renderiza a página de edição com o ID fornecido
}

async function salvarEdicaoProduto(req, res) {
  const id = req.body['edit-id'];
  const cor = req.body['edit-cor'];
  const quantidade = req.body['edit-quantidade'];
  const status = req.body['edit-status'];

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      produto.cor = cor;
      produto.quantidade = quantidade;
      produto.status = status;

      await produto.save();
      res.redirect('/produto'); // Redireciona para a página de listagem de produtos
    } else {
      res.render('editar-pulseira.html', { erro: 'Produto não encontrado', id }); // Renderiza a página de edição com erro
    }
  } catch (err) {
    console.log(err);
    res.render('editar-pulseira.html', { erro: 'Erro ao salvar o produto', id }); // Renderiza a página de edição com erro
  }
}

async function removerProduto(req, res) {
  const id = req.body.produtoId;

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      await produto.destroy();
      res.redirect('/produto'); // Redireciona para a página de listagem de produtos
    } else {
      res.status(404).render('listar-produtos.html', { erro: 'Produto não encontrado' }); // Renderiza a página de listagem com erro
    }
  } catch (err) {
    console.log(err);
    res.status(500).render('listar-produtos.html', { erro: 'Erro ao remover o produto' }); // Renderiza a página de listagem com erro
  }
}

async function atualizarProduto(req, res) {
  const id = req.body.produtoId;
  const cor = req.body.cor;
  const quantidade = req.body.quantidade;
  const status = req.body.status;

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      produto.cor = cor;
      produto.quantidade = quantidade;
      produto.status = status;

      await produto.save();
      res.redirect('/produto'); // Redireciona para a página de listagem de produtos
    } else {
      res.status(404).render('listar-produtos.html', { erro: 'Produto não encontrado' }); // Renderiza a página de listagem com erro
    }
  } catch (err) {
    console.log(err);
    res.status(500).render('listar-produtos.html', { erro: 'Erro ao atualizar o produto' }); // Renderiza a página de listagem com erro
  }
}

module.exports = {
  cadastrarProduto,
  listarProdutos,
  renderizarPaginaEdicaoProduto,
  salvarEdicaoProduto,
  removerProduto,
  criarView,
  pulseiraView,
  atualizarProduto
};