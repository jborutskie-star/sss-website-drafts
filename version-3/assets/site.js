/* Secured Safety Solutions, version 3: light store.
   Plain script, no build. Every product fact lives in KITS and CLASS below;
   the shelf, the compare table, the product page and the cart all read from them.
   In the Shopify theme these become product objects and this file shrinks to the cart and the option pickers. */
(() => {
  'use strict';

  const PHOTO = 'assets/photos/';
  const PHONE = '561-222-7641';
  const TEL = 'tel:+15612227641';
  const EMAIL = 'info@securedsafetysolutions.com';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const money = n => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Products ---------- */
  const BASE = [['CAT Tourniquet', '1'], ['QuikClot', '1'], ['HyFin Chest Seal', '2'], ['Compressed Gauze', '1'], ['Pressure Dressing', '1'], ['ABD (army battle dressing) Pad', '1'], ['Gauze Roll', '2'], ['Burn Gel', '1'], ['Foil Blanket', '1'], ['Gloves', '2 pair'], ['Shears', '1'], ['Pen Light', '1']];
  const HARD_CASE = 'Sealed hard case built to keep out water, salt, dust and impact.';

  const KITS = {
    '11': {
      name: '11" Trauma Box', code: 'SSS-11', price: 216.58, photo: 'case-orange.jpg', length: '11 in',
      short: 'Fits a boat console, truck or gear bag.',
      pitch: 'Compact, tough, and ready. Built for boats, trucks, and everyday carry.',
      desc: 'The practical everyday size. Big enough for a solid trauma loadout, small enough to fit a boat console, truck or gear bag without taking over the space. It keeps your critical supplies sealed, dry and organized.',
      caseType: 'Hard case, orange or beige', caseShort: 'Sealed hard case',
      colors: [{ id: 'Orange', chip: 'c-orange', photo: 'case-orange.jpg' }, { id: 'Beige', chip: 'c-beige', photo: 'case-tan.jpg' }],
      gallery: ['case-1550a.jpg', 'tourniquet-cat.jpg', 'chest-seal.jpg'], whyTitle: 'Why this size',
      why: ['Compact footprint that fits where larger cases will not', 'Tough hard case that seals out water, salt, dust and impact', 'Organized inside, so you grab what you need fast under stress', 'The right balance of capacity and portability'],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits', 'Range bags and outdoor sports', 'Anyone who wants a kit that stays out of the way until it is needed'],
      same: 'Same supplies as the IFAK. The difference is the case: this one is a sealed hard box for the boat or truck.',
      water: HARD_CASE, contents: BASE
    },
    '13': {
      name: '13" Trauma Box', code: 'SSS-13', price: 375.00, photo: 'case-tan.jpg', length: '13 in',
      short: 'More room than the 11", still easy to store.',
      pitch: 'The sweet spot. More room than the 11", still easy to store.',
      desc: 'The practical middle ground. Enough extra space for a fuller trauma loadout without the bulk of the 16", and still compact enough for boat consoles, trucks and gear areas.',
      caseType: 'Hard case', caseShort: 'Sealed hard case',
      gallery: ['case-1550a.jpg', 'tourniquet-cat.jpg', 'chest-seal.jpg'], whyTitle: 'Why this size',
      why: ['More room than the 11" for extra supplies or better organization', 'Still compact enough to fit where the 16" is too big', 'Tough hard case that seals out water, salt, dust and impact', 'Clear layout, so you grab what you need fast'],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits that need more capacity', 'Range bags and outdoor setups', 'A step up from the 11" without going to the 16"'],
      water: HARD_CASE,
      contents: [['CAT Tourniquet', '2'], ['QuikClot', '2'], ['HyFin Chest Seal', '4'], ['Compressed Gauze', '2'], ['Pressure Dressing', '2'], ['ABD (army battle dressing) Pad', '2'], ['Gauze Roll', '3'], ['Burn Gel', '2'], ['Foil Blanket', '2'], ['Gloves', '2 pair'], ['Shears', '1'], ['Pen Light', '1']]
    },
    '16': {
      name: '16" Trauma Box', code: 'SSS-16', price: 638.14, photo: 'case-1550a.jpg', length: '16 in',
      short: 'For bigger boats, vehicles and team kits.',
      pitch: 'More space. Same protection. Built for bigger boats, vehicles and team kits.',
      desc: 'Extra room for a fuller loadout, multi-person kits or bulk supplies, kept sealed, dry and organized. The larger option for offshore boats, trucks, range carts and team gear.',
      caseType: 'Hard case', caseShort: 'Sealed hard case',
      gallery: ['case-tan.jpg', 'tourniquet-cat.jpg', 'chest-seal.jpg'], whyTitle: 'Why this size',
      why: ['Extra space for more supplies, multi-person kits or bulk items', 'Tough hard case that seals out water, salt, dust and impact', 'Still compact enough for a boat console, vehicle or gear area', 'Clear organization, so you reach what you need fast'],
      ideal: ['Larger offshore and sportfishing boats', 'Vehicle and range kits that need more capacity', 'Team or department use', 'A step up in space from the 13" box'],
      water: HARD_CASE,
      contents: [['CAT Tourniquet', '4'], ['QuikClot', '4'], ['HyFin Chest Seal', '4 two-packs'], ['Compressed Gauze', '4'], ['4" Pressure Bandage', '4'], ['ABD Pad', '8'], ['3" Gauze Roll', '8'], ['Multi-Trauma Dressing', '2'], ['Burn Gel', '8'], ['Foil Blanket', '2'], ['Gloves', '2 two-packs'], ['Shears', '1'], ['Pen Light', '1']]
    },
    'ifak': {
      name: 'IFAK', code: 'SSS-IFAK', price: 178.63, photo: 'trauma-pak.jpg', length: '',
      short: 'Wearable. Rides on your belt, vest or bag.',
      pitch: 'Compact, wearable, and built for when you need it on you.',
      desc: 'The individual first aid kit. A grab-and-go trauma kit that stays on your belt, vest or bag, sized for personal carry while still holding the bleeding-control supplies you need when help is delayed.',
      caseType: 'Wearable pouch', caseShort: 'Wearable pouch',
      gallery: ['tourniquet-cat.jpg', 'chest-seal.jpg', 'case-1550a.jpg'], whyTitle: 'Why this kit',
      why: ['Compact and wearable, so it is always with you', 'Organized for fast access under stress', 'Built around quality items for controlling major bleeding', 'Light enough for all-day carry without getting in the way'],
      ideal: ['Offshore and inshore fishing', 'Hunting, range days and outdoor sports', 'A backup kit for the boat or vehicle', 'Anyone who wants a serious trauma kit that stays on them'],
      same: 'Same supplies as the 11" Trauma Box. The difference is the case: this one rides on your belt, vest or bag.',
      water: 'A wearable pouch, not a sealed hard case. For a kit that lives on deck or in a truck bed, choose a hard-case box.',
      contents: BASE
    }
  };
  const ORDER = ['11', '13', '16', 'ifak'];
  const SIZE_LABEL = { '11': '11"', '13': '13"', '16': '16"', 'ifak': 'IFAK' };
  const itemCount = k => k.contents.reduce((n, c) => n + (parseInt(c[1], 10) || 0), 0);
  const kitUrl = id => 'product.html?kit=' + id;

  /* The class is one product; its dates are the options. */
  const CLASS = {
    name: '8-hour trauma class', price: 225.00, photo: 'class-application.jpg',
    hours: '0800 to 1600', hoursPlain: '8 AM to 4 PM',
    sessions: [['2026-12-05', 'Port St. Lucie'], ['2026-12-19', 'Treasure Coast'], ['2027-01-16', 'Port St. Lucie'], ['2027-01-23', 'Treasure Coast'], ['2027-02-13', 'Port St. Lucie'], ['2027-03-06', 'Port St. Lucie']]
  };
  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const milDate = iso => {
    const [y, m, d] = iso.split('-').map(Number);
    return DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ' ' + String(d).padStart(2, '0') + ' ' + MONTHS[m - 1] + ' ' + String(y).slice(2);
  };
  const sessionLabel = s => milDate(s[0]) + ', ' + s[1];

  const product = id => id === 'class'
    ? { name: CLASS.name, price: CLASS.price, photo: CLASS.photo, url: 'classes.html' }
    : KITS[id] && { name: KITS[id].name, price: KITS[id].price, photo: KITS[id].photo, url: kitUrl(id) };

  /* ---------- Header, footer ---------- */
  const NAV = [['kits.html', 'Trauma Kits', 'kits'], ['classes.html', 'Classes', 'classes'], ['dealers.html', 'Departments & Dealers', 'dealers'], ['about.html', 'About', 'about'], ['faq.html', 'FAQ', 'faq'], ['contact.html', 'Contact', 'contact']];
  const page = document.body.dataset.page;
  const mark = window.SSS_MARK || '';
  const navItems = NAV.map(([href, label, id]) => '<li><a href="' + href + '"' + (id === page || (id === 'kits' && page === 'product') ? ' aria-current="page"' : '') + '>' + esc(label) + '</a></li>').join('');

  const header = $('[data-site-header]');
  if (header) {
    const next = CLASS.sessions[0];
    header.insertAdjacentHTML('beforebegin',
      '<div class="announce on-navy"><div class="wrap"><span>Next trauma class <span class="mono">' + milDate(next[0]) + '</span> in ' + next[1] + ' <span class="mark-note">[Sample date]</span></span><a href="classes.html">Reserve a seat</a></div></div>');
    header.innerHTML =
      '<div class="wrap bar">' +
        '<a class="brand" href="index.html" aria-label="Secured Safety Solutions, home">' + mark + '<span class="brand-name"><span>Secured Safety</span><span>Solutions</span></span></a>' +
        '<nav class="nav" aria-label="Main"><ul>' + navItems + '</ul></nav>' +
        '<div class="tools">' +
          '<a class="phone" href="' + TEL + '"><i class="ph ph-phone" aria-hidden="true"></i>' + PHONE + '</a>' +
          '<button class="icon-btn" type="button" data-cart-open aria-haspopup="dialog"><i class="ph ph-shopping-cart-simple" aria-hidden="true"></i><span class="cart-word">Cart</span><span class="cart-count" data-cart-count hidden></span></button>' +
          '<button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="site-menu"><i class="ph ph-list" aria-hidden="true"></i><span class="vh">Menu</span></button>' +
        '</div>' +
      '</div>' +
      '<div class="menu" id="site-menu" hidden><nav class="wrap" aria-label="Main, mobile"><ul>' + navItems + '<li><a href="' + TEL + '">Call ' + PHONE + '</a></li></ul></nav></div>';
    header.insertAdjacentHTML('afterend',
      '<div class="trust"><div class="wrap"><ul><li>Built by active SWAT medics and fire captains</li><li>Sealed hard cases for boat, truck and field</li><li>Hands-on trauma classes in Port St. Lucie</li></ul></div></div>');

    const menuBtn = $('.menu-btn', header), menu = $('#site-menu');
    const setMenu = open => {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      $('i', menuBtn).className = 'ph ' + (open ? 'ph-x' : 'ph-list');
    };
    menuBtn.addEventListener('click', () => setMenu(menu.hidden));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  const footer = $('[data-site-footer]');
  if (footer) {
    footer.innerHTML =
      '<div class="wrap foot on-navy">' +
        '<div class="foot-brand">' + mark + '<p>Prepared.<br>Tactical.<br>Proven.</p></div>' +
        '<div><h2>Shop</h2><ul>' + ORDER.map(id => '<li><a href="' + kitUrl(id) + '">' + esc(KITS[id].name) + '</a></li>').join('') + '<li><a href="classes.html">8-hour trauma class</a></li><li><a href="kits.html#compare">Compare kits</a></li></ul></div>' +
        '<div><h2>Company</h2><ul><li><a href="about.html">About</a></li><li><a href="dealers.html">Departments &amp; Dealers</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
        '<div><h2>Reach us</h2><ul><li><a class="mono" href="' + TEL + '">' + PHONE + '</a></li><li><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li><li>Port St. Lucie, Florida</li><li>Social [Links to confirm]</li></ul></div>' +
        '<form class="foot-news" data-form novalidate data-done="You are on the list. We will email you when new dates are posted."><h2>Class dates by email</h2><p>We will email you when new class dates and refresher courses are posted.</p>' +
          '<div class="field"><label for="foot-email">Email</label><div class="row"><input id="foot-email" name="email" type="email" autocomplete="email" required data-err="Enter your email address."><button class="btn btn-white" type="submit">Sign up</button></div></div><p data-status role="status"></p></form>' +
      '</div>' +
      '<div class="wrap foot-base"><span>&copy; 2026 Secured Safety Solutions</span><span>Port St. Lucie, Florida</span></div>';
  }

  /* ---------- Cart ---------- */
  const STORE = 'sss-version3-cart';
  let cart = [];
  try { cart = (JSON.parse(localStorage.getItem(STORE)) || []).filter(i => product(i.id) && i.qty > 0); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(cart)); } catch (e) { /* private mode: the cart lasts for this page only */ } };

  document.body.insertAdjacentHTML('beforeend',
    '<div class="scrim" data-cart-close hidden></div>' +
    '<aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1">' +
      '<div class="drawer-head"><h2 class="sub" id="cart-title">Your cart</h2><button class="icon-btn" type="button" data-cart-close><i class="ph ph-x" aria-hidden="true"></i><span class="vh">Close cart</span></button></div>' +
      '<div class="drawer-body" data-cart-body></div>' +
      '<div class="drawer-foot" data-cart-foot></div>' +
    '</aside>');
  const drawer = $('#cart-drawer'), scrim = $('.scrim');
  let lastFocus = null;

  const renderCart = () => {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    $$('[data-cart-count]').forEach(el => { el.textContent = count; el.hidden = !count; });
    $$('[data-cart-open]').forEach(el => el.setAttribute('aria-label', 'Cart, ' + count + (count === 1 ? ' item' : ' items')));
    const body = $('[data-cart-body]'), foot = $('[data-cart-foot]');
    if (!count) {
      body.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a class="btn" href="kits.html">Shop trauma kits</a></div>';
      foot.hidden = true;
      return;
    }
    body.innerHTML = '<ul>' + cart.map((i, n) => {
      const p = product(i.id);
      return '<li class="line-item"><img src="' + PHOTO + p.photo + '" alt="" width="72" height="72">' +
        '<a class="li-name" href="' + p.url + '">' + esc(p.name) + '</a><span class="price">' + money(p.price * i.qty) + '</span>' +
        '<span class="li-var' + (i.id === 'class' ? ' mono' : '') + '">' + esc(i.variant || '') + '</span>' +
        '<div class="li-ctl"><div class="qty qty-small"><button type="button" data-step="-1" data-i="' + n + '" aria-label="One fewer ' + esc(p.name) + '"><i class="ph ph-minus" aria-hidden="true"></i></button><output aria-label="Quantity">' + i.qty + '</output><button type="button" data-step="1" data-i="' + n + '" aria-label="One more ' + esc(p.name) + '"><i class="ph ph-plus" aria-hidden="true"></i></button></div>' +
        '<button class="link-btn" type="button" data-drop="' + n + '">Remove<span class="vh"> ' + esc(p.name) + '</span></button></div></li>';
    }).join('') + '</ul>';
    foot.hidden = false;
    foot.innerHTML = '<p class="subtotal"><span>Subtotal</span><span class="price">' + money(cart.reduce((n, i) => n + product(i.id).price * i.qty, 0)) + '</span></p>' +
      '<p class="note">Shipping and tax at checkout. [Shipping details to confirm]</p>' +
      '<button class="btn btn-wide" type="button" data-checkout>Checkout</button><p data-checkout-status role="status"></p>';
  };

  const openCart = () => {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    drawer.classList.add('open');
    drawer.focus();
  };
  const closeCart = () => {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    scrim.hidden = true;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  };
  const addToCart = (id, variant, qty) => {
    if (!product(id)) return;
    const found = cart.find(i => i.id === id && i.variant === variant);
    if (found) found.qty = Math.min(20, found.qty + qty); else cart.push({ id, variant, qty });
    save(); renderCart(); openCart();
  };

  drawer.addEventListener('keydown', e => {
    if (e.key === 'Escape') return closeCart();
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled])', drawer);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-cart-open], [data-cart-close], [data-step], [data-drop], [data-checkout], [data-add]');
    if (!t) return;
    if (t.matches('[data-cart-open]')) return openCart();
    if (t.matches('[data-cart-close]')) return closeCart();
    if (t.matches('[data-checkout]')) { $('[data-checkout-status]').textContent = 'Checkout opens in the Shopify store once the site is live.'; return; }
    if (t.matches('[data-add]')) {
      /* data-add="11|13|16|ifak|class". The option and quantity come from controls inside the nearest [data-buy] block. */
      const box = t.closest('[data-buy]') || t;
      const pick = $('[data-variant]:checked, select[data-variant]', box);
      const qty = $('[data-qty]', box);
      return addToCart(t.dataset.add, pick ? pick.value : (t.dataset.variant || ''), qty ? Math.max(1, Math.min(20, parseInt(qty.value, 10) || 1)) : 1);
    }
    const n = Number(t.dataset.i ?? t.dataset.drop);
    if (t.matches('[data-drop]')) cart.splice(n, 1);
    else { cart[n].qty = Math.min(20, cart[n].qty + Number(t.dataset.step)); if (cart[n].qty < 1) cart.splice(n, 1); }
    save(); renderCart();
    (drawer.querySelector('[data-i="' + Math.min(n, cart.length - 1) + '"][data-step="' + (t.dataset.step || '1') + '"]') || drawer).focus();
  });

  /* Quantity steppers outside the cart */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-qty-step]');
    if (!b) return;
    const input = $('[data-qty]', b.parentElement);
    input.value = Math.max(1, Math.min(20, (parseInt(input.value, 10) || 1) + Number(b.dataset.qtyStep)));
  });
  const stepper = label => '<div class="qty"><button type="button" data-qty-step="-1" aria-label="One fewer"><i class="ph ph-minus" aria-hidden="true"></i></button><input data-qty type="number" inputmode="numeric" min="1" max="20" value="1" aria-label="' + label + '"><button type="button" data-qty-step="1" aria-label="One more"><i class="ph ph-plus" aria-hidden="true"></i></button></div>';

  /* ---------- Small fills: shelf tags and prices ---------- */
  $$('[data-tag]').forEach(el => { const p = product(el.dataset.tag); el.innerHTML = esc(p.name) + ' <span class="mono">' + money(p.price) + '</span>'; });
  $$('[data-price]').forEach(el => { el.textContent = money(product(el.dataset.price).price); });
  $$('select[data-sessions]').forEach(el => { el.innerHTML = CLASS.sessions.map(s => '<option>' + sessionLabel(s) + '</option>').join(''); });

  /* ---------- The shelf ---------- */
  const count = (k, name) => (k.contents.find(c => c[0].includes(name)) || ['', '0'])[1];
  const addButton = (id, cls) => '<button class="btn ' + cls + '" type="button" data-add="' + id + '"' + (KITS[id].colors ? ' data-variant="' + KITS[id].colors[0].id + '"' : '') + '>Add to cart<span class="vh">, ' + esc(KITS[id].name) + '</span></button>';
  $$('[data-shelf]').forEach(el => {
    el.innerHTML = ORDER.map(id => {
      const k = KITS[id];
      return '<li class="kit">' +
        '<a class="kit-photo" href="' + kitUrl(id) + '" tabindex="-1" aria-hidden="true"><img src="' + PHOTO + k.photo + '" alt="" loading="lazy" width="640" height="480"></a>' +
        '<h3><a href="' + kitUrl(id) + '">' + esc(k.name) + '</a></h3><p>' + esc(k.short) + '</p>' +
        '<dl><div><dt>Case</dt><dd>' + k.caseShort + '</dd></div><div><dt>CAT tourniquets</dt><dd>' + count(k, 'Tourniquet') + '</dd></div><div><dt>Chest seals</dt><dd>' + count(k, 'Chest Seal') + '</dd></div><div><dt>Items in the kit</dt><dd>' + itemCount(k) + '</dd></div></dl>' +
        '<div class="kit-buy"><span class="price">' + money(k.price) + '</span>' + addButton(id, 'btn-small') + '</div></li>';
    }).join('');
  });

  /* ---------- Compare table: kits are the columns ---------- */
  const ROWS = [
    ['CAT Tourniquet'], ['QuikClot'], ['HyFin Chest Seal'], ['Compressed Gauze'],
    ['Pressure Dressing', '4" Pressure Bandage'], ['ABD (army battle dressing) Pad', 'ABD Pad'], ['Gauze Roll', '3" Gauze Roll'],
    ['Multi-Trauma Dressing'], ['Burn Gel'], ['Foil Blanket'], ['Gloves'], ['Shears'], ['Pen Light']
  ];
  $$('[data-compare]').forEach(el => {
    const cell = (k, names) => {
      const c = k.contents.find(x => names.includes(x[0]));
      if (!c) return '<td class="none">Not included</td>';
      return '<td>' + esc(c[1]) + (c[0] !== names[0] ? ' <small>(' + esc(c[0]) + ')</small>' : '') + '</td>';
    };
    const row = (label, fn, cls) => '<tr' + (cls ? ' class="' + cls + '"' : '') + '><th scope="row">' + label + '</th>' + ORDER.map(id => fn(KITS[id], id)).join('') + '</tr>';
    el.innerHTML = '<table class="compare"><caption class="vh">The four kits compared, one column each</caption>' +
      '<thead><tr><td><span class="vh">Kit</span></td>' + ORDER.map(id => '<th scope="col"><img src="' + PHOTO + KITS[id].photo + '" alt="" loading="lazy" width="320" height="240"><a href="' + kitUrl(id) + '">' + esc(KITS[id].name) + '</a><span class="price">' + money(KITS[id].price) + '</span>' + addButton(id, 'btn-small btn-wide') + '</th>').join('') + '</tr></thead><tbody>' +
      row('Case', k => '<td>' + k.caseShort + '</td>') +
      row('Case length', k => '<td' + (k.length ? ' class="mono">' + k.length : '>Worn, not stowed') + '</td>') +
      row('Where it lives', (k, id) => '<td>' + { '11': 'Boat console, truck, gear bag', '13': 'Boat console, truck, gear area', '16': 'Bigger boats, vehicles, team gear', 'ifak': 'Belt, vest or bag' }[id] + '</td>') +
      '<tr class="group"><th scope="rowgroup">Supplies</th><td colspan="4"></td></tr>' +
      ROWS.map(names => row(esc(names[0]), k => cell(k, names))).join('') +
      row('Items in the kit', k => '<td>' + itemCount(k) + '</td>', 'total') +
      row('Price', k => '<td class="mono">' + money(k.price) + '</td>') +
      '</tbody></table>';
  });

  /* ---------- Class dates as product options ---------- */
  $$('[data-dates]').forEach((el, n) => {
    const list = CLASS.sessions.slice(0, Number(el.dataset.dates) || CLASS.sessions.length);
    el.innerHTML = list.map((s, i) => '<input class="vh" type="radio" name="session-' + n + '" id="session-' + n + '-' + i + '" data-variant value="' + sessionLabel(s) + '"' + (i ? '' : ' checked') + '><label class="opt" for="session-' + n + '-' + i + '"><span class="mono">' + milDate(s[0]) + '</span><small>' + s[1] + '</small></label>').join('');
  });

  /* ---------- Gallery: thumbnails swap the main photo ---------- */
  const showShot = (gallery, src) => {
    $('[data-shot]', gallery).src = src;
    $$('[data-thumb]', gallery).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.thumb === src)));
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-thumb]');
    if (b) showShot(b.closest('[data-gallery]'), b.dataset.thumb);
  });
  const gallery = (shots, alt) => '<div class="gallery" data-gallery><div class="gallery-main"><img data-shot src="' + PHOTO + shots[0] + '" alt="' + esc(alt) + '" width="1280" height="960"></div>' +
    '<div class="thumbs">' + shots.map((s, i) => '<button type="button" data-thumb="' + PHOTO + s + '" aria-pressed="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + ' of ' + shots.length + '"><img src="' + PHOTO + s + '" alt="" width="76" height="76"></button>').join('') + '</div></div>';
  $$('[data-gallery-shots]').forEach(el => { el.outerHTML = gallery(el.dataset.galleryShots.split(','), el.dataset.alt); });

  /* ---------- Product page: product.html?kit=11|13|16|ifak ---------- */
  const main = $('[data-product]');
  if (main) {
    const q = new URLSearchParams(location.search).get('kit');
    const id = ORDER.includes(q) ? q : '11';
    const k = KITS[id];
    const box = id !== 'ifak';
    document.title = k.name.replace('"', ' inch') + ' | Secured Safety Solutions';
    const shots = [...new Set([k.photo, ...(k.colors || []).map(c => c.photo), ...k.gallery])];
    const ticks = a => '<ul class="ticks">' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    const spec = (a, b) => '<tr><th scope="row">' + a + '</th><td>' + b + '</td></tr>';

    main.innerHTML =
      '<div class="wrap">' +
        '<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="kits.html">Trauma Kits</a></li><li aria-current="page">' + esc(k.name) + '</li></ol></nav>' +
        '<div class="pdp">' + gallery(shots, k.name) +
          '<div class="buy" data-buy>' +
            '<h1>' + esc(k.name) + '</h1>' +
            '<p class="buy-meta">Kit code <span class="mono">' + k.code + '</span>. ' + itemCount(k) + ' items.</p>' +
            '<p class="buy-price">' + money(k.price) + '</p>' +
            '<p class="buy-pitch">' + esc(k.pitch) + '</p>' +
            '<div class="buy-group"><span class="label" id="size-label">Size</span><div class="opts" role="group" aria-labelledby="size-label">' +
              ORDER.map(o => '<a class="opt" href="' + kitUrl(o) + '"' + (o === id ? ' aria-current="true"' : '') + '><span>' + SIZE_LABEL[o] + '</span><small class="mono">' + money(KITS[o].price) + '</small></a>').join('') + '</div></div>' +
            (k.colors ? '<fieldset class="buy-group"><legend>Color <span>[To confirm]</span></legend><div class="opts">' +
              k.colors.map((c, i) => '<input class="vh" type="radio" name="color" id="color-' + i + '" data-variant data-photo="' + PHOTO + c.photo + '" value="' + c.id + '"' + (i ? '' : ' checked') + '><label class="opt opt-swatch" for="color-' + i + '"><i class="' + c.chip + '" aria-hidden="true"></i>' + c.id + '</label>').join('') + '</div></fieldset>' : '') +
            '<div class="buy-row">' + stepper('Quantity') + '<button class="btn" type="button" data-add="' + id + '">Add to cart</button></div>' +
            '<ul class="buy-notes"><li>Ships from Port St. Lucie, Florida. [Shipping details to confirm]</li><li>' + esc(k.water) + '</li><li>Buying for a team, fleet or store? <a href="dealers.html">Ask for multi-kit or department pricing</a></li></ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<section class="section wrap"><div class="detail">' +
        '<div><h2 class="head">About this kit</h2><div class="prose"><p>' + esc(k.desc) + '</p><p>Packed with purpose-built trauma supplies chosen by working SWAT medics and fire captains. Ready out of the box. Open, grab, and work.</p></div>' +
          '<h3 class="sub">' + k.whyTitle + '</h3>' + ticks(k.why) + '<h3 class="sub">Ideal for</h3>' + ticks(k.ideal) + '</div>' +
        '<div><h2 class="head">What is inside</h2>' +
          '<table class="table"><thead><tr><th scope="col">Item</th><th scope="col">Count</th></tr></thead><tbody>' + k.contents.map(c => '<tr><th scope="row">' + esc(c[0]) + '</th><td>' + esc(c[1]) + '</td></tr>').join('') + '<tr><th scope="row"><strong>Items in the kit</strong></th><td>' + itemCount(k) + '</td></tr></tbody></table>' +
          '<div class="note stack">' + (k.same ? '<p>' + esc(k.same) + '</p>' : '') + '<p>Each pack or pair counted as one. Genuine CAT tourniquets, sourced from authorized dealers. [To confirm]</p>' + (box ? '<p>A code inside the lid links to how-to videos. [Idea, to confirm]</p>' : '') + '</div>' +
          '<h3 class="sub">Specifications</h3><table class="table specs"><tbody>' +
            spec('Kit code', '<span class="mono">' + k.code + '</span>') + spec('Case', k.caseType) + (box ? spec('Case length', '<span class="mono">' + k.length + '</span>') : '') +
            spec('Weight', '[To confirm]') + spec('Water rating', box ? '[Rating to confirm]' : 'Not a sealed case') + spec('Colors', '[To confirm]') +
            spec('Items in the kit', itemCount(k)) + spec('Price', '<span class="mono">' + money(k.price) + '</span>') + spec('Ships from', 'Port St. Lucie, FL') +
          '</tbody></table></div>' +
      '</div></section>' +
      '<section class="section-tight wrap"><div class="addon" data-buy><img src="' + PHOTO + CLASS.photo + '" alt="" loading="lazy" width="320" height="320">' +
        '<div><h2 class="sub">Add the 8-hour trauma class</h2><p>Know how to use what you carry. Hands-on and in person, taught by the medics who build the kits. <span class="price">' + money(CLASS.price) + '</span> a seat. [Bundle price to confirm]</p></div>' +
        '<div class="addon-buy"><label for="addon-date">Class date [Sample dates]</label><select id="addon-date" data-variant>' + CLASS.sessions.map(s => '<option>' + sessionLabel(s) + '</option>').join('') + '</select><button class="btn btn-navy" type="button" data-add="class">Add a seat</button></div></div></section>' +
      '<section class="section wrap"><div class="head-row"><h2 class="head">Other kits</h2><a class="more" href="kits.html#compare">Compare all four<i class="ph ph-arrow-right" aria-hidden="true"></i></a></div><div class="others">' +
        ORDER.filter(o => o !== id).map(o => '<a href="' + kitUrl(o) + '"><img src="' + PHOTO + KITS[o].photo + '" alt="" loading="lazy" width="64" height="64"><span><strong>' + esc(KITS[o].name) + '</strong><span>' + esc(KITS[o].short) + '</span></span><span class="price">' + money(KITS[o].price) + '</span></a>').join('') + '</div></section>';

    main.addEventListener('change', e => { if (e.target.name === 'color') showShot($('[data-gallery]', main), e.target.dataset.photo); });
  }

  /* ---------- Forms: checked here, with messages in words ---------- */
  $$('form[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    $$('.err', form).forEach(x => x.remove());
    let first = null;
    $$('input, select, textarea', form).forEach(f => {
      if (f.checkValidity()) { f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); return; }
      const p = document.createElement('p');
      p.className = 'err'; p.id = f.id + '-err'; p.textContent = f.dataset.err || 'Check this field.';
      f.closest('.field').append(p);
      f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', p.id);
      first = first || f;
    });
    const status = $('[data-status]', form);
    if (first) { status.textContent = ''; first.focus(); return; }
    status.textContent = form.dataset.done;
    form.reset();
  }));

  /* ---------- FAQ search ---------- */
  const search = $('[data-faq-search]');
  if (search) search.addEventListener('input', () => {
    const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    $$('.faq-group').forEach(g => {
      let any = false;
      $$('details', g).forEach(d => { const hit = words.every(w => d.textContent.toLowerCase().includes(w)); d.hidden = !hit; any = any || hit; shown += hit; });
      g.hidden = !any;
    });
    $('[data-faq-none]').hidden = shown > 0;
  });

  /* ---------- Static hooks: the still mark, and quantity steppers in page markup ---------- */
  $$('[data-mark]').forEach(el => { el.innerHTML = mark; });
  $$('[data-stepper]').forEach(el => { el.outerHTML = stepper(el.dataset.stepper); });

  renderCart();
})();
