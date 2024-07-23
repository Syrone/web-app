const hands = document.querySelectorAll('.js-hand');

hands?.forEach((hand) => {
	const updateCards = () => {
		const cards = hand.querySelectorAll('.card');
		const totalCards = cards.length;
		const maxAngle = hand.dataset.cardsAngle ? parseInt(hand.dataset.cardsAngle, 10) : 55;
		const flag = hand.dataset.cardsClick ? true : false;

		cards.forEach((card, index) => {
			let angle

			if (totalCards === 1) {
				angle = 0;
			} else {
				angle = maxAngle * (index / (totalCards - 1)) - maxAngle / 2;
			}
			card.style.transform = `rotate(${angle}deg) translateY(-50%)`;

			if (flag) {
				card.addEventListener('click', () => {
					cards.forEach(c => {
						c.style.transform = c.style.transform.replace(/translateY\(-?(\d+)%?\)/, 'translateY(-50%)');
					});
					card.style.transform = `rotate(${angle}deg) translateY(-60%)`;
				});
			}
		});
	};

	updateCards();

	// Create a MutationObserver to watch for changes in the hand
	const observer = new MutationObserver(() => {
		updateCards();
	});

	observer.observe(hand, { childList: true });

	// Disconnect the observer when the hand element is removed from the DOM
	const observerForRemoval = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.removedNodes.length) {
				mutation.removedNodes.forEach((removedNode) => {
					if (removedNode === hand) {
						observer.disconnect();
						observerForRemoval.disconnect();
					}
				});
			}
		});
	});

	observerForRemoval.observe(document.body, { childList: true, subtree: true });
});
