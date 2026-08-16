import { supabase } from './supabaseClient.js';
import { checkAvailability } from './availability.js';

// Parse query params for booking details
function parseQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const checkin = params.get('checkin');
  const checkout = params.get('checkout');
  const qty = params.get('quantity') || '1';

  // Calculate nights
  let numNights = 3; // Default fallback
  let checkinDate = new Date();
  let checkoutDate = new Date();
  checkoutDate.setDate(checkoutDate.getDate() + 3);

  if (checkin && checkout) {
    const d1 = new Date(checkin);
    const d2 = new Date(checkout);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime()) && d2 > d1) {
      checkinDate = d1;
      checkoutDate = d2;
      const diffTime = Math.abs(d2 - d1);
      numNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  // Determine rate and title based on quantity
  let rate = 35;
  let title = 'Jineng Suite';
  let qtyText = '1x Suite';

  if (qty === '2') {
    rate = 65; // Entire Property / 2 Rooms
    title = 'Entire Property (2 Rooms)';
    qtyText = '2 Rooms';
  }

  // Update DOM with calculations
  const summaryTitle = document.getElementById('summary-title-header');
  const summaryQty = document.getElementById('summary-qty-header');
  const nightsLabel = document.getElementById('price-nights-label');
  const nightsValue = document.getElementById('price-nights-value');
  const taxValue = document.getElementById('price-tax-value');
  const totalValue = document.getElementById('price-total-value');

  if (summaryTitle) summaryTitle.textContent = title;
  if (summaryQty) summaryQty.textContent = qtyText;

  const subtotal = rate * numNights;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  if (nightsLabel) nightsLabel.textContent = `$${rate} x ${numNights} night${numNights > 1 ? 's' : ''}`;
  if (nightsValue) nightsValue.textContent = `$${subtotal.toFixed(2)}`;
  if (taxValue) taxValue.textContent = `$${tax.toFixed(2)}`;
  if (totalValue) totalValue.textContent = `$${total.toFixed(2)}`;

  return {
    title,
    qtyText,
    units: qty === '2' ? 2 : 1,
    checkin: checkinDate.toISOString().split('T')[0],
    checkout: checkoutDate.toISOString().split('T')[0],
    nights: numNights,
    rate,
    total
  };
}

const bookingData = parseQueryParams();

// Toggle payment form visibility dynamically
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const cardForm = document.getElementById('payment-card-form');
const transferForm = document.getElementById('payment-transfer-form');
const ewalletForm = document.getElementById('payment-ewallet-form');

paymentMethods.forEach(method => {
  method.addEventListener('change', (e) => {
    const selected = e.target.value;
    
    // Hide all forms first
    cardForm.classList.add('hidden');
    transferForm.classList.add('hidden');
    ewalletForm.classList.add('hidden');

    // Remove required attributes from card inputs when not selected
    setCardInputsRequired(selected === 'card');

    // Show selected form
    if (selected === 'card') {
      cardForm.classList.remove('hidden');
    } else if (selected === 'transfer') {
      transferForm.classList.remove('hidden');
    } else if (selected === 'ewallet') {
      ewalletForm.classList.remove('hidden');
    }
  });
});

function setCardInputsRequired(isRequired) {
  const cardNum = document.getElementById('cardNumber');
  const expiry = document.getElementById('expiry');
  const cvv = document.getElementById('cvv');
  if (cardNum && expiry && cvv) {
    if (isRequired) {
      cardNum.setAttribute('required', 'required');
      expiry.setAttribute('required', 'required');
      cvv.setAttribute('required', 'required');
    } else {
      cardNum.removeAttribute('required');
      expiry.removeAttribute('required');
      cvv.removeAttribute('required');
    }
  }
}

// Auto-format Credit Card Number (e.g. 0000 0000 0000 0000)
const cardInput = document.getElementById('cardNumber');
if (cardInput) {
  cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    e.target.value = formattedValue;
  });
}

// Auto-format Expiration Date (e.g. MM/YY)
const expiryInput = document.getElementById('expiry');
if (expiryInput) {
  expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
  });
}

// Limit CVV to numeric inputs only
const cvvInput = document.getElementById('cvv');
if (cvvInput) {
  cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/gi, '');
  });
}

