document.addEventListener('DOMContentLoaded', function() {
    // Dòng 33:
    const targetElement = document.querySelector('.your-target-element');
    if (targetElement && targetElement.children) {
        // Thực hiện thao tác với children
    }
    
    // Dòng 503 (closeModal):
    const closeModal = function() {
        if(window.techSphere && typeof window.techSphere.onWindowResize === 'function') {
            window.techSphere.onWindowResize();
        }
    }
}); 