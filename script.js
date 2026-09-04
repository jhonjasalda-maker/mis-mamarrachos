(() => {
  'use strict';

  const modal = document.getElementById('art-modal');
  const iconModal = document.getElementById('icon-modal');
  const iconButton = document.querySelector('.brand-mark-button');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalMeta = document.getElementById('modal-meta');
  const processGallery = document.getElementById('process-gallery');
  const processToggle = document.getElementById('process-toggle');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryCount = document.getElementById('gallery-count');
  const cards = [...document.querySelectorAll('.art-card')];
  const unclassifiedCard = cards.find(card => card.dataset.title === 'The Dream team');
  if (unclassifiedCard) unclassifiedCard.dataset.tags = '';
  const filters = [...document.querySelectorAll('.filter')];
  const status = document.getElementById('filter-status');
  const empty = document.getElementById('collection-empty');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('site-navigation');
  const whatsappNumber = '573053079400';
  let activeGallery = [];
  let activeGalleryIndex = 0;
  let activeProcessImages = [];
  let lastTrigger = null;

  const messages = {
    'Una locura lunar':'Representa una o muchas de las locuras que una persona guarda en su mente: esas ideas imposibles que, bajo la luz de la luna, dejan de parecer tan lejanas.',
    'Un vistazo a la vida':'Es una invitación a mirar la vida dos veces: detrás de cada mirada existe un universo secreto, y en cada universo una verdad esperando ser descubierta.',
    'Quiéreme':'Habla del deseo de ser elegido sin máscaras; de abrir las alas, mostrar nuestras contradicciones y encontrar amor incluso en lo que nos hace diferentes.',
    'Llegando a casa':'Representa el viaje extraño y necesario de regresar a uno mismo. A veces llegar a casa no es llegar a un lugar, sino reconocer aquello que todavía nos llama.',
    'Gracias Dios por cuidarnos':'Es un gesto de gratitud hacia esa protección que no siempre vemos, pero que sentimos: una presencia serena acompañándonos entre la inmensidad y el camino.',
    'Aliméntame por fis':'Representa el hambre de vida: la necesidad de nutrir no solo el cuerpo, sino también la imaginación, los afectos y la pequeña esperanza que llevamos dentro.',
    'Callado se ve mas bonito':'Hay silencios que no esconden nada: guardan una belleza que solo aparece cuando dejamos de explicar.',
    'Come de mi':'Una invitación a acercarse sin miedo y descubrir que hasta lo extraño puede alimentar el asombro.',
    'Mi otro yo':'Ese reflejo que nos acompaña en secreto: la parte de nosotros que también merece ser escuchada.',
    'The Dream team':'Cuando los sueños se encuentran, hasta las diferencias pueden convertirse en fuerza y compañía.'
  };
  const sources = Object.fromEntries(cards.map(card => [card.dataset.title, card.querySelector('img').getAttribute('src')]));
  const processByTitle = {
    'The Dream team': [['fotos dream team/IMG_20221124_114458550.jpg','01 · El primer trazo'],['fotos dream team/IMG_20221205_151949044.jpg','02 · La idea toma forma'],['fotos dream team/IMG_20221213_152457914.jpg','03 · Aparecen los personajes'],['fotos dream team/IMG_20230127_152457914.jpg','04 · El mundo se revela'],['fotos dream team/IMG_20230203_093418988.jpg','05 · El color despierta'],['fotos dream team/IMG_20230208_190432866.jpg','06 · Todo encuentra su lugar'],['fotos dream team/IMG_20230224_120723480.jpg','07 · La obra terminada']],
    'Callado se ve mas bonito': [['fotos callado se ve mas bonito/IMG_20220609_124142004.jpg','01 · El primer trazo'],['fotos callado se ve mas bonito/IMG_20220613_161231897.jpg','02 · La idea aparece'],['fotos callado se ve mas bonito/IMG_20220615_112132470.jpg','03 · Nacen las formas'],['fotos callado se ve mas bonito/IMG_20220615_113633641.jpg','04 · El rostro despierta'],['fotos callado se ve mas bonito/IMG_20220624_133247904.jpg','05 · La mirada se construye'],['fotos callado se ve mas bonito/IMG_20220706_155848870.jpg','06 · El color encuentra su lugar'],['fotos callado se ve mas bonito/IMG_20220707_134456409.jpg','07 · Aparecen los detalles'],['fotos callado se ve mas bonito/IMG_20220715_155142746.jpg','08 · La expresión toma fuerza'],['fotos callado se ve mas bonito/IMG_20220721_144811971_MF_PORTRAIT.jpg','09 · La obra casi termina'],['fotos callado se ve mas bonito/IMG_20220722_160820451.jpg','10 · La obra terminada']]
  };
  processByTitle['Aliméntame por fis'] = [
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.46 AM.jpeg','01 · El primer trazo'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.46 AM (1).jpeg','02 · La idea aparece'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.46 AM (2).jpeg','03 · Nacen las formas'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.46 AM (3).jpeg','04 · El mundo empieza a respirar'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.46 AM (4).jpeg','05 · El color encuentra su lugar'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM.jpeg','06 · Aparecen los detalles'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (1).jpeg','07 · La composición despierta'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (2).jpeg','08 · El universo toma forma'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (3).jpeg','09 · Todo encuentra su lugar'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (4).jpeg','10 · La obra se revela'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (5).jpeg','11 · Últimos detalles'],
    ['Alimentame por fis/WhatsApp Image 2026-09-04 at 8.51.47 AM (6).jpeg','12 · La obra terminada']
  ];
  processByTitle['Una locura lunar'] = [
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM.jpeg','01 · La idea aparece'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (1).jpeg','02 · La luna comienza a despertar'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (2).jpeg','03 · El paisaje toma forma'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (3).jpeg','04 · Nacen los detalles'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (4).jpeg','05 · La luz encuentra su lugar'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (5).jpeg','06 · El mundo se llena de color'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (6).jpeg','07 · La locura se vuelve paisaje'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (7).jpeg','08 · La historia aparece'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (8).jpeg','09 · Últimos detalles'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (9).jpeg','10 · La obra casi termina'],
    ['Una locura lunar/WhatsApp Image 2026-09-04 at 9.03.44 AM (10).jpeg','11 · La obra terminada']
  ];
  document.querySelectorAll('img').forEach(image => {
    if (image.getAttribute('src') === 'fotos dream team/IMG_20221213_152457914.jpg') image.src = 'fotos dream team/IMG_20221213_152642224.jpg';
  });

  const extractedProcess = {
    'Come de mi': ['03.jpg','02.jpg','01.jpg','07.jpg','06.jpeg','04.jpg','05.jpeg'],
    'Gracias Dios por cuidarnos': ['06.jpeg','05.jpeg','04.jpeg','03.jpeg','02.jpeg','01.jpeg','07.jpeg','08.jpeg','09.jpeg','11.jpeg','10.jpeg'],
    'Llegando a casa': ['01.jpg','03.jpg','02.jpeg','05.jpeg','04.jpeg','06.jpeg','08.jpeg','07.jpeg','09.jpeg'],
    'Mi otro yo': ['03.jpeg','02.jpeg','04.jpeg','01.jpeg','05.jpeg'],
    'Quiéreme': ['01.jpeg','02.jpeg','03.jpeg','04.jpeg','05.jpeg','06.jpeg','09.jpeg','08.jpeg','07.jpeg','10.jpeg','11.jpeg'],
    'Un vistazo a la vida': ['01.jpeg','02.jpeg','03.jpeg','04.jpeg','05.jpeg','06.jpeg','07.jpeg','08.jpeg']
  };
  Object.entries(extractedProcess).forEach(([title, files]) => {
    processByTitle[title] = files.map((file, index) => [`fotos proceso/${title}/${file}`, `${String(index + 1).padStart(2, '0')} · Paso ${index + 1}`]);
  });
  processByTitle['Come de mi'] = processByTitle['Come de mi'].map(([src, label]) => [src, label]);
  processByTitle['Quiéreme'] = processByTitle['Quiéreme'].map(([src, label]) => [src.replace('Quiéreme', 'Quiereme'), label]);
  processByTitle['Llegando a casa'] = processByTitle['Llegando a casa'].map(([src, label]) => [src.replace('Llegando a casa', 'Llegando a Casa'), label]);

  function whatsappUrl(title = '', format = '') {
    const details = [title && `Obra: ${title}`, format && `Formato: ${format}`].filter(Boolean).join('\n');
    const message = `Hola, quiero encargar una réplica${details ? `\n${details}` : ' de una obra'}.\nCiudad de entrega: `;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  function updateWhatsappLinks(title = '') { document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(title); }); }
  function renderProcess(title) {
    const steps = (processByTitle[title] || []).map(([src, label]) => [src.replace('IMG_20221213_152457914.jpg', 'IMG_20221213_152642224.jpg'), label]);
    activeProcessImages = steps.map(([src, label]) => ({ src, alt: `${title}, ${label}` }));
    processGallery.hidden = true;
    processToggle.hidden = !steps.length;
    processToggle.setAttribute('aria-expanded', 'false');
    processToggle.innerHTML = 'Ver el proceso de mi mamarracho <span aria-hidden="true">↗</span>';
    processGallery.replaceChildren();
    if (!steps.length) return;
    const heading = document.createElement('p'); heading.className = 'process-title'; heading.textContent = 'Proceso de creación'; processGallery.append(heading);
    const grid = document.createElement('div'); grid.className = 'modal-process-grid';
    steps.forEach(([src, label]) => { const figure = document.createElement('figure'); const image = document.createElement('img'); image.src = src; image.alt = `${title}, ${label}`; image.loading = 'lazy'; image.width = 4080; image.height = 3072; const caption = document.createElement('figcaption'); caption.textContent = label; figure.append(image, caption); grid.append(figure); });
    processGallery.append(grid);
  }
  function renderGallery() {
    const item = activeGallery[activeGalleryIndex]; if (!item) return;
    modalImage.src = item.src; modalImage.alt = item.alt; galleryCount.textContent = `${activeGalleryIndex + 1} / ${activeGallery.length}`;
    galleryPrev.disabled = activeGallery.length < 2; galleryNext.disabled = activeGallery.length < 2;
  }
  function moveGallery(direction) { if (activeGallery.length < 2) return; activeGalleryIndex = (activeGalleryIndex + direction + activeGallery.length) % activeGallery.length; renderGallery(); }
  function openArtwork(title, trigger) {
    lastTrigger = trigger; const card = trigger.closest('.art-card'); const image = card.querySelector('img');
    activeGallery = [{ src: image.currentSrc || image.src, alt: title }]; activeGalleryIndex = 0;
    modalTitle.textContent = title; modalMessage.textContent = messages[title] || 'Una obra original para encontrar un significado propio.'; modalMeta.textContent = 'Réplica impresa bajo pedido · Desde $25.000 COP';
    renderProcess(title); updateWhatsappLinks(title); renderGallery();
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    requestAnimationFrame(() => document.querySelector('.modal-close').focus());
  }
  function closeModal() { modal.close(); if (lastTrigger) lastTrigger.focus(); }
  function applyFilter(filter) {
    filters.forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    let visible = 0; cards.forEach(card => { const show = filter === 'all' || card.dataset.tags.split(' ').includes(filter); card.hidden = !show; if (show) visible += 1; });
    empty.hidden = visible !== 0; status.textContent = `Mostrando ${visible} ${visible === 1 ? 'obra' : 'obras'}`;
  }
  filters.forEach(button => { const filter = button.dataset.filter; const count = filter === 'all' ? cards.length : cards.filter(card => card.dataset.tags.split(' ').includes(filter)).length; button.querySelector('span').textContent = String(count).padStart(2, '0'); button.addEventListener('click', () => applyFilter(filter)); });
  document.querySelectorAll('.quick-view').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); openArtwork(button.dataset.title, button); }));
  document.querySelectorAll('.image-wrap').forEach(wrap => wrap.addEventListener('click', () => openArtwork(wrap.closest('.art-card').dataset.title, wrap.querySelector('.quick-view'))));
  document.querySelector('.modal-close').addEventListener('click', closeModal); galleryPrev.addEventListener('click', () => moveGallery(-1)); galleryNext.addEventListener('click', () => moveGallery(1));
  iconButton.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); iconModal.showModal(); });
  iconModal.querySelector('.icon-modal-close').addEventListener('click', () => iconModal.close());
  processToggle.addEventListener('click', () => { if (!activeProcessImages.length) return; const expanded = processToggle.getAttribute('aria-expanded') === 'true'; processToggle.setAttribute('aria-expanded', String(!expanded)); processGallery.hidden = expanded; processToggle.innerHTML = expanded ? 'Ver el proceso de mi mamarracho <span aria-hidden="true">↗</span>' : 'Ocultar proceso <span aria-hidden="true">↑</span>'; if (!expanded) { activeGallery = [activeGallery[0], ...activeProcessImages]; activeGalleryIndex = 1; renderGallery(); } else { activeGallery = [activeGallery[0]]; activeGalleryIndex = 0; renderGallery(); } });
  document.addEventListener('keydown', event => { if (iconModal.open && event.key === 'Escape') iconModal.close(); if (!modal.open) return; if (event.key === 'ArrowLeft') moveGallery(-1); if (event.key === 'ArrowRight') moveGallery(1); if (event.key === 'Escape') closeModal(); });
  document.querySelectorAll('[data-filter-reset]').forEach(button => button.addEventListener('click', () => applyFilter('all')));
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!open)); menuToggle.querySelector('.sr-only').textContent = open ? 'Abrir menú' : 'Cerrar menú'; navigation.classList.toggle('is-open', !open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }));
  document.querySelectorAll('img').forEach(image => image.addEventListener('error', () => { image.classList.add('image-error'); image.alt = image.alt || 'Imagen no disponible'; }, { once: true }));
  updateWhatsappLinks();
})();