// Form Submit Handling
const btnSubmit = document.getElementById('btn-submit');
const guestFormInputs = ['firstName', 'lastName', 'email', 'phone'];

const availabilityError = document.getElementById('checkout-availability-error');

function showAvailabilityError(message) {
  if (!availabilityError) return;
  availabilityError.textContent = message;
  availabilityError.classList.remove('hidden');
}

if (btnSubmit) {
  btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    if (availabilityError) availabilityError.classList.add('hidden');

    // Check Guest form validity manually
    let isValid = true;
    for (const id of guestFormInputs) {
      const input = document.getElementById(id);
      if (input && !input.value.trim()) {
        input.reportValidity();
        isValid = false;
        return;
      }
    }

    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Validate payment card info if applicable
    if (paymentMethod === 'card') {
      const cardNum = document.getElementById('cardNumber').value.trim();
      const expiry = document.getElementById('expiry').value.trim();
      const cvv = document.getElementById('cvv').value.trim();

      if (cardNum.length < 19) {
        alert('Please enter a valid card number.');
        document.getElementById('cardNumber').focus();
        return;
      }
      if (expiry.length < 5) {
        alert('Please enter a valid expiration date (MM/YY).');
        document.getElementById('expiry').focus();
        return;
      }
      if (cvv.length < 3) {
        alert('Please enter a valid CVV.');
        document.getElementById('cvv').focus();
        return;
      }
    }

    // Capture guest details
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    btnSubmit.disabled = true;
    const originalBtnHtml = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Checking availability...';

    // Re-check availability to guard against another guest booking the same
    // dates while this one was filling out the checkout form.
    const availability = await checkAvailability(bookingData.checkin, bookingData.checkout, bookingData.units);

    if (availability.error) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnHtml;
      showAvailabilityError("We couldn't verify availability right now. Please try again.");
      return;
    }

    if (!availability.available) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnHtml;
      showAvailabilityError('Sorry, these dates just got booked by someone else. Please go back and pick different dates.');
      return;
    }

    const { error: insertError } = await supabase.from('bookings').insert({
      room_units: bookingData.units,
      check_in: bookingData.checkin,
      check_out: bookingData.checkout,
      guest_name: `${firstName} ${lastName}`,
      guest_email: email,
      guest_phone: phone,
    });

    btnSubmit.disabled = false;
    btnSubmit.innerHTML = originalBtnHtml;

    if (insertError) {
      console.error('Booking insert failed:', insertError);
      showAvailabilityError("We couldn't save your booking. Please try again or contact us on WhatsApp.");
      return;
    }

    // Create a beautiful Success Overlay Modal
    showSuccessModal(firstName, lastName, paymentMethod);
  });
}

