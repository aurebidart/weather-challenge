FROM node:18-alpine
WORKDIR /usr/src/app

# Copy package.json / lockfile and install
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy rest of the code, including prisma schema
COPY . .

# Generate Prisma client for linux-musl
RUN npx prisma generate

EXPOSE 3000
CMD ["node", "index.js"]
