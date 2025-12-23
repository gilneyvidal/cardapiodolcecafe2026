document.addEventListener('DOMContentLoaded', () => {
    // Mesma estrutura de dados do cardápio anterior
    const menuData = [
        { name: 'Salgados', icon: 'salgado.png', items: [{ name: 'Calzone', price: '9,50' }, { name: 'Coxinha', price: '9,50' }, { name: 'Pão de Queijo', price: '5,00' }] },
        { name: 'Cafeteria', icon: 'xicara.png', items: [{ name: 'Café', price: '6,00' }, { name: 'Cappuccino', price: '10,00' }] },
        { name: 'Combos', icon: 'combo_promocional.png', items: [{ name: 'Combo 5', price: '11,00', description: 'Café com leite + pão de queijo' }] }
    ];

    const sectors = ['Emergência', 'UTI', 'Neurologia', 'Oncologia', 'Quarto Comum'];
    const cart = {};
    const qtyIndicators = {};

    function renderMenu() {
        const container = document.getElementById('menu');
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
                    <span id="qty-${item.name.replace(/\s/g, '')}"></span>
                `;
                list.appendChild(row);
            });
            block.appendChild(list);
            container.appendChild(block);
        });
    }

    window.addToCart = (name, price) => {
        if (!cart[name]) cart[name] = { quantity: 1, price: price };
        else cart[name].quantity++;
        updateUI();
    };

    function updateUI() {
        let total = 0;
        let count = 0;
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        Object.keys(cart).forEach(name => {
            const item = cart[name];
            total += parseFloat(item.price.replace(',', '.')) * item.quantity;
            count += item.quantity;
            cartItems.innerHTML += `<p>${name} x ${item.quantity} - R$ ${item.price}</p>`;
            const ind = document.getElementById(`qty-${name.replace(/\s/g, '')}`);
            if(ind) ind.textContent = item.quantity;
        });

        document.getElementById('cartTotal').textContent = total.toFixed(2).replace('.', ',');
        document.getElementById('cartCount').textContent = count;
        document.getElementById('cart-section').style.display = count > 0 ? 'block' : 'none';
        document.getElementById('cartButton').style.display = count > 0 ? 'block' : 'none';
    }

    // Lógica do Modal de Confirmação
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', e => {
        e.preventDefault();
        const summary = document.getElementById('order-summary');
        let textSummary = "";
        Object.keys(cart).forEach(n => textSummary += `• ${n} (x${cart[n].quantity})<br>`);
        
        summary.innerHTML = `
            <strong>Seu Pedido:</strong><br>${textSummary}
            <br><strong>Total: R$ ${document.getElementById('cartTotal').textContent}</strong>
            <br><br><strong>Entrega em:</strong> ${document.getElementById('customerSector').value} - Quarto ${document.getElementById('customerRoom').value}
        `;
        document.getElementById('confirmation-modal').style.display = 'flex';
    });

    document.getElementById('cancel-order').onclick = () => document.getElementById('confirmation-modal').style.display = 'none';

    document.getElementById('confirm-whatsapp').onclick = () => {
        const name = document.getElementById('customerName').value;
        const room = document.getElementById('customerRoom').value;
        const sector = document.getElementById('customerSector').value;
        let msg = `Olá! Pedido de ${name}\nSetor: ${sector} / Quarto: ${room}\n\n`;
        Object.keys(cart).forEach(n => msg += `- ${n} (x${cart[n].quantity})\n`);
        msg += `\nTotal: R$ ${document.getElementById('cartTotal').textContent}`;
        
        window.open(`https://wa.me/5511918360016?text=${encodeURIComponent(msg)}`, '_blank');
        document.getElementById('confirmation-modal').style.display = 'none';
    };

    // Popular setores
    const secSelect = document.getElementById('customerSector');
    sectors.forEach(s => secSelect.innerHTML += `<option value="${s}">${s}</option>`);

    renderMenu();
});
