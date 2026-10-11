# 1. Base Image: Su dung Node.js phien ban 18 tren nen Alpine Linux sieu nhe
FROM node:18-alpine

# 2. WORKDIR: Thiet lap thu muc lam viec ben trong container
WORKDIR /app

# 3. ENV: Thiet lap bien moi truong PORT
ENV PORT=3000

# 4. COPY & RUN: Sao chep file quan ly dependency va tien hanh cai dat
COPY package*.json ./
RUN npm install

# 5. COPY: Sao chep toan bo ma nguon ung dung vao container
COPY . .

# 6. EXPOSE: Khai bao cong ma ung dung lang nghe
EXPOSE 3000

# 7. CMD: Lenh khoi chay ung dung o dang exec form
CMD ["node", "server.js"]
