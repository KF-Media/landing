
document.addEventListener("DOMContentLoaded", () => {
  fetchHero();
  fetchAbout();
  fetchServices();
  fetchPortfolio();
  fetchTestimonials();
  fetchContactInfo();
});

function fetchHero() {
  fetch("https://cms-kfmedia.onrender.com/api/hero/1/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("hero-title").innerText = data.title;
      document.getElementById("hero-image").src = data.image;
    });
}

function fetchAbout() {
  fetch("https://cms-kfmedia.onrender.com/api/about/1/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("about-paragraph-1").innerText = data.paragraph1;
      document.getElementById("about-paragraph-2").innerText = data.paragraph2;
    });
}

function fetchServices() {
  fetch("https://cms-kfmedia.onrender.com/api/services/")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("services-container");
      container.innerHTML = "";
      data.forEach(service => {
        container.innerHTML += `
          <div class="service-card bg-white dark:bg-gray-700 rounded-lg shadow p-6 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <div class="mb-4 text-indigo-600">
              <i data-feather="${service.icon}" class="w-10 h-10"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">${service.title}</h3>
            <p class="flex-grow text-gray-700 dark:text-gray-300 mb-4">${service.description}</p>
            <button class="btn-order bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded" data-service="${service.title}">Pesan Sekarang</button>
          </div>
        `;
      });
      feather.replace();
    });
}

function fetchPortfolio() {
  fetch("https://cms-kfmedia.onrender.com/api/portfolio/")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("portfolio-container");
      container.innerHTML = "";
      data.forEach(item => {
        container.innerHTML += `
          <img src="${item.image_url}" alt="${item.alt_text}" class="rounded shadow hover:scale-105 transition-transform duration-300" />
        `;
      });
    });
}

function fetchTestimonials() {
  fetch("https://cms-kfmedia.onrender.com/api/testimonials/")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("testimonial-container");
      container.innerHTML = data.map(testi => `
        <div class="testimonial-item text-center space-y-4">
          <p class="italic text-gray-700 dark:text-gray-300">"${testi.quote}"</p>
          <h4 class="font-semibold text-indigo-600 dark:text-indigo-400">- ${testi.name}, ${testi.position}</h4>
        </div>
      `).join("");
    });
}

function fetchContactInfo() {
  fetch("https://cms-kfmedia.onrender.com/api/contact/1/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("wa-link").href = `https://wa.me/${data.whatsapp_number}`;
      document.getElementById("wa-link").innerText = data.whatsapp_number;
      document.getElementById("email-link").href = `mailto:${data.email}`;
      document.getElementById("email-link").innerText = data.email;
    });
}
