document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Отменяем стандартное поведение формы
            console.log('Форма отправлена');

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            const messageContainer = document.getElementById("formMessage");

            // Очищаем предыдущие сообщения
            messageContainer.innerHTML = '';

            if (name && phone) {
                console.log("Имя, фамилия:", name);
                console.log("Телефон:", phone);

                // Выводим сообщение об успешной отправке
                const successMessage = document.createElement("p");
                successMessage.classList.add("success-message", "success");
                successMessage.textContent = "Данные успешно отправлены!";

                messageContainer.appendChild(successMessage);

                // Очищаем форму после отправки
                form.reset();

                // Закрываем попап через 2 секунды
                setTimeout(() => {
                    document.getElementById("popup").classList.add("fade-out");
                    setTimeout(() => {
                        document.getElementById("popup").style.display = "none";
                        document.body.classList.remove('locked');
                    }, 500); // Ждём анимацию исчезновения
                }, 2000);
            } else {
                console.warn("Заполните все поля!");

                const errorMessage = document.createElement("p");
                errorMessage.classList.add("success-message", "error");
                errorMessage.textContent = "Пожалуйста, заполните все поля!";
                messageContainer.appendChild(errorMessage);
            }
        });
    }
});
