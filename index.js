import express from "express";

const app = express();
const port = 3000;
const host = "localhost";

let listaProdutos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cadastro de Produtos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          background-color: #f0f4ff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          border: none;
          border-radius: 1rem;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          transition: transform 0.2s ease-in-out;
        }

        .form-label {
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card p-4">
              <h2 class="text-center mb-4">Cadastro de Produtos</h2>
              
              <form action="/adicionarProduto" method="POST">
                <div class="mb-3">
                  <label for="nome" class="form-label">Nome do Produto</label>
                  <input type="text" class="form-control" id="nome" name="nome" placeholder="Ex: Smartphone XYZ" required>
                </div>

                <div class="mb-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select class="form-select" id="categoria" name="categoria" required>
                    <option value="" disabled selected>Selecione...</option>
                    <option>Eletrônicos</option>
                    <option>Roupas</option>
                    <option>Alimentos</option>
                    <option>Livros</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="preco" class="form-label">Preço (R$)</label>
                    <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Ex: 199.99" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="quantidade" class="form-label">Quantidade</label>
                    <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Ex: 10" required>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="descricao" class="form-label">Descrição</label>
                  <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Detalhes do produto..."></textarea>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button type="submit" class="btn btn-success px-4">Cadastrar</button>
                  <a href="/listaProdutos" class="btn btn-primary px-4">Ver Lista</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.post("/adicionarProduto", (req, res) => {
  const nome = req.body.nome;
  const categoria = req.body.categoria;
  const preco = req.body.preco;
  const quantidade = req.body.quantidade;
  const descricao = req.body.descricao;

  listaProdutos.push({
    nome,
    categoria,
    preco,
    quantidade,
    descricao,
  });

  res.redirect("/listaProdutos");
});

app.get("/listaProdutos", (req, res) => {
  let tabela = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Produtos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <style>
        body {
          background-color: #f3f6ff;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 3rem 1rem;
          color: #2b2b2b;
        }

        .table-container {
          background: #fff;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.07);
          width: 100%;
          max-width: 1000px;
        }

        h1 {
          font-weight: 700;
          font-size: 1.8rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        table {
          border-radius: 0.5rem;
          overflow: hidden;
          background-color: #fff;
        }

        th {
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          padding: 1rem;
        }

        td {
          vertical-align: middle;
          padding: 0.9rem;
        }

        .empty-row {
          color: #6c757d;
          background-color: #f8f9fa;
        }
      </style>
    </head>

    <body>
      <div class="table-container">
        <h1>Lista de Produtos</h1>

        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0 text-center">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço (R$)</th>
                <th>Qtd.</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (listaProdutos.length === 0) {
    tabela += `
      <tr>
        <td colspan="5" class="text-center empty-row py-4">
          Nenhum produto cadastrado ainda.
        </td>
      </tr>
    `;
  } else {
    for (let i = 0; i < listaProdutos.length; i++) {
      tabela += `
        <tr>
          <td>${listaProdutos[i].nome}</td>
          <td>${listaProdutos[i].categoria}</td>
          <td>R$ ${Number(listaProdutos[i].preco).toFixed(2)}</td>
          <td>${listaProdutos[i].quantidade}</td>
          <td>${listaProdutos[i].descricao || "-"}</td>
        </tr>
      `;
    }
  }

  tabela += `
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <a href="/" class="btn btn-primary">Voltar ao Cadastro</a>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(tabela);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
