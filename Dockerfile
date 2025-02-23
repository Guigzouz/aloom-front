# Step 1: Build the Vite app
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD npm run build && npm run preview
