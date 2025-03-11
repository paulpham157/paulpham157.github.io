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
    let slideInterval; // Biến để theo dõi interval
    let currentTimelineData; // Biến để lưu trữ dữ liệu timeline hiện tại

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

            currentTimelineData = getTimelineData(title);
            currentImageIndex = 0;

            modalTitle.textContent = title;
            modalDetails.innerHTML = `
                <p class="modal-date">${date}</p>
                <p class="modal-position">${position}</p>
                <div class="modal-archv">
                    ${achievements}
                </div>
                <div class="modal-description">
                    ${currentTimelineData.description || ''}
                </div>
            `;

            // Hiển thị ảnh đầu tiên và bắt đầu slideshow
            if (currentTimelineData.images && currentTimelineData.images.length > 0) {
                showImage(0, currentTimelineData);
                startSlideshow();
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            // Xử lý video
            if (currentTimelineData.video) {
                modalVideo.querySelector('source').src = currentTimelineData.video;
                modalVideo.load();
                modalVideo.style.display = 'block';
            } else {
                modalVideo.style.display = 'none';
            }

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Đóng modal
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-prev')) {
            e.stopPropagation();
            stopSlideshow(); // Dừng slideshow khi người dùng điều hướng thủ công
            showImage(currentImageIndex - 1, currentTimelineData);
        } else if (e.target.classList.contains('gallery-next')) {
            e.stopPropagation();
            stopSlideshow(); // Dừng slideshow khi người dùng điều hướng thủ công
            showImage(currentImageIndex + 1, currentTimelineData);
        } else if (e.target === modal) {
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
        stopSlideshow(); // Dừng slideshow khi đóng modal
    }

    // Hàm bắt đầu slideshow
    function startSlideshow() {
        stopSlideshow(); // Dừng slideshow hiện tại nếu có
        if (currentTimelineData.images && currentTimelineData.images.length > 1) {
            slideInterval = setInterval(() => {
                showImage(currentImageIndex + 1, currentTimelineData);
            }, 3000);
        }
    }

    // Hàm dừng slideshow
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Thêm sự kiện hover cho modal-image
    modalImage.addEventListener('mouseenter', stopSlideshow);
    modalImage.addEventListener('mouseleave', startSlideshow);

    // Hàm giả lập dữ liệu timeline (thay thế bằng dữ liệu thực tế sau)
    function getTimelineData(title) {
        const data = {
            'Samsung Vietnam Mobile Center (SVMC)': {
                images: [
                    'assets/images/timeline/1.1.svmc-thi-tuyen.png',
                    'assets/images/timeline/1.2.svmc-thuc-tap.png',
                ],
                description: 'Trải nghiệm làm việc tại một trong những trung tâm nghiên cứu và phát triển lớn nhất của Samsung tại Việt Nam. Đặt cột mốc cho cái nhìn đầu tiên của tôi về ngành phát triển phần mềm.'
            },
            'Đại học Công nghiệp Hà Nội': {
                images: [
                    'assets/images/timeline/2.1.bao-cao-tot-nghiep.png',
                    'assets/images/timeline/2.2.tot-nghiep.jpg',
                    'assets/images/timeline/2.3.tot-nghiep.jpg',
                ],
                description: 'Đại học là quãng thời gian khá dài cho những kiến thức hàn lâm. Tuy không phải là chuyên ngành lập trình phần mềm nhưng những môn học như toán cao cấp, lập trình nhúng, điều khiển tự động hoá... khiến tôi nhận ra rằng cần kiên trì học hỏi và tìm tòi thì mới có kết quả. Từ đó, xây dựng cho tôi nền tảng về kỹ năng mà tôi cho là tốt nhất trong tất cả các kỹ năng: "Kỹ năng tự học".'
            },
            "Khám phá IKIGAI bản thân": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
            "Comartek": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
            "EdooSmart": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
            "Công ty cổ phần giải pháp thanh toán Việt Tín": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
            "EdooTech": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
            "EdooSmart": {
                images: [
                    'assets/images/timeline/',
                ],
                description: ''
            },
        };
        return data[title] || {};
    }

    // Thêm biến để theo dõi gallery
    let currentImageIndex = 0;

    // Hàm hiển thị ảnh trong gallery
    function showImage(index, timelineData) {
        const images = timelineData.images || [];
        if (images.length === 0) return;

        // Đảm bảo index nằm trong khoảng hợp lệ
        currentImageIndex = (index + images.length) % images.length;
        modalImage.src = images[currentImageIndex];

        // Tạo hoặc cập nhật container cho bullets
        let bulletContainer = modal.querySelector('.gallery-bullets');
        if (!bulletContainer) {
            bulletContainer = document.createElement('div');
            bulletContainer.className = 'gallery-bullets';
            modalImage.insertAdjacentElement('afterend', bulletContainer);
        }

        // Cập nhật bullets
        bulletContainer.innerHTML = '';
        images.forEach((_, idx) => {
            const bullet = document.createElement('span');
            bullet.className = `gallery-bullet ${idx === currentImageIndex ? 'active' : ''}`;
            bullet.addEventListener('click', () => {
                stopSlideshow();
                showImage(idx, currentTimelineData);
            });
            bulletContainer.appendChild(bullet);
        });

        // Cập nhật UI của gallery
        const galleryIndicator = modal.querySelector('.gallery-indicator');
        if (galleryIndicator) {
            galleryIndicator.textContent = `${currentImageIndex + 1}/${images.length}`;
        }

        // Hiển thị/ẩn nút điều hướng
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');
        if (prevBtn && nextBtn) {
            prevBtn.style.display = images.length > 1 ? 'block' : 'none';
            nextBtn.style.display = images.length > 1 ? 'block' : 'none';
        }
    }
});
