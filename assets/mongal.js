// DOM
const gallery = document.querySelector(".gallery");
let images = [];
let activeTag = "all";

/*INIT*/
document.addEventListener("DOMContentLoaded", initGallery);

function initGallery() {
  if (!gallery) return;

  images = Array.from(gallery.querySelectorAll(".gallery-item"));

  buildLayout();
  buildFilters();
  initLightbox();
}

/* layout gallery*/
function buildLayout() {
  gallery.innerHTML = "";
  gallery.style.display = "grid";

  images.forEach((img) => {
    img.classList.remove("img-fluid");
    img.classList.add("gallery-item");

    gallery.appendChild(img);
  });
}

/* filtres */
function buildFilters() {
  const tags = [...new Set(images.map((img) => img.dataset.galleryTag))];

  const ul = document.createElement("ul");
  ul.className = "tags-bar nav nav-pills my-4";

  ul.appendChild(createFilterButton("Tous", "all", true));

  tags.forEach((tag) => {
    ul.appendChild(createFilterButton(tag, tag));
  });

  gallery.parentElement.prepend(ul);
}

/* filtres button */
function createFilterButton(label, tag, active = false) {
  const li = document.createElement("li");
  li.className = "nav-item";

  const span = document.createElement("span");
  span.className = "nav-link";

  if (active) {
    span.classList.add("active", "active-tag");
  }

  span.textContent = label;
  span.dataset.tag = tag;

  span.addEventListener("click", () => {
    setActiveFilter(span);
    filterGallery(tag);
  });

  li.appendChild(span);
  return li;
}
/* button active */
function setActiveFilter(activeBtn) {
  document
    .querySelectorAll(".tags-bar .nav-link")
    .forEach((btn) => btn.classList.remove("active", "active-tag"));

  activeBtn.classList.add("active", "active-tag");
}

function filterGallery(tag) {
  activeTag = tag;

  images.forEach((img) => {
    const match = tag === "all" || img.dataset.galleryTag === tag;
    img.style.display = match ? "block" : "none";
  });
}

/* mondale lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const btnPrev = document.querySelector(".lightbox-prev");
const btnNext = document.querySelector(".lightbox-next");
const btnClose = document.querySelector(".lightbox-close");

let currentIndex = 0;

/* ouvrir la modale */
function initLightbox() {
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  const visibleImages = getVisibleImages();
  currentIndex = visibleImages.indexOf(images[index]);

  updateLightboxImage();
  lightbox.classList.remove("hidden");
}

/* fermer la modale */
lightboxImg.addEventListener("click", (e) => e.stopPropagation());
btnPrev.addEventListener("click", (e) => e.stopPropagation());
btnNext.addEventListener("click", (e) => e.stopPropagation());
btnClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

function closeLightbox() {
  lightbox.classList.add("hidden");
}

/* navigation entre image */
btnPrev.addEventListener("click", () => navigate(-1));
btnNext.addEventListener("click", () => navigate(1));

function navigate(direction) {
  const visibleImages = getVisibleImages();
  currentIndex =
    (currentIndex + direction + visibleImages.length) % visibleImages.length;

  updateLightboxImage();
}

function updateLightboxImage() {
  const visibleImages = getVisibleImages();
  const img = visibleImages[currentIndex];

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

// images selon filtre actif
function getVisibleImages() {
  return images.filter(
    (img) => activeTag === "all" || img.dataset.galleryTag === activeTag
  );
}