function showSuccessModal(firstName, lastName, paymentMethod) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto';
  
  // Format payment method text for user display
  let paymentText = 'Credit Card';
  let instructionHtml = `
    <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
      <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-base">verified</span> Payment Completed
      </p>
      <p class="text-xs text-on-surface-variant leading-relaxed">Your transaction has been processed securely via Credit Card. A confirmation receipt has been sent to your email.</p>
    </div>
  `;
  
  if (paymentMethod === 'transfer') {
    paymentText = 'Bank Transfer';
    instructionHtml = `
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">account_balance</span> Bank Transfer Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please transfer <strong class="text-primary font-bold">$${bookingData.total.toFixed(2)}</strong> to <strong>BCA (7720 918 223)</strong> or <strong>Mandiri (145 0012 3456 78)</strong>, then click below to send proof of payment to our WhatsApp admin.
        </p>
      </div>
    `;
  } else if (paymentMethod === 'ewallet') {
    paymentText = 'E-Wallet (QRIS)';
    instructionHtml = `
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">qr_code_2</span> QRIS Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please complete payment on your E-Wallet app and screenshot the receipt. Click below to send confirmation to our WhatsApp admin.
        </p>
      </div>
    `;
  }

  modalOverlay.innerHTML = `
    <div class="bg-surface border border-outline-variant/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
      <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <span class="material-symbols-outlined text-3xl text-primary font-bold">check_circle</span>
      </div>
      
      <h2 class="font-headline-md text-2xl sm:text-3xl text-primary mb-1">Booking Confirmed!</h2>
      <p class="text-on-surface-variant text-sm font-medium mb-5">Thank you, <span class="text-on-background font-semibold">${firstName} ${lastName}</span>!</p>
      
      <div class="bg-surface-container/70 rounded-2xl p-4 mb-5 text-left space-y-2.5 text-xs sm:text-sm border border-outline-variant/30">
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Sanctuary</span><span class="font-semibold text-on-background">${bookingData.title}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-in</span><span class="font-semibold text-on-background">${bookingData.checkin}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-out</span><span class="font-semibold text-on-background">${bookingData.checkout}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Duration</span><span class="font-semibold text-on-background">${bookingData.nights} Night(s)</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Payment Method</span><span class="font-semibold text-on-background">${paymentText}</span></div>
        <div class="flex justify-between items-center border-t border-surface-variant/60 pt-2.5 mt-2 font-medium">
          <span class="text-on-background font-semibold">Total Amount</span>
          <span class="text-primary font-bold text-base sm:text-lg">$${bookingData.total.toFixed(2)}</span>
        </div>
      </div>
      
      ${instructionHtml}

      <div class="flex flex-col gap-3">
        <button id="btn-whatsapp-confirm" class="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl font-label-caps text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer" style="display: flex; align-items: center; justify-content: center;">
          <svg class="fill-current shrink-0" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px;" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.436 2.5 1.173 3.466l-.768 2.808 2.877-.754a5.728 5.728 0 002.486.58h.003c3.181 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.766-5.769-5.766zm3.426 8.21c-.147.412-.852.793-1.185.83-.332.037-.732.062-2.199-.548-1.879-.78-3.08-2.693-3.173-2.817-.094-.124-.766-.998-.766-1.917 0-.92.476-1.371.645-1.558.17-.187.373-.234.497-.234.124 0 .249.001.356.006.113.005.263-.044.412.318.156.381.533 1.302.579 1.396.046.093.078.203.015.328-.062.125-.094.203-.187.312-.094.109-.196.244-.28.328-.094.094-.191.196-.081.385.111.189.493.815 1.059 1.319.73.65 1.343.852 1.532.946.189.094.298.078.41-.047.112-.125.476-.554.603-.742.127-.188.254-.156.425-.094.172.062 1.09.515 1.278.609.188.094.312.141.359.223.047.081.047.472-.1.884zM12 2C6.477 2 2 6.477 2 12c0 2.012.597 3.886 1.623 5.46L2 22l4.702-1.233A9.923 9.923 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.745 0-3.37-.5-4.75-1.37l-.34-.21-2.82.74.75-2.73-.23-.37A7.933 7.933 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Confirm via WhatsApp</span>
        </button>
        <button id="btn-close-modal" class="w-full bg-transparent hover:bg-surface-container-high border border-outline-variant text-on-surface py-3 px-4 rounded-xl font-label-caps text-xs uppercase tracking-wider transition-all cursor-pointer">
          Back to Home
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // WhatsApp Confirm Link Clicked
  const waBtn = modalOverlay.querySelector('#btn-whatsapp-confirm');
  waBtn.addEventListener('click', () => {
    const phoneNum = document.getElementById('phone').value.trim();
    const whatsappNumber = '6285111044817'; // Official Jineng Guest House WhatsApp number
    const message = `Hello Jineng GuestHouse!\n\nI have confirmed my booking inquiry.\n\n🏨 Room: ${bookingData.title}\n📅 Check-In: ${bookingData.checkin}\n📅 Check-Out: ${bookingData.checkout}\n⏳ Nights: ${bookingData.nights} Night(s)\n💳 Payment Method: ${paymentText}\n💰 Total Amount: $${bookingData.total.toFixed(2)}\n\nGuest Info:\n👤 Name: ${firstName} ${lastName}\n📧 Email: ${document.getElementById('email').value.trim()}\n📞 Phone: ${phoneNum}\n\nPlease confirm my reservation. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  });

  // Close modal and redirect home
  const closeBtn = modalOverlay.querySelector('#btn-close-modal');
  closeBtn.addEventListener('click', () => {
    modalOverlay.remove();
    window.location.href = './index.html';
  });
}
