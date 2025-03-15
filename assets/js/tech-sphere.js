// Nhóm các tech stack theo chủ đề
const techGroups = {
    'Languages & Frameworks': [
        'Java', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'C', 'C++', 'NIM', 'CUDA', 'Dart',
        'HTML5', 'CSS3', 'AutoIt', 'Liquid', 'Bootstrap', 'jQuery', 'Font Awesome', 'Clerk', 
        'CKEditor', 'CodeceptJS', 'Flatsome', 'Tailwind CSS', 'Node.js', 'React', 'Next.js', 
        'Vue.js', 'Vite', 'Express.js', 'Nest.js', 'Adonis.js', 'Django', 'Electron', 'Flutter', 
        'React Native', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Transformers', 'Scikit-learn', 
        'Pandas', 'SciPy', 'Keras', 'FastAPI', 'Flask', 'Strawberry GraphQL', 'Celery', 'RabbitMQ', 
        'LangChain', 'LlamaIndex', 'Amazon Bedrock', 'Three.js', 'InertiaJS', 'Svelte'
    ],
    'Database & Storage': [
        'SQLite', 'MySQL', 'PostgreSQL', 'SQL Server', 'MariaDB', 'MongoDB', 'Redis',
        'Amazon RDS', 'Azure SQL', 'Google Cloud SQL', 'MongoDB Atlas', 'ChromaDB',
        'Pinecone', 'Qdrant'
    ],
    'Testing & Automation': [
        'Selenium', 'Playwright', 'Puppeteer', 'Appium', 'TestNG', 'Cucumber',
        'n8n', 'Make.com', 'Zapier'
    ],
    'CMS & E-commerce': [
        'WordPress', 'WooCommerce', 'LearnDash LMS', 'Drupal', 'Laravel', 'Shopify'
    ],
    'Development Tools': [
        'Visual Studio Code', 'IntelliJ IDEA', 'Cursor', 'Trae', 'Winsuft', 'Zed',
        'Postman', 'Charles Proxy', 'Wireshark', 'Figma', 'Blender', 'Canva',
        'ngrok', 'localtunnel', 'Continue.dev', 'SuperMaven', 'Qdoo', 'VSCodium'
    ],
    'Package Managers': [
        'npm', 'Yarn', 'Conda', 'Bun', 'Homebrew', 'APT', 'Pacman', 'DPKG',
        'RPM', 'YUM', 'APK', 'DNF', 'Maven', 'Chocolatey', 'WinGet', 'PM2'
    ],
    'Cloud & Hosting': [
        'Amazon Web Services', 'GCP', 'Azure', 'Vultr', 'GoDaddy', 'CMC',
        'DigitalOcean', 'Inet', 'TenTen', 'PA Vietnam', 'Mat Bao', 'Tinh Van',
        'Nhan Hoa', 'Interdata', 'Hostinger', 'Cloudflare'
    ],
    'Operating Systems': [
        'Linux', 'macOS', 'Android', 'iOS', 'Windows', 'Ubuntu', 'Manjaro',
        'Red Hat', 'Wear OS', 'Raspberry Pi', 'Debian', 'LineageOS', 'Kali Linux',
        'CentOS', 'Nginx', 'Apache', 'OpenWrt', 'Pi-hole', 'OpenSSL', 'OpenVPN',
        'Certbot', 'ACME'
    ],
    'Shell & Scripting': [
        'Bash', 'Zsh', 'PowerShell', 'CMD', 'Shell'
    ],
    'CI/CD & DevOps': [
        'GitHub Actions', 'Jenkins', 'GitLab CI', 'TeamCity', 'Travis CI',
        'Bamboo', 'Docker', 'Docker Compose'
    ],
    'Project Management': [
        'Jira Software On-Premise', 'Jira Software Cloud', 'Notion', 'Lark Suite',
        'Odoo', 'Zoho', 'Trello', 'MISA AMIS', 'ClickUp', 'Fastwork'
    ],
    'Source Control': [
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Hugging Face'
    ],
    'Admin Tools': [
        'Microsoft 365 Admin', 'Azure AD', 'Exchange Admin', 'SharePoint Admin',
        'Teams Admin', 'Power Automate', 'Power Apps', 'Power BI',
        'Google Workspace Admin', 'Google Mailbox', 'Google Chat',
        'Google Groups', 'Google Admin Console', 'Google Cloud Console'
    ],
    'Marketing Tools': [
        'Mixpanel', 'Zendesk', 'HubSpot', 'Google Analytics'
    ],
    'AI Tools': [
        'ChatGPT', 'Claude', 'Gemini', 'LeChat', 'DeepSeek', 'Manus',
        'Perplexity', 'NotebookLM', 'Siri', 'Cohere', 'Qwen', 'Llama3',
        'Grok', 'Browse-use', 'Claude Code', 'Aider', 'Cline', 'Suno',
        'Heygen', 'Sesame', 'Hume', 'Imagen3', 'Elevenlabs', 'KlingAI',
        'Shakker', 'Runnaway', 'Dall-E 3', 'Veo2', 'Openrouter', 'GrogCloud',
        'Ollama', 'Botpress', 'Dify', 'Coze', 'Mindmaid', 'GitHub Copilot',
        'Microsoft Copilot', 'CiCi', 'Character AI', 'Khan Academy', 'Poe',
        'Sider', 'Monica', 'Intercom', 'AgentQL', 'Coval', 'Exa', 'Index',
        'Langbase', 'Langfuse', 'Supabase', 'Firecrawl', 'Replit', 'Boltnew',
        'Lovable', 'Vercel', 'Netlify'
    ]
};

