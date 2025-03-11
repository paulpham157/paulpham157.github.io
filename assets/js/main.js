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
                    'assets/images/timeline/3.1.ikigai.png',
                ],
                description: 'Trong một lần vô tình xem được video về IKIGAI của diễn giả Lê Thẩm Dương, tôi đã tự hỏi bản thân thực sự cần và muốn làm gì trong cuộc đời. Từ đó, tôi đã thử qua nhiều công việc để tìm kiếm điều mà tôi thực sự yêu thích và muốn làm.'
            },
            "Comartek": {
                images: [
                    'assets/images/timeline/4.1.comartek.jpg',
                    'assets/images/timeline/4.2.comartek.jpg',
                    'assets/images/timeline/4.3.comartek.jpg',
                ],
                description: 'Bắt đầu với vị trí IT Helpdesk, sau đó tôi kiêm nhiệm thêm công việc phát triển và triển khai các website outsourcing. Vị trí IT Helpdesk được tiếp xúc với rất nhiều người trong, ngoài công ty. Từ nhân viên, quản lý tới khách hàng, đối tác; đủ các vị trí vai trò Dev, Tester, DevOps, PM, BA, CTO, COO, CEO, HR, Acountant... Có thể nói Comartek là công việc fulltime chính thức đầu tiên của tôi. Thời gian tiếp xúc với những con người ở đây đã cung cấp cho tôi một cái nhìn đa chiều, nhiều góc cạnh về các công việc, các giai đoạn xung quanh một dự án phần mềm.'
            },
            "EdooSmart (2023-2024)": {
                images: [
                    'assets/images/timeline/5.1.edoosmart.png',
                    'assets/images/timeline/5.2.edoosmart.png',
                ],
                description: 'EdooSmart là một đơn vị giúp cho việc học tập dễ dàng hơn. Ban đầu, tôi nhận dự án như bao job freelancer khác, tập trung vào xây dựng trang web và hệ thống học tập. Đến giai đoạn cuối 2022, đầu năm 2023, khi ChatGPT dần trở nên nổi tiếng; chúng tôi quan tâm tới việc nó có thể giúp ích tốt hơn cho các bạn học tập hay không. Từ đó, tôi đã bắt đầu những bước chân đầu tiên vào thế giới LLM và AI.'
            },
            "EdooTech": {
                images: [
                    'assets/images/timeline/7.1.edootech.jpg',
                    'assets/images/timeline/7.2.binh-dan-hoc-ai.jpeg',
                ],
                description: 'Chúng tôi đi sâu vào nghiên cứu RAG. Ngoài học hỏi từ một số open source như Dify, BotPress... chúng tôi tự phát triển hệ thống RAG thông qua framework Langchain. Team không phân biệt Backend hay Frontend, mỗi người đều làm full-stack dưới sự hướng dẫn của 1 tiến sĩ Computer Science người Úc. Ngoài ra, trong năm 2024, tôi tham gia vào cộng đồng Bình Dân Học AI và hưởng ứng các phòng trào ở đây. Nhờ đó tôi có nhiêu hiểu biết về big data, cách các hệ thống vận hành từ raw data đến biểu diễn trực quan hoá và cuối cùng dẫn đến quyết định của con người.'
            },
            "Công ty cổ phần giải pháp thanh toán Việt Tín": {
                images: [
                    'assets/images/timeline/6.1.viettin.JPG',
                    'assets/images/timeline/6.2.viettin.JPG',
                    'assets/images/timeline/6.3.viettin.JPG',
                ],
                description: 'Tôi bắt đầu công việc tại phòng IT với vai trò Automation Test Engineer. Tôi đã từng làm việc với các công cụ như Selenium, Appium, Postman, CodeceptJS... để tự động hóa các test case cho các dự án của công ty. Bên cạnh đó tôi cũng quản lý mạng, hạ tầng, cung cấp hỗ trợ cho các phòng khác trong công ty. Giai đoạn năm 2024, tôi đề xuất các giải pháp, công cụ AI mà tôi đã tìm hiểu và đang sử dụng; đồng thời tham gia phát triển AI nhằm áp dụng trong sản phẩm chính.'
            },
            "EdooSmart (2025)": {
                images: [
                    'assets/images/timeline/8.1.edoosmart.jpg',
                ],
                description: 'Bén duyên với EdooSmart từ cuối 2022, tôi nhận thấy việc học luôn luôn cần thiết, bất kể ngoài kia có bao nhiêu công cụ AI mới ra đời mỗi ngày. Chúng ta cần học cách sử dụng chúng hiệu quả. Chúng ta cần học cách áp dụng chúng cho công việc. Ví dụ dev, thay vì code tay 10 tiếng thì có thể sử dụng Cursor như tôi để giảm thời gian xuống còn 1 tiếng. Tất nhiên, việc biết sử dụng công cụ không hề đơn giản, việc này cũng cần phải học. Với kỹ năng tốt nhất của mình là "Kỹ năng tự học", cộng với khả năng sử dụng công cụ AI tìm kiếm, tổng hợp, phân loại kiến thức như Perplexity, tôi tin rằng tôi sẽ tiến lên rất nhanh (thực tế là trước năm 2023, hiểu biết của tôi chỉ ở mức tiệm cận junior; chỉ sau 2 năm tìm hiểu và sử dụng AI, mức độ hiểu biết của tôi đã được mở rộng và đào sâu rất nhiều).'
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

// Lazy Loading for Showcase iframes
document.addEventListener('DOMContentLoaded', function() {
    const lazyIframes = document.querySelectorAll('.lazy-iframe');
    
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.dataset.src;
                    
                    // Load the iframe
                    iframe.src = src;
                    
                    // Add loaded class when iframe is loaded
                    iframe.addEventListener('load', () => {
                        iframe.classList.add('loaded');
                        // Hide loading animation
                        const loadingAnimation = iframe.parentElement.querySelector('.loading-animation');
                        if (loadingAnimation) {
                            loadingAnimation.style.display = 'none';
                        }
                    });

                    // Remove observer after loading
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };
    
    // Apply lazy loading to all showcase iframes
    lazyIframes.forEach(lazyLoad);
});

