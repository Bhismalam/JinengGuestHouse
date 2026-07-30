import"./style-BdNe-_X8.js";function L(){const e=new URLSearchParams(window.location.search),t=e.get("checkin"),n=e.get("checkout"),a=e.get("quantity")||"1";let s=3,o=new Date,i=new Date;if(i.setDate(i.getDate()+3),t&&n){const f=new Date(t),g=new Date(n);if(!isNaN(f.getTime())&&!isNaN(g.getTime())&&g>f){o=f,i=g;const q=Math.abs(g-f);s=Math.ceil(q/(1e3*60*60*24))}}let c=120,l="Garden Suite",d="1x Suite";a==="2"&&(c=220,l="Entire Property (2 Rooms)",d="2 Rooms");const u=document.getElementById("summary-title-header"),m=document.getElementById("summary-qty-header"),p=document.getElementById("price-nights-label"),y=document.getElementById("price-nights-value"),b=document.getElementById("price-tax-value"),h=document.getElementById("price-total-value");u&&(u.textContent=l),m&&(m.textContent=d);const v=c*s,x=Math.round(v*.1),w=v+x;return p&&(p.textContent=`$${c} x ${s} night${s>1?"s":""}`),y&&(y.textContent=`$${v.toFixed(2)}`),b&&(b.textContent=`$${x.toFixed(2)}`),h&&(h.textContent=`$${w.toFixed(2)}`),{title:l,qtyText:d,checkin:o.toISOString().split("T")[0],checkout:i.toISOString().split("T")[0],nights:s,rate:c,total:w}}const r=L(),S=document.querySelectorAll('input[name="paymentMethod"]'),k=document.getElementById("payment-card-form"),I=document.getElementById("payment-transfer-form"),E=document.getElementById("payment-ewallet-form");S.forEach(e=>{e.addEventListener("change",t=>{const n=t.target.value;k.classList.add("hidden"),I.classList.add("hidden"),E.classList.add("hidden"),M(n==="card"),n==="card"?k.classList.remove("hidden"):n==="transfer"?I.classList.remove("hidden"):n==="ewallet"&&E.classList.remove("hidden")})});function M(e){const t=document.getElementById("cardNumber"),n=document.getElementById("expiry"),a=document.getElementById("cvv");t&&n&&a&&(e?(t.setAttribute("required","required"),n.setAttribute("required","required"),a.setAttribute("required","required")):(t.removeAttribute("required"),n.removeAttribute("required"),a.removeAttribute("required")))}const B=document.getElementById("cardNumber");B&&B.addEventListener("input",e=>{let t=e.target.value.replace(/\s+/g,"").replace(/[^0-9]/gi,""),n="";for(let a=0;a<t.length;a++)a>0&&a%4===0&&(n+=" "),n+=t[a];e.target.value=n});const $=document.getElementById("expiry");$&&$.addEventListener("input",e=>{let t=e.target.value.replace(/\//g,"").replace(/[^0-9]/gi,"");t.length>2?e.target.value=t.substring(0,2)+"/"+t.substring(2,4):e.target.value=t});const N=document.getElementById("cvv");N&&N.addEventListener("input",e=>{e.target.value=e.target.value.replace(/[^0-9]/gi,"")});const C=document.getElementById("btn-submit"),A=["firstName","lastName","email","phone"];C&&C.addEventListener("click",e=>{e.preventDefault();for(const s of A){const o=document.getElementById(s);if(o&&!o.value.trim()){o.reportValidity();return}}const t=document.querySelector('input[name="paymentMethod"]:checked').value;if(t==="card"){const s=document.getElementById("cardNumber").value.trim(),o=document.getElementById("expiry").value.trim(),i=document.getElementById("cvv").value.trim();if(s.length<19){alert("Please enter a valid card number."),document.getElementById("cardNumber").focus();return}if(o.length<5){alert("Please enter a valid expiration date (MM/YY)."),document.getElementById("expiry").focus();return}if(i.length<3){alert("Please enter a valid CVV."),document.getElementById("cvv").focus();return}}const n=document.getElementById("firstName").value.trim(),a=document.getElementById("lastName").value.trim();document.getElementById("email").value.trim(),document.getElementById("phone").value.trim(),T(n,a,t)});function T(e,t,n){const a=document.createElement("div");a.className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4";let s="Credit Card",o='<p class="text-sm text-on-surface-variant mb-6">Your transaction has been processed securely via Credit Card. A confirmation email has been sent to you.</p>';n==="transfer"?(s="Bank Transfer",o=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/30 space-y-2 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider">Instructions:</p>
        <p class="text-sm text-on-surface-variant">Please transfer the total of <strong>$${r.total.toFixed(2)}</strong> to either BCA or Mandiri. Send proof of payment to our WhatsApp admin to activate your booking.</p>
      </div>
    `):n==="ewallet"&&(s="E-Wallet",o=`
      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/30 space-y-2 mb-6">
        <p class="text-xs font-semibold text-primary uppercase tracking-wider">Instructions:</p>
        <p class="text-sm text-on-surface-variant">Verify the payment on your e-wallet app. Screenshot the receipt and send it to our WhatsApp admin to verify your booking.</p>
      </div>
    `),a.innerHTML=`
    <div class="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in relative">
      <div class="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="material-symbols-outlined text-4xl text-primary font-bold">check_circle</span>
      </div>
      <h2 class="font-headline-md text-3xl text-primary mb-2">Booking Confirmed!</h2>
      <p class="text-on-surface font-medium mb-4">Thank you, ${e} ${t}!</p>
      
      <div class="border-t border-b border-surface-variant/40 py-4 mb-6 text-left space-y-2 text-sm text-on-surface-variant">
        <div class="flex justify-between"><span>Sanctuary:</span><span class="font-semibold text-on-background">${r.title}</span></div>
        <div class="flex justify-between"><span>Check-in:</span><span class="font-semibold text-on-background">${r.checkin}</span></div>
        <div class="flex justify-between"><span>Check-out:</span><span class="font-semibold text-on-background">${r.checkout}</span></div>
        <div class="flex justify-between"><span>Nights:</span><span class="font-semibold text-on-background">${r.nights} Night(s)</span></div>
        <div class="flex justify-between"><span>Payment Method:</span><span class="font-semibold text-on-background">${s}</span></div>
        <div class="flex justify-between border-t border-surface-variant/40 pt-2 font-medium text-on-background"><span>Total paid:</span><span class="text-primary font-bold text-lg">$${r.total.toFixed(2)}</span></div>
      </div>
      
      ${o}

      <div class="flex flex-col gap-2">
        <button id="btn-whatsapp-confirm" class="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-xl font-label-caps text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.436 2.5 1.173 3.466l-.768 2.808 2.877-.754a5.728 5.728 0 002.486.58h.003c3.181 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.766-5.769-5.766zm3.426 8.21c-.147.412-.852.793-1.185.83-.332.037-.732.062-2.199-.548-1.879-.78-3.08-2.693-3.173-2.817-.094-.124-.766-.998-.766-1.917 0-.92.476-1.371.645-1.558.17-.187.373-.234.497-.234.124 0 .249.001.356.006.113.005.263-.044.412.318.156.381.533 1.302.579 1.396.046.093.078.203.015.328-.062.125-.094.203-.187.312-.094.109-.196.244-.28.328-.094.094-.191.196-.081.385.111.189.493.815 1.059 1.319.73.65 1.343.852 1.532.946.189.094.298.078.41-.047.112-.125.476-.554.603-.742.127-.188.254-.156.425-.094.172.062 1.09.515 1.278.609.188.094.312.141.359.223.047.081.047.472-.1.884zM12 2C6.477 2 2 6.477 2 12c0 2.012.597 3.886 1.623 5.46L2 22l4.702-1.233A9.923 9.923 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.745 0-3.37-.5-4.75-1.37l-.34-.21-2.82.74.75-2.73-.23-.37A7.933 7.933 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>
          Confirm via WhatsApp
        </button>
        <button id="btn-close-modal" class="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-on-surface py-3 rounded-xl font-label-caps text-xs uppercase tracking-widest transition-all">
          Back to Home
        </button>
      </div>
    </div>
  `,document.body.appendChild(a),a.querySelector("#btn-whatsapp-confirm").addEventListener("click",()=>{const l=document.getElementById("phone").value.trim(),d="6281234567890",u=`Hello Jineng GuestHouse!

I have confirmed my booking inquiry.

🏨 Room: ${r.title}
📅 Check-In: ${r.checkin}
📅 Check-Out: ${r.checkout}
⏳ Nights: ${r.nights} Night(s)
💳 Payment Method: ${s}
💰 Total Amount: $${r.total.toFixed(2)}

Guest Info:
👤 Name: ${e} ${t}
📧 Email: ${email}
📞 Phone: ${l}

Please confirm my reservation. Thank you!`,m=encodeURIComponent(u),p=`https://wa.me/${d}?text=${m}`;window.open(p,"_blank")}),a.querySelector("#btn-close-modal").addEventListener("click",()=>{a.remove(),window.location.href="./index.html"})}
