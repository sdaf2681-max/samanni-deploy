/* Shared, dependency-free interactions. No analytics or remote requests. */
const menuButton = document.querySelector('#menuToggle');
const navigation = document.querySelector('#navLinks');
function closeNavigation() {
  navigation?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
const dropdownButton = document.querySelector('.dropdown-toggle');
dropdownButton?.addEventListener('click', () => {
  const open = dropdownButton.parentElement.classList.toggle('dropdown-open');
  dropdownButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeNavigation();
    dropdownButton?.parentElement.classList.remove('dropdown-open');
    dropdownButton?.setAttribute('aria-expanded', 'false');
    if (document.activeElement?.closest('.dropdown')) dropdownButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) {
    closeNavigation();
    dropdownButton?.parentElement.classList.remove('dropdown-open');
    dropdownButton?.setAttribute('aria-expanded', 'false');
  }
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('on', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-scene]').forEach(card => {
      card.hidden = button.dataset.filter !== '全部' && button.dataset.filter !== card.dataset.scene;
    });
  });
});
document.querySelector('#leadForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const body = ['家居搭配咨询', ...['name','phone','product','scene','message'].map((key, i) =>
    ['称呼','电话','意向产品','使用场景','空间情况与需求'][i] + '：' + values.get(key))].join('\n');
  location.href = 'mailto:1051395482@qq.com?subject=' + encodeURIComponent('萨玛尼家具 · 梵窝 VANVO · 家居搭配咨询') + '&body=' + encodeURIComponent(body);
  const status = document.querySelector('#formErr');
  status.setAttribute('role', 'status');
  status.hidden = false;
  status.style.display = 'block';
  status.style.color = 'var(--plum-700)';
  status.textContent = '已请求打开邮件客户端，请在邮件中确认发送。若未打开，请拨打 13346537791。';
});

const requestedProduct = new URLSearchParams(location.search).get('product');
const interestSelect = document.querySelector('#contact-product');
if (requestedProduct && interestSelect) {
  const option = document.createElement('option');
  option.textContent = requestedProduct;
  option.value = requestedProduct;
  option.selected = true;
  interestSelect.prepend(option);
}
