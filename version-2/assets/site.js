/* Secured Safety Solutions, version 2 "Dark tactical".
   Plain JS, no build step. KITS and SESSIONS are the only data; every component
   renders from them, so the pages map onto Shopify products and variants later. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const tbc = t => `<span class="tbc">[${t}]</span>`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const page = body.dataset.page || '';
  const asked = new URLSearchParams(location.search).get('kit');

  /* ---------- Data ---------- */

  const PHONE = '561-222-7641';
  const TEL = 'tel:+15612227641';
  const EMAIL = 'info@securedsafetysolutions.com';
  const LAT = 27.2730;
  const LON = 80.3582;
  const LAT_TEXT = '27.2730° N';
  const LON_TEXT = '80.3582° W';
  const PHOTO = 'assets/photos/';

  const BASE = [
    ['CAT Tourniquet', '1'], ['QuikClot', '1'], ['HyFin Chest Seal', '2'], ['Compressed Gauze', '1'],
    ['Pressure Dressing', '1'], ['ABD (army battle dressing) Pad', '1'], ['Gauze Roll', '2'], ['Burn Gel', '1'],
    ['Foil Blanket', '1'], ['Gloves', '2 pair'], ['Shears', '1'], ['Pen Light', '1']
  ];
  const HARD_CASE = 'Sealed hard case built to keep out water, salt, dust and impact.';

  /* photo: replace the four kit-*.jpg files with real product photos, one for one.
     Shoot each box square on and filling the frame, so the ruler under it stays true.
     len is the case length in inches; the IFAK has none until its size is confirmed. */
  const KITS = {
    '11': {
      name: '11" Trauma Box', size: '11"', code: 'SSS-11', price: 216.58, len: 11,
      photo: 'kit-11.jpg', w: 1200, h: 800,
      who: 'For boats, trucks and everyday carry.',
      pitch: 'Compact, tough, and ready. Built for boats, trucks, and everyday carry.',
      desc: 'The practical everyday size. Big enough for a solid trauma loadout, small enough to fit a boat console, truck or gear bag without taking over the space. It keeps your critical supplies sealed, dry and organized.',
      caseType: '11" hard case', colors: ['Orange', 'Beige'], whyTitle: 'Why this size works',
      why: ['Compact footprint that fits where larger cases will not', 'Tough hard case that seals out water, salt, dust and impact', 'Organized inside, so you grab what you need fast under stress', 'The right balance of capacity and portability'],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits', 'Range bags and outdoor sports', 'Anyone who wants a kit that stays out of the way until it is needed'],
      same: 'Same supplies as the IFAK. The difference is the case: this one is a sealed hard box for the boat or truck.',
      water: HARD_CASE, contents: BASE
    },
    '13': {
      name: '13" Trauma Box', size: '13"', code: 'SSS-13', price: 375.00, len: 13,
      photo: 'kit-13.jpg', w: 1200, h: 800,
      who: 'For boats and trucks that need more room.',
      pitch: 'The sweet spot. More room than the 11", still easy to store.',
      desc: 'The practical middle ground. Enough extra space for a fuller trauma loadout without the bulk of the 16", and still compact enough for boat consoles, trucks and gear areas.',
      caseType: '13" hard case', whyTitle: 'Why this size works',
      why: ['More room than the 11" for extra supplies or better organization', 'Still compact enough to fit where the 16" is too big', 'Tough hard case that seals out water, salt, dust and impact', 'Clear layout, so you grab what you need fast'],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits that need more capacity', 'Range bags and outdoor setups', 'A step up from the 11" without going to the 16"'],
      water: HARD_CASE,
      contents: [['CAT Tourniquet', '2'], ['QuikClot', '2'], ['HyFin Chest Seal', '4'], ['Compressed Gauze', '2'], ['Pressure Dressing', '2'], ['ABD (army battle dressing) Pad', '2'], ['Gauze Roll', '3'], ['Burn Gel', '2'], ['Foil Blanket', '2'], ['Gloves', '2 pair'], ['Shears', '1'], ['Pen Light', '1']]
    },
    '16': {
      name: '16" Trauma Box', size: '16"', code: 'SSS-16', price: 638.14, len: 16,
      photo: 'kit-16.jpg', w: 1200, h: 800,
      who: 'For bigger boats, vehicles and team kits.',
      pitch: 'More space. Same protection. Built for bigger boats, vehicles and team kits.',
      desc: 'Extra room for a fuller loadout, multi-person kits or bulk supplies, kept sealed, dry and organized. The larger option for offshore boats, trucks, range carts and team gear.',
      caseType: '16" hard case', whyTitle: 'Why this size works',
      why: ['Extra space for more supplies, multi-person kits or bulk items', 'Tough hard case that seals out water, salt, dust and impact', 'Still compact enough for a boat console, vehicle or gear area', 'Clear organization, so you reach what you need fast'],
      ideal: ['Larger offshore and sportfishing boats', 'Vehicle and range kits that need more capacity', 'Team or department use', 'A step up in space from the 13" box'],
      water: HARD_CASE,
      contents: [['CAT Tourniquet', '4'], ['QuikClot', '4'], ['HyFin Chest Seal', '4 two-packs'], ['Compressed Gauze', '4'], ['4" Pressure Bandage', '4'], ['ABD Pad', '8'], ['3" Gauze Roll', '8'], ['Multi-Trauma Dressing', '2'], ['Burn Gel', '8'], ['Foil Blanket', '2'], ['Gloves', '2 two-packs'], ['Shears', '1'], ['Pen Light', '1']]
    },
    'ifak': {
      name: 'IFAK', size: 'IFAK', code: 'SSS-IFAK', price: 178.63, len: 0,
      photo: 'kit-ifak.jpg', w: 900, h: 1200,
      who: 'For your belt, vest or bag.',
      pitch: 'Compact, wearable, and built for when you need it on you.',
      desc: 'The individual first aid kit. A grab-and-go trauma kit that stays on your belt, vest or bag, sized for personal carry while still holding the bleeding-control supplies you need when help is delayed.',
      caseType: 'Wearable pouch', whyTitle: 'Why this kit works',
      why: ['Compact and wearable, so it is always with you', 'Organized for fast access under stress', 'Built around quality items for controlling major bleeding', 'Light enough for all-day carry without getting in the way'],
      ideal: ['Offshore and inshore fishing', 'Hunting, range days and outdoor sports', 'A backup kit for the boat or vehicle', 'Anyone who wants a serious trauma kit that stays on them'],
      same: 'Same supplies as the 11" Trauma Box. The difference is the case: this one rides on your belt, vest or bag.',
      water: 'A wearable pouch, not a sealed hard case. For a kit that lives on deck or in a truck bed, choose a hard-case box.',
      contents: BASE
    }
  };
  const ORDER = ['11', '13', '16', 'ifak'];
  const BOARD_ORDER = ['ifak', '11', '13', '16'];
  const itemCount = k => k.contents.reduce((n, c) => n + (parseInt(c[1], 10) || 0), 0);
  const currentKit = page === 'product' ? (KITS[asked] ? asked : '11') : '';

  /* What each item treats. The pattern finds the item in a kit's contents;
     the optional map names a size variant so the count can say which one. */
  const LOADOUT = [
    ['Stop the bleeding', [
      ['CAT Tourniquet', /^CAT Tourniquet/],
      ['QuikClot', /^QuikClot/],
      ['Compressed Gauze', /^Compressed Gauze/],
      ['Pressure Dressing', /^(Pressure Dressing|4" Pressure Bandage)/, { '4" Pressure Bandage': '4" bandage' }],
      ['ABD Pad', /^ABD/],
      ['Gauze Roll', /^(Gauze Roll|3" Gauze Roll)/, { '3" Gauze Roll': '3" roll' }],
      ['Multi-Trauma Dressing', /^Multi-Trauma/]
    ]],
    ['Chest wounds', [['HyFin Chest Seal', /^HyFin/]]],
    ['Burns and shock', [['Burn Gel', /^Burn Gel/], ['Foil Blanket', /^Foil Blanket/]]],
    ['Tools', [['Gloves', /^Gloves/], ['Shears', /^Shears/], ['Pen Light', /^Pen Light/]]]
  ];

  /* Class sessions. Every date is a sample until the client confirms the calendar. */
  const CLASS = { name: '8-hour trauma class', price: 225.00, photo: 'responders-trauma-bag.jpg', time: '0800 to 1600' };
  const SESSIONS = [
    ['2026-12-05', 'Port St. Lucie'], ['2026-12-19', 'Treasure Coast'], ['2027-01-09', 'Port St. Lucie'],
    ['2027-01-23', 'Treasure Coast'], ['2027-02-06', 'Port St. Lucie'], ['2027-03-06', 'Port St. Lucie']
  ];
  const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const session = ([iso, where]) => {
    const [y, m, d] = iso.split('-').map(Number);
    const day = new Date(y, m - 1, d).getDay();
    return {
      where,
      mil: `${DAY[day].slice(0, 3)} ${String(d).padStart(2, '0')} ${MON[m - 1].slice(0, 3)} ${String(y).slice(2)}`.toUpperCase(),
      long: `${DAY[day]}, ${MON[m - 1]} ${d}, ${y}`
    };
  };

  /* ---------- Header, footer, cart drawer ---------- */

  const NAV = [['kits', 'kits.html', 'Kits'], ['classes', 'classes.html', 'Classes'], ['dealers', 'dealers.html', 'Departments &amp; Dealers'], ['about', 'about.html', 'About'], ['faq', 'faq.html', 'FAQ'], ['contact', 'contact.html', 'Contact']];
  const navLinks = NAV.map(([id, href, label]) => `<li><a href="${href}"${id === page || (id === 'kits' && page === 'product') ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  const brand = lazy => `
        <a class="brand" href="index.html" aria-label="Secured Safety Solutions, home">
          <img src="assets/eagle.svg" alt="" width="52" height="36"${lazy ? ' loading="lazy"' : ''}>
          <span class="brand__name"><span>Secured Safety</span> <span>Solutions</span></span>
        </a>`;

  const header = $('[data-site-header]');
  if (header) {
    header.className = 'bar';
    header.innerHTML = `
      <a class="skip" href="#main">Skip to content</a>
      <div class="bar__in">${brand(false)}
        <nav class="bar__nav" id="site-menu" aria-label="Main"><ul>${navLinks}</ul></nav>
        <button class="bar__btn cart-btn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="Cart, 0 items">
          <i class="ph ph-first-aid-kit" aria-hidden="true"></i><span class="cart-count" data-cart-count hidden>0</span>
        </button>
        <button class="bar__btn menu-btn" type="button" aria-expanded="false" aria-controls="site-menu">
          <i class="ph ph-list" aria-hidden="true"></i><span class="vh">Menu</span>
        </button>
      </div>`;
  }

  const footer = $('[data-site-footer]');
  if (footer) {
    footer.className = 'foot';
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot__top">
          <p class="foot__tag">Preparedness that saves lives.</p>
          <form class="form foot__signup" action="#" method="post" data-form="Thanks. You are on the list for new kits and class dates." data-empty="Enter your email address to sign up.">
            <label for="signup-email">Get new kits and class dates by email</label>
            <div class="form__inline">
              <input id="signup-email" name="email" type="email" autocomplete="email" required>
              <button class="btn btn--line" type="submit">Sign up</button>
            </div>
            <p class="form__status" role="status"></p>
          </form>
        </div>
        <div class="foot__mid">
          <ul class="foot__links">${ORDER.map(id => `<li><a href="product.html?kit=${id}">${esc(KITS[id].name)}</a></li>`).join('')}<li><a href="classes.html">8-hour trauma class</a></li></ul>
          <ul class="foot__links">${NAV.slice(2).map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
          <address class="foot__reach">
            <a href="${TEL}">${PHONE}</a>
            <a href="mailto:${EMAIL}">${EMAIL}</a>
            <span>Port St. Lucie, Florida</span>
          </address>
        </div>
        <div class="foot__base">${brand(true)}
          <p>${LAT_TEXT}, ${LON_TEXT}</p>
          <p>&copy; 2026 Secured Safety Solutions</p>
        </div>
      </div>`;
  }

  body.insertAdjacentHTML('beforeend', `
    <div class="scrim" hidden></div>
    <aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
      <div class="drawer__head">
        <h2 id="cart-title">Your cart</h2>
        <button class="bar__btn drawer__close" type="button"><i class="ph ph-x" aria-hidden="true"></i><span class="vh">Close cart</span></button>
      </div>
      <div class="drawer__body"></div>
      <div class="drawer__foot">
        <p class="drawer__sum"><span>Subtotal</span><span data-subtotal>$0.00</span></p>
        <p class="drawer__note">Shipping and tax at checkout.</p>
        <button class="btn btn--orange btn--block checkout" type="button">Checkout <i class="ph ph-arrow-right" aria-hidden="true"></i></button>
        <p class="drawer__status" role="status"></p>
      </div>
    </aside>`);

  /* ---------- Cart ---------- */

  const KEY = 'sss-version2-cart';
  const keep = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: the cart lasts for this page only */ } };
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(l => l && typeof l.price === 'number' && l.qty > 0);
  const saveCart = () => keep(KEY, JSON.stringify(cart));
  const itemFor = id => (id === 'class' ? CLASS : KITS[id] || null);

  const drawer = $('#cart-drawer');
  const scrim = $('.scrim');
  const menu = $('#site-menu');
  const menuBtn = $('.menu-btn');
  let lastFocus = null;
  let hideTimer = 0;
  const isOpen = () => drawer.classList.contains('is-open');
  const menuOpen = () => !!menu && menu.classList.contains('is-open');
  const setMenu = (open, focusBack) => {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    $('i', menuBtn).className = open ? 'ph ph-x' : 'ph ph-list';
    if (!open && focusBack) menuBtn.focus();
  };

  const renderCount = () => {
    const n = cart.reduce((s, l) => s + l.qty, 0);
    $$('[data-cart-count]').forEach(el => { el.textContent = n > 99 ? '99+' : String(n); el.hidden = n === 0; });
    $$('.cart-btn').forEach(b => b.setAttribute('aria-label', `Cart, ${n} ${n === 1 ? 'item' : 'items'}`));
  };

  const renderCart = () => {
    renderCount();
    const list = $('.drawer__body', drawer);
    $('[data-subtotal]', drawer).textContent = money(cart.reduce((s, l) => s + l.price * l.qty, 0));
    $('.checkout', drawer).disabled = !cart.length;
    $('.drawer__status', drawer).textContent = '';
    if (!cart.length) {
      list.innerHTML = '<div class="drawer__empty"><p>Your cart is empty.</p><a class="link" href="kits.html">See the kits <i class="ph ph-arrow-right" aria-hidden="true"></i></a></div>';
      return;
    }
    list.innerHTML = '<ul>' + cart.map((l, i) => `
      <li class="line">
        <img src="${PHOTO + esc(l.photo)}" alt="" width="72" height="72">
        <div class="line__main">
          <p class="line__name">${esc(l.name)}</p>
          ${l.variant ? `<p class="line__variant">${esc(l.variant)}</p>` : ''}
          <div class="line__ctrl">
            <div class="stepper stepper--sm" role="group" aria-label="Quantity, ${esc(l.name)}">
              <button type="button" data-step="-1" data-i="${i}" aria-label="One fewer"><i class="ph ph-minus" aria-hidden="true"></i></button>
              <output aria-live="polite">${l.qty}</output>
              <button type="button" data-step="1" data-i="${i}" aria-label="One more"><i class="ph ph-plus" aria-hidden="true"></i></button>
            </div>
            <button type="button" class="link link--btn" data-remove="${i}">Remove<span class="vh"> ${esc(l.name)}</span></button>
          </div>
        </div>
        <p class="line__price">${money(l.price * l.qty)}</p>
      </li>`).join('') + '</ul>';
  };

  const addToCart = (id, variant, qty) => {
    const item = itemFor(id);
    if (!item) return;
    const key = id + '|' + (variant || '');
    const line = cart.find(l => l.key === key);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else cart.push({ key, id, variant: variant || '', name: item.name, price: item.price, photo: item.photo, qty });
    saveCart();
    renderCart();
  };

  const focusables = () => $$('a[href], button:not([disabled])', drawer).filter(el => el.offsetParent !== null);
  const setCartExpanded = v => $$('.cart-btn').forEach(b => b.setAttribute('aria-expanded', String(v)));

  const openDrawer = () => {
    if (isOpen()) return;
    clearTimeout(hideTimer);
    lastFocus = document.activeElement;
    setMenu(false);
    drawer.hidden = false;
    scrim.hidden = false;
    void drawer.offsetWidth;
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
    setCartExpanded(true);
    $('.drawer__close', drawer).focus({ preventScroll: true });
  };
  const closeDrawer = () => {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    setCartExpanded(false);
    hideTimer = setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, reduced ? 0 : 280);
    if (lastFocus && lastFocus.isConnected && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    else { const b = $('.cart-btn'); if (b) b.focus(); }
  };

  scrim.addEventListener('click', closeDrawer);
  $('.drawer__close', drawer).addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e => {
    const step = e.target.closest('[data-step]');
    const rem = e.target.closest('[data-remove]');
    if (step) {
      const i = +step.dataset.i;
      const l = cart[i];
      if (!l) return;
      l.qty = Math.min(99, l.qty + (+step.dataset.step));
      if (l.qty < 1) cart.splice(i, 1);
      saveCart();
      renderCart();
      ($(`[data-i="${i}"][data-step="${step.dataset.step}"]`, drawer) || $('.drawer__close', drawer)).focus();
    } else if (rem) {
      cart.splice(+rem.dataset.remove, 1);
      saveCart();
      renderCart();
      $('.drawer__close', drawer).focus();
    }
  });
  $('.checkout', drawer).addEventListener('click', () => {
    $('.drawer__status', drawer).textContent = 'Online checkout is not open yet. To order, call 561-222-7641.';
  });
  drawer.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* A button names its variant, or reads it from a radio group (data-variant-from). */
  const readVariant = btn => {
    if (btn.dataset.variant) return btn.dataset.variant;
    const picked = btn.dataset.variantFrom && $(`input[name="${btn.dataset.variantFrom}"]:checked`);
    if (picked) return picked.value;
    const k = KITS[btn.dataset.add];
    return k && k.colors ? k.colors[0] : '';
  };
  const clampQty = v => Math.max(1, Math.min(99, parseInt(v, 10) || 1));
  const readQty = btn => {
    const el = btn.dataset.qtyFrom && $(btn.dataset.qtyFrom);
    return el ? clampQty(el.value) : 1;
  };

  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('.menu-btn')) { setMenu(!menuOpen()); return; }
    if (t.closest('.cart-btn')) { openDrawer(); return; }
    const add = t.closest('[data-add]');
    if (add) { addToCart(add.dataset.add, readVariant(add), readQty(add)); openDrawer(); return; }
    const step = t.closest('[data-qty-step]');
    if (step) {
      const input = $(step.dataset.qtyFor);
      if (input) input.value = clampQty(clampQty(input.value) + (+step.dataset.qtyStep));
      return;
    }
    if (menuOpen() && !t.closest('#site-menu')) setMenu(false);
  });
  document.addEventListener('change', e => { if (e.target.matches('[data-qty]')) e.target.value = clampQty(e.target.value); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (isOpen()) { closeDrawer(); return; }
    if (menuOpen()) setMenu(false, true);
  });

  /* ---------- The bench: kits at true relative length ---------- */

  const kitCard = (id, i) => {
    const k = KITS[id];
    const ruler = k.len
      ? `<p class="ruler" style="--i:${i}"><span class="ruler__line" aria-hidden="true"></span><span class="ruler__n">${k.len} in</span></p>`
      : `<p class="ruler ruler--none">Not to scale</p>`;
    return `
      <li class="kit${k.len ? '' : ' kit--pouch'}" style="--len:${k.len || 16}">
        <a class="kit__photo" href="product.html?kit=${id}" tabindex="-1" aria-hidden="true"><img src="${PHOTO + k.photo}" alt="" width="${k.w}" height="${k.h}" loading="lazy"></a>
        ${ruler}
        <div class="kit__body">
          <h3 class="kit__name"><a href="product.html?kit=${id}">${esc(k.name)}</a></h3>
          <p class="kit__who">${k.who}</p>
          <p class="kit__facts"><span class="kit__price">${money(k.price)}</span><span>${itemCount(k)} items</span></p>
          <button class="btn btn--line" type="button" data-add="${id}" aria-label="Add ${esc(k.name)} to cart">Add to cart</button>
        </div>
      </li>`;
  };

  $$('[data-lineup]').forEach(el => {
    el.innerHTML = ORDER.filter(id => id !== currentKit).map(kitCard).join('');
    /* The one entrance on the site: each ruler measures out once, when the bench first comes into view. */
    if (reduced || !('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
  });

  /* ---------- The loadout: every item by what it treats ---------- */

  const countCell = (kit, row) => {
    const c = kit.contents.find(x => row[1].test(x[0]));
    if (!c) return '<td role="cell" class="is-none"><span aria-hidden="true">0</span><span class="vh">None</span></td>';
    const unit = [c[1].replace(/^\d+\s*/, ''), row[2] && row[2][c[0]]].filter(Boolean).join(', ');
    return `<td role="cell"><b>${parseInt(c[1], 10)}</b>${unit ? ` <span class="unit">${esc(unit)}</span>` : ''}</td>`;
  };

  const loadout = only => {
    const cols = only ? [only] : BOARD_ORDER;
    const groups = LOADOUT.map(([group, items]) => {
      const live = items.filter(row => cols.some(id => KITS[id].contents.some(x => row[1].test(x[0]))));
      return `
        <tbody role="rowgroup">
          <tr role="row" class="board__group"><th role="columnheader" scope="colgroup" colspan="${cols.length + 1}">${group}</th></tr>
          ${live.map(row => `<tr role="row"><th role="rowheader" scope="row">${esc(row[0])}</th>${cols.map(id => countCell(KITS[id], row)).join('')}</tr>`).join('')}
        </tbody>`;
    }).join('');
    return `
      <table class="board${only ? ' board--one' : ''}" role="table">
        <caption class="vh">${only ? `Every item in the ${esc(KITS[only].name)}` : 'Every item in every kit'}, grouped by what it treats</caption>
        <thead role="rowgroup"><tr role="row">
          <th role="columnheader" scope="col">Item</th>
          ${cols.map(id => `<th role="columnheader" scope="col">${only ? 'Count' : `<a href="product.html?kit=${id}">${esc(KITS[id].size)}</a>`}</th>`).join('')}
        </tr></thead>
        ${groups}
        <tfoot role="rowgroup"><tr role="row">
          <th role="rowheader" scope="row">Items in the kit</th>
          ${cols.map(id => `<td role="cell"><b>${itemCount(KITS[id])}</b></td>`).join('')}
        </tr></tfoot>
      </table>`;
  };

  $$('[data-loadout]').forEach(el => { el.innerHTML = loadout(currentKit); });

  /* ---------- The schedule board ---------- */

  const reserve = (s, cls, label) => `<button class="btn ${cls}" type="button" data-add="class" data-variant="${s.mil}, ${CLASS.time}, ${esc(s.where)}">${label}<span class="vh">, ${s.long}</span></button>`;

  $$('[data-board]').forEach(el => {
    const all = SESSIONS.map(session);
    const next = all[0];
    const short = el.dataset.board === 'next';
    el.innerHTML = `
      <div class="sched__next">
        <p class="sched__date"><span class="vh">Next class: </span>${next.mil.split(' ').map(w => `<span>${w}</span>`).join(' ')}</p>
        <p class="sched__line">Next class. ${next.long}, ${CLASS.time}, ${esc(next.where)}.</p>
        <div class="sched__buy">
          <p class="sched__price">${money(CLASS.price)}</p>
          ${reserve(next, 'btn--orange', 'Reserve a seat')}
          ${short ? '<a class="link" href="classes.html#dates">All class dates <i class="ph ph-arrow-right" aria-hidden="true"></i></a>' : ''}
        </div>
      </div>
      ${short ? '' : `
      <ol class="sched__rows" aria-label="Later classes">
        ${all.slice(1).map(s => `
          <li>
            <span class="sched__d">${s.mil}</span>
            <span class="sched__w">${esc(s.where)} <span class="sched__t">${CLASS.time}</span></span>
            <span class="sched__m"></span>
            ${reserve(s, 'btn--line btn--sm', 'Reserve')}
          </li>`).join('')}
      </ol>`}`;
  });

  /* ---------- The Treasure Coast map ----------
     Everything drawn here is computed from the projection of florida-counties.svg:
       x = 961.6 - (lonW - 80) * 120.4286     y = 592.2 + (27 - lat) * 136.1
     Graticule lines, the crosshair, town marks and every coordinate label go through
     project(), so a label can only sit on its own line. Nothing is placed by eye. */

  const project = (lat, lonW) => [961.6 - (lonW - 80) * 120.4286, 592.2 + (27 - lat) * 136.1];
  const STATE_VIEW = [0, -13, 1000, 1000];
  const COAST_VIEW = [784, 438, 284, 284];
  /* name, latitude, longitude west, and how far the label drops below its mark to clear its neighbour */
  const TOWNS = [
    ['Vero Beach', 27.6386, 80.3973, 0],
    ['Fort Pierce', 27.4467, 80.3256, 0],
    ['Stuart', 27.1975, 80.2528, 9],
    ['Jupiter', 26.9342, 80.0942, 0]
  ];
  const LABEL_X = 975;

  const map = $('[data-map]');
  if (map) {
    const NS = 'http://www.w3.org/2000/svg';
    const el = (name, attrs) => { const n = document.createElementNS(NS, name); Object.keys(attrs).forEach(k => n.setAttribute(k, attrs[k])); return n; };
    const [hx, hy] = project(LAT, LON);
    const [vx, vy, vw, vh] = COAST_VIEW;
    const at = (x, y) => `left:${((x - vx) / vw * 100).toFixed(3)}%;top:${((y - vy) / vh * 100).toFixed(3)}%`;
    const inside = (v, from, size) => v > from + 12 && v < from + size - 12;

    const build = src => {
      const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
      const svg = el('svg', { viewBox: STATE_VIEW.join(' '), 'aria-hidden': 'true', focusable: 'false' });
      const grat = el('g', { class: 'map__grat' });
      const ticks = [];
      for (let lon = 80; lon <= 87; lon++) {
        const [x] = project(0, lon);
        grat.appendChild(el('line', { x1: x, x2: x, y1: -300, y2: 1300 }));
        if (inside(x, vx, vw)) ticks.push(`<span class="map__tick map__tick--lon" style="${at(x, vy)}">${lon}° W</span>`);
      }
      for (let lat = 25; lat <= 31; lat++) {
        const [, y] = project(lat, 0);
        grat.appendChild(el('line', { x1: -300, x2: 1300, y1: y, y2: y }));
        if (inside(y, vy, vh)) ticks.push(`<span class="map__tick map__tick--lat" style="${at(vx, y)}">${lat}° N</span>`);
      }
      const land = el('g', { class: 'map__land' });
      $$('.counties path, path.state', doc).forEach(p => land.appendChild(document.importNode(p, true)));
      const coast = el('g', { class: 'map__coast' });
      const north = ['Indian River', 'St. Lucie', 'Martin', 'Palm Beach'];
      $$('.treasure-coast path', doc)
        .sort((a, b) => north.indexOf(a.getAttribute('data-county')) - north.indexOf(b.getAttribute('data-county')))
        .forEach((p, i) => { const c = document.importNode(p, true); c.style.setProperty('--i', i); coast.appendChild(c); });
      const leads = el('g', { class: 'map__leads' });
      const marks = TOWNS.map(([name, lat, lon, drop]) => {
        const [x, y] = project(lat, lon);
        leads.appendChild(el('polyline', { points: `${x},${y} ${LABEL_X - 14},${y + drop} ${LABEL_X - 4},${y + drop}` }));
        return `<span class="map__dot" style="${at(x, y)}"></span><span class="map__town" style="${at(LABEL_X, y + drop)}">${name}</span>`;
      });
      const cross = el('g', { class: 'map__cross' });
      cross.appendChild(el('line', { x1: -300, x2: 1300, y1: hy, y2: hy }));
      cross.appendChild(el('line', { x1: hx, x2: hx, y1: -300, y2: 1300 }));
      [grat, land, coast, leads, cross].forEach(g => svg.appendChild(g));

      /* Labels are HTML over the final frame, so the type stays one readable size at any map width. */
      const labels = document.createElement('div');
      labels.className = 'map__labels';
      labels.setAttribute('aria-hidden', 'true');
      labels.innerHTML = `${ticks.join('')}${marks.join('')}
        <span class="map__dot map__dot--home" style="${at(hx, hy)}"></span>
        <span class="map__town map__town--home" style="${at(LABEL_X, hy)}">Port St. Lucie</span>
        <span class="map__read map__read--lat" style="${at(vx, hy)}">${LAT_TEXT}</span>
        <span class="map__read map__read--lon" style="${at(hx, vy + vh)}">${LON_TEXT}</span>`;
      $('.map__stage', map).append(svg, labels);
      return svg;
    };

    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const MOVE = 6400;
    let raf = 0;
    const settle = svg => { svg.setAttribute('viewBox', COAST_VIEW.join(' ')); map.classList.add('is-settled'); };
    const run = svg => {
      cancelAnimationFrame(raf);
      map.classList.remove('is-settled');
      let start = 0;
      const frame = now => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / MOVE);
        /* Width is eased on a log scale so the approach reads as one steady move, not a rush at the end. */
        const w = STATE_VIEW[2] * Math.pow(vw / STATE_VIEW[2], ease(t));
        const span = (w - STATE_VIEW[2]) / (vw - STATE_VIEW[2]);
        const x = STATE_VIEW[0] + (vx - STATE_VIEW[0]) * span;
        const y = STATE_VIEW[1] + (vy - STATE_VIEW[1]) * span;
        svg.setAttribute('viewBox', `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${w.toFixed(2)}`);
        if (t < 1) raf = requestAnimationFrame(frame);
        else map.classList.add('is-settled');
      };
      raf = requestAnimationFrame(frame);
    };

    fetch('assets/florida-counties.svg')
      .then(r => { if (!r.ok) throw new Error('map'); return r.text(); })
      .then(src => {
        const svg = build(src);
        const again = $('[data-map-replay]', map);
        if (reduced || !('IntersectionObserver' in window)) { settle(svg); return; }
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(svg); io.disconnect(); } }, { threshold: 0.35 });
        io.observe(map);
        if (again) { again.hidden = false; again.addEventListener('click', () => run(svg)); }
      })
      .catch(() => { map.hidden = true; });
  }

  /* ---------- Product page: product.html?kit=11|13|16|ifak ---------- */

  if (currentKit) {
    const id = currentKit;
    const k = KITS[id];
    const boxed = !!k.len;
    const set = (slot, html) => $$(`[data-p="${slot}"]`).forEach(n => { n.innerHTML = html; });
    document.title = `${k.name} | Secured Safety Solutions`;
    set('name', esc(k.name));
    set('pitch', esc(k.pitch));
    set('desc', esc(k.desc));
    set('price', money(k.price));
    set('why-title', k.whyTitle);
    set('why', k.why.map(w => `<li>${esc(w)}</li>`).join(''));
    set('ideal', k.ideal.map(w => `<li>${esc(w)}</li>`).join(''));
    set('same', k.same ? esc(k.same) : '');
    $$('[data-p="same"]').forEach(n => { n.hidden = !k.same; });

    const fig = $('[data-p="photo"]');
    if (fig) {
      fig.classList.toggle('p-photo--pouch', !boxed);
      fig.style.setProperty('--len', k.len || 16);
      fig.innerHTML = `
        <img src="${PHOTO + k.photo}" alt="${esc(k.name)}" width="${k.w}" height="${k.h}" fetchpriority="high">
        ${boxed
          ? `<figcaption class="ruler is-set"><span class="ruler__line" aria-hidden="true"></span><span class="ruler__n">${k.len} in</span></figcaption>`
          : `<figcaption class="ruler ruler--none">Wearable pouch</figcaption>`}`;
    }

    const colors = $('[data-p="colors"]');
    if (colors) {
      colors.hidden = !k.colors;
      if (k.colors) {
        colors.innerHTML = `<legend>Case color</legend><div class="choice">${k.colors.map((c, i) => `<label><input type="radio" name="color" value="${c}"${i ? '' : ' checked'}><span>${c}</span></label>`).join('')}</div>`;
      }
    }
    $$('[data-add-kit]').forEach(b => { b.dataset.add = id; b.setAttribute('aria-label', `Add ${k.name} to cart`); });

    const spec = [
      ['Code', k.code],
      ['Case', esc(k.caseType)],
      k.colors ? ['Colors', k.colors.join(' or ')] : null,
      ['Items', `${itemCount(k)}`],
      ['Water', `${esc(k.water)}`],
      ['Tourniquet', `Genuine CAT tourniquets, sourced from authorized dealers.`],
      ['Ready to use', 'Packed and organized. Open, grab, and work.'],
      ['Ships from', 'Port St. Lucie, Florida'],
      ['Shipping', `Calculated at checkout.`],
      ['Restock', `Restock packs replace what you use.`],
      ['With the class', `Pair this kit with the <a href="classes.html">8-hour trauma class</a>, ${money(CLASS.price)}.`]
    ].filter(Boolean);
    set('spec', spec.map(([a, b]) => `<tr><th scope="row">${a}</th><td>${b}</td></tr>`).join(''));

    /* The buy bar comes up once the main buy block has scrolled away, and steps aside for the footer. */
    const bar = $('[data-buybar]');
    const buy = $('[data-buy]');
    if (bar && buy && 'IntersectionObserver' in window) {
      let past = false;
      let footIn = false;
      const sync = () => {
        const on = past && !footIn;
        bar.classList.toggle('is-shown', on);
        bar.inert = !on;
      };
      bar.inert = true;
      new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(buy);
      if (footer) new IntersectionObserver(([e]) => { footIn = e.isIntersecting; sync(); }).observe(footer);
    }
  }

  /* ---------- FAQ filter: every answer is already open; typing narrows the list ---------- */

  const filter = $('[data-faq-filter]');
  if (filter) {
    const items = $$('.qa');
    const tally = $('[data-faq-count]');
    const none = $('[data-faq-none]');
    const apply = () => {
      const words = filter.value.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      items.forEach(q => {
        const text = q.textContent.toLowerCase();
        const hit = words.every(w => text.includes(w));
        q.hidden = !hit;
        if (hit) shown++;
      });
      $$('.qa-group').forEach(g => { g.hidden = !$$('.qa', g).some(q => !q.hidden); });
      tally.textContent = words.length ? `${shown} of ${items.length} questions` : `${items.length} questions`;
      none.hidden = shown > 0;
    };
    filter.addEventListener('input', apply);
    apply();
  }

  /* ---------- Forms: nothing is sent yet, so confirm in place ---------- */

  $$('form[data-form]').forEach(form => {
    form.noValidate = true;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = $('.form__status', form);
      const fields = $$('input, select, textarea', form);
      fields.forEach(f => f.removeAttribute('aria-invalid'));
      const bad = fields.find(f => !f.checkValidity());
      if (bad) {
        const label = ((($(`label[for="${bad.id}"]`, form) || {}).textContent) || 'this field').replace(/\s*\(.*\)/, '').toLowerCase();
        bad.setAttribute('aria-invalid', 'true');
        status.dataset.state = 'error';
        status.textContent = bad.validity.valueMissing
          ? (form.dataset.empty || `Fill in your ${label} to send this.`)
          : `Check your ${label}. It does not look right.`;
        bad.focus();
        return;
      }
      status.dataset.state = 'ok';
      status.textContent = form.dataset.form;
      form.reset();
    });
  });

  renderCart();
})();
