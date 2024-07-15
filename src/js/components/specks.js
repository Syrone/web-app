// Constants
const sizeTypes = ['1px', '2px', '3px'];
const opacityTypes = [0.25, 0.5, 0.8];
const createDefault = 1;
const spaceDefault = 4;
const animationDuration = 5000; // 2s появление + 3s задержка перед исчезновением
const createInterval = 1000;

// Create a new star element and add it to the container
function createStar(container) {
  const star = document.createElement('span');
  star.classList.add('speck');

  // Randomly select size
  const sizeLevel = sizeTypes[Math.floor(Math.random() * sizeTypes.length)];
  star.style.setProperty('--_size-speck', sizeLevel);

  // Randomly select opacity
  const opacityLevel = opacityTypes[Math.floor(Math.random() * opacityTypes.length)];
  star.style.setProperty('--_opacity-speck', opacityLevel);

  // Set random position of the star inside the container
  star.style.top = `${Math.random() * (container.clientHeight)}px`;
  star.style.left = `${Math.random() * (container.clientWidth)}px`;

  container.appendChild(star);

  // Remove the star after the animation is complete
  setTimeout(() => {
    container.removeChild(star);
  }, animationDuration);
}

// Find all containers and create stars in each of them
document.querySelectorAll('.js-create-specks').forEach(container => {
  const specksCreate = parseInt(container.getAttribute('data-specks-create'), 10) || createDefault;

  let intervalId;

  // Create an intersection observer to track when the container enters or leaves the viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Create initial stars immediately
        for (let i = 0; i < specksCreate; i++) {
          createStar(container);
        }
        // If the container enters the viewport, start creating stars
        intervalId = setInterval(() => {
          for (let i = 0; i < specksCreate; i++) {
            createStar(container);
          }
        }, createInterval);
      } else {
        // If the container leaves the viewport, stop creating stars
        clearInterval(intervalId);
      }
    });
  });

  // Start observing the container
  observer.observe(container);
});