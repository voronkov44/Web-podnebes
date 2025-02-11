document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const darkHome = document.getElementById("darkHome");
    const menuLinks = document.querySelectorAll("#sidebar a");

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
});
