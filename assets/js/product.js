/* Local catalog details; all values come from the curated data file. */
const productId = new URLSearchParams(location.search).get('id');
const product = window.SITE_PRODUCTS.find(item => item.id === productId) || window.SITE_PRODUCTS[0];
const setText = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
const make = (tag, value, className) => {
  const node = document.createElement(tag);
  if (value) node.textContent = value;
  if (className) node.className = className;
  return node;
};
document.title = product.model + ' ' + product.name + ' | 萨玛尼家具 · 梵窝 VANVO（Samanni Furniture）';
setText('dTitle', product.name);
setText('dCrumbName', product.model);
setText('dSeries', product.model + ' · ' + product.series);
setText('dDesc', product.desc);
setText('dImageNote', product.imageNote);
setText('dSource', '信息来源：' + product.source + ' 画册第 ' + product.sourcePage + ' 页。' + product.unitNote);
setText('dCrumbCat', product.series);
document.getElementById('dCrumbCat').href = 'products.html#' + product.cat;
document.getElementById('mainImg').src = product.img;
document.getElementById('mainImg').alt = product.model + ' ' + product.name;
for (const [id, values] of [['dSizes', [product.dimensions]], ['dColors', product.colors]]) {
  const group = document.getElementById(id);
  group.replaceChildren();
  for (const [index, value] of values.entries()) {
    const button = make('button', value, 'sku' + (index === 0 ? ' on' : ''));
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(item => {
        item.classList.toggle('on', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
    group.append(button);
  }
}
const rows = [
  ['产品型号', product.model], ['产品名称', product.name],
  ['画册原标尺寸', product.dimensions], ['尺寸说明', product.unitNote],
  ['面料及色号', '[待补充：可选面料及色号]'],
  ['产品报价', product.priceLabel],
  ['画册来源', product.source + ' 第 ' + product.sourcePage + ' 页']
];
const tbody = document.createElement('tbody');
rows.forEach(([label, value]) => {
  const tr = document.createElement('tr');
  const th = make('th', label); th.scope = 'row';
  tr.append(th, make('td', value)); tbody.append(tr);
});
document.getElementById('dSpecs').replaceChildren(tbody);
const queryProduct = new URLSearchParams({ product: product.model + ' ' + product.name });
document.getElementById('dConsult').href = 'contact.html?' + queryProduct.toString() + '#form';
