document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const darkHome = document.getElementById("darkHome");

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
});