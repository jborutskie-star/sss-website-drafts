(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHOTO = '../shared/photos/';
  const PHONE = '561-222-7641';
  const TEL = 'tel:+15612227641';
  const EMAIL = 'info@securedsafetysolutions.com';
  const LAT = '27.2730° N';
  const LON = '80.3582° W';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const money = n => '$' + n.toFixed(2);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const keep = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } };

  /* Kits */
  const BASE = [
    ['CAT Tourniquet', '1'],
    ['QuikClot', '1'],
    ['HyFin Chest Seal', '2'],
    ['Compressed Gauze', '1'],
    ['Pressure Dressing', '1'],
    ['ABD (army battle dressing) Pad', '1'],
    ['Gauze Roll', '2'],
    ['Burn Gel', '1'],
    ['Foil Blanket', '1'],
    ['Gloves', '2 pair'],
    ['Shears', '1'],
    ['Pen Light', '1']
  ];
  const HARD_CASE = 'Sealed hard case built to keep out water, salt, dust and impact.';

  const KITS = {
    '11': {
      name: '11" Trauma Box', size: '11"', code: 'SSS-11', price: 216.58,
      photo: 'case-orange.jpg',
      pitch: 'Compact, tough, and ready. Built for boats, trucks, and everyday carry.',
      desc: 'The practical everyday size. Big enough for a solid trauma loadout, small enough to fit a boat console, truck or gear bag without taking over the space. It keeps your critical supplies sealed, dry and organized.',
      spec: '11" hard case',
      colors: [
        { id: 'Orange', chip: 'c-orange', photo: 'case-orange.jpg' },
        { id: 'Beige', chip: 'c-beige', photo: 'case-tan.jpg' }
      ],
      whyTitle: 'Why this size',
      why: [
        'Compact footprint that fits where larger cases will not',
        'Tough hard case that seals out water, salt, dust and impact',
        'Organized inside, so you grab what you need fast under stress',
        'The right balance of capacity and portability'
      ],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits', 'Range bags and outdoor sports', 'Anyone who wants a kit that stays out of the way until it is needed'],
      same: 'Same supplies as the IFAK. The difference is the case: this one is a sealed hard box for the boat or truck.',
      water: HARD_CASE,
      contents: BASE
    },
    '13': {
      name: '13" Trauma Box', size: '13"', code: 'SSS-13', price: 375.00,
      photo: 'case-tan.jpg',
      pitch: 'The sweet spot. More room than the 11", still easy to store.',
      desc: 'The practical middle ground. Enough extra space for a fuller trauma loadout without the bulk of the 16", and still compact enough for boat consoles, trucks and gear areas.',
      spec: '13" hard case',
      whyTitle: 'Why this size',
      why: [
        'More room than the 11" for extra supplies or better organization',
        'Still compact enough to fit where the 16" is too big',
        'Tough hard case that seals out water, salt, dust and impact',
        'Clear layout, so you grab what you need fast'
      ],
      ideal: ['Offshore and inshore fishing boats', 'Truck and vehicle kits that need more capacity', 'Range bags and outdoor setups', 'A step up from the 11" without going to the 16"'],
      water: HARD_CASE,
      contents: [
        ['CAT Tourniquet', '2'], ['QuikClot', '2'], ['HyFin Chest Seal', '4'], ['Compressed Gauze', '2'],
        ['Pressure Dressing', '2'], ['ABD (army battle dressing) Pad', '2'], ['Gauze Roll', '3'], ['Burn Gel', '2'],
        ['Foil Blanket', '2'], ['Gloves', '2 pair'], ['Shears', '1'], ['Pen Light', '1']
      ]
    },
    '16': {
      name: '16" Trauma Box', size: '16"', code: 'SSS-16', price: 638.14,
      photo: 'case-1550a.jpg',
      pitch: 'More space. Same protection. Built for bigger boats, vehicles and team kits.',
      desc: 'Extra room for a fuller loadout, multi-person kits or bulk supplies, kept sealed, dry and organized. The larger option for offshore boats, trucks, range carts and team gear.',
      spec: '16" hard case',
      whyTitle: 'Why this size',
      why: [
        'Extra space for more supplies, multi-person kits or bulk items',
        'Tough hard case that seals out water, salt, dust and impact',
        'Still compact enough for a boat console, vehicle or gear area',
        'Clear organization, so you reach what you need fast'
      ],
      ideal: ['Larger offshore and sportfishing boats', 'Vehicle and range kits that need more capacity', 'Team or department use', 'A step up in space from the 13" box'],
      water: HARD_CASE,
      contents: [
        ['CAT Tourniquet', '4'], ['QuikClot', '4'], ['HyFin Chest Seal', '4 two-packs'], ['Compressed Gauze', '4'],
        ['4" Pressure Bandage', '4'], ['ABD Pad', '8'], ['3" Gauze Roll', '8'], ['Multi-Trauma Dressing', '2'],
        ['Burn Gel', '8'], ['Foil Blanket', '2'], ['Gloves', '2 two-packs'], ['Shears', '1'], ['Pen Light', '1']
      ]
    },
    'ifak': {
      name: 'IFAK', size: 'IFAK', code: 'SSS-IFAK', price: 178.63,
      photo: 'trauma-pak.jpg',
      pitch: 'Compact, wearable, and built for when you need it on you.',
      desc: 'The individual first aid kit. A grab-and-go trauma kit that stays on your belt, vest or bag, sized for personal carry while still holding the bleeding-control supplies you need when help is delayed.',
      spec: 'IFAK wearable pouch',
      whyTitle: 'Why this kit',
      why: [
        'Compact and wearable, so it is always with you',
        'Organized for fast access under stress',
        'Built around quality items for controlling major bleeding',
        'Light enough for all-day carry without getting in the way'
      ],
      ideal: ['Offshore and inshore fishing', 'Hunting, range days and outdoor sports', 'A backup kit for the boat or vehicle', 'Anyone who wants a serious trauma kit that stays on them'],
      same: 'Same supplies as the 11" Trauma Box. The difference is the case: this one rides on your belt, vest or bag.',
      water: 'A wearable pouch, not a sealed hard case. For a kit that lives on deck or in a truck bed, choose a hard-case box.',
      contents: BASE
    }
  };
  const ORDER = ['11', '13', '16', 'ifak'];
  const CLASS_ITEM = { name: '8-hour trauma class', price: 225.00, photo: 'class-training.jpg' };
  const itemCount = k => k.contents.reduce((n, c) => n + (parseInt(c[1], 10) || 0), 0);

  /* Page context */
  const page = body.dataset.page || 'home';
  const section = page === 'product' ? 'kits' : page;
  const params = new URLSearchParams(location.search);
  let kitId = params.get('kit');
  if (!KITS[kitId]) kitId = '11';
  const curKit = page === 'product' ? kitId : null;

  /* Eagle mark */
  const EAGLE = {"e-body": "<path fill-rule=\"evenodd\" d=\"M570.29 550.23C566.16 543.89 563.9 536.52 561.38 529.44C556.83 536.94 556.57 542 548.21 547.02C548.58 545.23 548.37 544.84 549.15 543.35C550.13 541.48 551.01 539.68 551.78 537.7C553.84 532.45 555.63 525.84 555.35 520.33C548.11 529.88 547.1 537.01 534.39 541.08C538.77 534.38 543.08 528.65 543.69 520.34C538.09 527.04 532.56 535.53 523.29 536.87C527.86 528.44 535.73 520.49 536.05 510.48C529.77 518.39 520.75 529.74 510.05 530.84C514.46 523.67 521.62 515.08 522.71 506.53C520.55 508.64 519.07 511.19 517 513.36C510.62 520.04 503.77 523.84 494.51 524.56C499.31 515.93 505.61 508.29 510.07 499.34C507.17 501.33 505.02 503.69 502.36 505.95C494.86 512.34 485.78 517.25 475.77 516.4C478.74 514.18 482.14 512.47 485.04 510.19C490.28 506.07 498.64 497.05 501.63 491.27C492.92 496.76 484.83 506.97 472.99 503.64C471.37 503.18 471.57 502.8 470.21 501.69C475.8 499.02 481.82 497.2 487.24 494.03C495.2 489.36 502.21 482.04 508.57 475.4C510.52 473.36 512.18 470.99 514.2 469.05C518.78 464.67 523.44 459.76 527.05 454.49L531.18 448.48L531.92 440.54C532.28 436.73 534.27 433.24 535.76 429.81C539.1 422.1 543.27 411.04 541.42 402.81C537.26 414.82 536.96 424.31 523.97 430.83C525.21 427.25 526.38 423.87 527.01 420.14C520.1 426.61 511.04 430.42 501.73 431.81C504.43 427.46 506.98 423.6 508.15 418.55C499.52 426.89 494.72 430.58 482.41 431.49C486.92 425.25 494.14 420.79 496.2 413.16C486.05 421.37 480.68 427.78 466.28 425.2C471.52 420.95 476.94 417.76 481.24 412.31C482.12 411.19 481.92 410.74 482.32 409.57C474.68 414.32 466.4 420.35 456.9 418.25C458.6 416.02 459.56 415.92 461.48 414.23C464.96 411.17 468.27 407.99 471.51 404.63C472.44 403.67 472.58 403.15 473.26 402.09C463.13 405.98 460.72 414.18 447.23 410.86C452.19 407.27 457.33 403.42 461.08 398.48C461.98 397.29 461.73 397.04 462.11 395.73C456.06 399.18 450.07 402.5 442.92 400.57C446.95 396.03 450.71 394.13 454.5 388.7C446.87 390.73 443.36 394.19 434.73 391.31C440.83 388.28 446.28 383.91 450.28 378.31C451.31 376.87 450.83 376.78 451.17 375.51C443.88 381.54 436.7 385.35 426.99 382.24C433.28 378.49 439.78 374.17 442.74 367.27C432.81 372.93 430.55 376.95 417.9 377.02C421.98 372.24 428.09 368.78 430.7 363.18C427.05 365.44 423.87 368.81 419.85 370.56C417.45 371.6 414.68 372.08 412.16 372.68C409.22 373.38 407.55 373.75 404.47 373.38C406.34 371.28 408.35 369.96 410.51 368.17C412.11 366.85 413.39 365.12 414.86 363.75C415.41 363.23 416.18 362.87 416.71 362.29C417.42 361.52 417.99 359.93 418.56 359.08C416.91 360.06 415.75 361 414.24 362.43C413.41 363.21 412.2 363.63 411.3 364.31C404.52 369.46 397.21 372.98 388.46 372.33C391.01 369.4 394.31 367.86 397.26 365.33C401.75 361.47 405.67 357.21 408.79 352.27C407.27 352.91 408.62 351.34 406.32 353.49C403.62 356 400.8 358.52 397.83 360.7C396.68 361.55 395.31 362 394.11 362.7C392.11 363.87 390.28 365.32 388.26 366.48C380.19 371.08 369.01 373.96 359.77 373.13C366.7 367.86 375.91 365.48 381.41 358.61C378.87 359.47 379.22 359.97 377.32 361.3C376.17 362.11 374.13 362.74 372.79 363.33C363.89 367.27 345.95 372.66 336.44 370.57C346.73 365.63 365.73 356.63 372.32 347.74C365.44 350.84 358.73 354.38 351.32 356.43C346.53 357.75 341.59 357.45 336.72 358.09C329.05 359.11 323.74 361.05 315.67 360.28C320.29 358.2 325.16 356.91 329.76 354.8C336.74 351.61 343.37 347.81 350.12 344.27C354.67 341.88 359.11 339.76 363.02 336.36C356.81 338 350.7 340.05 344.57 341.98C340.13 343.39 335.29 343.11 330.74 343.93C319.51 345.97 308.08 349.78 296.76 346.14C301.36 343.69 306.42 343.2 311.3 341.43C315.65 339.85 319.9 337.84 324.33 336.49C334.1 333.51 351.33 329 358.64 322.3C350.12 323.17 341.78 325.57 333.24 326.28C324.27 327.04 315.75 325.3 306.86 324.79C297.24 324.24 285.46 326.92 277.51 320.26C283.3 318.94 289.44 319.72 295.39 319.26C300.39 318.88 305.25 317.85 310.2 317.13C320.14 315.71 329.92 314.58 339.77 312.58C344.33 311.66 348.37 311.05 352.7 309.21C345.9 307.47 338.64 308.08 331.66 307.58C315.62 306.45 300.03 304.04 285.74 296.44C282.07 294.5 277.66 291.79 274.9 288.57C273.9 287.4 274 286.89 273.37 285.44C280.61 287.55 287.97 288.42 295.34 289.9C308.39 292.51 321.92 294.02 335.22 294.32C342.67 294.48 350.4 295.86 357.64 293.82C350.98 291.51 343.69 291.79 336.8 290.31C329.94 288.83 322.84 287.69 316.16 285.47C301.74 280.68 276.72 270.45 270.01 255.99C276.26 258.08 282.56 260.98 288.65 263.59C303.32 269.86 321.52 273.23 337.32 274.81C344.2 275.5 351.31 278.21 358.21 276.7C351.96 274.12 344.7 273.49 338.19 271.76C320.34 267 290.51 253.65 279.85 238.3C278.23 235.96 276.06 233.79 274.93 231.13C274.21 229.45 274.76 229.51 274.9 227.57C283.43 234.73 293.23 240.15 303.34 244.7C308.93 247.22 314.36 250.16 320.17 252.24C331.62 256.35 343.33 259.22 355.24 261.84C360.64 263.03 366.67 264.51 371.98 263.34C345.76 255.04 318.99 247.21 303.57 222.34C299.47 215.72 295.87 209.54 297.32 201.4C299.99 203.26 301.63 205.39 303.78 207.79C307.84 212.36 313.27 216.43 318.13 220.09C320.37 221.78 322.91 223 325.34 224.47C336.31 231.11 347.73 236.7 359.73 241.25C369.78 245.06 382.66 246.83 393.3 248.81C400.63 250.17 408.06 251.64 415.28 253.47C417.68 254.08 420 255.13 422.42 255.73C428.11 257.13 434.52 259 439.69 261.96C449.83 267.74 459.57 275.64 466.73 284.88C472.45 292.28 476.18 300.63 484.11 306.2C492.62 312.18 502.79 315.21 513.07 316.03C518.4 316.46 527.25 317.59 532.16 315.22C535.26 313.72 536.69 309.94 537.41 306.79C538.71 301.13 540.2 282.63 537.21 277.91C536.42 276.67 535.21 275.59 533.83 275.06C530.04 273.62 516.9 272.17 513.77 274.87C511.77 276.59 510.93 280.47 509.88 282.8C500.59 271.76 512.13 258.48 523.36 254.97C526.7 253.92 530.85 254.98 534 253.74C536.1 252.92 537.42 250.12 539.09 248.68C545.43 243.22 554.95 243.62 562.72 244.73C566.52 245.28 575.5 247.67 577.8 250.87C578.82 252.3 578.03 253.8 579.41 255.12C580.56 256.23 582.38 256.68 583.71 257.62C585.93 259.21 587.67 261.39 589.52 263.39C588 263.83 587.01 264.28 585.62 264.93C587.39 267.62 593.05 276.15 593.79 278.81C594.33 280.78 593.61 282.78 594.23 284.74C595 287.2 597.4 289.34 597.83 291.83C598 292.76 597.55 293.63 597.61 294.56C597.8 297.75 599.09 299.88 601.14 302.24C597.48 307.17 600.66 305.94 602.11 310.14C603.33 313.69 601.35 314.2 606.32 315.03C610.59 315.75 614.96 315.73 619.28 315.79C635 316.03 648.77 314.39 660.76 303.35C664.94 299.51 667.64 294.07 671.08 289.64C673.8 286.15 676.18 282.2 679.09 278.85C684.83 272.23 691.81 267.33 699.17 262.71C707.71 257.36 728.6 251.21 738.77 249.66C745.49 248.64 752.65 248.17 759.23 246.45C770.88 243.42 782.77 240.2 793.88 235.48C802.14 231.96 810.41 227.16 817.73 222.02C820.73 219.92 823.33 217.29 826.23 215.14C829.16 212.99 832.41 210.29 835.01 207.77C836.73 206.09 838.05 204.06 840.16 202.77C841.41 202 842 202.03 843.51 201.61C839.16 229.28 816.71 245.6 792.18 255C785.25 257.65 778.32 260.88 771.1 262.21C787.89 263.38 820.18 251.2 835.61 243.71C838.9 242.11 842.47 241.06 845.69 239.37C849.79 237.23 855.01 233.94 858.91 231.36C861.77 229.46 861.3 228.97 864.98 227.7C859.8 245.37 828.84 262.24 812.3 268.14C806.95 270.04 801.32 271.65 795.85 273.18C792.66 274.07 789.39 274.29 786.36 275.43C794.9 276.21 804.32 274.26 812.78 272.42C818.86 271.09 825.14 270.41 831.17 268.92C837.72 267.3 844.37 265.21 850.72 262.94C853.85 261.82 857.31 260.79 860.26 259.25C862.39 258.14 864.22 256.47 866.4 255.43C867.92 254.71 868.36 255.01 870.13 254.79C865.95 261.66 860.14 266.15 853.89 270.98C852.44 272.1 851.18 273.43 849.52 274.29C840.45 279 829.94 283.26 820.07 285.93C808.89 288.95 797.25 290.14 786.13 293.29C791.04 294.35 795.72 293.94 800.71 293.94C817.24 293.93 834.11 292.01 850.29 288.82C855.54 287.79 860.27 285.54 865.56 284.79C860.82 295.44 842.09 301.97 831.27 304.47C827.27 305.4 823.19 305.51 819.14 306.08C816.93 306.38 814.72 307 812.48 307.13L791.52 308.28L787.83 308.44C788.89 309.19 789.15 309.66 790.49 310.12C795.9 311.97 801.78 312.28 807.37 313.34C817.61 315.27 828.03 317.18 838.41 318.38C845.73 319.23 853.18 318.48 860.45 319.62C856.17 323.43 850.25 325.64 844.68 327.04C842.23 327.65 839.7 327.4 837.22 327.59C822.95 328.71 806.8 327.57 792.69 325.1C789.34 324.52 786.14 323.55 782.76 323.31C784.82 325.24 786.7 325.73 789.3 326.84C790.97 327.55 792.48 328.68 794.12 329.43C798.94 331.64 804.23 332.75 809.16 334.67C814.32 336.67 819.39 339.22 824.71 340.82C829.74 342.34 835.8 343.18 840.01 346.12C838.83 346.6 838.62 346.97 837.18 347.05C830.28 347.44 823.64 347.49 816.82 346.06C814.95 345.67 813.18 344.88 811.31 344.5C804.64 343.16 797.69 343 791.17 341.08C786.16 339.6 781.55 336.72 776.41 336.24C776.7 336.58 776.64 337.13 776.92 337.49C777.11 337.74 778.03 338.23 778.34 338.46C786.61 344.64 796.11 348.21 805.36 352.6C806.84 353.31 808.2 354.35 809.76 354.95C814.2 356.67 818.53 357.69 822.7 360.07C815.42 361.45 810.29 359.59 803.17 358.93C795.9 358.27 789.21 357.03 782.21 354.93C777.75 353.58 773.69 351.07 769.34 349.72C769.46 350.39 769.6 351.08 769.78 351.76C776.34 356.15 782.68 360.41 789.72 363.94C791.62 364.89 793.36 366.44 795.33 367.22C797.63 368.13 800.02 369.28 802.46 369.97C803.84 370.35 803.99 370.58 805.22 371.25C801.31 372.23 797.92 371.6 793.84 370.94C789.19 370.2 784.32 370.49 779.75 369.32C772.88 367.55 766.64 363.56 760.35 360.74C762.73 363.09 765.79 366.13 768.73 367.82C772.12 369.78 773.28 369.64 775.7 373.04C762.89 373.19 752.64 369.12 742.48 361.26C739.38 358.86 736.54 356.35 733.09 354.66C737.08 362.42 744.87 368 751.76 373.17C738.97 373.43 728.45 365.31 719.5 357.07C720.24 358.58 720.41 358.99 721.27 360.23C722.88 362.56 725.99 365.92 728.31 367.73C731.33 370.1 732.69 370.39 734.5 373.99C726.09 373.89 720.58 372.22 713.88 367.29C712.12 366 710.78 364.5 708.85 363.35C711.06 369.18 717.74 372.07 721.47 376.76C719.88 377.14 721.29 377.57 718.55 377.3C713.04 376.77 707.98 375.47 703.07 373.05C700.77 371.91 698.95 370.07 696.61 368.92C699.02 372.81 702.47 377.62 706.33 380.21C708.01 381.34 709.4 382.12 710.97 383.51C702.77 386.88 695.72 381.33 689.21 376.85C689.77 378.54 688.68 377.38 690.32 379.56C694.32 384.89 699.59 388.2 704.89 392.04C696.53 395.32 689.14 389.72 682.21 386.09C685.78 391.92 690.43 396.64 697 399.17C688.69 403.89 682.38 398.51 675.08 394.68C678.73 401.31 685.1 405.85 691.15 410.24C681.61 413.46 671.73 406.29 664.82 400.21C667.63 408.06 675.04 413.24 681.65 417.79C670.8 420.37 665.4 413.47 656.86 409.07C659.85 416.05 665.48 420.82 671.68 425.04C668.29 426.84 667.07 426.54 663.27 425.89C653.12 424.17 647.3 417.09 640.36 410.24C641.28 414.73 645.22 421.76 648.48 425.12C650.65 427.34 653.1 429.27 655.19 431.66C643.61 433.49 635.16 425.01 629.22 416.32C630.4 422.93 634.03 427.5 638.17 432.7C628.71 432.21 621.1 425.79 613.12 421.26C613.36 424.61 613.95 427.46 614.93 430.69C604.78 426.47 601.63 416.16 597.35 406.95C596.93 416.82 600.73 425.82 604.28 434.77C606.34 439.94 606 446.25 608.82 451.06C611.66 455.92 616.02 459.82 619.62 464.1C630.71 477.27 643.19 488.98 658.25 497.46C662.05 499.6 666.19 500.85 670 502.83C658 508.14 648.4 499.3 638.91 492.91C639.69 494.7 639.63 494.98 640.61 496.39C644.62 502.1 649.87 507.16 655.65 511.31C658.17 513.12 660.61 514.42 662.91 516.58C648.79 520.22 639.67 507.78 629.68 500.46C629.89 501.52 629.86 502.26 630.31 503.4C633.58 511.62 639.63 518.67 644.85 525.57C629.68 522.95 624.19 513.11 614.51 502.62C617.36 514.09 623.89 521.76 629.75 531.71C622.44 529.99 616.02 525.22 611 519.62C609.07 517.47 607.27 515.13 605.46 512.89C604.63 511.86 604.19 511.68 603.23 510.95C605.3 519.35 611.04 526.8 614.57 534.7C615.18 536.05 615.14 536.6 615.5 538.16C605.86 535.84 600.82 526.02 594.09 519.56C595.24 528.74 598.95 532.7 603.15 540.35C601.47 540 601.04 540.22 599.64 539.41C591.23 534.54 587.43 525.38 583.31 517.11C582.8 524.72 584.99 532.45 587.96 539.43C588.76 541.34 589.71 542.84 590.27 544.75C589.07 544.48 588.49 544.7 587.31 543.95C582.13 540.63 579.73 534.33 575.61 530.07C574.55 536.82 574.18 544.47 570.29 550.23Z\"/>", "e-star1": "<path d=\"M422.77 185.57L430.36 207.33L453.41 207.83L435.05 221.77L441.70 243.84L422.77 230.69L403.84 243.84L410.49 221.77L392.14 207.83L415.18 207.33Z\"/>", "e-star2": "<path d=\"M488.35 156.94L495.94 178.71L518.99 179.20L500.63 193.14L507.29 215.21L488.35 202.06L469.42 215.21L476.08 193.14L457.72 179.20L480.77 178.71Z\"/>", "e-star3": "<path d=\"M562.35 137.53L572.70 167.22L604.13 167.89L579.10 186.91L588.17 217.02L562.35 199.08L536.52 217.02L545.60 186.91L520.56 167.89L552.00 167.22Z\"/>", "e-star4": "<path d=\"M636.34 156.94L643.93 178.71L666.97 179.20L648.62 193.14L655.27 215.21L636.34 202.06L617.41 215.21L624.06 193.14L605.71 179.20L628.75 178.71Z\"/>", "e-star5": "<path d=\"M701.92 185.57L709.51 207.33L732.56 207.83L714.20 221.77L720.86 243.84L701.92 230.69L682.99 243.84L689.65 221.77L671.29 207.83L694.33 207.33Z\"/>"};
  const T = '<g>';
  const eagleSVG = () => {
    let s = '<svg viewBox="268 134.2 604 419.6" aria-hidden="true" focusable="false" fill="currentColor">';
    s += '<g class="e-body">' + T + EAGLE['e-body'] + '</g></g>';
    for (let i = 1; i <= 5; i++) s += '<g class="e-star" style="--i:' + (i - 1) + '">' + T + EAGLE['e-star' + i] + '</g></g>';
    return s + '</svg>';
  };
  const mark = eagleSVG();
  const fillEagles = ctx => $$('[data-eagle]', ctx).forEach(el => { if (!el.firstElementChild) el.innerHTML = mark; });

  /* Shared header pieces */
  const NAV = [
    ['kits', 'kits.html', 'Kits'],
    ['classes', 'classes.html', 'Classes'],
    ['dealers', 'dealers.html', 'Departments &amp; Dealers'],
    ['about', 'about.html', 'About'],
    ['faq', 'faq.html', 'FAQ'],
    ['contact', 'contact.html', 'Contact']
  ];
  const cur = id => (id === section ? ' aria-current="page"' : '');
  const navLinks = (ids, cls) => NAV.filter(n => !ids || ids.includes(n[0]))
    .map(n => `<li><a${cls ? ` class="${cls}"` : ''} href="${n[1]}"${cur(n[0])}>${n[2]}</a></li>`).join('');
  const kitLinks = () => ORDER.map(id => `<li><a href="product.html?kit=${id}"${curKit === id ? ' aria-current="page"' : ''}><span class="k-size">${KITS[id].size}<span class="vh"> ${id === 'ifak' ? 'kit' : 'Trauma Box'}</span></span><span class="k-price">${money(KITS[id].price)}</span></a></li>`).join('');
  const cartBtn = cls => `<button class="cart-btn ${cls}" type="button" aria-controls="cart-drawer" aria-expanded="false" aria-label="Cart, 0 items"><i class="ph ph-shopping-bag" aria-hidden="true"></i><span class="cart-word">Cart</span><span class="cart-count" data-cart-count>0</span></button>`;
  const menuBtn = cls => `<button class="menu-toggle ${cls}" type="button" aria-expanded="false" aria-controls="site-menu"><i class="ph ph-list" aria-hidden="true"></i><span class="menu-word">Menu</span></button>`;
  const brand = cls => `<a class="brand ${cls}" href="index.html" aria-label="Secured Safety Solutions, home"><span class="eagle-slot" data-eagle></span><span class="brand-name">Secured Safety <span>Solutions</span></span></a>`;
  const menuPanel = () => `
    <nav class="menu-panel" id="site-menu" aria-label="Main" hidden>
      <ul class="menu-list">${navLinks()}</ul>
      <ul class="menu-kits" aria-label="Kits">${kitLinks()}</ul>
      <p class="menu-reach"><a href="${TEL}">${PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </nav>`;

  /* Header */
  const headerHTML = () => `
    <div class="h2-strip" data-strip>
      <div class="wrap h2-strip-in">
        <a class="h2-tel" href="${TEL}">${PHONE}</a>
        <a class="h2-mail" href="mailto:${EMAIL}">${EMAIL}</a>
        <p class="h2-city">Port St. Lucie, FL</p>
        <p class="h2-coords"><span>${LAT}</span><span>${LON}</span></p>
      </div>
    </div>
    <div class="h2-bar">
      <div class="wrap h2-bar-in">
        ${brand('h2-brand')}
        <nav class="h2-nav" aria-label="Main"><ul>${navLinks(['classes', 'dealers', 'about', 'faq', 'contact'])}</ul></nav>
        <a class="btn btn-yellow h2-shop" href="kits.html"${cur('kits')}>Shop kits <i class="ph ph-arrow-right" aria-hidden="true"></i></a>
        ${cartBtn('h2-cell h2-cart')}
        ${menuBtn('h2-cell h2-menu')}
      </div>
    </div>
    ${menuPanel()}`;

  const header = $('[data-site-header]');

  const measureHeader = () => {
    if (!header) return;
    const strip = $('[data-strip]', header);
    const s = strip ? strip.offsetHeight : 0;
    header.style.top = -s + 'px';
    root.style.setProperty('--hh', (header.offsetHeight - s) + 'px');
    root.style.setProperty('--hfull', header.offsetHeight + 'px');
  };

  const setMenu = (open, focusBack) => {
    const panel = $('#site-menu');
    const btn = header && $('.menu-toggle', header);
    if (!panel || !btn) return;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    $('.ph', btn).className = open ? 'ph ph-x' : 'ph ph-list';
    $('.menu-word', btn).textContent = open ? 'Close' : 'Menu';
    if (!open && focusBack) btn.focus();
  };
  const menuOpen = () => { const p = $('#site-menu'); return !!p && !p.hidden; };

  /* Footer */
  const footer = $('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot-top">
          <p class="foot-tag">Preparedness that saves lives.</p>
          <form class="foot-signup" action="#" method="post" data-form="Thanks. You are on the list for new kits and class dates.">
            <label for="signup-email">Get new kits and class dates by email</label>
            <div class="inline-field">
              <input id="signup-email" name="email" type="email" autocomplete="email" required>
              <button class="btn btn-yellow" type="submit">Sign up</button>
            </div>
            <p class="form-status" role="status"></p>
          </form>
        </div>
        <div class="foot-grid">
          <div class="foot-brand">
            <a href="index.html" aria-label="Secured Safety Solutions, home"><span class="eagle-slot" data-eagle></span></a>
            <p>Trauma kits and training built by active SWAT medics and fire captains.</p>
          </div>
          <div>
            <p class="foot-h">Shop</p>
            <ul>${ORDER.map(id => `<li><a href="product.html?kit=${id}">${KITS[id].name}</a></li>`).join('')}<li><a href="classes.html">8-hour trauma class</a></li></ul>
          </div>
          <div>
            <p class="foot-h">Company</p>
            <ul>${navLinks(['about', 'dealers', 'faq', 'contact'])}</ul>
          </div>
          <div>
            <p class="foot-h">Reach us</p>
            <address>
              <a href="${TEL}">${PHONE}</a>
              <a href="mailto:${EMAIL}">${EMAIL}</a>
              <span>Port St. Lucie, Florida</span>
            </address>
          </div>
        </div>
        <div class="foot-base">
          <p>&copy; 2026 Secured Safety Solutions</p>
          <p class="foot-coords"><span>${LAT}</span><span>${LON}</span></p>
        </div>
      </div>`;
  }

  /* Cart drawer shell */
  body.insertAdjacentHTML('beforeend', `
    <div class="scrim" hidden></div>
    <aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
      <div class="drawer-head">
        <h2 id="cart-title">Your cart</h2>
        <button class="icon-btn drawer-close" type="button"><i class="ph ph-x" aria-hidden="true"></i><span class="vh">Close cart</span></button>
      </div>
      <div class="drawer-body"></div>
      <div class="drawer-foot">
        <p class="subtotal"><span>Subtotal</span><span data-subtotal>$0.00</span></p>
        <p class="drawer-note">Shipping and tax at checkout.</p>
        <button class="btn btn-ink btn-block checkout" type="button">Checkout <i class="ph ph-arrow-right" aria-hidden="true"></i></button>
        <p class="drawer-status" role="status"></p>
      </div>
    </aside>`);

  /* Cart */
  const KEY = 'sss-v3-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  const saveCart = () => keep(KEY, JSON.stringify(cart));

  const itemFor = (id, variant) => {
    if (id === 'class') return { name: CLASS_ITEM.name, price: CLASS_ITEM.price, photo: CLASS_ITEM.photo };
    const k = KITS[id];
    if (!k) return null;
    let photo = k.photo;
    if (k.colors && variant) k.colors.forEach(c => { if (c.id === variant) photo = c.photo; });
    return { name: k.name, price: k.price, photo };
  };

  function renderCount() {
    const n = cart.reduce((s, l) => s + l.qty, 0);
    $$('[data-cart-count]').forEach(el => { el.textContent = n; });
    $$('.cart-btn').forEach(b => b.setAttribute('aria-label', `Cart, ${n} ${n === 1 ? 'item' : 'items'}`));
  }

  const drawer = $('#cart-drawer');
  const scrim = $('.scrim');
  let lastFocus = null;
  let hideTimer = null;
  const isOpen = () => drawer.classList.contains('is-open');

  const renderCart = () => {
    renderCount();
    const bodyEl = $('.drawer-body', drawer);
    const sub = cart.reduce((s, l) => s + l.price * l.qty, 0);
    $('[data-subtotal]', drawer).textContent = money(sub);
    $('.checkout', drawer).disabled = !cart.length;
    if (!cart.length) {
      bodyEl.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a class="btn btn-line" href="kits.html">Shop trauma kits <i class="ph ph-arrow-right" aria-hidden="true"></i></a></div>';
      return;
    }
    bodyEl.innerHTML = '<ul>' + cart.map((l, i) => `
      <li class="cart-line">
        <img src="${PHOTO + esc(l.photo)}" alt="" width="64" height="64">
        <div>
          <div class="cart-line-top">
            <div><p class="cart-line-name">${esc(l.name)}</p>${l.variant ? `<p class="cart-line-variant">${esc(l.variant)}</p>` : ''}</div>
            <p class="cart-line-price">${money(l.price * l.qty)}</p>
          </div>
          <div class="cart-line-ctrl">
            <div class="qty" role="group" aria-label="Quantity, ${esc(l.name)}">
              <button type="button" data-step="-1" data-i="${i}" aria-label="One fewer"><i class="ph ph-minus" aria-hidden="true"></i></button>
              <output aria-live="polite">${l.qty}</output>
              <button type="button" data-step="1" data-i="${i}" aria-label="One more"><i class="ph ph-plus" aria-hidden="true"></i></button>
            </div>
            <button type="button" class="text-btn" data-remove="${i}">Remove<span class="vh"> ${esc(l.name)}</span></button>
          </div>
        </div>
      </li>`).join('') + '</ul>';
  };

  const addToCart = (id, variant, qty) => {
    const item = itemFor(id, variant);
    if (!item) return;
    const key = id + '|' + (variant || '');
    const line = cart.find(l => l.key === key);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else cart.push({ key, id, variant: variant || '', name: item.name, price: item.price, photo: item.photo, qty });
    saveCart();
    renderCart();
  };

  const focusables = () => $$('a[href], button:not([disabled]), input, select, textarea', drawer).filter(el => el.offsetParent !== null);
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
    $('.drawer-close', drawer).focus();
  };
  const closeDrawer = () => {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    setCartExpanded(false);
    hideTimer = setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, reduced ? 0 : 260);
    if (lastFocus && lastFocus.isConnected && lastFocus.focus) lastFocus.focus();
    else { const b = $('.cart-btn'); if (b) b.focus(); }
  };

  scrim.addEventListener('click', closeDrawer);
  $('.drawer-close', drawer).addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e => {
    const step = e.target.closest('[data-step]');
    const rem = e.target.closest('[data-remove]');
    if (step) {
      const i = +step.dataset.i;
      const l = cart[i];
      l.qty = Math.min(99, l.qty + (+step.dataset.step));
      if (l.qty < 1) cart.splice(i, 1);
      saveCart(); renderCart();
      const again = $(`[data-i="${i}"][data-step="${step.dataset.step}"]`, drawer);
      (again || $('.drawer-close', drawer)).focus();
    } else if (rem) {
      cart.splice(+rem.dataset.remove, 1);
      saveCart(); renderCart();
      $('.drawer-close', drawer).focus();
    }
  });
  $('.checkout', drawer).addEventListener('click', () => {
    $('.drawer-status', drawer).textContent = 'Checkout opens in the Shopify store once the site is live.';
  });
  drawer.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* Global clicks: menu, cart, add to cart */
  const readVariant = btn => {
    let v = btn.dataset.variant;
    const from = btn.dataset.variantFrom;
    if (from) { const c = $(`input[name="${from}"]:checked`); if (c) v = c.value; }
    const k = KITS[btn.dataset.add];
    if (!v && k && k.colors) v = k.colors[0].id;
    return v || '';
  };
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('.menu-toggle')) { setMenu(!menuOpen()); return; }
    if (t.closest('.cart-btn')) { openDrawer(); return; }
    const add = t.closest('[data-add]');
    if (add) {
      let qty = 1;
      const qf = add.dataset.qtyFrom;
      if (qf && $(qf)) qty = Math.max(1, Math.min(99, parseInt($(qf).value, 10) || 1));
      addToCart(add.dataset.add, readVariant(add), qty);
      openDrawer();
      return;
    }
    if (menuOpen() && !t.closest('#site-menu')) setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (isOpen()) { closeDrawer(); return; }
    if (menuOpen()) setMenu(false, true);
  });

  /* Build header and marks */
  if (header) header.innerHTML = headerHTML();
  fillEagles(document);
  renderCount();
  measureHeader();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureHeader);
  let rz = null;
  addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(measureHeader); });

  if ($('[data-eagle="intro"]') && !reduced) {
    root.classList.add('intro');
    setTimeout(() => root.classList.remove('intro'), 1700);
  }

  const tbc = t => `<span class="tbc">[${t}]</span>`;
  const kind = id => (id === 'ifak' ? 'Wearable kit' : 'Trauma Box');
  const swatches = (k, name) => k.colors.map((c, i) => `<label class="swatch"><input type="radio" name="${name}" value="${c.id}" data-photo="${c.photo}"${i ? '' : ' checked'}><span class="swatch-chip ${c.chip}" aria-hidden="true"></span><span>${c.id}</span></label>`).join('');

  /* Packing list: what is in each kit, as a checklist that can be printed */
  const lid = (id, h) => {
    const k = KITS[id];
    return `<section class="lid" aria-label="${esc(k.name)} packing list">
      <header class="lid-head"><${h} class="lid-title"><span class="lid-code">${k.code}</span> ${esc(k.name)}</${h}><p class="lid-count">${itemCount(k)} items</p></header>
      <ul class="lid-items">${k.contents.map(c => `<li><span class="lid-box" aria-hidden="true"></span><span class="lid-item">${esc(c[0])}</span><span class="lid-qty">${esc(c[1])}</span></li>`).join('')}</ul>
      <footer class="lid-foot"><button class="text-btn" type="button" data-print-lid>Print this list</button></footer>
    </section>`;
  };
  $$('[data-lid]').forEach(el => { el.innerHTML = lid(el.dataset.lid || kitId, el.dataset.h || 'h3'); });

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-print-lid]');
    if (!b) return;
    const sheet = document.createElement('div');
    sheet.className = 'print-sheet';
    sheet.innerHTML = `<p class="print-brand">Secured Safety Solutions</p>${b.closest('.lid').outerHTML}<p class="print-sign"><span>Checked by</span><span>Date</span></p>`;
    body.appendChild(sheet);
    root.classList.add('print-lid');
    addEventListener('afterprint', () => { sheet.remove(); root.classList.remove('print-lid'); }, { once: true });
    print();
  });

  /* Carry chart: where the kit rides decides which kit. Rows stay grouped in ORDER. */
  const CARRY = [
    ['11', 'Boat console, cabin or dry storage', 'Fits a boat console and keeps the supplies sealed and dry.'],
    ['11', 'Range bag or gear bag', 'A compact footprint that fits where larger cases will not.'],
    ['13', 'Behind the truck seat, truck box or trunk', 'More room than the 11" for a fuller loadout, and still easy to store.'],
    ['16', 'Larger offshore or sportfishing boat', 'Extra room for a fuller loadout, kept sealed, dry and organized.'],
    ['16', 'Team gear or range cart', 'Room for multi-person kits or bulk supplies.'],
    ['ifak', 'Belt, vest or bag', 'Rides on your belt, vest or bag. Same supplies as the 11" box, in a kit you wear.']
  ];
  $$('[data-carry]').forEach((el, n) => {
    let html = '<p class="carry-h carry-h-place">Carry it here</p><p class="carry-h carry-h-kit">Take this one</p>';
    CARRY.forEach((c, i) => {
      html += `<label class="carry-place" style="grid-row:${i + 2}"><input type="radio" name="carry-${n}" value="${i}"${i ? '' : ' checked'}><span class="carry-box" aria-hidden="true"></span><span class="carry-text">${c[1]}</span><span class="carry-lead" aria-hidden="true"></span></label>`;
    });
    ORDER.forEach(id => {
      const k = KITS[id];
      const first = CARRY.findIndex(c => c[0] === id);
      const rows = CARRY.filter(c => c[0] === id).length;
      const at = `grid-row:${first + 2} / span ${rows}`;
      html += `<span class="carry-join" data-kit="${id}" style="${at};--n:${rows}" aria-hidden="true"><i></i></span>
        <a class="carry-kit" data-kit="${id}" href="product.html?kit=${id}" style="${at}"><span class="carry-size">${k.size}</span><span class="carry-meta"><span class="carry-name">${kind(id)}</span><span class="carry-price">${money(k.price)}</span></span></a>`;
    });
    el.innerHTML = `<div class="carry-chart" role="radiogroup" aria-label="Where will the kit ride?">${html}</div><div class="carry-result" aria-live="polite"></div>`;
    const out = $('.carry-result', el);
    const show = (i, changed) => {
      const [id, , why] = CARRY[i];
      const k = KITS[id];
      $$('.carry-place', el).forEach((p, j) => p.classList.toggle('is-on', j === i));
      $$('[data-kit]', el).forEach(x => {
        x.classList.toggle('is-on', x.dataset.kit === id);
        if (x.dataset.kit === id) x.style.setProperty('--from', i - CARRY.findIndex(c => c[0] === id));
      });
      out.innerHTML = `<div class="carry-say"><p class="carry-take">Take the ${esc(k.name)}.</p><p class="carry-why">${esc(why)} ${itemCount(k)} items, ${k.code}.</p></div>
        <p class="carry-buy"><span class="price">${money(k.price)}</span><button class="btn btn-ink" type="button" data-add="${id}">Add to cart<span class="vh">: ${esc(k.name)}</span></button><a class="link" href="product.html?kit=${id}">Open the ${esc(k.size)} sheet</a></p>`;
      if (changed) fresh(out);
    };
    el.addEventListener('change', e => { if (e.target.name === 'carry-' + n) show(+e.target.value, true); });
    show(0);
  });

  /* Kits page: the catalog, one ruled entry per kit */
  const catalog = $('[data-catalog]');
  if (catalog) catalog.innerHTML = ORDER.map(id => {
    const k = KITS[id];
    return `<article class="entry" id="kit-${id}">
      <div class="entry-id"><h2 class="entry-size">${k.size}<span class="vh"> ${kind(id)}</span></h2><p class="entry-code">${k.code}</p></div>
      <div class="entry-body">
        <p class="entry-pitch">${esc(k.pitch)}</p>
        <p>${esc(k.desc)}</p>
        ${k.same ? `<p class="note"><strong>Note.</strong> ${esc(k.same)}</p>` : ''}
        <details class="lid-fold"><summary>Packing list, ${itemCount(k)} items<span class="pm" aria-hidden="true"></span></summary>${lid(id, 'h3')}</details>
      </div>
      <div class="entry-buy">
        <span class="photo r-43"><img id="kit-${id}-photo" src="${PHOTO + k.photo}" alt="${esc(k.name)}" width="640" height="480" loading="lazy"></span>
        ${k.colors ? `<fieldset class="swatches" data-swap-photo="kit-${id}-photo"><legend>Case color</legend><div class="swatch-row">${swatches(k, 'color-' + id)}</div></fieldset>` : ''}
        <p class="price">${money(k.price)}</p>
        <button class="btn btn-ink btn-block" type="button" data-add="${id}"${k.colors ? ` data-variant-from="color-${id}"` : ''}>Add to cart<span class="vh">: ${esc(k.name)}</span></button>
        <a class="link" href="product.html?kit=${id}">Open the ${esc(k.size)} sheet</a>
      </div>
    </article>`;
  }).join('');

  /* Product page: one spec sheet, filled from the kit data */
  if (page === 'product') {
    const k = KITS[kitId];
    const put = (key, html) => $$(`[data-p="${key}"]`).forEach(el => { el.innerHTML = html; });
    document.title = k.name + ' | Secured Safety Solutions';
    put('tabs', ORDER.map(id => `<a href="product.html?kit=${id}"${id === kitId ? ' aria-current="page"' : ''}>${KITS[id].size}<span class="vh"> ${kind(id)}</span></a>`).join(''));
    put('size', k.size);
    put('kind', kitId === 'ifak' ? 'Individual first aid kit' : 'Trauma Box');
    put('code', k.code);
    put('pitch', esc(k.pitch));
    put('desc', esc(k.desc));
    put('price', money(k.price));
    put('name', esc(k.name));
    put('spec', [
      ['Model', k.code],
      ['Case', esc(k.spec)],
      k.colors ? ['Colors', k.colors.map(c => c.id).join(' or ')] : null,
      ['Items in the kit', `<a href="#contents">${itemCount(k)} items</a>`],
      ['Ships from', 'Port St. Lucie, FL']
    ].filter(Boolean).map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join(''));
    put('why-title', k.whyTitle);
    put('why', k.why.map(w => `<li>${esc(w)}</li>`).join(''));
    put('ideal', k.ideal.map(w => `<li>${esc(w)}</li>`).join(''));
    put('water', esc(k.water));
    put('others', ORDER.filter(o => o !== kitId).map(o => {
      const x = KITS[o];
      return `<li><a class="kit-row" href="product.html?kit=${o}"><span class="kit-row-size">${x.size}</span><span class="kit-row-pitch">${esc(x.pitch)}</span><span class="kit-row-data">${itemCount(x)} items</span><span class="kit-row-data">${money(x.price)}</span></a></li>`;
    }).join(''));
    const img = $('#p-photo');
    img.src = PHOTO + k.photo;
    img.alt = k.name;
    const colors = $('[data-p="colors"]');
    if (k.colors) {
      colors.hidden = false;
      colors.innerHTML = `<legend>Case color</legend><div class="swatch-row">${swatches(k, 'p-color')}</div>`;
    }
    $('[data-p="add"]').dataset.add = kitId;
    $('[data-p="lid-note"]').hidden = kitId === 'ifak';
    const same = $('[data-p="same"]');
    if (k.same) { same.hidden = false; same.innerHTML = '<strong>Note.</strong> ' + esc(k.same); }
    const idxWhy = $('.index a[href="#why"]');
    if (idxWhy) idxWhy.textContent = k.whyTitle;
  }

  /* Side index: tabs on the page edge, a tab bar on phones */
  const index = $('.index');
  if (index) {
    if (page === 'product') { const lbl = $('.index-label', index); if (lbl) lbl.textContent = KITS[kitId].code; }
    const links = $$('a', index);
    const targets = links.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1))));
    const narrow = matchMedia('(max-width: 1199px)');
    let current = -1;
    const setCurrent = i => {
      if (i === current || i < 0) return;
      current = i;
      links.forEach((a, j) => {
        const on = j === i;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
      if (narrow.matches && index.scrollWidth > index.clientWidth + 1) {
        const a = links[i];
        index.scrollTo({ left: a.offsetLeft - (index.clientWidth - a.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      }
    };
    const compute = () => {
      const line = innerHeight * 0.3;
      let idx = 0;
      targets.forEach((t, j) => { if (t && t.getBoundingClientRect().top <= line) idx = j; });
      if (innerHeight + scrollY >= root.scrollHeight - 4) idx = targets.length - 1;
      setCurrent(idx);
    };
    let tick = false;
    addEventListener('scroll', () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => { tick = false; compute(); });
    }, { passive: true });
    addEventListener('resize', compute);
    compute();
  }

  const fresh = el => {
    if (reduced || !el) return;
    el.classList.remove('is-fresh');
    void el.offsetWidth;
    el.classList.add('is-fresh');
  };

  /* Quantity steppers */
  $$('[data-qty]').forEach(wrap => {
    const input = $('input', wrap);
    $$('button', wrap).forEach(b => b.addEventListener('click', () => {
      input.value = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + (+b.dataset.delta)));
    }));
  });

  /* A case color choice swaps its photo */
  $$('[data-swap-photo]').forEach(fs => {
    const img = document.getElementById(fs.dataset.swapPhoto);
    $$('input', fs).forEach(r => r.addEventListener('change', () => {
      if (img && r.dataset.photo) img.src = PHOTO + r.dataset.photo;
    }));
  });

  /* Class calendar */
  const cal = $('[data-calendar]');
  if (cal) {
    const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const MON_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const two = n => String(n).padStart(2, '0');
    const sessions = $$('[data-session]').map(li => {
      const [y, m, d] = li.dataset.date.split('-').map(Number);
      return { id: li.dataset.date, y, m: m - 1, d, where: li.dataset.where, time: li.dataset.time || '0800–1600', civTime: li.dataset.civ || '8 AM–4 PM', date: new Date(y, m - 1, d), li };
    });
    const mil = s => `${DAY[s.date.getDay()]} ${two(s.d)} ${MON[s.m]} ${String(s.y).slice(2)}`;
    const civ = s => `${DAY_FULL[s.date.getDay()]}, ${MON_FULL[s.m]} ${s.d}, ${s.y}`;
    const grid = $('[data-cal-grid]', cal);
    const title = $('[data-cal-title]', cal);
    const panel = $('[data-session-panel]', cal);
    const prev = $('[data-cal-step="-1"]', cal);
    const next = $('[data-cal-step="1"]', cal);
    const ord = (y, m) => y * 12 + m;

    if (sessions.length && grid && panel) {
      const first = sessions[0];
      const last = sessions[sessions.length - 1];
      let view = { y: first.y, m: first.m };
      let sel = first;

      const drawMonth = () => {
        title.innerHTML = `${MON_FULL[view.m]} ${view.y}<span class="cal-code">${MON[view.m]} ${String(view.y).slice(2)}</span>`;
        const lead = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
        const days = new Date(view.y, view.m + 1, 0).getDate();
        const heads = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        const fulls = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let h = `<caption class="vh">Class sessions in ${MON_FULL[view.m]} ${view.y}</caption><thead><tr>` +
          heads.map((d, i) => `<th scope="col"><abbr title="${fulls[i]}">${d}</abbr></th>`).join('') + '</tr></thead><tbody><tr>';
        for (let i = 0; i < lead; i++) h += '<td class="cal-pad"></td>';
        for (let d = 1; d <= days; d++) {
          if ((lead + d - 1) % 7 === 0 && d !== 1) h += '</tr><tr>';
          const s = sessions.find(x => x.y === view.y && x.m === view.m && x.d === d);
          h += s
            ? `<td><button type="button" class="cal-day" data-date="${s.id}" aria-pressed="${s === sel}"><span class="vh">${civ(s)}, class session</span><span aria-hidden="true">${two(d)}</span></button></td>`
            : `<td><span class="cal-num">${two(d)}</span></td>`;
        }
        const tail = (7 - ((lead + days) % 7)) % 7;
        for (let i = 0; i < tail; i++) h += '<td class="cal-pad"></td>';
        grid.innerHTML = h + '</tr></tbody>';
        prev.disabled = ord(view.y, view.m) <= ord(first.y, first.m);
        next.disabled = ord(view.y, view.m) >= ord(last.y, last.m);
      };

      const drawPanel = () => {
        const s = sel;
        panel.innerHTML = `
          <p class="ses-mil">${mil(s)}</p>
          <p class="ses-civ">${civ(s)}</p>
          <dl class="ses-data">
            <div><dt>Time</dt><dd><span class="mono">${s.time}</span> (${s.civTime})</dd></div>
            <div><dt>Length</dt><dd>8 hours, in person</dd></div>
            <div><dt>Where</dt><dd>${esc(s.where)}</dd></div>
            <div><dt>Price</dt><dd><span class="mono">${money(CLASS_ITEM.price)}</span></dd></div>
          </dl>
          <button class="btn btn-yellow btn-block" type="button" data-add="class" data-variant="${mil(s)}, ${s.time}">Reserve a seat<span class="vh">: ${civ(s)}</span></button>`;
        sessions.forEach(x => {
          const b = $('button', x.li);
          if (b) { if (x === sel) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); }
        });
      };

      const select = (s, opts = {}) => {
        sel = s;
        view = { y: s.y, m: s.m };
        drawMonth();
        drawPanel();
        if (opts.animate) fresh(panel);
        if (opts.focusDay) { const d = $(`.cal-day[data-date="${s.id}"]`, grid); if (d) d.focus(); }
        if (opts.reveal) {
          const r = panel.getBoundingClientRect();
          if (r.top < 0 || r.bottom > innerHeight) panel.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
        }
      };

      cal.addEventListener('click', e => {
        const day = e.target.closest('.cal-day');
        if (day) { select(sessions.find(x => x.id === day.dataset.date), { focusDay: true, animate: true }); return; }
        const st = e.target.closest('[data-cal-step]');
        if (st && !st.disabled) {
          const o = ord(view.y, view.m) + (+st.dataset.calStep);
          view = { y: Math.floor(o / 12), m: o % 12 };
          drawMonth();
        }
      });
      sessions.forEach(s => {
        const b = $('button', s.li);
        if (b) b.addEventListener('click', () => select(s, { animate: true, reveal: true }));
        const m = $('.ses-mil', s.li);
        if (m) m.textContent = mil(s);
      });
      select(first);
    }
  }

  /* FAQ: open all, close all */
  $$('[data-faq-all]').forEach(b => b.addEventListener('click', () => {
    const open = b.dataset.faqAll === 'open';
    $$('.faq details').forEach(d => { d.open = open; });
    const st = $('[data-faq-status]');
    if (st) st.textContent = open ? 'All answers are open.' : 'All answers are closed.';
  }));

  /* Forms (draft: no network) */
  $$('form[data-form]').forEach(f => {
    f.setAttribute('novalidate', '');
    f.addEventListener('submit', e => {
      e.preventDefault();
      const status = $('.form-status', f);
      if (!f.checkValidity()) {
        const bad = $('input:invalid, select:invalid, textarea:invalid', f);
        const name = (bad.labels && bad.labels[0] && bad.labels[0].textContent.replace(/\(.*?\)/, '').trim()) || 'required';
        if (status) { status.textContent = 'Check the highlighted field: ' + name + '.'; status.className = 'form-status is-error'; }
        $$('input, select, textarea', f).forEach(el => { if (!el.checkValidity()) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); });
        bad.focus();
        return;
      }
      $$('[aria-invalid]', f).forEach(el => el.removeAttribute('aria-invalid'));
      if (status) { status.textContent = f.dataset.form; status.className = 'form-status is-ok'; }
      f.reset();
    });
  });

  renderCart();
})();
