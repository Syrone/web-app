const form = document.querySelectorAll('.form')

form?.forEach((element) => {
	const requiredInputs = element.querySelectorAll('.field[required]');
	const btnSubmit = element.querySelector('.form-submit');

	const checkInputs = () => {
		const allFilled = Array.from(requiredInputs).every(input => input.value.trim() !== '');
		if (btnSubmit) btnSubmit.disabled = !allFilled;
	};

	requiredInputs?.forEach(input => {
		input.addEventListener('input', checkInputs);
	});

	checkInputs();
})