class TechSphere {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.nodes = [];
        this.edges = [];
        this.groups = {};
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tech-tooltip';
        document.body.appendChild(this.tooltip);
        this.radius = 150;
        this.isRotating = false;
        this.autoRotate = false;
        this.animationFrameId = null;
        this.isVisible = false;
        this.isInitialized = false;
        this.edgeDensity = 0.3;
        
        // Kiểm tra xem người dùng đã bật hiệu ứng 3D chưa (mặc định là tắt)
        this.isEnabled = localStorage.getItem('techSphereEnabled') === 'true';
        
        this.initContainer();
        
        this.setupScrollObserver();
    }

    initContainer() {
        const container = document.querySelector('.tech-sphere-container');
        if (!container) return;
        
        const maxWidth = Math.min(800, window.innerWidth * 0.8);
        const aspectRatio = 0.75;
        const height = maxWidth * aspectRatio;
        
        container.style.width = `${maxWidth}px`;
        container.style.height = `${height}px`;
        container.style.margin = '0 auto';
        container.style.border = '1px solid #ddd';
        container.style.borderRadius = '10px';
        container.style.overflow = 'hidden';
        container.style.position = 'relative';
        
        // Thiết kế lại switch hiện đại hơn
        const switchContainer = document.createElement('div');
        switchContainer.className = 'tech-sphere-switch-container';
        switchContainer.style.position = 'absolute';
        switchContainer.style.top = '15px';
        switchContainer.style.right = '15px';
        switchContainer.style.zIndex = '10';
        switchContainer.style.display = 'flex';
        switchContainer.style.alignItems = 'center';
        switchContainer.style.padding = '8px 12px';
        switchContainer.style.backgroundColor = 'rgba(30, 30, 30, 0.85)';
        switchContainer.style.backdropFilter = 'blur(5px)';
        switchContainer.style.borderRadius = '30px';
        switchContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        switchContainer.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        switchContainer.style.transition = 'all 0.3s ease';
        
        // Hover effect cho container
        switchContainer.addEventListener('mouseenter', () => {
            switchContainer.style.transform = 'translateY(-2px)';
            switchContainer.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25)';
        });
        
        switchContainer.addEventListener('mouseleave', () => {
            switchContainer.style.transform = 'translateY(0)';
            switchContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        });
        
        // Tạo icon 3D
        const icon3D = document.createElement('span');
        icon3D.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22L3 17V7L12 2L21 7V17L12 22Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 22V12" stroke="white" stroke-width="2"/>
            <path d="M12 12L21 7" stroke="white" stroke-width="2"/>
            <path d="M12 12L3 7" stroke="white" stroke-width="2"/>
        </svg>`;
        icon3D.style.marginRight = '8px';
        icon3D.style.display = 'flex';
        icon3D.style.alignItems = 'center';
        
        // Tạo label
        const label = document.createElement('label');
        label.textContent = '3D view';
        label.style.marginRight = '12px';
        label.style.fontSize = '14px';
        label.style.fontWeight = '600';
        label.style.color = 'white';
        label.style.userSelect = 'none';
        label.style.cursor = 'pointer';
        label.style.letterSpacing = '0.5px';
        
        // Tạo switch
        const switchWrapper = document.createElement('div');
        switchWrapper.className = 'switch-wrapper';
        switchWrapper.style.position = 'relative';
        switchWrapper.style.display = 'inline-block';
        switchWrapper.style.width = '46px';
        switchWrapper.style.height = '24px';
        
        const switchInput = document.createElement('input');
        switchInput.type = 'checkbox';
        switchInput.checked = this.isEnabled;
        switchInput.style.opacity = '0';
        switchInput.style.width = '0';
        switchInput.style.height = '0';
        
        const switchSlider = document.createElement('span');
        switchSlider.className = 'switch-slider';
        switchSlider.style.position = 'absolute';
        switchSlider.style.cursor = 'pointer';
        switchSlider.style.top = '0';
        switchSlider.style.left = '0';
        switchSlider.style.right = '0';
        switchSlider.style.bottom = '0';
        switchSlider.style.backgroundColor = this.isEnabled ? '#4CAF50' : 'rgba(255, 255, 255, 0.2)';
        switchSlider.style.borderRadius = '24px';
        switchSlider.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Tạo nút tròn bên trong switch
        const switchButton = document.createElement('span');
        switchButton.style.position = 'absolute';
        switchButton.style.content = '""';
        switchButton.style.height = '20px';
        switchButton.style.width = '20px';
        switchButton.style.left = this.isEnabled ? '24px' : '2px';
        switchButton.style.top = '2px';
        switchButton.style.backgroundColor = 'white';
        switchButton.style.borderRadius = '50%';
        switchButton.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        switchButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        
        // Thêm icon vào nút
        if (this.isEnabled) {
            switchButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 4px; left: 4px;">
                <path d="M5 13L9 17L19 7" stroke="#4CAF50" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        } else {
            switchButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 4px; left: 4px;">
                <path d="M18 6L6 18" stroke="#999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="#999" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
        
        switchSlider.appendChild(switchButton);
        switchWrapper.appendChild(switchInput);
        switchWrapper.appendChild(switchSlider);
        
        // Thêm sự kiện click cho cả label và switch
        label.addEventListener('click', () => {
            this.toggleEnable();
        });
        
        icon3D.addEventListener('click', () => {
            this.toggleEnable();
        });
        
        switchWrapper.addEventListener('click', () => {
            this.toggleEnable();
        });
        
        // Thêm icon, label và switch vào container
        switchContainer.appendChild(icon3D);
        switchContainer.appendChild(label);
        switchContainer.appendChild(switchWrapper);
        container.appendChild(switchContainer);
        
        // Tạo placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'tech-sphere-placeholder';
        
        if (!this.isEnabled) {
            // Nếu đã tắt, hiển thị danh sách thay vì hiệu ứng 3D
            this.createStaticList(placeholder);
        } else {
            placeholder.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <div class="dots-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            `;
        }
        
        container.appendChild(placeholder);
        
        this.renderer.setSize(maxWidth, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    setupScrollObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    if (this.isEnabled) {
                        if (!this.isInitialized) {
                            this.lazyInitialize();
                        } else {
                            this.startAnimation();
                        }
                    }
                } else {
                    this.isVisible = false;
                    this.stopAnimation();
                }
            });
        }, options);
        
        const container = document.querySelector('.tech-sphere-container');
        if (container) {
            observer.observe(container);
        }
    }

    lazyInitialize() {
        if (this.isInitialized || !this.isEnabled) return;
        
        const container = document.querySelector('.tech-sphere-container');
        if (!container) return;
        
        const placeholder = container.querySelector('.tech-sphere-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 250;
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        const light = new THREE.PointLight(0xffffff, 1, 0);
        light.position.set(0, 0, 400);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        container.addEventListener('mouseenter', () => {
            this.controls.enableDamping = true;
            this.autoRotate = false;
        });
        
        container.addEventListener('mouseleave', () => {
            this.autoRotate = false;
        });

        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
        
        this.createNodes();
        this.createEdges();
        this.updateTitle();
        
        this.isInitialized = true;
        this.startAnimation();
    }

    startAnimation() {
        if (!this.animationFrameId && this.isVisible && this.isEnabled) {
            this.animate();
        }
    }

    createNodes() {
        Object.entries(techGroups).forEach(([groupName, technologies], groupIndex) => {
            const groupColor = new THREE.Color().setHSL(0, 0, 0.5);
            this.groups[groupName] = {
                color: groupColor,
                nodes: []
            };

            technologies.forEach((tech, techIndex) => {
                const phi = Math.acos(-1 + (2 * techIndex) / technologies.length);
                const theta = Math.sqrt(technologies.length * Math.PI) * phi;
                
                const geometry = new THREE.SphereGeometry(3);
                const material = new THREE.MeshPhongMaterial({ color: groupColor, emissive: 0x333333, specular: 0x555555, shininess: 30 });
                const node = new THREE.Mesh(geometry, material);
                
                const radius = this.radius;
                node.position.x = radius * Math.sin(phi) * Math.cos(theta);
                node.position.y = radius * Math.sin(phi) * Math.sin(theta);
                node.position.z = radius * Math.cos(phi);
                
                node.userData = { name: tech, group: groupName };
                
                this.scene.add(node);
                this.nodes.push(node);
                this.groups[groupName].nodes.push(node);
            });
        });
    }

    createEdges() {
        Object.values(this.groups).forEach(group => {
            const nodeCount = group.nodes.length;
            
            for (let i = 0; i < nodeCount; i++) {
                const maxConnections = Math.max(2, Math.floor(nodeCount * this.edgeDensity / 5));
                const connectedIndices = new Set();
                
                while (connectedIndices.size < maxConnections && connectedIndices.size < nodeCount - 1) {
                    const randomIndex = Math.floor(Math.random() * nodeCount);
                    if (randomIndex !== i) {
                        connectedIndices.add(randomIndex);
                    }
                }
                
                connectedIndices.forEach(j => {
                    const nodeA = group.nodes[i];
                    const nodeB = group.nodes[j];
                    
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        nodeA.position,
                        nodeB.position
                    ]);
                    
                    const material = new THREE.LineBasicMaterial({
                        color: group.color,
                        transparent: true,
                        opacity: 0.2
                    });
                    
                    const edge = new THREE.Line(geometry, material);
                    this.scene.add(edge);
                    this.edges.push(edge);
                });
            }
        });
    }

    animate() {
        if (!this.isVisible || !this.isEnabled) {
            this.animationFrameId = null;
            return;
        }
        
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        
        if (this.autoRotate) {
            this.scene.rotation.y += 0.0005;
        }
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onMouseMove(event) {
        if (!this.isVisible || !this.isInitialized || !this.isEnabled) return;
        
        const container = document.querySelector('.tech-sphere-container');
        const rect = container.getBoundingClientRect();
        
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const intersects = raycaster.intersectObjects(this.nodes);

        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            this.tooltip.style.display = 'block';
            this.tooltip.style.left = `${event.clientX}px`;
            this.tooltip.style.top = `${event.clientY}px`;
            this.tooltip.textContent = `${intersected.userData.name} (${intersected.userData.group})`;
            
            intersected.material.emissive.setHex(0x666666);
            
            this.nodes.forEach(node => {
                if (node !== intersected) {
                    node.material.emissive.setHex(0x000000);
                }
            });
        } else {
            this.tooltip.style.display = 'none';
            this.nodes.forEach(node => {
                node.material.emissive.setHex(0x000000);
            });
        }
    }

    updateTitle() {
        const totalTech = Object.values(techGroups).flat().length;
        let groupCounts = '';
        Object.entries(techGroups).forEach(([groupName, technologies]) => {
            groupCounts += `<div class="tag">${groupName}: ${technologies.length}</div>`;
        });
        document.querySelector('.tech-stack h2').textContent = `Tech Stack (${totalTech})`;
        const countElement = document.createElement('div');
        countElement.className = 'tech-stack-counts';
        countElement.style.fontSize = '0.8em';
        countElement.style.marginTop = '10px';
        countElement.innerHTML = groupCounts;
        const h2Element = document.querySelector('.tech-stack h2');
        if (h2Element.nextSibling?.className !== 'tech-stack-counts') {
            h2Element.parentNode.insertBefore(countElement, h2Element.nextSibling);
        }
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    onWindowResize() {
        if (!this.isInitialized || !this.isEnabled) return;
        
        const container = document.querySelector('.tech-sphere-container');
        if (!container) return;
        
        const maxWidth = Math.min(800, window.innerWidth * 0.8);
        const aspectRatio = 0.75;
        const height = maxWidth * aspectRatio;
        
        container.style.width = `${maxWidth}px`;
        container.style.height = `${height}px`;
        
        this.camera.aspect = maxWidth / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(maxWidth, height);
    }
    
    // Tạo danh sách tĩnh thay vì hiệu ứng 3D
    createStaticList(container) {
        container.style.overflow = 'auto';
        container.style.padding = '20px';
        container.style.height = '100%';
        container.style.boxSizing = 'border-box';
        
        const listContainer = document.createElement('div');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'column';
        listContainer.style.gap = '15px';
        listContainer.style.position = 'absolute';
        listContainer.style.top = '50px';
        
        Object.entries(techGroups).forEach(([groupName, technologies]) => {
            const groupContainer = document.createElement('div');
            groupContainer.style.marginBottom = '20px'; // Tăng khoảng cách giữa các nhóm
            
            const groupTitle = document.createElement('h3');
            groupTitle.textContent = `${groupName} (${technologies.length})`;
            groupTitle.style.fontSize = '16px';
            groupTitle.style.marginBottom = '10px';
            groupContainer.appendChild(groupTitle);
            
            const techList = document.createElement('div');
            techList.style.display = 'flex';
            techList.style.flexWrap = 'wrap';
            techList.style.gap = '8px'; // Tăng khoảng cách giữa các thẻ
            
            technologies.forEach(tech => {
                const techTag = document.createElement('span');
                techTag.textContent = tech;
                techTag.style.backgroundColor = '#f0f0f0';
                techTag.style.padding = '5px 10px'; // Tăng padding để tránh cắt chữ
                techTag.style.borderRadius = '4px';
                techTag.style.fontSize = '13px'; // Tăng kích thước font
                techTag.style.color = '#000'; // Đặt màu đen cho text của stack
                techTag.style.display = 'inline-block';
                techTag.style.marginBottom = '5px'; // Thêm margin dưới để tránh cắt chữ
                techTag.style.whiteSpace = 'nowrap'; // Ngăn chữ bị ngắt dòng
                techList.appendChild(techTag);
            });
            
            groupContainer.appendChild(techList);
            listContainer.appendChild(groupContainer);
        });
        
        container.appendChild(listContainer);
    }
    
    // Chuyển đổi giữa hiệu ứng 3D và danh sách tĩnh
    toggleEnable() {
        this.isEnabled = !this.isEnabled;
        localStorage.setItem('techSphereEnabled', this.isEnabled);
        
        // Cập nhật lại trang để áp dụng thay đổi
        window.location.reload();
    }
    
    dispose() {
        this.stopAnimation();
        
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('resize', this.onWindowResize);
        
        this.edges.forEach(edge => {
            if (edge.geometry) edge.geometry.dispose();
            if (edge.material) edge.material.dispose();
            this.scene.remove(edge);
        });
        
        this.nodes.forEach(node => {
            if (node.geometry) node.geometry.dispose();
            if (node.material) node.material.dispose();
            this.scene.remove(node);
        });
        
        if (this.renderer) {
            this.renderer.domElement.remove();
            this.renderer.dispose();
        }
        
        if (this.tooltip) {
            this.tooltip.remove();
        }
        
        this.nodes = [];
        this.edges = [];
        this.groups = {};
    }
}

let techSphere = null;
window.addEventListener('DOMContentLoaded', () => {
    techSphere = new TechSphere();
}); 