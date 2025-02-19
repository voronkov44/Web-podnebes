document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");
    const popup = document.getElementById("popup");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            formMessage.innerHTML = "";

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const popupTitle = document.querySelector(".popup-h2")?.textContent.trim() || "Заказать визу";

            let errorMessage = "";
            let valid = true;

            if (name.length > 100) {
                errorMessage += "Имя и Фамилия не может быть длиннее 100 символов.<br>";
                document.getElementById("name").value = "";
                valid = false;
            }

            const phoneRegex = /^[\d\+\(\)\-\s]+$/;
            if (!phoneRegex.test(phone)) {
                errorMessage += "Укажите, пожалуйста, корректный номер телефона";
                document.getElementById("phone").value = "";
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
                        phone: phone,
                        type_request: popupTitle
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.innerHTML = "Данные успешно отправлены!";
                    formMessage.style.color = "lightgreen";
                    form.reset();
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
    }
});
