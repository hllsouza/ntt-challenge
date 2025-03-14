# Usa a imagem oficial do Cypress que já tem tudo instalado
FROM cypress/included:14.2.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências do projeto sem criar arquivos desnecessários
RUN yarn install

# Copia todo o código do projeto para o container
COPY . .

# Define a variável de ambiente para evitar erros no Cypress
ENV CI=1

# Comando padrão para rodar os testes de API
CMD ["yarn", "api:test"]
