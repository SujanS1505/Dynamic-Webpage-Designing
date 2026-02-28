// --- Theme Toggler ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateCanvasColors();
});

// --- Synapse Counter (hidden but kept for compatibility) ---
const counterEl = document.getElementById('counter-value');
if (counterEl) {
    let synapseCount = 1304.5;
    setInterval(() => {
        synapseCount += Math.random() * 0.1;
        counterEl.textContent = synapseCount.toFixed(1);
    }, 200);
}

// --- Scroll Ruler Indicator ---
const rulerIndicator = document.getElementById('ruler-indicator');
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    if (scrollHeight > 0) {
        const scrollPercentage = (scrollPosition / scrollHeight);
        const targetTop = 10 + (scrollPercentage * 80);
        rulerIndicator.style.top = `${targetTop}vh`;
    }
});

// --- Neural Network Canvas (Hero Background) ---
const canvas = document.getElementById('neural-canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 40);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const group = new THREE.Group();
scene.add(group);

const cubeCount = 5;
const baseColor = 0x1de9b6;
const materials = [];
const edgeMaterials = [];

for (let i = 1; i <= cubeCount; i++) {
    const size = i * 3.5;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.15 + (i * 0.05),
        roughness: 0.1,
        transmission: 0.5,
        thickness: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    materials.push(material);
    const cube = new THREE.Mesh(geometry, material);
    group.add(cube);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00bfa5,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
    });
    edgeMaterials.push(lineMaterial);
    const cubeEdges = new THREE.LineSegments(edges, lineMaterial);
    group.add(cubeEdges);
}

// --- Sparkle Aura Particle System ---
const particleCount = 400;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = [];

for (let i = 0; i < particleCount; i++) {
    // Start particles near the center
    const x = (Math.random() - 0.5) * 4;
    const y = (Math.random() - 0.5) * 4;
    const z = (Math.random() - 0.5) * 4;
    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    // Outward flowing velocity (away from center)
    const velocity = new THREE.Vector3(x, y, z).normalize().multiplyScalar(Math.random() * 0.04 + 0.01);
    particleVelocities.push(velocity);
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: 0x00e5ff, // Bright glowing cyan/teal
    size: 0.3,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
group.add(particleSystem); // Add to group to inherit rotation

group.rotation.x = Math.PI / 4;
group.rotation.y = Math.PI / 4;

let time = 0;
let mouse = new THREE.Vector2();

function updateCanvasColors() {
    const theme = htmlEl.getAttribute('data-theme');
    materials.forEach(mat => {
        mat.opacity = theme === 'light' ? 0.25 : 0.15;
    });
}
updateCanvasColors();

function animate() {
    requestAnimationFrame(animate);
    time += 0.005;
    group.rotation.y += 0.002;
    group.rotation.z += 0.001;
    const scale = 1 + Math.sin(time) * 0.03;
    group.scale.set(scale, scale, scale);

    // Update Sparkle Aura particles
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];

        const vel = particleVelocities[i];
        x += vel.x;
        y += vel.y;
        z += vel.z;

        // If particle flows past the outer cube border, reset it near the center
        const dist = Math.sqrt(x * x + y * y + z * z);
        if (dist > 12) {
            x = (Math.random() - 0.5) * 2;
            y = (Math.random() - 0.5) * 2;
            z = (Math.random() - 0.5) * 2;
            const newVel = new THREE.Vector3(x, y, z).normalize().multiplyScalar(Math.random() * 0.04 + 0.01);
            particleVelocities[i] = newVel;
        }

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    const targetX = (Math.PI / 4) + mouse.y * 0.5;
    group.rotation.x += (targetX - group.rotation.x) * 0.05;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

animate();


// =====================================================
// WATER WAVE CLICK EFFECT
// =====================================================
const waveCanvas = document.getElementById('wave-canvas');
const waveCtx = waveCanvas.getContext('2d');

waveCanvas.width = window.innerWidth;
waveCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.innerHeight;
});

const ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 180;
        this.speed = 5;
        this.opacity = 0.7;
        this.rings = 3;
    }

    draw() {
        for (let r = 0; r < this.rings; r++) {
            const rRadius = this.radius - r * 28;
            if (rRadius < 0) continue;
            const alpha = this.opacity * (1 - rRadius / this.maxRadius);
            if (alpha <= 0) continue;

            waveCtx.beginPath();
            waveCtx.arc(this.x, this.y, rRadius, 0, Math.PI * 2);
            waveCtx.strokeStyle = `rgba(29, 233, 182, ${alpha})`;
            waveCtx.lineWidth = 2 - r * 0.4;
            waveCtx.stroke();
        }
    }

    update() {
        this.radius += this.speed;
        this.opacity -= 0.012;
    }

    isDone() {
        return this.opacity <= 0 || this.radius > this.maxRadius;
    }
}

document.addEventListener('click', (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

function animateWaves() {
    requestAnimationFrame(animateWaves);
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

    for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].isDone()) {
            ripples.splice(i, 1);
        }
    }
}
animateWaves();


// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.style.getPropertyValue('--delay') || '0s';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// =====================================================
// ANIMATED STAT COUNTERS
// =====================================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

statNumbers.forEach(el => counterObserver.observe(el));


// =====================================================
// TECH TAG HOVER GLOW
// =====================================================
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-4px) scale(1.08)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
    });
});

