document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-button").addEventListener("click", function(event) {
        event.preventDefault(); // Отменяем стандартное поведение кнопки (чтобы страница не перезагружалась)

        // Получаем значения полей формы
        let cargoName = document.getElementById("cargo-name").value.trim();
        let cargoWeight = document.getElementById("cargo-weight").value.trim();
        let cargoVolume = document.getElementById("cargo-volume").value.trim();
        let transportationOption = document.getElementById("transportation-option").value;
        let userName = document.getElementById("user-name").value.trim();
        let userPhone = document.getElementById("user-phone").value.trim();

        let valid = true; // Флаг валидации

        // Проверяем, заполнены ли все поля
        if (!cargoName || !cargoWeight || !cargoVolume || !userName || !userPhone) {
            console.warn("Заполните все поля формы!");
            alert("Пожалуйста, заполните все поля формы.");
            return;
        }

        // Проверка на длину имени
        if (userName.length > 100) {
            alert("Имя и фамилия не могут быть длиннее 100 символов.");
            document.getElementById("user-name").value = ""; // Очистить поле имени
            valid = false;
        }

        // Проверка на корректность телефона (разрешены цифры, +, (, ), -)
        const phoneRegex = /^[\d\+\(\)\-\s]+$/;
        if (!phoneRegex.test(userPhone)) {
            alert("Укажите, пожалуйста, корректный номер телефона.");
            document.getElementById("user-phone").value = ""; // Очистить поле телефона
            valid = false;
        }

        // Если есть ошибки валидации, прекращаем выполнение
        if (!valid) return;

        // Выводим значения в консоль (если валидация пройдена)
        console.log("Наименование груза:", cargoName);
        console.log("Вес груза (кг):", cargoWeight);
        console.log("Объём груза (м³):", cargoVolume);
        console.log("Вариант перевозки:", transportationOption);
        console.log("Имя:", userName);
        console.log("Телефон:", userPhone);

        showStatusPopup(true); // Успех
    });
});
