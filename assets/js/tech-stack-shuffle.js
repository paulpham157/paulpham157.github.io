document.addEventListener('DOMContentLoaded', function() {
    const techGrid = document.querySelector('.tech-grid');
    const techItems = Array.from(techGrid.children);
    
    // Hàm Fisher-Yates shuffle để sắp xếp ngẫu nhiên mảng
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Sắp xếp ngẫu nhiên các tech items
    const shuffledItems = shuffleArray(techItems);
    
    // Xóa các phần tử hiện tại
    techGrid.innerHTML = '';
    
    // Thêm lại các phần tử theo thứ tự ngẫu nhiên
    shuffledItems.forEach(item => {
        techGrid.appendChild(item);
    });
    
    // Thêm animation fade-in cho các items
    techItems.forEach((item, index) => {
        item.style.animation = `fadeIn 0.3s ease forwards ${index * 0.02}s`;
        item.style.opacity = '0';
    });
});

function updateTechStackCount() {
    const techItems = document.querySelectorAll('.tech-item');
    const techStackTitle = document.querySelector('.tech-stack h2');
    techStackTitle.textContent = `Tech Stack (${techItems.length})`;
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    updateTechStackCount();
    // ... existing code ...
}); 