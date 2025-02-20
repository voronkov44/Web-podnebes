const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { sendTelegramMessage } = require("./public/javascript/telegramNotifier"); // Импортируем функцию отправки сообщений

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к MySQL:", err);
    } else {
        console.log("✅ Подключено к MySQL!");
    }
});

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/templates"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 📌 Форма "applications"
app.post("/submit-form", (req, res) => {
    const { fullname, phone, type_request } = req.body;

    if (!fullname || !phone || !type_request) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }

    const query = `INSERT INTO applications (fullname, phone, type_request, type_status) VALUES (?, ?, ?, 0)`;

    db.query(query, [fullname, phone, type_request], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении данных:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        // Отправка данных в Telegram
        const message = `📌 *Новая заявка*:\n👤 Имя : ${fullname}\n📞 Телефон: ${phone}\n📌 Тип запроса: ${type_request}`;
        sendTelegramMessage(message);

        res.status(200).json({ message: "Данные успешно сохранены!" });
    });
});

// 📌 Форма "transportation"
app.post("/button-submit", (req, res) => {
    const { cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone } = req.body;

    if (!cargoName || !cargoWeight || !cargoVolume || !selectOption || !userName || !userPhone) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }

    const query = `INSERT INTO transportation (cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [cargoName, cargoWeight, cargoVolume, selectOption, userName, userPhone], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении данных:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        // Отправка данных в Telegram
        const message = `🚛 *Новый запрос на транспортировку*:\n📦 Груз: ${cargoName}\n⚖ Вес: ${cargoWeight} кг\n📏 Объем: ${cargoVolume} м³\n📍 Направление: ${selectOption}\n👤 Имя: ${userName}\n📞 Телефон: ${userPhone}`;
        sendTelegramMessage(message);

        res.status(200).json({ message: "Данные успешно сохранены!" });
    });
});

app.get("/", (req, res) => res.render("home"));
app.get("/viza", (req, res) => res.render("viza"));
app.get("/footer", (req, res) => res.render("footer"));
app.get("/logistics", (req, res) => res.render("logistics"));
app.get("/migration", (req, res) => res.render("migration"));
app.get("/list-business-visa", (req, res) => res.render("list-business-visa"));
app.get("/list-tourist-visa", (req, res) => res.render("list-tourist-visa"));
app.get("/policy", (req, res) => res.render("policy"));

app.use((req, res) => res.status(404).send("404: Страница не найдена"));

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
