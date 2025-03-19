# Usa uma imagem do Node.js para a construção do projeto
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do contêiner
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código para dentro do contêiner
COPY . .

# Compila o projeto Angular
RUN npm run build -- --configuration=production

# Usa uma imagem Nginx para servir a aplicação
FROM nginx:alpine

# Copia os arquivos gerados pelo build para o Nginx
COPY --from=builder /app/dist/ra-front-end /usr/share/nginx/html

# Expõe a porta 80 para acessar a aplicação
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
