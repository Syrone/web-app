function handleNumberInput(event) {
	const input = event.target;
	// Получаем текущее значение и удаляем все недопустимые символы
	let value = input.value;
	// Разрешаем только цифры и одну десятичную точку
	value = value.replace(/[^0-9.]/g, '');

	// Разрешаем только одну десятичную точку
	const parts = value.split('.');
	if (parts.length > 2) {
		value = parts[0] + '.' + parts.slice(1).join('');
	}

	// Ограничиваем до одной цифры после десятичной точки
	if (parts.length === 2) {
		parts[1] = parts[1].substring(0, 1);
		value = parts.join('.');
	}

	input.value = value;
}

// Получаем все input с классом validate-number
const numberInputs = document.querySelectorAll('.validate-number');

// Добавляем обработчик события input ко всем таким input
numberInputs?.forEach(input => {
	input.addEventListener('input', handleNumberInput);
});