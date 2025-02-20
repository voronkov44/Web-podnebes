const express = require("express");
const path = require("path");

const mysql = require("mysql2");
const bodyParser = require("body-parser");

// Подключение к БД
const db = mysql.createConnection({
    host: "localhost",     // Или адрес сервера
    user: "root",          // Твой пользователь MySQL
    password: "root",  // Пароль от MySQL
    database: "podnebes"
});

// Проверяем подключение
db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к MySQL:", err);
    } else {
        console.log("✅ Подключено к MySQL!");
    }
});




const app = express();
const PORT = process.env.PORT || 8000;


// Устанавливаем EJS как шаблонизатор
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/templates"));


// Добавляем обработку JSON и URL-кодированных данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Раздача статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Обработчик формы
app.post("/submit-form", (req, res) => {
    const { fullname, phone, type_request } = req.body;

    if (!fullname || !phone || !type_request) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }

    const query = `
        INSERT INTO applications (fullname, phone, type_request, type_status) 
        VALUES (?, ?, ?, 0)
    `;

    db.query(query, [fullname, phone, type_request], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении данных:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.status(200).json({ message: "Данные успешно сохранены!" });
    });
});

app.post("/button-submit", (req, res) => {
    const { cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone } = req.body;

    if (!cargoName || !cargoWeight || !cargoVolume || !selectOption || !userName || !userPhone) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }

    const query = `
        INSERT INTO transportation (cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении данных:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.status(200).json({ message: "Данные успешно сохранены!" });
    });
});

// Главная страница
app.get("/", (req, res) => {
    res.render("home");  // Теперь мы используем EJS для рендеринга home.ejs
});

app.get("/viza", (req, res) => {
    res.render("viza");
});

app.get("/footer", (req, res) => {
    res.render("footer");
})

app.get("/logistics", (req, res) => {
    res.render("logistics");

});

app.get("/migration", (req, res) => {
    res.render("migration");
});

app.get("/list-business-visa", (req, res) => {
    res.render("list-business-visa");
});

app.get("/list-tourist-visa", (req, res) => {
    res.render("list-tourist-visa");
});

app.get("/policy", (req, res) => {
    res.render("policy");
});

// Обработка 404 ошибки
app.use((req, res) => {
    res.status(404).send("404: Страница не найдена");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
