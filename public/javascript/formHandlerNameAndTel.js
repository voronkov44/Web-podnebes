document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)
            console.log('Форма отправлена'); // Лог для проверки

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            const messageContainer = document.getElementById("formMessage"); // Контейнер для сообщения

            // Очищаем контейнер перед выводом нового сообщения
            messageContainer.innerHTML = '';

            // Проверка на наличие значений в полях
            if (name && phone) {
                console.log("Имя:", name);
                console.log("Телефон:", phone);

                // Показываем сообщение об успешной отправке
                const successMessage = document.createElement("p");
                successMessage.classList.add("success-message", "success");
                successMessage.textContent = "Данные успешно отправлены!";

                messageContainer.appendChild(successMessage);

                // Очищаем форму после отправки
                form.reset();

                // Убираем сообщение через несколько секунд
                setTimeout(function () {
                    successMessage.remove();
                }, 3000);
            } else {
                console.warn("Заполните все поля!");

                const errorMessage = document.createElement("p");
                errorMessage.classList.add("success-message", "error");
                errorMessage.textContent = "Пожалуйста, заполните все поля!";

                messageContainer.appendChild(errorMessage);
            }

            // Закрываем попап
            document.getElementById("popup").style.display = "none";
            document.body.classList.remove('locked');
        });
    }
});
