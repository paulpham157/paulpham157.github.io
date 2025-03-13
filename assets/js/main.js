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
                description: 'Bắt đầu với vị trí IT Helpdesk, sau đó tôi kiêm nhiệm thêm công việc phát triển và triển khai các website outsourcing. Vị trí IT Helpdesk được tiếp xúc với rất nhiều người trong, ngoài công ty. Từ nhân viên, quản lý tới khách hàng, đối tác; đủ các vị trí vai trò Dev, Tester, DevOps, PM, BA, CTO, COO, CEO, HR, Acountant, Sales, Marketing... Có thể nói Comartek là công việc fulltime chính thức đầu tiên của tôi. Thời gian tiếp xúc với những con người ở đây đã cung cấp cho tôi một cái nhìn đa chiều, nhiều góc cạnh về các công việc, các giai đoạn xung quanh một dự án phần mềm. Từ ý tưởng đến khi ra sản phẩm và cần phải SEO như nào.'
            },
            "EdooSmart (2023-2024)": {
                images: [
                    'assets/images/timeline/5.1.edoosmart.png',
                    'assets/images/timeline/5.2.edoosmart.png',
                ],
                description: 'EdooSmart là đơn vị tiên phong trong việc ứng dụng công nghệ để tối ưu hóa trải nghiệm học tập. Khởi đầu như một dự án freelance thông thường, tôi tập trung phát triển nền tảng web và hệ thống quản lý học tập. Tuy nhiên, sự xuất hiện và phát triển mạnh mẽ của ChatGPT vào cuối năm 2022, đầu năm 2023 đã mở ra một hướng đi mới đầy tiềm năng. Nhận thấy cơ hội to lớn trong việc tích hợp AI để nâng cao hiệu quả học tập, chúng tôi đã quyết định đầu tư nghiên cứu về các mô hình ngôn ngữ lớn (LLM) và trí tuệ nhân tạo. Đây chính là những bước đi đầu tiên trong hành trình khám phá AI nói chung và LLM nói riêng của tôi.'
            },
            "EdooTech": {
                images: [
                    'assets/images/timeline/7.1.edootech.jpg',
                    'assets/images/timeline/7.2.binh-dan-hoc-ai.jpeg',
                ],
                description: 'Chúng tôi tập trung nghiên cứu và phát triển hệ thống RAG (Retrieval Augmented Generation) sử dụng framework Langchain, kết hợp với việc học hỏi từ các dự án mã nguồn mở như Dify và BotPress. Dưới sự dẫn dắt của một thạc sĩ Computer Science người Úc, team chúng tôi làm việc theo mô hình full-stack, xoá bỏ ranh giới giữa Backend và Frontend. Song song với công việc, tôi tích cực tham gia cộng đồng Bình Dân Học AI trong năm 2024, mở rộng kiến thức về việc ứng dụng AI kết hợp với big data. Qua đó, tôi hiểu sâu sắc về quy trình xử lý dữ liệu từ nguồn thô, chuyển hoá thành các biểu diễn trực quan, hỗ trợ con người đưa ra những quyết định chính xác và hiệu quả.'
            },
            "Công ty cổ phần giải pháp thanh toán Việt Tín": {
                images: [
                    'assets/images/timeline/6.1.viettin.JPG',
                    'assets/images/timeline/6.2.viettin.JPG',
                    'assets/images/timeline/6.3.viettin.JPG',
                ],
                description: 'Với vai trò Automation Test Engineer tại phòng IT, tôi đã xây dựng và triển khai các giải pháp tự động hóa kiểm thử toàn diện sử dụng đa dạng công nghệ như Selenium, Appium, Postman và CodeceptJS kết hợp với Jenkins tạo luồng CI/CD tự động kiểm thử trên macbook, android, ios mỗi ngày. Song song với việc tối ưu quy trình kiểm thử, tôi còn đảm nhiệm quản lý hạ tầng mạng và cung cấp giải pháp công nghệ cho các phòng ban khác trong công ty. Đặc biệt trong năm 2024, tôi đã liên tục sharing các công cụ AI mà tôi đã tìm hiểu và đang sử dụng cho mọi người. Quý 3,4 năm 2024, tôi tham gia team AI, nghiên cứu và phát triển công nghệ AI tiên tiến vào các sản phẩm của công ty.'
            },
            "EdooSmart (2025)": {
                images: [
                    'assets/images/timeline/8.1.edoosmart.jpg',
                ],
                description: 'Hành trình với EdooSmart từ cuối 2022 đã cho tôi một góc nhìn sâu sắc về tầm quan trọng của việc học tập liên tục trong kỷ nguyên AI. Dù công nghệ có phát triển nhanh đến đâu, việc học vẫn luôn là nền tảng không thể thiếu. Điều quan trọng là biết tận dụng các công cụ AI một cách thông minh để nâng cao hiệu suất công việc. Ví dụ trong lập trình, việc sử dụng Cursor IDE có thể giúp tôi rút ngắn thời gian coding từ 10 giờ xuống còn 1 giờ. Tuy nhiên, để làm chủ được các công cụ này cũng đòi hỏi một quá trình học hỏi nghiêm túc. Với nền tảng "kỹ năng tự học" vững chắc, kết hợp cùng khả năng khai thác các công cụ AI như Perplexity để tìm kiếm và tổng hợp kiến thức, tôi đã có những bước tiến vượt bậc. Từ một developer cấp độ junior vào năm 2023, chỉ sau 2 năm làm việc và nghiên cứu về AI, kiến thức và kỹ năng của tôi đã phát triển vượt trội cả về chiều rộng lẫn chiều sâu.'
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
    'edoosmart-practice': 'assets/images/showcase/EdoosmarPractice.png',
    'woywoy': 'assets/images/showcase/WoyWoyStaycation.png',
    'comartek': 'assets/images/showcase/Comartek.jpeg',
    'edoosmart-app': 'assets/images/showcase/EdooSmartApp.jpeg',
    'berempah': 'assets/images/showcase/Berempah.jpeg',
    'artisan': 'assets/images/showcase/ArtisanAura.jpeg',
    'duongminhthong': 'https://duongminhthong.vn/phap-ly-va-dau-tu-bds630653',
    'gcc': 'assets/images/showcase/gcc.jpeg'
};

