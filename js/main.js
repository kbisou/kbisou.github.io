(function () {
  'use strict';

  document.querySelectorAll('[data-current-year]').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  var menuButton = document.querySelector('.menu-button');
  var nav = document.querySelector('.global-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
  }

  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = {
    name: { input: document.getElementById('name'), message: 'お名前を入力してください。' },
    email: { input: document.getElementById('email'), message: 'メールアドレスを入力してください。' },
    message: { input: document.getElementById('message'), message: 'お問い合わせ内容を入力してください。' }
  };

  function setError(key, message) {
    var field = fields[key];
    document.getElementById(key + '-error').textContent = message || '';
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = null;

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      var value = field.input.value.trim();
      var message = value ? '' : field.message;
      if (key === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = '正しい形式のメールアドレスを入力してください。';
      }
      setError(key, message);
      if (message && !firstInvalid) firstInvalid = field.input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var result = document.getElementById('form-result');
    result.innerHTML = '<h2>お問い合わせありがとうございます。</h2><p>誠に申し訳ございませんが、<span class="service-pause-text">現在、新規の清掃依頼の受付を一時休止しております。</span></p><p>ご不便をおかけいたしますが、ご理解のほどよろしくお願いいたします。</p>';
    result.hidden = false;
    form.hidden = true;
    result.focus();
  });
}());
