document.addEventListener('DOMContentLoaded', () => {
  const menuData = [
    {
      name: 'Salgados',
      icon: 'salgado.png',
      items: [
        { name: 'Calzone', price: '9,50' },
        { name: 'Coxinha', price: '9,50' },
        { name: 'Croissnat (Pizza | 4 Queijos | Presunto e Queijo)', price: '9,50' },
        { name: 'Esfiha de Carne | Calabresa', price: '9,00' },
        { name: 'Hamburguer C/ Mussarela', price: '11,50' },
        { name: 'Kibe', price: '8,50' },
        { name: 'Pastel De Frango', price: '9,50' },
        { name: 'Pastel Int. Brócolis Ou Ricota', price: '10,00' },
        { name: 'Pão De Batata', price: '8,00' },
        { name: 'Fohado De Presunto', price: '9,50' },
        { name: 'Pão De Queijo', price: '5,00' },
        { name: 'Lanche Natural', price: '19,00' },
        { name: 'Pão Francês', price: '5,00' },
        { name: 'Mini Pizza', price: '12,50' },
        { name: 'Torta De Frango', price: '11,50' }
      ]
    },
    {
      name: 'Cafeteria',
      icon: 'xicara.png',
      items: [
        { name: 'Café', price: '6,00' },
        { name: 'Cappuccino', price: '10,00' },
        { name: 'Média', price: '8,50' },
        { name: 'Chocolate Quente', price: '10,00' },
        { name: 'Machiato', price: '6,50' }
      ]
    },
    {
      name: 'Bebidas',
      icon: 'xicara.png',
      items: [
        { name: 'Água De Côco', price: '7,00' },
        { name: 'Água S/ Gás | C/ Gás', price: '5,00' },
        { name: 'Refrigerantes', price: '7,50' },
        { name: 'Chá Gelado Ice Tea', price: '9,50' },
        { name: 'Gatorade', price: '10,50' },
        { name: 'Greem People', price: '15,00' },
        { name: 'Iogurte', price: '5,00' },
        { name: 'Suco Del Vale', price: '8,50' },
        { name: 'Todinho', price: '6,00' },
        { name: 'Tônica', price: '7,50' },
        { name: 'Mini Refri', price: '5,00' },
        { name: 'Chá Quente', price: '6,00' }
      ]
    },
    {
      name: 'Comidinhas',
      icon: 'esfiha.png',
      items: [
        { name: 'Comida Brasileito (Pratos Rapidos)', price: '27,50' },
        { name: 'Cremes', price: '26,50' },
        { name: 'Prato Vegetariano', price: '40,00' },
        { name: 'Tapioca Básica', price: '7,00' },
        { name: 'Ovo', price: '13,00' }
      ]
    },
    {
      name: 'Doces',
      icon: 'bolo fatia.png',
      items: [
        { name: 'Halls', price: '4,00' },
        { name: 'Trident', price: '4,00' },
        { name: 'Povilho', price: '8,00' },
        { name: 'Bis', price: '7,00' },
        { name: 'Pururuca', price: '5,00' },
        { name: 'Chocolate 34g', price: '6,00' },
        { name: 'Chocolate 90g', price: '13,50' },
        { name: 'Salgadinho 40g', price: '4,00' },
        { name: 'Baton', price: '3,00' },
        { name: 'Suflair', price: '8,50' },
        { name: 'Paçoca', price: '1,20' },
        { name: 'Mix De Nuts', price: '17,00' },
        { name: 'Castanha', price: '17,00' },
        { name: 'Bolacha Recheada', price: '7,00' }
      ]
    },
    {
      name: 'Petit Four',
      icon: 'bolo decorado.png',
      items: [
        { name: 'Biscoito Petiti Four', price: '9,00' },
        { name: 'Jujuba', price: '7,00' },
        { name: 'Bolo Pedaço', price: '9,50' },
        { name: 'Torta Holandesa', price: '16,00' },
        { name: 'Bolo Festa', price: '16,00' },
        { name: 'Trufa', price: '5,50' },
        { name: 'Pirulito', price: '14,50' },
        { name: 'Tiramissu', price: '14,50' },
        { name: 'T. Morango E Maçã', price: '11,50' },
        { name: 'Quindim', price: '9,50' },
        { name: 'Donuts', price: '10,50' },
        { name: 'Salada De Frutas', price: '16,50' },
        { name: 'Frutas', price: '4,00' }
      ]
    },
    {
      name: 'Combo Promocional',
      icon: 'combo_promocional.png',
      items: [
        { name: 'Combo 1', price: '22,50', description: 'Pratos do dia (Feijoada)' },
        { name: 'Combo 2', price: '15,50', description: 'Cuscuz com ovo' },
        { name: 'Combo 3', price: '13,50', description: 'Torta de frango + mini refri' },
        { name: 'Combo 4', price: '18,50', description: 'Dolce Calabresa' },
        { name: 'Combo 5', price: '11,00', description: 'Café com leite médio + pão de queijo' },
        { name: 'Combo 6', price: '12,50', description: 'Cappuccino + pão de queijo' }
      ]
    }
  ];

  const sectors = ['Emergência', 'Trauma', 'Queimados', 'Cardiologia', 'UTI', 'Neurologia', 'Oncologia', 'Farmácia', 'Radiologia'];
  const cart = {};
  const qtyIndicators = {};

  function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuData.forEach(cat => {
      const block = document.createElement('div');
      block.className = 'category-block';
      block.innerHTML = `<h3><img src="images/${cat.icon}" class="category-icon"> ${cat.name}</h3>`;
      const list = document.createElement('div');
      cat.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-row';
        row.innerHTML = `
          <div><strong>${item.name}</strong><br><small>${item.description || ''}</small></div>
          <div>R$ ${item.price}</div>
          <button class="add-btn" onclick="addToCart('${item.name}', '${item.price}')">+</button>
          <span id="qty-${item.name.replace(/\s/g, '').replace(/[^\w]/g, '')}"></span>
        `;
        list.appendChild(row);
      });
      block.appendChild(list);
      menuContainer.appendChild(block);
    });
  }

  window.addToCart = (name, price) => {
    if (!cart[name]) cart[name] = { quantity: 1, price: price };
    else cart[name].quantity++;
    updateUI();
  };

  function updateUI() {
    let total = 0, count = 0;
    const itemsDiv = document.getElementById('cartItems');
    itemsDiv.innerHTML = '';

    Object.keys(cart).forEach(name => {
      const item = cart[name];
      const val = parseFloat(item.price.replace(',', '.')) * item.quantity;
      total += val;
      count += item.quantity;
      itemsDiv.innerHTML += `<p>${name} x ${item.quantity} - R$ ${item.price}</p>`;
      const span = document.getElementById(`qty-${name.replace(/\s/g, '').replace(/[^\w]/g, '')}`);
      if(span) span.textContent = item.quantity;
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2).replace('.', ',');
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cart-section').style.display = count > 0 ? 'block' : 'none';
    document.getElementById('cartButton').style.display = count > 0 ? 'block' : 'none';
  }

  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) return alert("Carrinho vazio!");
    
    let summary = "";
    Object.keys(cart).forEach(n => summary += `• ${n} (x${cart[n].quantity})<br>`);
    document.getElementById('order-summary').innerHTML = summary + `<br><strong>Total: R$ ${document.getElementById('cartTotal').textContent}</strong>`;
    document.getElementById('confirmation-modal').style.display = 'flex';
  });

  document.getElementById('confirm-whatsapp').onclick = () => {
    const name = document.getElementById('customerName').value;
    const room = document.getElementById('customerRoom').value;
    const sector = document.getElementById('customerSector').value;
    let msg = `*Pedido Dolce Café*\n\nCliente: ${name}\nSetor: ${sector} / Quarto: ${room}\n\n*Itens:*\n`;
    Object.keys(cart).forEach(n => msg += `- ${n} (x${cart[n].quantity})\n`);
    msg += `\n*Total: R$ ${document.getElementById('cartTotal').textContent}*`;
    
    window.open(`https://wa.me/5511918360016?text=${encodeURIComponent(msg)}`, '_blank');
    document.getElementById('confirmation-modal').style.display = 'none';
  };

  document.getElementById('cancel-order').onclick = () => document.getElementById('confirmation-modal').style.display = 'none';
  
  const secSel = document.getElementById('customerSector');
  sectors.forEach(s => secSel.innerHTML += `<option value="${s}">${s}</option>`);

  renderMenu();
});
