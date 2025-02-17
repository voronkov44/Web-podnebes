document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("visaForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (name && phone) {
                console.log("Имя:", name);
                console.log("Телефон:", phone);
            } else {
                console.warn("Заполните все поля!");
            }

            document.getElementById("popup").style.display = "none";
            document.body.classList.remove('locked');
        });
    }
});
