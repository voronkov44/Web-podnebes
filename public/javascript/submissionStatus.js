function showStatusPopup(success) {
    const popup = document.getElementById("statusPopup");
    const image = document.getElementById("statusImage");
    const text = document.getElementById("statusText");
    const closeBtn = document.getElementById("closePopup");

    if (success) {
        image.src = "../img/orange_mark.png";
        text.textContent = "Спасибо! Ваши данные успешно отправлены!";
    } else {
        image.src = "../img/error-icon.png";
        text.textContent = "Данные не отправились, обратитесь в поддержку!";
    }

    popup.style.display = "flex"; // Показываем попап

    // Закрытие через 1.5 секунды
    const timeoutId = setTimeout(() => {
        popup.style.display = "none";
    }, 2500);

    // Закрытие попапа по нажатию на крестик
    closeBtn.addEventListener("click", () => {
        clearTimeout(timeoutId); // Останавливаем автоматическое закрытие
        popup.style.display = "none"; // Скрываем попап сразу
    });
}
