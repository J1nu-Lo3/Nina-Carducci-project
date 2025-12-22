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
}

/* layout gallery*/

function buildLayout() {
  const row = document.createElement("div");
  row.className = "gallery-items-row row";

  images.forEach((img) => {
    img.classList.add("img-fluid");

    const col = document.createElement("div");
    col.className = "item-column mb-4 col-12 col-sm-6 col-md-4";

    col.appendChild(img);
    row.appendChild(col);
  });

  gallery.innerHTML = "";
  gallery.appendChild(row);
  gallery.style.display = "block";
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
// button active
function setActiveFilter(activeBtn) {
  document
    .querySelectorAll(".tags-bar .nav-link")
    .forEach((btn) => btn.classList.remove("active", "active-tag"));

  activeBtn.classList.add("active", "active-tag");
}

function filterGallery(tag) {
  activeTag = tag;

  images.forEach((img) => {
    const col = img.closest(".item-column");

    col.style.display =
      tag === "all" || img.dataset.galleryTag === tag ? "" : "none";
  });
}
