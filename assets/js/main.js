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

// Timeline Tooltips và Modal
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const modal = document.getElementById('timelineModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image');
    const modalVideo = modal.querySelector('.modal-video');
    const modalDetails = modal.querySelector('.modal-details');
    const closeButton = modal.querySelector('.modal-close');

    // Thêm tooltips cho mỗi timeline item
    timelineItems.forEach(item => {
        const tooltip = document.createElement('div');
        tooltip.className = 'timeline-tooltip';
        tooltip.textContent = 'Nhấn để xem chi tiết';
        item.appendChild(tooltip);

        // Cập nhật vị trí tooltip khi hover
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            tooltip.style.left = e.clientX - rect.left + 'px';
            tooltip.style.top = e.clientY - rect.top - 30 + 'px';
        });
    });

    // Xử lý sự kiện click cho timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const position = item.querySelector('.position').textContent;
            const achievements = item.querySelector('.achievements').innerHTML;
            const date = item.querySelector('.timeline-date').textContent;

            // Giả lập dữ liệu media (thay thế bằng dữ liệu thực tế sau)
            const timelineData = getTimelineData(title);

            modalTitle.textContent = title;
            modalDetails.innerHTML = `
                <p class="modal-date">${date}</p>
                <p class="modal-position">${position}</p>
                <div class="modal-achievements">
                    ${achievements}
                </div>
                <div class="modal-description">
                    ${timelineData.description || ''}
                </div>
            `;

            // Hiển thị/ẩn media tùy thuộc vào dữ liệu có sẵn
            if (timelineData.image) {
                modalImage.src = timelineData.image;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            if (timelineData.video) {
                modalVideo.querySelector('source').src = timelineData.video;
                modalVideo.load();
                modalVideo.style.display = 'block';
            } else {
                modalVideo.style.display = 'none';
            }

            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Ngăn scroll khi modal mở
        });
    });

    // Đóng modal
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Khôi phục scroll
        modalVideo.pause(); // Dừng video nếu đang phát
    }

    // Hàm giả lập dữ liệu timeline (thay thế bằng dữ liệu thực tế sau)
    function getTimelineData(title) {
        const data = {
            'Samsung Vietnam Mobile Center (SVMC)': {
                image: 'assets/images/timeline/svmc.jpg',
                video: 'assets/videos/timeline/svmc.mp4',
                description: 'Trải nghiệm làm việc tại một trong những trung tâm nghiên cứu và phát triển lớn nhất của Samsung tại Việt Nam.'
            },
            'Comartek': {
                image: 'assets/images/timeline/comartek.jpg',
                video: 'assets/videos/timeline/comartek.mp4',
                description: 'Phát triển kỹ năng toàn diện trong vai trò IT Helpdesk và Web Developer.'
            },
            'EdooSmart': {
                image: 'assets/images/timeline/edoosmart.jpg',
                video: 'assets/videos/timeline/edoosmart.mp4',
                description: 'Khám phá và phát triển các ứng dụng AI trong giáo dục.'
            }
            // Thêm dữ liệu cho các mốc thời gian khác
        };
        return data[title] || {};
    }
});
