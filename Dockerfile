# Используем базовый образ для Node.js
FROM node:18 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы и создаем сборку
COPY . .
RUN npm run build

# Запускаем nginx для статических файлов
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80