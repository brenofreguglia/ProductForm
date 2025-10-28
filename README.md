# ProductForm
### PI - Formulário de Produtos (AT2)

## Descrição do Projeto
Aplicativo web em Node.js com Express que cadastra produtos em memória e exibe uma lista formatada com Bootstrap. A aplicação possui um formulário responsivo disponível na rota `/` e uma página de listagem em `/listaProdutos`, permitindo visualizar rapidamente os itens registrados na sessão atual.

## Rotas
- `GET /` — página inicial com o formulário de cadastro.
- `POST /adicionarProduto` — recebe os dados do formulário via POST, armazena na lista em memória e redireciona para a listagem.
- `GET /listaProdutos` — exibe todos os produtos cadastrados e um link para voltar ao formulário.

## Campos e Validações
O formulário HTML valida os campos antes do envio:
- `nome` (texto) — obrigatório.
- `categoria` (seleção) — obrigatório, com opções pré-definidas.
- `preco` (número) — obrigatório, aceita decimais com `step="0.01"`.
- `quantidade` (número inteiro) — obrigatório.
- `descricao` (texto) — opcional; se vazio, a lista mostra `-`.

## Fluxo do Cadastro
1. Acessar `http://localhost:3000/` e preencher o formulário.
2. Ao enviar, os dados são processados pela rota `/adicionarProduto` e salvos em `listaProdutos` (array em memória).
3. O usuário é redirecionado para `/listaProdutos`, onde vê a tabela com os produtos cadastrados.
4. O botão "Voltar ao Cadastro" retorna para `/` para inserir novos itens.

## Como executar
1. Instalar dependências (somente `express` é necessário):
```bash
npm install
```
2. Iniciar o servidor:
```bash
npm start
# ou
npx nodemon index.js
```
3. A aplicação estará disponível em `http://localhost:3000`.

> **Observação:** Os dados permanecem apenas na memória enquanto o servidor estiver em execução. Reinicializar o servidor limpa a lista.

## Autor
Breno Freguglia
