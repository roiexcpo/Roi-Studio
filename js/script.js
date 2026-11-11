// Берём все кнопки списка и все слайды
  const items  = document.querySelectorAll('.item');
  const slides = document.querySelectorAll('.slide');

  // Функция: показать проект с номером id
  function show(id) {
    // У кнопки с этим номером включаем is-active, у остальных выключаем
    items.forEach(function (item) {
      const active = item.dataset.project === id;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', active);
    });
    // То же самое для слайдов
    slides.forEach(function (slide) {
      slide.classList.toggle('is-active', slide.dataset.project === id);
    });
  }

  // На каждую кнопку вешаем клик: при нажатии показываем её проект
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      show(item.dataset.project);
    });
  });

  // Если хочешь, чтобы проект менялся просто при наведении мыши, раскомментируй:
  // items.forEach(function (item) {
  //   item.addEventListener('mouseenter', function () { show(item.dataset.project); });
  // });

const buttons = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.panel');

  // Показать вкладку с именем name
  function showTab(name) {
    buttons.forEach(function (btn) {
      const active = btn.dataset.tab === name;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', panel.dataset.tab === name);
    });
  }

  // По клику на кнопку показываем её вкладку
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showTab(btn.dataset.tab);
    });
  });

  const card = document.querySelector('.studio__card');

  // Проверяем, что это ПК (исключаем телефоны)
  const isHoverSupported = window.matchMedia('(hover: hover)').matches;

  if (card && isHoverSupported) {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Координаты курсора относительно центра карточки (от -1 до 1)
      const xPercent = (e.clientX - cardRect.left - cardWidth / 2) / (cardWidth / 2);
      const yPercent = (e.clientY - cardRect.top - cardHeight / 2) / (cardHeight / 2);
      
      // 1. УВЕЛИЧЕННЫЙ НАКЛОН (сделали сильнее, до 18 градусов)
      const maxRotate = 18;
      const rotateX = (-yPercent * maxRotate).toFixed(2);
      const rotateY = (xPercent * maxRotate).toFixed(2);
      
      // 2. УВЕЛИЧЕННЫЙ СДВИГ (теперь карточка сильно уплывает за курсором — до 35 пикселей)
      const maxTranslate = 35;
      const translateX = (xPercent * maxTranslate).toFixed(2);
      const translateY = (yPercent * maxTranslate).toFixed(2);
      
      // Убираем задержку, чтобы карточка намертво привязалась к мышке
      card.style.transition = 'none';
      
      // Применяем сильную трансформацию
      card.style.transform = `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        rotateZ(-4deg) 
        scale(1.05)
      `;
    });

    // Когда курсор уходит — карточка плавно возвращается на исходную позицию
    card.addEventListener('mouseleave', () => {
      // Использован плавный «пружинящий» эффект возврата (0.7 секунды)
      card.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(-4deg) scale(1)';
    });
  }

  // Находим все элементы вопросов
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Проверяем, открыт ли уже этот вопрос
        const isOpen = item.classList.contains('active');
        
        // Закрываем все остальные вопросы (опционально, если хочешь чтобы только один был открыт)
        faqItems.forEach(el => el.classList.remove('active'));
        
        // Если вопрос был закрыт — открываем его
        if (!isOpen) {
            item.classList.add('active');
        }
    });
});


// 🛑 ВСТАВЬ СЮДА ССЫЛКУ, КОТОРУЮ СКОПИРОВАЛ ИЗ GOOGLE (в кавычках)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZ9d1X5QZHd3-aNiNRsIR7IR64gwmeOv4Cc23I8DmWttgVG-tUDaVBQlnHSgbQ0w_t/exec';

const tgForm = document.getElementById('tgForm');
const phoneInput = document.getElementById('phoneInput');
const tgStatus = document.getElementById('tgStatus');
const tgSubmitBtn = document.getElementById('tgSubmitBtn');

tgForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const contact = phoneInput.value.trim();

    if (contact === '') {
        tgStatus.style.color = '#ff4d4d';
        tgStatus.textContent = 'Введите Telegram или телефон';
        return;
    }

    tgSubmitBtn.disabled = true;
    tgSubmitBtn.textContent = 'Отправка...';
    tgStatus.textContent = '';

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Обходит любые проблемы с CORS в браузерах!
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: contact })
        });

        tgStatus.style.color = '#2ecc71';
        tgStatus.textContent = 'Заявка успешно отправлена!';
        tgForm.reset();

    } catch (error) {
        tgStatus.style.color = '#ff4d4d';
        tgStatus.textContent = 'Ошибка отправки заявки';
        console.error('Ошибка:', error);

    } finally {
        tgSubmitBtn.disabled = false;
        tgSubmitBtn.textContent = 'Получить расчет →';
    }
});

AOS.init({
  // Глобальная длительность анимации (600мс — золотая середина, быстро и плавно)
  duration: 600, 
  
  // Тип сглаживания (ease-out-cubic дает дорогой «динамический» финиш)
  easing: 'ease-out-cubic', 
  
  // Анимация срабатывает один раз и не дергается при скролле назад
  once: true, 
  
  // Отключение анимации на мобильных устройствах ( must-have для modern UI, 
  // так как на смартфонах вылеты часто лагают и раздражают пользователей)
  disable: 'mobile' 
});