// Thêm object mới để xác định loại nội dung (image hoặc iframe)
const projectTypes = {
    'edoosmart': 'image',
    'edoosmart-practice': 'image',
    'woywoy': 'image',
    'comartek': 'image',
    'edoosmart-app': 'image',
    'berempah': 'image',
    'artisan': 'image',
    'duongminhthong': 'iframe',
    'gcc': 'image'
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

document.addEventListener('DOMContentLoaded', () => {
    const trialButtons = document.querySelectorAll('.trial-button');

    trialButtons.forEach(button => {
        // Loại bỏ tất cả các event listener có thể tồn tại trước đó
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function handleButtonClick() {
            const demoId = this.getAttribute('data-demo');
            const demoIframeContainer = document.getElementById(demoId);
            const demoPreview = this.closest('.demo-preview');
            
            // Kiểm tra xem nút đang ở trạng thái nào
            if (this.classList.contains('close-demo')) {
                // Đang ở trạng thái "Đóng demo" - thực hiện đóng iframe
                demoIframeContainer.classList.remove('active');
                
                // Lưu giữ tham chiếu đến các phần tử
                const currentButton = this;
                const originalButtonText = demoId === 'demo-2' ? 
                    'Dùng thử (các đối tượng 3D cần nhiều tài nguyên để tải, vui lòng chờ đợi ít phút sau khi nhấn)' : 
                    'Dùng thử';
                
                // Sau khi animation kết thúc, ẩn container và khôi phục button
                setTimeout(() => {
                    demoIframeContainer.style.display = 'none';
                    currentButton.innerHTML = originalButtonText;
                    currentButton.classList.remove('loaded', 'close-demo');
                    demoPreview.classList.remove('expanded');
                }, 500);
                
                return; // Dừng thực thi sớm để không mở lại demo
            }
            
            // Tiếp tục với hành vi mở demo bình thường nếu nút không ở trạng thái đóng
            if (demoIframeContainer) {
                // Lưu lại text ban đầu của nút
                const originalText = this.innerHTML;
                
                // Hiển thị hiệu ứng loading trong button
                this.innerHTML = `
                    <div class="dots-animation" style="margin: 0;">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                this.disabled = true;

                // Hiệu ứng mở rộng section demo
                if (demoPreview) {
                    demoPreview.classList.add('expanded');
                }

                // Loại bỏ container loading cũ nếu có
                const oldLoadingContainer = demoIframeContainer.querySelector('.dots-animation-container');
                if (oldLoadingContainer) {
                    oldLoadingContainer.remove();
                }

                // Thêm container loading cho iframe
                const loadingContainer = document.createElement('div');
                loadingContainer.className = 'dots-animation-container';
                loadingContainer.innerHTML = `
                    <div class="dots-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="loading-text">Đang tải demo...</div>
                `;
                demoIframeContainer.appendChild(loadingContainer);

                // Hiển thị container iframe với hiệu ứng
                setTimeout(() => {
                    demoIframeContainer.style.display = 'block';
                    
                    // Thêm class active sau delay nhỏ để có hiệu ứng animation
                    setTimeout(() => {
                        demoIframeContainer.classList.add('active');
                    }, 50);
                    
                    // Lấy iframe trong container
                    const iframe = demoIframeContainer.querySelector('iframe');
                    
                    // Đảm bảo iframe đã được tạo
                    if (iframe) {
                        // Xử lý sự kiện khi iframe đã tải xong
                        iframe.addEventListener('load', function() {
                            // Ẩn loading
                            if (loadingContainer && loadingContainer.parentNode) {
                                loadingContainer.remove();
                            }
                            
                            // Khôi phục nút với văn bản và biểu tượng mới
                            newButton.innerHTML = `Đã tải xong <i class="fas fa-check"></i>`;
                            newButton.disabled = false;
                            
                            // Thêm class để hiển thị đã hoàn thành
                            newButton.classList.add('loaded');
                            
                            // Sau 2 giây, bắt đầu chuyển cảnh sang nút đóng một cách mượt mà
                            setTimeout(() => {
                                // Bắt đầu hiệu ứng fade-out
                                newButton.style.opacity = '0';
                                
                                // Sau khi fade out hoàn tất, thay đổi nội dung và bắt đầu thay đổi vị trí
                                setTimeout(() => {
                                    // Thay đổi nội dung nút
                                    newButton.innerHTML = `<i class="fas fa-times"></i>`;
                                    newButton.classList.add('close-demo');
                                    
                                    // Áp dụng transition cho thuộc tính transform và position
                                    setTimeout(() => {
                                        // Hiển thị nút với hiệu ứng fade-in ở vị trí mới
                                        newButton.style.opacity = '1';
                                    }, 50);
                                }, 300);
                            }, 2000);
                        });

                        // Xử lý trường hợp iframe không tải được sau 20 giây
                        const timeoutId = setTimeout(() => {
                            if (!iframe.classList.contains('loaded')) {
                                if (loadingContainer && loadingContainer.parentNode) {
                                    loadingContainer.innerHTML = `
                                        <div class="loading-text" style="color: #ff5252;">
                                            <i class="fas fa-exclamation-triangle"></i> 
                                            Không thể tải demo. Vui lòng thử lại sau.
                                        </div>
                                    `;
                                }
                                
                                newButton.innerHTML = originalText;
                                newButton.disabled = false;
                            }
                        }, 20000);
                        
                        // Clear timeout khi iframe tải xong
                        iframe.addEventListener('load', () => {
                            clearTimeout(timeoutId);
                            iframe.classList.add('loaded');
                        });
                    } else {
                        // Xử lý trường hợp không tìm thấy iframe
                        if (loadingContainer && loadingContainer.parentNode) {
                            loadingContainer.innerHTML = `
                                <div class="loading-text" style="color: #ff5252;">
                                    <i class="fas fa-exclamation-triangle"></i> 
                                    Có lỗi xảy ra. Vui lòng thử lại sau.
                                </div>
                            `;
                        }
                        
                        newButton.innerHTML = originalText;
                        newButton.disabled = false;
                    }
                }, 800);
            }
        });
    });
});

// Partners Section
document.addEventListener('DOMContentLoaded', function() {
    const partnerItems = document.querySelectorAll('.partner-item');
    
    partnerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.partner-logo');
            logo.style.transform = 'scale(1.1)';
            logo.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.partner-logo');
            logo.style.transform = 'scale(1)';
        });
        
        // Add click event to copy coupon code to clipboard when clicked
        const strongTags = item.querySelectorAll('strong');
        strongTags.forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.setAttribute('title', 'Bấm để sao chép mã');
            
            tag.addEventListener('click', function() {
                const couponCode = this.textContent;
                navigator.clipboard.writeText(couponCode)
                    .then(() => {
                        // Create and show notification
                        const notification = document.createElement('div');
                        notification.className = 'copy-notification';
                        notification.textContent = 'Đã sao chép: ' + couponCode;
                        
                        document.body.appendChild(notification);
                        
                        // Position notification near the cursor
                        const rect = this.getBoundingClientRect();
                        notification.style.top = (rect.top + window.scrollY - 40) + 'px';
                        notification.style.left = (rect.left + window.scrollX) + 'px';
                        
                        // Remove notification after 2 seconds
                        setTimeout(() => {
                            notification.style.opacity = '0';
                            setTimeout(() => {
                                document.body.removeChild(notification);
                            }, 300);
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Không thể sao chép mã: ', err);
                    });
            });
        });
    });
});

// Hobbies Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const hobbyItems = document.querySelectorAll('.hobby-item');
    const hobbyLightbox = document.getElementById('hobby-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Xử lý khi click vào hobby item
    hobbyItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('.hobby-image').getAttribute('src');
            const title = this.querySelector('.hobby-description h3').textContent;
            const description = this.querySelector('.hobby-description p').textContent;
            
            // Hiển thị hình ảnh trong lightbox
            lightboxImg.setAttribute('src', imgSrc);
            
            // Cập nhật caption
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            // Hiển thị lightbox
            hobbyLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Preload ảnh để có animation mượt
            const preloadImg = new Image();
            preloadImg.src = imgSrc;
        });
    });
    
    // Xử lý đóng lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Đóng lightbox khi click vào nền
    if (hobbyLightbox) {
        hobbyLightbox.addEventListener('click', function(e) {
            if (e.target === hobbyLightbox) {
                closeLightbox();
            }
        });
    }
    
    // Xử lý phím ESC để đóng lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hobbyLightbox && hobbyLightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Hàm đóng lightbox
    function closeLightbox() {
        if (hobbyLightbox) {
            hobbyLightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
