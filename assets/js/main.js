// Timeline scroll animation
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleTimelineAnimation();
});

// Tech Stack Load More
document.addEventListener('DOMContentLoaded', function() {
    const techGrid = document.querySelector('.tech-grid');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const itemsPerLoad = 12; // Số lượng items hiển thị mỗi lần
    let currentlyShown = 0;

    // Ẩn tất cả các tech items ban đầu
    const techItems = Array.from(techGrid.children);
    techItems.forEach((item, index) => {
        if (index >= itemsPerLoad) {
            item.classList.add('hidden');
        }
    });

    currentlyShown = Math.min(itemsPerLoad, techItems.length);

    // Cập nhật trạng thái nút "Xem thêm"
    function updateLoadMoreButton() {
        if (currentlyShown >= techItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    // Xử lý sự kiện click nút "Xem thêm"
    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = techItems.slice(currentlyShown, currentlyShown + itemsPerLoad);
        
        hiddenItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hidden');
            }, index * 100); // Thêm delay để tạo hiệu ứng
        });

        currentlyShown += hiddenItems.length;
        updateLoadMoreButton();
    });

    // Khởi tạo trạng thái ban đầu của nút
    updateLoadMoreButton();
});

// Tính tuổi dựa trên năm sinh 1996
document.addEventListener('DOMContentLoaded', function() {
    const birthYear = 1996;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    document.getElementById('age-value').textContent = age;
});