// Showcase Modal Handling
const projectUrls = {
    'edoosmart': 'assets/images/showcase/EdooSmart.jpeg',
    'edoosmart-practice': 'https://practice.edoosmart.com',
    'woywoy': 'https://woywoystaycation.com.au',
    'comartek': 'https://comartek.com',
    'edoosmart-app': 'assets/images/showcase/EdooSmartApp.jpeg',
    'berempah': 'assets/images/showcase/Berempah.jpeg',
    'artisan': 'assets/images/showcase/ArtisanAura.jpeg',
    'duongminhthong': 'https://duongminhthong.vn/phap-ly-va-dau-tu-bds630653',
    'gcc': 'https://gccbusiness.com.au'
};

// Thêm object mới để xác định loại nội dung (image hoặc iframe)
const projectTypes = {
    'edoosmart': 'image',
    'edoosmart-practice': 'iframe',
    'woywoy': 'iframe',
    'comartek': 'iframe',
    'edoosmart-app': 'image',
    'berempah': 'image',
    'artisan': 'image',
    'duongminhthong': 'iframe',
    'gcc': 'iframe'
};

const projectTitles = {
    'edoosmart': 'EdooSmart - CPA Program Learning Platform',
    'edoosmart-practice': 'EdooSmart Practice - Learning Management System',
    'woywoy': 'Woy Woy Staycation - Luxury Vacation Rental',
    'comartek': 'Comartek - IT Solutions Provider',
    'edoosmart-app': 'EdooSmart Mobile App',
    'berempah': 'Berempah Malaysian Restaurant',
    'artisan': 'Artisan Aura Deco',
    'duongminhthong': 'Dương Minh Thông - Pháp lý Bất Động Sản',
    'gcc': 'GCC Business - Business Solutions'
};

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('showcase-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalClose = modal.querySelector('.modal-close');
    const iframe = modal.querySelector('iframe');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const embedContainer = modal.querySelector('.embed-container');

    // Xử lý click vào showcase item
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.dataset.project;
            const projectUrl = projectUrls[projectId];
            const projectTitle = projectTitles[projectId];
            const projectType = projectTypes[projectId];

            modalTitle.textContent = projectTitle;
            
            // Xóa nội dung cũ
            embedContainer.innerHTML = '';
            
            if (projectType === 'image') {
                // Hiển thị hình ảnh
                const img = document.createElement('img');
                img.src = projectUrl;
                img.style.width = '100%';
                img.style.maxWidth = 'none';
                img.style.height = 'auto';
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // Thêm container cho ảnh với khả năng scroll
                const imgContainer = document.createElement('div');
                imgContainer.style.width = '100%';
                imgContainer.style.height = '100%';
                imgContainer.style.overflowY = 'auto';
                imgContainer.style.overflowX = 'hidden';
                
                // Thêm loading animation
                const loading = document.createElement('div');
                loading.className = 'loading-animation';
                loading.innerHTML = `
                    <div class="dots-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Đang tải...</p>
                `;
                
                imgContainer.appendChild(img);
                embedContainer.appendChild(loading);
                embedContainer.appendChild(imgContainer);
                
                // Xử lý khi ảnh load xong
                img.onload = function() {
                    loading.style.display = 'none';
                    img.style.opacity = '1';
                };
            } else {
                // Hiển thị iframe như bình thường
                const iframe = document.createElement('iframe');
                iframe.className = 'lazy-iframe';
                iframe.loading = 'lazy';
                iframe.frameBorder = '0';
                iframe.src = projectUrl;
                
                const loading = document.createElement('div');
                loading.className = 'loading-animation';
                loading.innerHTML = `
                    <div class="dots-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Đang tải...</p>
                `;
                
                embedContainer.appendChild(loading);
                embedContainer.appendChild(iframe);
                
                iframe.addEventListener('load', function() {
                    loading.style.display = 'none';
                    this.classList.add('loaded');
                });
            }
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Xử lý đóng modal
    modalClose.addEventListener('click', closeModal);

    // Đóng modal khi click ra ngoài
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Xử lý phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        embedContainer.innerHTML = ''; // Xóa nội dung khi đóng modal
    }
});
