// Simple scroll effect for top nav
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 20) {
    nav.classList.add('shadow-md');
    nav.classList.replace('py-6', 'py-4');
  } else {
    nav.classList.remove('shadow-md');
    nav.classList.replace('py-4', 'py-6');
  }
});

// Smooth scrolling for anchor links with dynamic navbar offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const nav = document.getElementById('main-nav');
      const navHeight = nav ? nav.offsetHeight : 80;

      let targetPosition;
      if (targetId === '#booking' || targetId === '#sanctuary') {
        // Scroll smoothly to the top of the page so Hero banner & Booking Form are perfectly framed
        targetPosition = 0;
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        targetPosition = elementPosition - navHeight - 16;
      }

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });

      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }

      // Focus check-in date input when navigating to #booking
      if (targetId === '#booking') {
        const checkIn = document.getElementById('check-in');
        if (checkIn) {
          setTimeout(() => {
            checkIn.focus();
          }, 500);
        }
      }
    }
  });
});

// Setup date input limits and validation
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');
const bookingForm = document.getElementById('booking-form');

if (checkInInput && checkOutInput) {
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  checkInInput.min = today;
  checkOutInput.min = today;

  // Whenever check-in date changes, update the minimum check-out date
  checkInInput.addEventListener('change', () => {
    if (checkInInput.value) {
      const nextDay = new Date(checkInInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutInput.min = nextDay.toISOString().split('T')[0];
      
      // If check-out is currently before check-in, reset or update it
      if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = nextDay.toISOString().split('T')[0];
      }
    }
  });

  // Handle booking form submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkInDate = checkInInput.value;
    const checkOutDate = checkOutInput.value;
    const rooms = document.getElementById('quantity').value;

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    // Redirect to checkout page with query params
    window.location.href = `./checkout.html?checkin=${checkInDate}&checkout=${checkOutDate}&quantity=${rooms}`;
  });
}

// -------------------------------------------------------------
// Gallery Filter Logic
// -------------------------------------------------------------
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active state from all buttons
      filterBtns.forEach((b) => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface');
      });

      // Add active state to clicked button
      btn.classList.remove('bg-surface-container', 'text-on-surface');
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('hidden');
          item.classList.add('animate-fade-in');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// -------------------------------------------------------------
// Lightbox Modal Logic
// -------------------------------------------------------------
function openLightbox(src, caption) {
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-200 opacity-0 cursor-pointer';
  
  lightboxOverlay.innerHTML = `
    <button class="absolute top-6 right-6 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all flex items-center justify-center cursor-pointer" id="close-lightbox" title="Close">
      <span class="material-symbols-outlined text-3xl">close</span>
    </button>
    <div class="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl mb-4 transition-transform duration-200 scale-95" id="lightbox-container" onclick="event.stopPropagation()">
      <img src="${src}" alt="${caption || ''}" class="w-full h-full object-contain max-h-[85vh] rounded-2xl select-none"/>
    </div>
    ${caption ? `<p class="text-white/90 font-body-md text-base text-center drop-shadow-md px-4" onclick="event.stopPropagation()">${caption}</p>` : ''}
  `;

  document.body.appendChild(lightboxOverlay);
  document.body.style.overflow = 'hidden';

  // Smooth entrance
  requestAnimationFrame(() => {
    lightboxOverlay.classList.remove('opacity-0');
    lightboxOverlay.classList.add('opacity-100');
    const container = lightboxOverlay.querySelector('#lightbox-container');
    if (container) {
      container.classList.remove('scale-95');
      container.classList.add('scale-100');
    }
  });

  const closeHandler = () => {
    lightboxOverlay.classList.remove('opacity-100');
    lightboxOverlay.classList.add('opacity-0');
    setTimeout(() => {
      lightboxOverlay.remove();
      document.body.style.overflow = '';
    }, 200);
  };

  const closeBtn = lightboxOverlay.querySelector('#close-lightbox');
  if (closeBtn) closeBtn.addEventListener('click', closeHandler);
  lightboxOverlay.addEventListener('click', closeHandler);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeHandler();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// Attach lightbox to gallery items and gallery triggers
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item') || e.target.closest('.gallery-trigger');
  if (item) {
    const img = item.querySelector('img') || item;
    const src = item.getAttribute('data-src') || img.src;
    const caption = item.getAttribute('data-caption') || img.alt;
    openLightbox(src, caption);
  }
});

// -------------------------------------------------------------
// FAQ Accordion Toggle
// -------------------------------------------------------------
const faqBtns = document.querySelectorAll('.faq-btn');

faqBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const faqItem = btn.closest('.faq-item');
    const content = faqItem.querySelector('.faq-content');
    const icon = btn.querySelector('.faq-icon');

    const isOpen = !content.classList.contains('hidden');

    // Close all other FAQ items for accordion behavior
    document.querySelectorAll('.faq-content').forEach((c) => c.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach((i) => i.classList.remove('rotate-180'));

    if (!isOpen) {
      content.classList.remove('hidden');
      icon.classList.add('rotate-180');
    }
  });
});

