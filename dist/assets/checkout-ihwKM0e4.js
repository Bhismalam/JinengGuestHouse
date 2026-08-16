import{c as T,s as A}from"./availability-Kk6_mOYc.js";function S(){const e=new URLSearchParams(window.location.search),t=e.get("checkin"),a=e.get("checkout"),n=e.get("quantity")||"1";let r=3,d=new Date,l=new Date;if(l.setDate(l.getDate()+3),t&&a){const b=new Date(t),x=new Date(a);if(!isNaN(b.getTime())&&!isNaN(x.getTime())&&x>b){d=b,l=x;const q=Math.abs(x-b);r=Math.ceil(q/(1e3*60*60*24))}}let u=35,m="Jineng Suite",c="1x Suite";n==="2"&&(u=65,m="Entire Property (2 Rooms)",c="2 Rooms");const o=document.getElementById("summary-title-header"),p=document.getElementById("summary-qty-header"),g=document.getElementById("price-nights-label"),h=document.getElementById("price-nights-value"),k=document.getElementById("price-tax-value"),w=document.getElementById("price-total-value");o&&(o.textContent=m),p&&(p.textContent=c);const y=u*r,E=Math.round(y*.1),I=y+E;return g&&(g.textContent=`$${u} x ${r} night${r>1?"s":""}`),h&&(h.textContent=`$${y.toFixed(2)}`),k&&(k.textContent=`$${E.toFixed(2)}`),w&&(w.textContent=`$${I.toFixed(2)}`),{title:m,qtyText:c,units:n==="2"?2:1,checkin:d.toISOString().split("T")[0],checkout:l.toISOString().split("T")[0],nights:r,rate:u,total:I}}const s=S(),P=document.querySelectorAll('input[name="paymentMethod"]'),B=document.getElementById("payment-card-form"),$=document.getElementById("payment-transfer-form"),C=document.getElementById("payment-ewallet-form");P.forEach(e=>{e.addEventListener("change",t=>{const a=t.target.value;B.classList.add("hidden"),$.classList.add("hidden"),C.classList.add("hidden"),D(a==="card"),a==="card"?B.classList.remove("hidden"):a==="transfer"?$.classList.remove("hidden"):a==="ewallet"&&C.classList.remove("hidden")})});function D(e){const t=document.getElementById("cardNumber"),a=document.getElementById("expiry"),n=document.getElementById("cvv");t&&a&&n&&(e?(t.setAttribute("required","required"),a.setAttribute("required","required"),n.setAttribute("required","required")):(t.removeAttribute("required"),a.removeAttribute("required"),n.removeAttribute("required")))}const L=document.getElementById("cardNumber");L&&L.addEventListener("input",e=>{let t=e.target.value.replace(/\s+/g,"").replace(/[^0-9]/gi,""),a="";for(let n=0;n<t.length;n++)n>0&&n%4===0&&(a+=" "),a+=t[n];e.target.value=a});const N=document.getElementById("expiry");N&&N.addEventListener("input",e=>{let t=e.target.value.replace(/\//g,"").replace(/[^0-9]/gi,"");t.length>2?e.target.value=t.substring(0,2)+"/"+t.substring(2,4):e.target.value=t});const M=document.getElementById("cvv");M&&M.addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^0-9]/gi,"")});const i=document.getElementById("btn-submit"),j=["firstName","lastName","email","phone"],f=document.getElementById("checkout-availability-error");function v(e){f&&(f.textContent=e,f.classList.remove("hidden"))}i&&i.addEventListener("click",async e=>{e.preventDefault(),f&&f.classList.add("hidden");for(const c of j){const o=document.getElementById(c);if(o&&!o.value.trim()){o.reportValidity();return}}const t=document.querySelector('input[name="paymentMethod"]:checked').value;if(t==="card"){const c=document.getElementById("cardNumber").value.trim(),o=document.getElementById("expiry").value.trim(),p=document.getElementById("cvv").value.trim();if(c.length<19){alert("Please enter a valid card number."),document.getElementById("cardNumber").focus();return}if(o.length<5){alert("Please enter a valid expiration date (MM/YY)."),document.getElementById("expiry").focus();return}if(p.length<3){alert("Please enter a valid CVV."),document.getElementById("cvv").focus();return}}const a=document.getElementById("firstName").value.trim(),n=document.getElementById("lastName").value.trim(),r=document.getElementById("email").value.trim(),d=document.getElementById("phone").value.trim();i.disabled=!0;const l=i.innerHTML;i.innerHTML="Checking availability...";const u=await T(s.checkin,s.checkout,s.units);if(u.error){i.disabled=!1,i.innerHTML=l,v("We couldn't verify availability right now. Please try again.");return}if(!u.available){i.disabled=!1,i.innerHTML=l,v("Sorry, these dates just got booked by someone else. Please go back and pick different dates.");return}const{error:m}=await A.from("bookings").insert({room_units:s.units,check_in:s.checkin,check_out:s.checkout,guest_name:`${a} ${n}`,guest_email:r,guest_phone:d});if(i.disabled=!1,i.innerHTML=l,m){console.error("Booking insert failed:",m),v("We couldn't save your booking. Please try again or contact us on WhatsApp.");return}H(a,n,t)});function H(e,t,a){const n=document.createElement("div");n.className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto";let r="Credit Card",d=`
    <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
      <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-base">verified</span> Payment Completed
      </p>
      <p class="text-xs text-on-surface-variant leading-relaxed">Your transaction has been processed securely via Credit Card. A confirmation receipt has been sent to your email.</p>
    </div>
  `;a==="transfer"?(r="Bank Transfer",d=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">account_balance</span> Bank Transfer Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please transfer <strong class="text-primary font-bold">$${s.total.toFixed(2)}</strong> to <strong>BCA (7720 918 223)</strong> or <strong>Mandiri (145 0012 3456 78)</strong>, then click below to send proof of payment to our WhatsApp admin.
        </p>
      </div>
    `):a==="ewallet"&&(r="E-Wallet (QRIS)",d=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">qr_code_2</span> QRIS Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please complete payment on your E-Wallet app and screenshot the receipt. Click below to send confirmation to our WhatsApp admin.
        </p>
      </div>
    `),n.innerHTML=`
    <div class="bg-surface border border-outline-variant/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
      <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <span class="material-symbols-outlined text-3xl text-primary font-bold">check_circle</span>
      </div>
      
      <h2 class="font-headline-md text-2xl sm:text-3xl text-primary mb-1">Booking Confirmed!</h2>
      <p class="text-on-surface-variant text-sm font-medium mb-5">Thank you, <span class="text-on-background font-semibold">${e} ${t}</span>!</p>
      
      <div class="bg-surface-container/70 rounded-2xl p-4 mb-5 text-left space-y-2.5 text-xs sm:text-sm border border-outline-variant/30">
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Sanctuary</span><span class="font-semibold text-on-background">${s.title}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-in</span><span class="font-semibold text-on-background">${s.checkin}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-out</span><span class="font-semibold text-on-background">${s.checkout}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Duration</span><span class="font-semibold text-on-background">${s.nights} Night(s)</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Payment Method</span><span class="font-semibold text-on-background">${r}</span></div>
        <div class="flex justify-between items-center border-t border-surface-variant/60 pt-2.5 mt-2 font-medium">
          <span class="text-on-background font-semibold">Total Amount</span>
          <span class="text-primary font-bold text-base sm:text-lg">$${s.total.toFixed(2)}</span>
        </div>
      </div>
      
      ${d}

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
  `,document.body.appendChild(n),n.querySelector("#btn-whatsapp-confirm").addEventListener("click",()=>{const m=document.getElementById("phone").value.trim(),c="6285111044817",o=`Hello Jineng GuestHouse!

I have confirmed my booking inquiry.

🏨 Room: ${s.title}
📅 Check-In: ${s.checkin}
📅 Check-Out: ${s.checkout}
⏳ Nights: ${s.nights} Night(s)
💳 Payment Method: ${r}
💰 Total Amount: $${s.total.toFixed(2)}

Guest Info:
👤 Name: ${e} ${t}
📧 Email: ${document.getElementById("email").value.trim()}
📞 Phone: ${m}

Please confirm my reservation. Thank you!`,p=encodeURIComponent(o),g=`https://wa.me/${c}?text=${p}`;window.open(g,"_blank")}),n.querySelector("#btn-close-modal").addEventListener("click",()=>{n.remove(),window.location.href="./index.html"})}
