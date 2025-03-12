// Nhóm các tech stack theo chủ đề
const techGroups = {
    'Languages & Frameworks': [
        'Java', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'C', 'C++', 'NIM', 'CUDA', 'Dart',
        'HTML5', 'CSS3', 'AutoIt', 'Liquid', 'Bootstrap', 'jQuery', 'Font Awesome', 'Clerk', 
        'CKEditor', 'CodeceptJS', 'Flatsome', 'Tailwind CSS', 'Node.js', 'React', 'Next.js', 
        'Vue.js', 'Vite', 'Express.js', 'Nest.js', 'Adonis.js', 'Django', 'Electron', 'Flutter', 
        'React Native', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Transformers', 'Scikit-learn', 
        'Pandas', 'SciPy', 'Keras', 'FastAPI', 'Flask', 'Strawberry GraphQL', 'Celery', 'RabbitMQ', 
        'LangChain', 'LlamaIndex', 'Amazon Bedrock', 'Three.js'
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
        'RPM', 'YUM', 'APK', 'DNF', 'Maven', 'Chocolatey', 'WinGet'
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
        this.isRotating = false; // Giữ nguyên giá trị false
        this.autoRotate = false; // Thêm biến mới để kiểm soát
        this.animationFrameId = null; // Thêm biến quản lý animation frame
        
        this.init();
        this.createNodes();
        this.createEdges();
        this.animate(); // Khởi động animation
        this.updateTitle();
    }

    init() {
        const container = document.querySelector('.tech-sphere-container');
        // Giới hạn kích thước container
        const maxWidth = Math.min(800, window.innerWidth * 0.8);
        const aspectRatio = 0.75; // Tỷ lệ chiều cao/chiều rộng
        const height = maxWidth * aspectRatio;
        
        container.style.width = `${maxWidth}px`;
        container.style.height = `${height}px`;
        container.style.margin = '0 auto';
        container.style.border = '1px solid #ddd';
        container.style.borderRadius = '10px';
        container.style.overflow = 'hidden';
        
        this.renderer.setSize(maxWidth, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
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

        // Xóa sự kiện mouseenter và mouseleave
        container.addEventListener('mouseenter', () => {
            this.controls.enableDamping = true;
            this.autoRotate = false;
        });
        
        container.addEventListener('mouseleave', () => {
            this.autoRotate = false;
        });

        window.addEventListener('resize', () => {
            const maxWidth = Math.min(800, window.innerWidth * 0.8);
            const height = maxWidth * aspectRatio;
            
            container.style.width = `${maxWidth}px`;
            container.style.height = `${height}px`;
            
            this.camera.aspect = maxWidth / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(maxWidth, height);
        });

        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
    }

    createNodes() {
        Object.entries(techGroups).forEach(([groupName, technologies], groupIndex) => {
            const groupColor = new THREE.Color().setHSL(0, 0, 0.5); // Màu xám
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
                
                // Vị trí trên sphere
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
        // Tạo edges giữa các node trong cùng nhóm
        Object.values(this.groups).forEach(group => {
            for (let i = 0; i < group.nodes.length; i++) {
                for (let j = i + 1; j < group.nodes.length; j++) {
                    const nodeA = group.nodes[i];
                    const nodeB = group.nodes[j];
                    
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        nodeA.position,
                        nodeB.position
                    ]);
                    
                    const material = new THREE.LineBasicMaterial({
                        color: group.color,
                        transparent: true,
                        opacity: 0.3
                    });
                    
                    const edge = new THREE.Line(geometry, material);
                    this.scene.add(edge);
                    this.edges.push(edge);
                }
            }
        });
    }

    animate() {
        // Chỉ request frame tiếp theo khi cần thiết
        if (this.isRotating || this.controls.enabled) {
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        }
        
        // Chỉ cập nhật khi có thay đổi
        if (this.autoRotate) {
            this.scene.rotation.y += 0.0005;
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onMouseMove(event) {
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
            
            // Highlight node được hover
            intersected.material.emissive.setHex(0x666666);
            
            // Reset các node khác
            this.nodes.forEach(node => {
                if (node !== intersected) {
                    node.material.emissive.setHex(0x000000);
                }
            });
        } else {
            this.tooltip.style.display = 'none';
            // Reset tất cả nodes
            this.nodes.forEach(node => {
                node.material.emissive.setHex(0x000000);
            });
        }
    }

    updateTitle() {
        const totalTech = this.nodes.length;
        let groupCounts = '';
        Object.entries(techGroups).forEach(([groupName, technologies]) => {
            groupCounts += `<div class="tag">${groupName}: ${technologies.length}</div>`;
        });
        document.querySelector('.tech-stack h2').textContent = `Tech Stack (${totalTech})`;
        // Thêm phần hiển thị số lượng mỗi nhóm
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

    // Thêm phương thức hủy animation khi không cần thiết
    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

// Khởi tạo khi trang đã load
window.addEventListener('DOMContentLoaded', () => {
    const techSphere = new TechSphere();
    window.addEventListener('resize', () => techSphere.onWindowResize());
}); 