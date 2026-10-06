/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');

    menuToggle.textContent = isOpen ? '✕' : '☰';

    menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
);

});


/*
 * Ferme le menu après avoir cliqué
 * sur une rubrique.
 */
const navigationLinks = document.querySelectorAll('.nav-links a');

navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
        
        menuToggle.setAttribute(
    'aria-label',
    'Ouvrir le menu'
);
    });
});

/* =========================================================
   FILTRE DES PROJETS
   ========================================================= */

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        const selectedFilter = button.dataset.filter;

        /* Met à jour le bouton actif */
        filterButtons.forEach(filterButton => {
            const isActive = filterButton === button;

            filterButton.classList.toggle('active', isActive);
            filterButton.setAttribute('aria-pressed', isActive);
        });


        /* Affiche / masque les projets */
        projectCards.forEach(card => {

            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedFilter === 'all' ||
                cardCategory === selectedFilter;

            if (shouldShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

        });

    });

});

/* =========================================================
   ANIMATIONS AU DÉFILEMENT
   ========================================================= */

const revealElements = document.querySelectorAll(
    '.section-header, ' +
    '.skill-category, ' +
    '.skills-note, ' +
    '.project-card, ' +
    '.projects-more, ' +
    '.education-card, ' +
    '.education-note, ' +
    '.achievement-card, ' +
    '.journey-item, ' +
    '.journey-future, ' +
    '.learning-intro, ' +
    '.learning-card, ' +
    '.learning-footer, ' +
    '.contact-card, ' +
    '.contact-form-wrapper'
);


/*
 * Ajoute la classe reveal à tous les éléments
 * que l'on souhaite animer.
 */
revealElements.forEach(element => {
    element.classList.add('reveal');
});


/*
 * Détecte les éléments qui entrent dans l'écran.
 */
const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('visible');

            /*
             * Une fois l'animation terminée,
             * on arrête d'observer l'élément.
             */
            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


/*
 * Lance l'observation.
 */
revealElements.forEach(element => {
    revealObserver.observe(element);
});

/* =========================================================
   BOUTON RETOUR EN HAUT
   ========================================================= */

const backToTopButton = document.querySelector('.back-to-top');


/*
 * Affiche le bouton après avoir suffisamment
 * fait défiler la page.
 */
window.addEventListener('scroll', () => {

    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }

});


/*
 * Retour fluide vers le haut.
 */
backToTopButton.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

/* =========================================================
   NAVIGATION ACTIVE
   ========================================================= */

const sections = document.querySelectorAll('main section');
const navItems = document.querySelectorAll('.nav-links a');


function updateActiveNavigation() {

    let currentSection = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });


    navItems.forEach(link => {

        link.classList.remove('active');

        const targetSection = link.getAttribute('href');

        if (targetSection === `#${currentSection}`) {
            link.classList.add('active');
        }

    });

}


window.addEventListener('scroll', updateActiveNavigation);

updateActiveNavigation();