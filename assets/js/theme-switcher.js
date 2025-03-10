document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Kiểm tra theme đã lưu trong localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Nếu chưa có theme được lưu, kiểm tra theme hệ thống
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.className = 'dark-theme';
        } else {
            body.className = 'light-theme';
        }
    }

    // Xử lý sự kiện click vào nút chuyển đổi theme
    themeToggle.addEventListener('click', () => {
        // Thêm class để kích hoạt animation
        themeToggle.classList.add('theme-switching');
        
        // Chuyển đổi theme
        if (body.classList.contains('light-theme')) {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        }
        
        // Xóa class animation sau khi hoàn thành
        setTimeout(() => {
            themeToggle.classList.remove('theme-switching');
        }, 500);
    });

    // Lắng nghe sự thay đổi theme hệ thống
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                body.className = e.matches ? 'dark-theme' : 'light-theme';
            }
        });
    }
});
