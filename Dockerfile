# Usando a imagem oficial do Node.js como base
FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta 4200
EXPOSE 4200

# Comando para iniciar a aplicação Angular
CMD ["npm", "start"]
