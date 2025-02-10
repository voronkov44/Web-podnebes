const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;


// Устанавливаем EJS как шаблонизатор
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/templates"));


// Раздача статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Главная страница
app.get("/", (req, res) => {
    res.render("home");  // Теперь мы используем EJS для рендеринга home.ejs
});

app.get("/viza", (req, res) => {
    res.render("viza");
});

app.get("/home2", (req, res) => {
    res.render("home2");
});

app.get("/migration", (req, res) => {
    res.render("migration");
});

// Обработка 404 ошибки
app.use((req, res) => {
    res.status(404).send("404: Страница не найдена");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
