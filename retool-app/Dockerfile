# Step 1: Build environment
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Production environment for SSR or SSG without 'next export'
FROM node:18-alpine

WORKDIR /usr/src/app

# Ensure to copy only necessary directories/files for running your Next.js app
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 80

CMD ["npm", "start"]
