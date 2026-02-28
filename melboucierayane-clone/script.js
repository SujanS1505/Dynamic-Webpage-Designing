// --- Theme Toggler ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check local storage for preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update canvas colors based on theme if needed
    updateCanvasColors();
});

// --- Synapse Counter ---
const counterEl = document.getElementById('counter-value');
let synapseCount = 1304.5;
setInterval(() => {
    synapseCount += Math.random() * 0.1;
    counterEl.textContent = synapseCount.toFixed(1);
}, 200);

// --- Scroll Ruler Indicator ---
const rulerIndicator = document.getElementById('ruler-indicator');
window.addEventListener('scroll', () => {
    // Calculate scroll percentage
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollHeight > 0) {
        const scrollPercentage = (scrollPosition / scrollHeight);
        // Map scroll percentage to viewport height (e.g. from 10% to 90% from top)
        const targetTop = 10 + (scrollPercentage * 80);
        rulerIndicator.style.top = `${targetTop}vh`;
    }
});

// --- Neural Network Canvas (Hero Background) ---
const canvas = document.getElementById('neural-canvas');

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 40); // Isometric-ish view from top-corner
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting to make edges pop
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const group = new THREE.Group();
scene.add(group);

const cubeCount = 5;
const baseColor = 0x1de9b6; // Teal color from the image

// Materials array to hold them so we can update them on theme toggle
const materials = [];
const edgeMaterials = [];

for (let i = 1; i <= cubeCount; i++) {
    const size = i * 3.5;
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Transparent faces
    const material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.15 + (i * 0.05), // Inner cubes are slightly denser because they stack, but let's step opacity
        roughness: 0.1,
        transmission: 0.5,
        thickness: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    materials.push(material);

    const cube = new THREE.Mesh(geometry, material);
    group.add(cube);

    // Edges (solid lines) to match the distinct borders in the image
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

// Initial Isometric Rotation
group.rotation.x = Math.PI / 4;
group.rotation.y = Math.PI / 4;

let time = 0;
let mouse = new THREE.Vector2();
let targetRotationX = group.rotation.x;
let targetRotationY = group.rotation.y;

function updateCanvasColors() {
    const theme = htmlEl.getAttribute('data-theme');
    // We can make the teal pop differently based on theme
    materials.forEach(mat => {
        if (theme === 'light') {
            mat.opacity = 0.25;
        } else {
            mat.opacity = 0.15;
        }
    });
}
updateCanvasColors();

function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Slowly rotate the entire nested structure
    group.rotation.y += 0.002;
    group.rotation.z += 0.001;

    // Breathing effect (pulsing scale slightly)
    const scale = 1 + Math.sin(time) * 0.03;
    group.scale.set(scale, scale, scale);

    // Follow mouse rotation slightly
    const targetX = (Math.PI / 4) + mouse.y * 0.5;
    const targetY = (Math.PI / 4) + mouse.x * 0.5;

    // Smooth interpolation
    group.rotation.x += (targetX - group.rotation.x) * 0.05;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', (e) => {
    // Map mouse to -1 to 1
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Initialize
animate();
