document.addEventListener("DOMContentLoaded", function () {
    const categoryHeaders = document.querySelectorAll(".category-header");

    categoryHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const courseGrid = this.nextElementSibling;

            // Toggle the visibility of the course grid
            if (courseGrid.style.display === "grid") {
                courseGrid.style.display = "none";
            } else {
                document.querySelectorAll(".course-grid").forEach(grid => grid.style.display = "none");
                courseGrid.style.display = "grid";
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const counts = document.querySelectorAll('.count');
    let hasCounted = false; // prevent multiple triggers

    const animateCounts = () => {
        counts.forEach(count => {
            count.innerText = '0';
            const target = +count.getAttribute('data-target');

            const updateCount = () => {
                const current = +count.innerText.replace('+', '');
                const increment = target / 100;

                if (current < target) {
                    count.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCount, 30);
                } else {
                    count.innerText = `${target}+`; // add + at the end
                }
            };

            updateCount();
        });
    };

    // Observe the milestone section
    const milestoneSection = document.querySelector('.milestone-achievements');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                animateCounts();
                hasCounted = true;
                observer.disconnect(); // stop observing after running once
            }
        });
    }, { threshold: 0.5 });

    observer.observe(milestoneSection);
});



document.querySelectorAll('.count').forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target > 100 ? target / 200 : 1;
  
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
  
    updateCount();
  });
  
  document.querySelectorAll('.carousel-track').forEach(track => {
    const images = track.innerHTML;
    track.innerHTML += images; // duplicate once
});

// Scroll-triggered carousel motion
const carousels = document.querySelectorAll('.carousel-track-wrapper');

const handleCarouselAnimation = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('paused');
    } else {
      entry.target.classList.add('paused');
    }
  });
};

const carouselObserver = new IntersectionObserver(handleCarouselAnimation, {
  threshold: 0.4
});

carousels.forEach(carousel => carouselObserver.observe(carousel));
