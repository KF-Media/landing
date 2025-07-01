document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu on link click
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Dynamic sub-service dropdown options
  const subServiceSelect = document.getElementById('subService');
  const mainServiceSelect = document.getElementById('mainService');

  const subServices = {
    'Desain Grafis': ['Logo Design', 'Branding', 'Poster', 'Flyer'],
    'Motion Graphic': ['Video Animasi', 'Intro Video', 'Explainer Video'],
    'Sosial Media': ['Manajemen Akun', 'Konten Kreatif', 'Iklan Sosial Media'],
    'Ads': ['Google Ads', 'Facebook Ads', 'Instagram Ads'],
    'Privat Komputer': ['Basic Komputer', 'Office Suite', 'Editing Software'],
    'Instalasi OS': ['Windows', 'Linux', 'MacOS'],
    'Penulisan': ['Artikel', 'Copywriting', 'SEO Content'],
    'Web Dev': ['Website Company Profile', 'E-commerce', 'Landing Page'],
    'Software Dev': ['Desktop App', 'Mobile App', 'Web App']
  };

  function updateSubServices() {
    const selectedMain = mainServiceSelect.value;
    subServiceSelect.innerHTML = '<option value="" disabled selected>Pilih sub-layanan</option>';
    if (selectedMain && subServices[selectedMain]) {
      subServices[selectedMain].forEach(sub => {
        const option = document.createElement('option');
        option.value = sub;
        option.textContent = sub;
        subServiceSelect.appendChild(option);
      });
      subServiceSelect.disabled = false;
    } else {
      subServiceSelect.disabled = true;
    }
  }

  mainServiceSelect.addEventListener('change', updateSubServices);
  updateSubServices();

  // Order form submit handler
  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = orderForm.fullName.value.trim();
    const contactInfo = orderForm.contactInfo.value.trim();
    const mainService = orderForm.mainService.value;
    const subService = orderForm.subService.value;
    const projectDesc = orderForm.projectDesc.value.trim();
    const deadline = orderForm.deadline.value;
    const priceEstimate = orderForm.priceEstimate.value;
    const referenceFile = orderForm.referenceFile.files[0];

    if (!fullName || !contactInfo || !mainService || !subService || !projectDesc || !deadline || !priceEstimate) {
      alert('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }

    // Prepare message
    let message = `Halo, saya ingin memesan layanan dari KF MEDIA.%0A`;
    message += `Nama: ${fullName}%0A`;
    message += `Kontak: ${contactInfo}%0A`;
    message += `Layanan Utama: ${mainService}%0A`;
    message += `Sub-Layanan: ${subService}%0A`;
    message += `Deskripsi Proyek: ${projectDesc}%0A`;
    message += `Tanggal Deadline: ${deadline}%0A`;
    message += `Estimasi Harga: Rp ${priceEstimate}%0A`;

    if (referenceFile) {
      message += `File Referensi: ${referenceFile.name}%0A`;
    }

    // Check if contactInfo is WhatsApp number or email
    const isWhatsApp = /^[0-9+ ]+$/.test(contactInfo);
    if (isWhatsApp) {
      // Format number for WhatsApp link (remove spaces and plus)
      const waNumber = contactInfo.replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${waNumber}?text=${message}`;
      window.open(waLink, '_blank');
    } else {
      // Email link
      const subject = encodeURIComponent('Order Layanan KF MEDIA');
      const body = decodeURIComponent(message.replace(/%0A/g, '\n'));
      const mailtoLink = `mailto:${contactInfo}?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }
  });

  // Service card "Pesan Sekarang" button click handler
  document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('click', () => {
      const serviceName = button.getAttribute('data-service');
      const mainServiceSelect = document.getElementById('mainService');
      const priceEstimateInput = document.getElementById('priceEstimate');

      // Scroll to order form
      const orderSection = document.getElementById('order');
      orderSection.scrollIntoView({ behavior: 'smooth' });

      // Set main service dropdown
      mainServiceSelect.value = serviceName;

      // Trigger change event to update sub-services
      const event = new Event('change');
      mainServiceSelect.dispatchEvent(event);

      // Optionally set price estimate (example prices)
      const priceMap = {
        'Desain Grafis': 500000,
        'Motion Graphic': 750000,
        'Sosial Media': 600000,
        'Ads': 700000,
        'Privat Komputer': 400000,
        'Instalasi OS': 300000,
        'Penulisan': 450000,
        'Web Dev': 1000000,
        'Software Dev': 1500000
      };
      if (priceMap[serviceName]) {
        priceEstimateInput.value = priceMap[serviceName];
      } else {
        priceEstimateInput.value = '';
      }
    });
  });

  // Testimonial carousel
  const testimonials = document.querySelectorAll('#testimonialCarousel .testimonial-item');
  let currentTestimonial = 0;
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  function showTestimonial(index) {
    testimonials.forEach((item, i) => {
      item.classList.toggle('hidden', i !== index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  showTestimonial(currentTestimonial);

});
