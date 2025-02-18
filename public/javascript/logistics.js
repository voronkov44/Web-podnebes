 document.addEventListener("DOMContentLoaded", function () {
    // Получаем элементы полей ввода и блока с ценой
    const weightInput = document.querySelector('input[name="Cargo weight"]');
    const volumeInput = document.querySelector('input[name="Cargo volume"]');
    const priceDisplay = document.querySelector('.form_title_name[style*="margin-top: 40px;"]');

    function updatePrice() {
    let weight = parseFloat(weightInput.value) || 0;
    let volume = parseFloat(volumeInput.value) || 0;

    let price = (weight * 1) + (volume * 300); // Расчет цены

    priceDisplay.innerHTML = `Цена доставки: ${price}$`; // Обновляем текст
}

    // Отслеживание изменений в полях
    weightInput.addEventListener('input', updatePrice);
    volumeInput.addEventListener('input', updatePrice);
});
