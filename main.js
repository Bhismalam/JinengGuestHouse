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
