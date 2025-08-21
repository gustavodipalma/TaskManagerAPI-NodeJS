# TaskManager API

Uma API simples em Node.js e TypeScript para gerenciamento de tarefas, criada como parte de um projeto de estudo e refatoração.

## Arquitetura

O projeto foi estruturado seguindo princípios de design em camadas para garantir separação de responsabilidades, testabilidade e manutenibilidade.

### Camadas

1.  **Controller**: Responsável por receber as requisições HTTP, validar os dados de entrada e retornar as respostas. Ele atua como um intermediário entre o mundo exterior (HTTP) e a lógica de negócio da aplicação.

2.  **Service**: Contém a lógica de negócio central. Orquestra as operações, executa validações e regras de negócio antes de interagir com a camada de dados. Não tem conhecimento sobre HTTP.

3.  **Repository**: A camada de acesso a dados. Abstrai a fonte de dados (neste caso, um array em memória) e fornece uma interface clara para operações CRUD (Create, Read, Update, Delete).

### Padrões de Design

*   **Data Transfer Objects (DTOs)**: Utilizamos DTOs para criar um "contrato" claro e seguro para os dados que entram na API. O `Controller` é responsável por mapear o `req.body` para um DTO, garantindo que apenas os dados esperados e validados sejam passados para a camada de `Service`. Isso aumenta a segurança e desacopla a API do modelo de dados interno.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm install`

Instala todas as dependências do projeto.

### `npm run dev`

Roda a aplicação em modo de desenvolvimento com `ts-node-dev`, que reinicia o servidor automaticamente a cada mudança nos arquivos.

### `npm test`

Roda a suíte de testes completa usando Jest. Os testes são estruturados para cobrir todas as camadas da aplicação:
*   **Testes de Repositório**: Testam a camada de dados de forma isolada.
*   **Testes Unitários de Serviço**: Testam a lógica de negócio usando mocks para simular o repositório.
*   **Testes de Integração de Controller**: Testam os endpoints da API, simulando requisições HTTP reais.

### `npm run build`

Transpila o código TypeScript para JavaScript no diretório `dist/`.

### `npm start`

Inicia a aplicação em modo de produção a partir dos arquivos compilados no diretório `dist/`.

## Endpoints da API

*   `POST /api/tasks`: Cria uma nova tarefa.
*   `GET /api/tasks`: Retorna todas as tarefas.
*   `GET /api/tasks/:id`: Retorna uma tarefa específica pelo seu ID.
*   `PUT /api/tasks/:id`: Atualiza uma tarefa existente.
*   `DELETE /api/tasks/:id`: Deleta uma tarefa.
*   `GET /health`: Endpoint de verificação de saúde da API.
