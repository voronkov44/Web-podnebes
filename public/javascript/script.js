document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const darkHome = document.getElementById("darkHome");
    const menuLinks = document.querySelectorAll("#sidebar a");
    const openPopupBtn = document.getElementById("openPopup");
    const closePopupBtn = document.getElementById("closePopup");
    const popup = document.getElementById("popup");

    menuBtn.addEventListener("click", function () {
        sidebar.style.right = "0"; // Открываем меню
        darkHome.style.display = "block"; // Показываем фон
    });

    closeBtn.addEventListener("click", function () {
        sidebar.style.right = "-260px"; // Закрываем меню
        darkHome.style.display = "none"; // Убираем фон
    });

    darkHome.addEventListener("click", function () {
        sidebar.style.right = "-260px"; // Закрываем меню
        darkHome.style.display = "none"; // Убираем фон
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Отменяем переход по ссылке

            const sectionId = this.getAttribute("data-section") + "-section";
            const section = document.getElementById(sectionId);

            if (section) {
                section.style.display = "block"; // Показываем нужную секцию
                section.scrollIntoView({ behavior: "smooth" }); // Плавно прокручиваем к ней
            }

            sidebar.style.right = "-260px"; // Закрываем меню после клика
            darkHome.style.display = "none"; // Убираем затемнение
        });
    });

    // Открытие формы
    openPopupBtn.addEventListener("click", function () {
        popup.style.display = "flex"; // Показываем форму
        document.body.classList.add('locked'); // Блокируем прокрутку страницы
    });

    // Закрытие формы
    closePopupBtn.addEventListener("click", function () {
        popup.style.display = "none"; // Скрываем форму
        document.body.classList.remove('locked'); // Разблокируем прокрутку
    });

    // Закрытие формы при клике вне формы
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none"; // Скрываем форму
            document.body.classList.remove('locked'); // Разблокируем прокрутку
        }
    });
});
