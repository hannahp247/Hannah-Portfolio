(() => {
  const home = document.getElementById('home');
  const screens = [...document.querySelectorAll('.screen')];
  const nav = document.getElementById('navigation');
  const header = document.getElementById('site-header');
  const enter = document.getElementById('enter-button');
  const navItems = [...document.querySelectorAll('.nav-item')];
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const headerIndex = document.getElementById('header-index');
  const nameEl = document.getElementById('name');
  const loadingFill = document.getElementById('loading-fill');
  const loadingPercent = document.getElementById('loading-percent');
  const loadingStatus = document.getElementById('loading-status');
  const loadingPanel = document.getElementById('loading-panel');
  const dropNotice = document.getElementById('drop-notice');
  const targetName = 'HANNAH MAE B. PACIO';
  const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/';
  let current = 'home';
  let locked = false;
  let loaded = false;
  let activeAchievement = 'programming';

  function decodeName() {
    const start = performance.now();
    const duration = 2400;
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const reveal = Math.floor(progress * targetName.length);
      nameEl.textContent = [...targetName].map((char, i) => {
        if (char === ' ' || i < reveal || progress === 1) return char;
        return randomChars[Math.floor(Math.random() * randomChars.length)];
      }).join('');
      if (progress < 1) requestAnimationFrame(frame);
      else nameEl.textContent = targetName;
    }
    requestAnimationFrame(frame);
  }

  function runLoader() {
    const start = performance.now();
    const duration = 2400;
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      loadingFill.style.width = `${progress * 100}%`;
      loadingPercent.textContent = `${String(Math.floor(progress * 100)).padStart(2, '0')}%`;
      if (progress < 1) requestAnimationFrame(frame);
      else {
        loadingPercent.textContent = '100%';
        loadingStatus.textContent = 'PROFILE READY';
        loadingStatus.classList.add('flicker');
        setTimeout(() => {
          loadingPanel.classList.add('fade');
          loaded = true;
          enter.classList.add('visible');
          setTimeout(() => { enter.textContent = 'ENTER PORTFOLIO  ↗'; }, 250);
        }, 700);
      }
    }
    requestAnimationFrame(frame);
  }

  function showScreen(id) {
    if (locked || id === current || !screens.some(s => s.id === id)) return;
    locked = true;
    const old = document.getElementById(current);
    const nextScreen = document.getElementById(id);
    const oldIndex = screens.indexOf(old);
    const newIndex = screens.indexOf(nextScreen);
    old.classList.remove('active');
    old.classList.add(newIndex > oldIndex ? 'exit-left' : 'exit-right');
    nextScreen.classList.remove('exit-left', 'exit-right');
    nextScreen.classList.add('active');
    current = id;
    const idx = screens.indexOf(nextScreen);
    navItems.forEach(item => {
      item.classList.toggle('current', item.dataset.page === id);
      if (item.dataset.page === id) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    headerIndex.textContent = String(idx + 1).padStart(2, '0');
    previous.disabled = idx === 0;
    next.disabled = idx === screens.length - 1;
    if (id === 'home') {
      nav.classList.remove('visible');
      header.classList.remove('visible');
      enter.classList.add('visible');
    } else {
      nav.classList.add('visible');
      header.classList.add('visible');
      enter.classList.remove('visible');
    }
    history.replaceState(null, '', `#${id}`);
    setTimeout(() => { old.classList.remove('exit-left', 'exit-right'); locked = false; }, 680);
  }

  enter.addEventListener('click', () => showScreen('personal'));
  navItems.forEach(item => item.addEventListener('click', () => showScreen(item.dataset.page)));
  document.querySelectorAll('[data-open]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault(); showScreen(el.dataset.open);
  }));
  previous.addEventListener('click', () => {
    const idx = screens.findIndex(s => s.id === current);
    if (idx > 0) showScreen(screens[idx - 1].id);
  });
  next.addEventListener('click', () => {
    const idx = screens.findIndex(s => s.id === current);
    if (idx < screens.length - 1) showScreen(screens[idx + 1].id);
  });
  document.addEventListener('keydown', e => {
    if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); const idx=screens.findIndex(s=>s.id===current); if(idx<screens.length-1) showScreen(screens[idx+1].id); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); const idx=screens.findIndex(s=>s.id===current); if(idx>0) showScreen(screens[idx-1].id); }
    if (e.key === 'Escape' && current !== 'home') showScreen('home');
  });
  let touchX=0, touchY=0;
  document.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY},{passive:true});
  document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.2){const idx=screens.findIndex(s=>s.id===current);const target=idx+(dx<0?1:-1);if(target>=0&&target<screens.length)showScreen(screens[target].id)}},{passive:true});

  const achievementData = {
    core: {category:'CORE FOUNDATION', number:'00', title:'Foundations in Progress', description:'A growing base of concepts and habits that support future technical work.'},
    programming: {category:'LEARNING MILESTONE', number:'01', title:'Programming Fundamentals', description:'Building a foundation in variables, conditions, loops, and basic program structure through guided practice.'},
    logic: {category:'DIGITAL LOGIC', number:'02', title:'Logic & Number Systems', description:'Practicing radix conversion, Boolean logic, logic gates, bitwise operations, and arithmetic.'},
    electronics: {category:'HARDWARE EXPLORATION', number:'03', title:'Arduino & Basic Electronics', description:'Exploring how code and electronic components can interact through beginner experiments.'},
    growth: {category:'PERSONAL DEVELOPMENT', number:'04', title:'Learning Through Practice', description:'Strengthening independent problem-solving by testing ideas, correcting mistakes, and applying concepts.'}
  };
  const cardCategory = document.getElementById('card-category');
  const cardNumber = document.getElementById('card-number');
  const cardTitle = document.getElementById('card-title');
  const cardDescription = document.getElementById('card-description');
  const achievementImage = document.getElementById('achievement-image');
  const achievementPlaceholder = document.getElementById('achievement-placeholder');
  const achievementUpload = document.getElementById('achievement-upload');

  function selectAchievement(key) {
    const data = achievementData[key];
    if (!data) return;
    activeAchievement = key;
    document.querySelectorAll('.planet,.sun').forEach(el => el.classList.toggle('selected', el.dataset.achievement === key));
    cardCategory.textContent = data.category;
    cardNumber.textContent = data.number;
    cardTitle.textContent = data.title;
    cardDescription.textContent = data.description;
    achievementImage.hidden = true;
    achievementImage.removeAttribute('src');
    achievementPlaceholder.hidden = false;
    achievementUpload.value = '';
  }
  document.querySelectorAll('[data-achievement]').forEach(el => el.addEventListener('click', () => selectAchievement(el.dataset.achievement)));

  function previewFile(file, image, placeholder) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
      image.hidden = false;
      placeholder.hidden = true;
    };
    reader.readAsDataURL(file);
  }
  achievementUpload.addEventListener('change', () => previewFile(achievementUpload.files[0], achievementImage, achievementPlaceholder));

  const familyUpload = document.getElementById('family-upload');
  const familyImage = document.getElementById('family-image');
  const familyPlaceholder = document.getElementById('family-placeholder');
  familyUpload.addEventListener('change', () => previewFile(familyUpload.files[0], familyImage, familyPlaceholder));

  function enableDrop(zone, onFile) {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drop-target'); dropNotice.classList.add('visible'); });
    zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('drop-target'); dropNotice.classList.remove('visible'); });
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drop-target'); dropNotice.classList.remove('visible');
      const file = [...(e.dataTransfer?.files || [])].find(f => f.type.startsWith('image/'));
      if (file) onFile(file);
    });
  }
  enableDrop(document.getElementById('solar-system'), file => previewFile(file, achievementImage, achievementPlaceholder));
  enableDrop(document.getElementById('achievement-card'), file => previewFile(file, achievementImage, achievementPlaceholder));
  enableDrop(document.getElementById('family-drop'), file => previewFile(file, familyImage, familyPlaceholder));
  document.addEventListener('dragover', e => { if ([...e.dataTransfer.types].includes('Files')) dropNotice.classList.add('visible'); });
  document.addEventListener('drop', () => dropNotice.classList.remove('visible'));
  document.addEventListener('dragleave', e => { if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= innerWidth || e.clientY >= innerHeight) dropNotice.classList.remove('visible'); });

  decodeName();
  runLoader();
  const initial = location.hash.slice(1);
  if (initial && initial !== 'home' && document.getElementById(initial)) {
    home.classList.remove('active');
    current = 'home';
    setTimeout(() => showScreen(initial), 30);
  }
})();
