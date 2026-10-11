const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const noProjectsMessage = document.querySelector(".no-projects");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCategory = document.querySelector(".lightbox-category");
const lightboxClose = document.querySelector(".lightbox-close");
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach((filter) => {
            const isActive = filter === button;
            filter.classList.toggle("is-active", isActive);
            filter.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            const isVisible = category === "all" || card.dataset.category === category;
            card.hidden = !isVisible;
            visibleCount += Number(isVisible);
        });

        noProjectsMessage.hidden = visibleCount !== 0;
    });
});

projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        const image = card.querySelector("img");
        lightboxImage.src = card.dataset.image;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = card.dataset.title;
        lightboxCategory.textContent = card.dataset.categoryLabel;
        lightbox.showModal();
    });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});
lightbox.addEventListener("close", () => {
    lightboxImage.src = "image2.jpg";
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.open) {
        lightbox.close();
    }
});

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    siteNavigation.classList.toggle("is-open", !isExpanded);
});

siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        siteNavigation.classList.remove("is-open");
    }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
