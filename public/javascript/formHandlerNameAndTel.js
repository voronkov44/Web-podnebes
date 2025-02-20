document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");
    const popup = document.getElementById("popup");
    const formMessage = document.getElementById("formMessage");
    const phoneInput = document.getElementById("phone");

    if (!form || !phoneInput) return;

    // Подключаем intl-tel-input
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ru",  // Россия по умолчанию
        separateDialCode: true, // Отдельный код страны
        preferredCountries: ["ru", "kz", "by"], // Популярные страны
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        formMessage.innerHTML = "";

        const name = document.getElementById("name").value.trim();
        const phone = iti.getNumber(); // Получаем полный номер в формате +79998887766
        const popupTitle = document.querySelector(".popup-h2")?.textContent.trim() || "Заказать визу";

        let errorMessage = "";
        let valid = true;

        // Проверка имени
        if (name.length > 100) {
            errorMessage += "Имя и Фамилия не может быть длиннее 100 символов.<br>";
            document.getElementById("name").value = "";
            valid = false;
        }

        // Валидация номера через intl-tel-input
        if (!iti.isValidNumber()) {
            errorMessage += "Укажите, пожалуйста, корректный номер телефона.<br>";
            phoneInput.value = "";
            valid = false;
        }

        if (!valid) {
            formMessage.innerHTML = errorMessage;
            formMessage.style.color = "orange";
            showStatusPopup(false);
            return;
        }

        try {
            const response = await fetch("/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname: name,
                    phone: phone, // Отправляем форматированный номер
                    type_request: popupTitle
                })
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.innerHTML = "Данные успешно отправлены!";
                formMessage.style.color = "lightgreen";
                form.reset();
                iti.setCountry("ru"); // Сбрасываем в Россию после отправки
                popup.style.display = "none";
                document.body.classList.remove('locked');
                showStatusPopup(true);
            } else {
                formMessage.innerHTML = result.error;
                formMessage.style.color = "";
                showStatusPopup(false);
            }
        } catch (error) {
            console.error("Ошибка отправки запроса:", error);
            formMessage.innerHTML = "Ошибка отправки данных!";
            formMessage.style.color = "orange";
            showStatusPopup(false);
        }
    });
});
