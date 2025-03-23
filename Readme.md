# Documentação de Testes Automatizados com Cypress do Serverest

Este projeto contém testes automatizados para a API RESTful do ServeRest, garantindo a validação das operações de usuários. Os testes foram implementados utilizando Cypress, com faker.js para geração dinâmica de dados

## 📝 Dependências

- Node 22.14.0
- Cypress 14.2.0
- npm ou yarn
- Faker.js
- mocha 11.1.0

## 📝 Passos

1. Clone do repositório:
    ```
    git clone git@github.com:strMarlon/Cypress-Verity.git
    ```

2. Entre no diretório do projeto:
    ```
    cd seu-projeto
    ```

3. Instale as dependências:
    ```
    npm install
    ```
## 📝 Estrutura

Segue a explicação da estrutura de pastas e arquivos da raiz do projeto que foi utilizada para a construção do projeto:

* [cypress]: Contém os arquivos de testes e configuração do Cypress.

* [E2E]: Armazena os testes para os diferentes fluxos da API.

* [fixtures]: Contém dados de exemplo e configurações para as requisições.

* [support]: Funções e comandos reutilizáveis.


## 🧪 Casos de Testes Positivos 

### CT01 - Retorna uma lista de todos os usuários
- ✅ **Objetivo**: Verificar se a API retorna a lista de todos os usuários corretamente.
- 🔹 **Entrada**: Requisição GET sem parâmetros adicionais.
- 🔹 **Saída Esperada**: 
  - Status 200.
  - A resposta deve conter as propriedades `quantidade` e `usuarios`.

### CT02 - Retorna os detalhes de um usuário específico
- ✅ **Objetivo**: Verificar se a API retorna corretamente os detalhes de um usuário específico.
- 🔹 **Entrada**: Requisição GET com o ID do usuário.
- 🔹 **Saída Esperada**: 
  - Status 200.
  - A resposta deve conter as propriedades `nome`, `email`, `password`, `administrador`, e `_id`.

### CT03 - Atualiza as informações do usuário criado
- ✅ **Objetivo**: Verificar se a API permite atualizar as informações de um usuário criado.
- 🔹 **Entrada**: Requisição PUT com dados válidos.
  - Nome: "Fulano 123 Silva"
  - Email: Gerado dinamicamente com `faker.internet.email()`
  - Senha: "teste123"
  - Administrador: "true"
- 🔹 **Saída Esperada**: 
  - Status 200.
  - Mensagem: `'Registro alterado com sucesso'`.

### CT04 - Exclui o usuário criado
- ✅ **Objetivo**: Verificar se a API exclui o usuário corretamente.
- 🔹 **Entrada**: Requisição DELETE com o ID do usuário.
- 🔹 **Saída Esperada**: 
  - Status 200.
  - Mensagem indicando a exclusão do usuário (não especificada no código).


## 🧪 Casos de Testes Negativos


### CT01 - Criar usuário com e-mail já cadastrado
- ✅ **Objetivo**: Verificar se a API impede a criação de um usuário com um email já existente.
- 🔹 **Entrada**: Email já cadastrado (`Marlon@QA.com.br`)
- 🔹 **Saída Esperada**: Status `400` com a mensagem "Este email já está sendo usado".

### CT02 - Buscar usuário com ID inválido
- ✅ **Objetivo**: Verificar a resposta da API ao buscar um usuário inexistente.
- 🔹 **Entrada**: ID inválido (`1234`)
- 🔹 **Saída Esperada**: Status `400` com a mensagem "Usuário não encontrado".

### CT03 - Atualizar usuário inexistente sem passar o ID
- ✅ **Objetivo**: Validar que a API retorna erro ao tentar atualizar um usuário sem um ID específico.
- 🔹 **Entrada**: Requisição `PUT /usuarios/` sem ID.
- 🔹 **Saída Esperada**: Status `405` e erro informando que a operação não é permitida.

### CT04 - Excluir usuário inexistente
- ✅ **Objetivo**: Testar se a API responde corretamente ao tentar excluir um usuário inexistente.
- 🔹 **Entrada**: ID inválido (`123adasdwq`)
- 🔹 **Saída Esperada**: Status `200` com a mensagem "Nenhum registro excluído".

### CT05 - Criar usuário com campo obrigatório ausente
- ✅ **Objetivo**: Validar que a API retorna erro quando um campo obrigatório está ausente.
- 🔹 **Entrada**: Corpo da requisição sem o campo `email`.
- 🔹 **Saída Esperada**: Status `400` com a mensagem "email é obrigatório".


## 📝 Rodando os testes

- Executar todos os testes em modo headless (sem interface):
    ```
    npx cypress run ou npm cypress run
    ```
- Executar os testes no modo interativo:
    ```
    npx cypress open
    ```

## 📝 Pipeline CI/CD

Este projeto usa o GitHub CI para automação dos testes. A configuração do pipeline está no arquivo cypress.yml.