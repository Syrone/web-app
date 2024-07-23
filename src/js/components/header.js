import { getHeaderHeight } from '../functions/header-height';

getHeaderHeight()

const nav = document.querySelector('.js-nav-touch');
let startX;

if (nav) {
	nav.addEventListener('touchstart', function (e) {
		startX = e.touches[0].pageX;
	});
	
	nav.addEventListener('touchend', function (e) {
		const endX = e.changedTouches[0].pageX;
		const diffX = startX - endX;
	
		if (Math.abs(diffX) > 50) { // Минимальная длина свайпа в пикселях
			const activeLink = document.querySelector('.header-nav-link.is-active');
			let targetLink;
	
			if (diffX > 0) {
				// Свайп влево
				targetLink = activeLink.previousElementSibling;
				while (targetLink && !targetLink.classList.contains('header-nav-link')) {
					targetLink = targetLink.previousElementSibling;
				}
			} else {
				// Свайп вправо
				targetLink = activeLink.nextElementSibling;
				while (targetLink && !targetLink.classList.contains('header-nav-link')) {
					targetLink = targetLink.nextElementSibling;
				}
			}
	
			if (targetLink) {
				window.location.href = targetLink.href;
			}
		}
	});
}

const navLinks = document.querySelectorAll('.header-nav-link');

navLinks?.forEach(link => {
	// Check if the link has the class 'is-active'
	if (link.classList.contains('is-active')) {
		// Get the previous sibling of the link
		const prevSibling = link.previousElementSibling;
		
		// Check if the previous sibling exists and has the class 'header-nav-gap'
		if (prevSibling && prevSibling.classList.contains('header-nav-gap')) {
			// Add the class 'header-nav-gap--active' to the previous sibling
			prevSibling.classList.add('header-nav-gap--active');
		}
	}
});