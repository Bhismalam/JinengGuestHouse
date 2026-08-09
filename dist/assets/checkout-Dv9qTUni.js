import"./style-qswuSmmr.js";function L(){const e=new URLSearchParams(window.location.search),t=e.get("checkin"),n=e.get("checkout"),a=e.get("quantity")||"1";let s=3,r=new Date,i=new Date;if(i.setDate(i.getDate()+3),t&&n){const f=new Date(t),x=new Date(n);if(!isNaN(f.getTime())&&!isNaN(x.getTime())&&x>f){r=f,i=x;const q=Math.abs(x-f);s=Math.ceil(q/(1e3*60*60*24))}}let l=35,c="Jineng Suite",d="1x Suite";a==="2"&&(l=65,c="Entire Property (2 Rooms)",d="2 Rooms");const m=document.getElementById("summary-title-header"),u=document.getElementById("summary-qty-header"),p=document.getElementById("price-nights-label"),v=document.getElementById("price-nights-value"),b=document.getElementById("price-tax-value"),y=document.getElementById("price-total-value");m&&(m.textContent=c),u&&(u.textContent=d);const g=l*s,h=Math.round(g*.1),w=g+h;return p&&(p.textContent=`$${l} x ${s} night${s>1?"s":""}`),v&&(v.textContent=`$${g.toFixed(2)}`),b&&(b.textContent=`$${h.toFixed(2)}`),y&&(y.textContent=`$${w.toFixed(2)}`),{title:c,qtyText:d,checkin:r.toISOString().split("T")[0],checkout:i.toISOString().split("T")[0],nights:s,rate:l,total:w}}const o=L(),S=document.querySelectorAll('input[name="paymentMethod"]'),k=document.getElementById("payment-card-form"),I=document.getElementById("payment-transfer-form"),E=document.getElementById("payment-ewallet-form");S.forEach(e=>{e.addEventListener("change",t=>{const n=t.target.value;k.classList.add("hidden"),I.classList.add("hidden"),E.classList.add("hidden"),A(n==="card"),n==="card"?k.classList.remove("hidden"):n==="transfer"?I.classList.remove("hidden"):n==="ewallet"&&E.classList.remove("hidden")})});function A(e){const t=document.getElementById("cardNumber"),n=document.getElementById("expiry"),a=document.getElementById("cvv");t&&n&&a&&(e?(t.setAttribute("required","required"),n.setAttribute("required","required"),a.setAttribute("required","required")):(t.removeAttribute("required"),n.removeAttribute("required"),a.removeAttribute("required")))}const B=document.getElementById("cardNumber");B&&B.addEventListener("input",e=>{let t=e.target.value.replace(/\s+/g,"").replace(/[^0-9]/gi,""),n="";for(let a=0;a<t.length;a++)a>0&&a%4===0&&(n+=" "),n+=t[a];e.target.value=n});const $=document.getElementById("expiry");$&&$.addEventListener("input",e=>{let t=e.target.value.replace(/\//g,"").replace(/[^0-9]/gi,"");t.length>2?e.target.value=t.substring(0,2)+"/"+t.substring(2,4):e.target.value=t});const C=document.getElementById("cvv");C&&C.addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^0-9]/gi,"")});const N=document.getElementById("btn-submit"),M=["firstName","lastName","email","phone"];N&&N.addEventListener("click",e=>{e.preventDefault();for(const s of M){const r=document.getElementById(s);if(r&&!r.value.trim()){r.reportValidity();return}}const t=document.querySelector('input[name="paymentMethod"]:checked').value;if(t==="card"){const s=document.getElementById("cardNumber").value.trim(),r=document.getElementById("expiry").value.trim(),i=document.getElementById("cvv").value.trim();if(s.length<19){alert("Please enter a valid card number."),document.getElementById("cardNumber").focus();return}if(r.length<5){alert("Please enter a valid expiration date (MM/YY)."),document.getElementById("expiry").focus();return}if(i.length<3){alert("Please enter a valid CVV."),document.getElementById("cvv").focus();return}}const n=document.getElementById("firstName").value.trim(),a=document.getElementById("lastName").value.trim();document.getElementById("email").value.trim(),document.getElementById("phone").value.trim(),T(n,a,t)});function T(e,t,n){const a=document.createElement("div");a.className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto";let s="Credit Card",r=`
    <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
      <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-base">verified</span> Payment Completed
      </p>
      <p class="text-xs text-on-surface-variant leading-relaxed">Your transaction has been processed securely via Credit Card. A confirmation receipt has been sent to your email.</p>
    </div>
  `;n==="transfer"?(s="Bank Transfer",r=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">account_balance</span> Bank Transfer Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please transfer <strong class="text-primary font-bold">$${o.total.toFixed(2)}</strong> to <strong>BCA (7720 918 223)</strong> or <strong>Mandiri (145 0012 3456 78)</strong>, then click below to send proof of payment to our WhatsApp admin.
        </p>
      </div>
    `):n==="ewallet"&&(s="E-Wallet (QRIS)",r=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/40 space-y-1.5 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base">qr_code_2</span> QRIS Instructions
        </p>
        <p class="text-xs text-on-surface-variant leading-relaxed">
          Please complete payment on your E-Wallet app and screenshot the receipt. Click below to send confirmation to our WhatsApp admin.
        </p>
      </div>
    `),a.innerHTML=`
    <div class="bg-surface border border-outline-variant/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
      <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <span class="material-symbols-outlined text-3xl text-primary font-bold">check_circle</span>
      </div>
      
      <h2 class="font-headline-md text-2xl sm:text-3xl text-primary mb-1">Booking Confirmed!</h2>
      <p class="text-on-surface-variant text-sm font-medium mb-5">Thank you, <span class="text-on-background font-semibold">${e} ${t}</span>!</p>
      
      <div class="bg-surface-container/70 rounded-2xl p-4 mb-5 text-left space-y-2.5 text-xs sm:text-sm border border-outline-variant/30">
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Sanctuary</span><span class="font-semibold text-on-background">${o.title}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-in</span><span class="font-semibold text-on-background">${o.checkin}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Check-out</span><span class="font-semibold text-on-background">${o.checkout}</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Duration</span><span class="font-semibold text-on-background">${o.nights} Night(s)</span></div>
        <div class="flex justify-between items-center"><span class="text-on-surface-variant">Payment Method</span><span class="font-semibold text-on-background">${s}</span></div>
        <div class="flex justify-between items-center border-t border-surface-variant/60 pt-2.5 mt-2 font-medium">
          <span class="text-on-background font-semibold">Total Amount</span>
          <span class="text-primary font-bold text-base sm:text-lg">$${o.total.toFixed(2)}</span>
        </div>
      </div>
      
      ${r}

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
  `,document.body.appendChild(a),a.querySelector("#btn-whatsapp-confirm").addEventListener("click",()=>{const c=document.getElementById("phone").value.trim(),d="6285111044817",m=`Hello Jineng GuestHouse!

I have confirmed my booking inquiry.

🏨 Room: ${o.title}
📅 Check-In: ${o.checkin}
📅 Check-Out: ${o.checkout}
⏳ Nights: ${o.nights} Night(s)
💳 Payment Method: ${s}
💰 Total Amount: $${o.total.toFixed(2)}

Guest Info:
👤 Name: ${e} ${t}
📧 Email: ${document.getElementById("email").value.trim()}
📞 Phone: ${c}

Please confirm my reservation. Thank you!`,u=encodeURIComponent(m),p=`https://wa.me/${d}?text=${u}`;window.open(p,"_blank")}),a.querySelector("#btn-close-modal").addEventListener("click",()=>{a.remove(),window.location.href="./index.html"})}
