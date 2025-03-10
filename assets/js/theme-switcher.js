document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Kiểm tra theme đã lưu trong localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.className = currentTheme;
        updateThemeIcon(currentTheme === 'dark-theme');
    } else {
        // Nếu chưa có theme, sử dụng theme theo system
        const isDark = prefersDarkScheme.matches;
        document.body.className = isDark ? 'dark-theme' : 'light-theme';
        updateThemeIcon(isDark);
    }

    // Xử lý sự kiện click vào nút chuyển đổi theme
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.className === 'dark-theme';
        document.body.className = isDark ? 'light-theme' : 'dark-theme';
        localStorage.setItem('theme', document.body.className);
        updateThemeIcon(!isDark);
    });

    // Cập nhật icon theo theme
    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Lắng nghe sự thay đổi theme của system
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const isDark = e.matches;
            document.body.className = isDark ? 'dark-theme' : 'light-theme';
            updateThemeIcon(isDark);
        }
    });
});
