const handPlayers = document.querySelectorAll('.js-hand');

const updateCards = (element) => {
	const cards = element.querySelectorAll('.card');
	const totalCards = cards.length;
	const baseAngle = element.dataset.cardsAngle ? parseInt(element.dataset.cardsAngle, 10) : 55;

	let maxAngle = baseAngle;

	if (totalCards > 6) {
    // Увеличиваем угол для карт, если их больше 6
    maxAngle = baseAngle + (totalCards - 6) * 10; // Вы можете настроить значение для лучшего визуального эффекта
  }

	cards.forEach((card, index) => {
		let angle

		if (totalCards === 1) {
			angle = 0;
		} else {
			angle = maxAngle * (index / (totalCards - 1)) - maxAngle / 2;
		}
		card.style.transform = `rotate(${angle}deg) translateY(-50%)`;
	});
};

handPlayers?.forEach((hand) => updateCards(hand));

// Demo JS code
const hand = document.querySelector('.lobby-hand');
const playfieldItems = document.querySelectorAll('.lobby-playfield-item');
const deckBack = document.querySelector('.lobby-deck-back');

let isAnimating = false;

function playCard(card) {
	if (card.classList.contains('on-playfield') || isAnimating) {
		return;
	}

	const targetSlot = Array.from(playfieldItems).find(slot => slot.children.length < 2);
	if (!targetSlot) {
		console.log('Нет свободного места на игровом поле');
		return;
	}

	const cardRect = card.getBoundingClientRect();
	const targetRect = targetSlot.getBoundingClientRect();
	const translateX = targetRect.left - cardRect.left;
	const translateY = targetRect.top - cardRect.top;

	isAnimating = true;

	card.style.position = 'absolute';
	card.style.zIndex = '1000';
	card.style.left = `${cardRect.left}px`;
	card.style.top = `${cardRect.top}px`;
	document.body.appendChild(card);

	card.classList.add('is-moving');
	card.style.setProperty('--card-x', `${translateX}px`);
	card.style.setProperty('--card-y', `${translateY}px`);

	card.addEventListener('animationend', () => {
		card.classList.remove('is-moving');
		card.style.position = '';
		card.style.zIndex = '';
		card.style.left = '';
		card.style.top = '';
		card.style.transform = '';

		card.classList.add('card--sm');
		card.classList.add('on-playfield');
		targetSlot.appendChild(card);

		isAnimating = false;
		updateCards(hand);
	}, { once: true });
}

function drawCard() {
	if (isAnimating) {
		return;
	}

	const card = deckBack.querySelector('.card');
	if (!card) {
		console.log('Нет карт в колоде');
		return;
	}

	const cardRect = card.getBoundingClientRect();
	const handRect = hand.getBoundingClientRect();
	const translateX = handRect.left - cardRect.left;
	const translateY = handRect.top - cardRect.top;

	isAnimating = true;

	card.style.position = 'absolute';
	card.style.zIndex = '1000';
	card.style.left = `${cardRect.left}px`;
	card.style.top = `${cardRect.top}px`;
	document.body.appendChild(card);

	card.classList.add('is-drawing');
	card.style.setProperty('--card-x', `${translateX}px`);
	card.style.setProperty('--card-y', `${translateY}px`);

	card.addEventListener('animationend', () => {
		card.classList.remove('is-drawing');
		card.style.position = '';
		card.style.zIndex = '';
		card.style.left = '';
		card.style.top = '';
		card.style.transform = '';

		card.classList.remove('card--sm');
		card.classList.remove('is-flipped');
		hand.appendChild(card);

		isAnimating = false;
		updateCards(hand);
	}, { once: true });

}

hand?.querySelectorAll('.card').forEach(card => {
	card.addEventListener('click', () => playCard(card));
});

document.querySelector('.lobby-beat')?.addEventListener('click', drawCard);