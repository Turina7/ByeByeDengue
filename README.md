# ByeByeDengue
Trabalho de PCS3643 - Laboratório de Engenharia de Software I (2024) || Wiki sobre arboviroses

## Configuração do Ambiente

### Requisitos

- Node.js
- Prisma ORM
- Base de dados compatível (PostgreSQL, MySQL, etc.)

### Passos para configurar o projeto

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Configuração da Base de Dados e Variáveis de Ambiente**:
   - Copie o arquivo `.env.example`, renomeie para `.env` e preencha com os dados necessários:
   ```env
   DATABASE_URL="endereço_da_base_de_dados"
   BLOB_READ_WRITE_TOKEN="seu_token_de_acesso_blob"
   JWT_SECRET="sua_chave_secreta_jwt"
   ```

   Onde:
   - `DATABASE_URL`: URL de conexão com seu banco de dados
   - `BLOB_READ_WRITE_TOKEN`: Token para operações de leitura e escrita de blobs
   - `JWT_SECRET`: Chave secreta para geração de tokens JWT

### Aplicando Alterações no Banco de Dados

- Caso haja alguma alteração no arquivo `schema.prisma`, você deve atualizar a base de dados rodando o comando abaixo:
```bash
npx prisma db push
```

## Executando o Frontend Localmente

Para rodar o frontend localmente, siga os passos abaixo:

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Acesse o aplicativo**:
   Abra seu navegador e vá para `http://localhost:3000` para ver o aplicativo em execução.