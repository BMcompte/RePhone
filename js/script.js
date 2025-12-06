// Product data (editable)
// Using Unsplash source images (free). Replace with your assets/images/* paths for production.
const products = [
  { id: 'iphone-12', name: 'iPhone 12 — Reconditionné', img: 'https://source.unsplash.com/800x600/?iphone,12', prices: { '64': 199, '128': 249, '256': 299 }, condition: 'Très bon état', warranty: '12 mois' },
  { id: 'iphone-13', name: 'iPhone 13 — Reconditionné', img: 'https://source.unsplash.com/800x600/?iphone,13', prices: { '64': 299, '128': 349, '256': 399 }, condition: 'Très bon état', warranty: '12 mois' },
  { id: 'iphone-14', name: 'iPhone 14 — Reconditionné', img: 'https://source.unsplash.com/800x600/?iphone,14', prices: { '64': 399, '128': 449, '256': 499 }, condition: 'Excellent état', warranty: '12 mois' },
  { id: 'iphone-15', name: 'iPhone 15 — Reconditionné', img: 'https://source.unsplash.com/800x600/?iphone,15', prices: { '64': 549, '128': 599, '256': 649 }, condition: 'Excellent état', warranty: '12 mois' },
  { id: 'iphone-16', name: 'iPhone 16 — Reconditionné', img: 'https://source.unsplash.com/800x600/?iphone,16', prices: { '64': 699, '128': 749, '256': 799 }, condition: 'Neuf reconditionné', warranty: '12 mois' }
];

function formatPrice(n){ return new Intl.NumberFormat('fr-FR', { style:'currency', currency:'EUR' }).format(n); }

function renderProducts(){
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card';

    const media = document.createElement('div'); media.className = 'card-media';
    const img = document.createElement('img'); img.src = prod.img; img.alt = prod.name;
    media.appendChild(img);
    const badge = document.createElement('div'); badge.className = 'badge'; badge.textContent = 'Reconditionné';
    media.appendChild(badge);
    card.appendChild(media);

    const body = document.createElement('div'); body.className = 'card-body';

    const title = document.createElement('h3'); title.className = 'card-title'; title.textContent = prod.name; body.appendChild(title);

    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = prod.condition + ' • Garantie: ' + prod.warranty; body.appendChild(meta);

    const variants = document.createElement('div'); variants.className = 'variants';
    const select = document.createElement('select'); select.className = 'select';
    Object.keys(prod.prices).forEach(cap => {
      const opt = document.createElement('option'); opt.value = cap; opt.textContent = cap + ' Go';
      select.appendChild(opt);
    });
    variants.appendChild(select);
    body.appendChild(variants);

    const priceEl = document.createElement('div'); priceEl.className = 'price';
    const defaultPrice = prod.prices[Object.keys(prod.prices)[0]];
    priceEl.textContent = formatPrice(defaultPrice);
    body.appendChild(priceEl);

    const actions = document.createElement('div'); actions.className = 'actions';
    const buyBtn = document.createElement('button'); buyBtn.className = 'btn'; buyBtn.textContent = 'Acheter avec PayPal';
    actions.appendChild(buyBtn);
    body.appendChild(actions);

    // Events
    select.addEventListener('change', () => {
      const p = prod.prices[select.value];
      priceEl.textContent = formatPrice(p);
    });

    buyBtn.addEventListener('click', () => {
      const capacity = select.value;
      const amount = prod.prices[capacity];
      openPayPalModal(prod.name + ' — ' + capacity + ' Go', amount);
    });

    card.appendChild(body);
    grid.appendChild(card);
  });
}

// Modal + PayPal rendering
const modal = document.getElementById('paypal-modal');
const modalTitle = document.getElementById('modal-title');
const paypalArea = document.getElementById('paypal-button-area');
const modalClose = document.getElementById('modal-close');

function openPayPalModal(title, amount){
  modalTitle.textContent = title;
  paypalArea.innerHTML = '';
  modal.setAttribute('aria-hidden', 'false');

  // Wait until PayPal SDK is ready
  if (window.paypal){
    renderPayPalButtons(amount);
  } else {
    const scriptCheck = setInterval(() => { if (window.paypal){ clearInterval(scriptCheck); renderPayPalButtons(amount); } }, 200);
  }
}

function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  paypalArea.innerHTML = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) =>{ if (e.target === modal) closeModal(); });

function renderPayPalButtons(amount){
  const amountStr = amount.toFixed(2);
  paypalArea.innerHTML = '';

  paypal.Buttons({
    style: { layout: 'vertical' },
    createOrder: function(data, actions){
      return actions.order.create({
        purchase_units: [{ amount: { value: amountStr, currency_code: 'EUR' } }]
      });
    },
    onApprove: function(data, actions){
      return actions.order.capture().then(function(details){
        closeModal();
        alert('Paiement réussi — Merci, ' + (details.payer && details.payer.name && details.payer.name.given_name ? details.payer.name.given_name : '') + '!');
      });
    },
    onError: function(err){
      console.error('PayPal error', err);
      alert('Erreur lors du paiement PayPal. Voir la console pour plus d\'infos.');
    }
  }).render('#paypal-button-area');
}

// Init
document.addEventListener('DOMContentLoaded', renderProducts);
