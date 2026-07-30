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
  lightboxOverlay.className = 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out';
  
  lightboxOverlay.innerHTML = `
    <button class="absolute top-6 right-6 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 rounded-full p-3 transition-all flex items-center justify-center" id="close-lightbox">
      <span class="material-symbols-outlined text-3xl">close</span>
    </button>
    <div class="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl mb-4" onclick="event.stopPropagation()">
      <img src="${src}" alt="${caption}" class="w-full h-full object-contain max-h-[80vh] rounded-2xl"/>
    </div>
    <p class="text-white/90 font-headline-md text-lg text-center drop-shadow-md" onclick="event.stopPropagation()">${caption || ''}</p>
  `;

  document.body.appendChild(lightboxOverlay);
  document.body.style.overflow = 'hidden';

  const closeBtn = lightboxOverlay.querySelector('#close-lightbox');
  const closeHandler = () => {
    lightboxOverlay.remove();
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeHandler);
  lightboxOverlay.addEventListener('click', closeHandler);

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeHandler();
      document.removeEventListener('keydown', escHandler);
    }
  });
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

