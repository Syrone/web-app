function handleNumberInput(event) {
	const input = event.target;
	// Используем регулярное выражение для фильтрации ввода
	input.value = input.value.replace(/[^0-9]/g, '');
}

// Получаем все input с классом validate-number
const numberInputs = document.querySelectorAll('.validate-number');

// Добавляем обработчик события input ко всем таким input
numberInputs?.forEach(input => {
	input.addEventListener('input', handleNumberInput);
});