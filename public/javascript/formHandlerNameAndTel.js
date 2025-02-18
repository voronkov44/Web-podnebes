document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");
    const popup = document.getElementById("popup");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Очистка предыдущих ошибок перед новой отправкой
            formMessage.innerHTML = "";

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            let errorMessage = "";
            let valid = true;

            // Проверка на длину имени
            if (name.length > 100) {
                errorMessage += "Имя и Фамилия не может быть длиннее 100 символов.<br>";
                document.getElementById("name").value = ""; // Очистить поле имени
                valid = false;
            }

            // Проверка на корректность телефона (разрешены цифры, +, (, ), -)
            const phoneRegex = /^[\d\+\(\)\-\s]+$/;
            if (!phoneRegex.test(phone)) {
                errorMessage += "Укажите, пожалуйста, корректный номер телефона";
                document.getElementById("phone").value = ""; // Очистить поле телефона
                valid = false;
            }

            // Если есть ошибки, показываем их и не отправляем форму
            if (!valid) {
                formMessage.innerHTML = errorMessage;
                formMessage.style.color = "red"; // Красный текст для ошибок
                showStatusPopup(false); // Показываем ошибку
                return;
            }

            // Если ошибок нет, отправляем данные
            console.log(`Отправленные данные:\nИмя: ${name}\nТелефон: ${phone}`);

            form.reset();
            popup.style.display = "none";
            document.body.classList.remove('locked');

            showStatusPopup(true); // Успех
        });
    }
});
