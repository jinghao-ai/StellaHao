// 游戏卡片悬停效果
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
        card.style.border = '1px solid rgba(102, 192, 244, 0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        card.style.border = '1px solid rgba(102, 192, 244, 0.1)';
    });
});

// 导航链接效果
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// 按钮悬停效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 6px 20px rgba(102, 192, 244, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 15px rgba(102, 192, 244, 0.3)';
    });
});

// 购物车数量调整
document.querySelectorAll('.cart-quantity button').forEach(button => {
    button.addEventListener('click', () => {
        const quantitySpan = button.parentElement.querySelector('span');
        let quantity = parseInt(quantitySpan.textContent);
        
        if(button.textContent === '+' && quantity < 10) {
            quantity++;
        } else if(button.textContent === '-' && quantity > 1) {
            quantity--;
        }
        
        quantitySpan.textContent = quantity;
    });
});

// 移除购物车商品
document.querySelectorAll('.cart-item-remove button').forEach(button => {
    button.addEventListener('click', () => {
        const cartItem = button.closest('.cart-item');
        cartItem.style.opacity = '0';
        setTimeout(() => {
            cartItem.remove();
            updateCartTotal(); // 更新购物车总价
        }, 300);
    });
});

// 更新购物车总价
function updateCartTotal() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.discounted-price').textContent.replace('¥', ''));
        const quantity = parseInt(item.querySelector('.cart-quantity span').textContent);
        subtotal += price * quantity;
    });
    
    document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = `¥ ${subtotal.toFixed(2)}`;
    
    // 这里可以添加折扣计算逻辑
    const discount = subtotal > 300 ? 30 : 0;
    document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = `-¥ ${discount}`;
    
    document.querySelector('.summary-total span:last-child').textContent = `¥ ${(subtotal - discount).toFixed(2)}`;
}