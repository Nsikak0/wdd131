const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temples/aba_nigeria_temple_1.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/temples/aba_nigeria_temple_2.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/temples/aba_nigeria_temple_3.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/temples/aba_nigeria_temple_4.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/temples/aba_nigeria_temple_5.jpg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/temples/aba_nigeria_temple_6.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/temples/aba_nigeria_temple_7.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 17000,
    imageUrl: "images/temples/aba_nigeria_temple_8.jpg",
  },
  {
    templeName: "Paris France",
    location: "Paris, France",
    dedicated: "2017, May, 21",
    area: 39700,
    imageUrl: "images/temples/aba_nigeria_temple_9.jpg",
  },
  {
    templeName: "Sapporo Japan",
    location: "Sapporo, Japan",
    dedicated: "2017, September, 21",
    area: 12000,
    imageUrl: "images/temples/aba_nigeria_temple_10.jpg",
  },
];

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-nav");
const gallery = document.querySelector("#temple-grid");
const galleryNote = document.querySelector("#gallery-note");
const filters = document.querySelectorAll("[data-filter]");

function getTempleYear(temple) {
  return Number(String(temple.dedicated).split(",")[0]);
}

function getVisibleTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getTempleYear(temple) < 1900);
    case "new":
      return temples.filter((temple) => getTempleYear(temple) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    case "home":
    default:
      return temples;
  }
}

function renderTemples(filter = "home") {
  const visibleTemples = getVisibleTemples(filter);

  gallery.innerHTML = visibleTemples
    .map(
      (temple) => `
        <article class="temple-card">
          <img
            class="temple-card__image"
            src="${temple.imageUrl}"
            alt="${temple.templeName} temple"
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
          >
          <div class="temple-card__content">
            <h2 class="temple-card__title">${temple.templeName}</h2>
            <p class="temple-card__location"><strong>Location:</strong> ${temple.location}</p>
            <p class="temple-card__dedicated"><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p class="temple-card__area"><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
          </div>
        </article>
      `
    )
    .join("");

  const filterLabels = {
    home: "Showing all temples.",
    old: "Showing temples dedicated before 1900.",
    new: "Showing temples dedicated after 2000.",
    large: "Showing temples larger than 90,000 square feet.",
    small: "Showing temples smaller than 10,000 square feet.",
  };

  galleryNote.textContent = filterLabels[filter] ?? "Showing all temples.";
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu"
  );
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) {
    return;
  }

  const filter = link.dataset.filter ?? "home";
  renderTemples(filter);

  filters.forEach((item) => {
    item.classList.toggle("active", item === link);
  });

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNav.classList.remove("is-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
    menuToggle.focus();
  }
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
renderTemples("home");
