import sys

with open('public/red-team.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The script to replace is between lines 2631 and the end (before </body>)
# Let's find </body> from the bottom.
end_idx = -1
for i in range(len(lines)-1, -1, -1):
    if '</body>' in lines[i]:
        end_idx = i
        break

start_idx = -1
for i in range(end_idx - 1, -1, -1):
    if '<script>' in lines[i] and 'CYBER NINJA' in lines[i+1]:
        start_idx = i
        break

if start_idx == -1:
    # try looking for just <script> after terminal script
    for i in range(2600, len(lines)):
        if '<script>' in lines[i] and 'ninja-canvas' in ''.join(lines[i:i+5]):
            start_idx = i
            break

if start_idx != -1 and end_idx != -1:
    new_script = """  <script>
  /* ── ELITE CYBER NINJA ENGINE ── */
  (function () {
    const canvas = document.getElementById('ninja-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 460, H = 540, CX = W/2, CY = H/2 + 20;
    canvas.width = W; canvas.height = H;

    let time = 0;
    let mx = CX, my = CY;
    let targetMx = CX, targetMy = CY;
    let attackPhase = 0;
    let isAttacking = false;
    let particles = [];
    let slashes = [];

    // Track mouse
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      targetMx = (e.clientX - r.left) * (W / r.width);
      targetMy = (e.clientY - r.top) * (H / r.height);
    });
    canvas.addEventListener('mouseleave', () => { targetMx = CX; targetMy = CY; });

    canvas.addEventListener('click', () => {
      if(isAttacking) return;
      isAttacking = true;
      attackPhase = 1.0;
      // create slash
      const ang = Math.atan2(my - CY, mx - CX);
      slashes.push({a: ang, life: 1.0, x: mx, y: my});
      
      // Burst particles
      for(let i=0; i<40; i++) {
        const pa = Math.random() * Math.PI * 2;
        const spd = 4 + Math.random() * 14;
        particles.push({
          x: CX, y: CY - 50,
          vx: Math.cos(pa)*spd, vy: Math.sin(pa)*spd,
          life: 1, fade: 0.02 + Math.random()*0.03, sz: 1.5+Math.random()*3
        });
      }
    });

    function glow(color, blur) {
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
    }

    function poly(pts, fill, stroke, lw) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for(let i=1; i<pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      if(fill){ ctx.fillStyle = fill; ctx.fill(); }
      if(stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = lw||1; ctx.stroke(); }
    }

    function drawRing(x, y, r, angle, dash, color, lw, glowBlur) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      if(dash) ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI*2);
      if(glowBlur) glow(color, glowBlur);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
      ctx.restore();
    }
    
    const drawNinja = (shakeX, shakeY) => {
      ctx.save();
      ctx.translate(CX + shakeX, CY + shakeY);
      
      const breath = Math.sin(time*2.5) * 5;
      const pulse = Math.sin(time*8) > 0 ? 1 : 0.8;
      
      // Holographic aura
      glow('#ff1100', 50);
      ctx.fillStyle = 'rgba(255, 30, 0, 0.07)';
      ctx.beginPath(); ctx.ellipse(0, 0, 140, 200, 0, 0, Math.PI*2); ctx.fill();
      glow('transparent', 0);
      
      // Floating Shards (Legs)
      poly([[-18, 20], [-35, 90], [-25, 170], [-10, 170], [-5, 90]], '#080101', 'rgba(255,40,0,0.6)', 1.5);
      poly([[18, 20], [35, 90], [25, 170], [10, 170], [5, 90]], '#080101', 'rgba(255,40,0,0.6)', 1.5);
      
      // Joints (Glowing Knees)
      glow('#ff2200', 15);
      ctx.fillStyle = '#ff2200';
      ctx.beginPath(); ctx.arc(-20, 90, 4 + breath*0.3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(20, 90, 4 + breath*0.3, 0, Math.PI*2); ctx.fill();
      glow('transparent', 0);

      // Cybernetic Torso
      poly([[-40, -40], [40, -40], [25, 40], [-25, 40]], '#0c0202', 'rgba(255,60,0,0.8)', 2);
      
      // Inner Chest Plating (Layered)
      poly([[-30, -35], [0, -10], [-5, 30], [-20, 30]], '#1a0303', 'rgba(255,100,0,0.5)', 1);
      poly([[30, -35], [0, -10], [5, 30], [20, 30]], '#1a0303', 'rgba(255,100,0,0.5)', 1);
      
      // Spinal Cord
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(255,50,0,0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 35); ctx.stroke();
      ctx.setLineDash([]);

      // Energy Core (Central Reactor)
      glow('#ff4400', 25 + attackPhase*40);
      ctx.fillStyle = attackPhase > 0.1 ? '#ffffff' : '#ff3300';
      ctx.beginPath(); ctx.arc(0, -10, 14 + attackPhase*6 + breath, 0, Math.PI*2); ctx.fill();
      // Core Rings
      ctx.strokeStyle = 'rgba(255,100,0,0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, -10, 22 + breath, 0, Math.PI*2); ctx.stroke();
      glow('transparent', 0);
      
      // Augmented Shoulders
      poly([[-40, -50], [-75, -20], [-65, 0], [-40, -15]], '#0d0202', '#ff4400', 2);
      poly([[40, -50], [75, -20], [65, 0], [40, -15]], '#0d0202', '#ff4400', 2);
      
      // Left Arm (Data Injector)
      poly([[-55, -15], [-85, 25], [-75, 70], [-60, 25]], '#080101', 'rgba(255,60,0,0.6)', 1.5);
      
      // Left Hand Kunai (Holographic Dagger)
      glow('#ff4400', 20);
      poly([[-75, 70], [-78, 110], [-72, 70]], 'rgba(255, 255, 255, 0.9)', '#ff4400', 2);
      glow('transparent', 0);

      // Right Arm (Plasma Katana Wielder)
      const aimAng = Math.atan2(my - (CY - 30), mx - (CX + 50));
      ctx.save();
      ctx.translate(55, -15);
      ctx.rotate(aimAng + Math.PI/2 - (Math.PI/3)*attackPhase); 
      
      poly([[-12, 0], [12, 0], [8, 55], [-8, 55]], '#0a0101', 'rgba(255,80,0,0.6)', 1.5);
      
      // Katana Blade Component
      ctx.translate(0, 55);
      
      // Katana Hilt
      poly([[-15, 0], [15, 0], [15, 10], [-15, 10]], '#111', '#ff3300', 1);
      
      // The Plasma Edge
      glow('#ff1100', 35 + attackPhase*30);
      ctx.lineCap = 'round';
      
      // Outer Red Glow
      ctx.strokeStyle = '#ff2200';
      ctx.lineWidth = 10 + attackPhase*4;
      ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, 220 + attackPhase*50); ctx.stroke();
      
      // Inner Plasma Core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4 + attackPhase*3;
      ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, 220 + attackPhase*50); ctx.stroke();
      
      glow('transparent', 0);
      ctx.restore();

      // Tactically tracking Head
      const hx = (mx - CX)*0.08;
      const hy = (my - CY)*0.08;
      ctx.save();
      ctx.translate(hx, hy + breath*0.6);
      
      // Cyber-Helmet Crest
      poly([[-20, -45], [20, -45], [25, -95], [0, -115], [-25, -95]], '#0a0202', 'rgba(255,70,0,0.8)', 2);
      
      // V-shaped Visor
      glow('#ff0000', 25);
      poly([[-22, -75], [22, -75], [12, -60], [0, -50], [-12, -60]], `rgba(255, 30, 0, ${pulse})`, '#ffffff', 1.5);
      
      // Eye Optics
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(-8 + hx*0.4, -68, 2.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(8 + hx*0.4, -68, 2.5, 0, Math.PI*2); ctx.fill();
      glow('transparent', 0);
      
      // Neural Data Halo
      drawRing(0, -90, 45, -time*2, [4, 15, 25, 10], 'rgba(255,80,0,0.7)', 1.5, 8);
      drawRing(0, -90, 55, time*1.5, [15, 45], 'rgba(255,20,0,0.5)', 1, 0);

      ctx.restore();
      ctx.restore();
    };

    function loop() {
      time += 0.016;
      
      // Interpolate mouse smoothly
      mx += (targetMx - mx) * 0.12;
      my += (targetMy - my) * 0.12;

      // Attack phase management
      if (attackPhase > 0) {
        attackPhase -= 0.035;
        if(attackPhase <= 0) { attackPhase = 0; isAttacking = false; }
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      
      // Deep Background Tech Elements
      ctx.globalCompositeOperation = 'screen';
      drawRing(CX, CY - 30, 200 + Math.sin(time)*5, time*0.15, [50, 20, 10, 30], 'rgba(200, 30, 0, 0.12)', 2);
      drawRing(CX, CY - 30, 225, -time*0.1, [200, 50], 'rgba(255, 40, 0, 0.08)', 1);
      drawRing(CX, CY - 30, 250, time*0.25, [4, 10], 'rgba(255, 80, 0, 0.06)', 1.5, 6);

      // Glitch / Screen Shake Effect
      let shakeX = 0, shakeY = 0;
      if (attackPhase > 0.7) {
        shakeX = (Math.random() - 0.5) * 22;
        shakeY = (Math.random() - 0.5) * 22;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.05)';
        ctx.fillRect(0,0,W,H); // Red flash
      } else if (Math.random() < 0.015) {
        shakeX = (Math.random() - 0.5) * 6;
      }

      // Draw Main Ninja
      drawNinja(shakeX, shakeY);

      // Draw Overclock Katana Slashes
      slashes = slashes.filter(sl => sl.life > 0);
      slashes.forEach(sl => {
        sl.life -= 0.035;
        ctx.save();
        ctx.translate(sl.x, sl.y);
        ctx.rotate(sl.a);
        glow('#ff1100', 30);
        ctx.fillStyle = `rgba(255, 200, 200, ${sl.life})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, 150 * (1.2 - sl.life) + 60, 5 * sl.life, 0, 0, Math.PI*2);
        ctx.fill();
        glow('transparent', 0);
        ctx.restore();
      });

      // Floating Embers & Sparks
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.life -= p.fade;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        ctx.fillStyle = `rgba(255, ${Math.floor(p.life*80)}, 0, ${p.life})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, Math.PI*2); ctx.fill();
      });

      // Ambient Embers Generator
      if(Math.random() < 0.35) {
        particles.push({
          x: CX + (Math.random()-0.5)*350, 
          y: H + 10,
          vx: (Math.random()-0.5)*1.5, 
          vy: -1.5 - Math.random()*3,
          life: 1, fade: 0.005 + Math.random()*0.01, sz: 1+Math.random()*2.5
        });
      }

      ctx.globalCompositeOperation = 'source-over';
      
      // Elite Cyber HUD overlay
      ctx.fillStyle = 'rgba(255, 60, 0, 0.6)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`CORTEX_SYNC: ${Math.floor(95 + Math.random()*5)}% [STABLE]`, 15, 25);
      ctx.fillText(`TARGET_LOCK: ${isAttacking ? '>>> ENGAGED <<<' : 'SCANNING...'}`, 15, 40);
      ctx.fillText(`THREAT_LVL:  ${isAttacking ? 'OMEGA' : 'NOMINAL'}`, 15, 55);
      
      // Bottom Grid Info
      ctx.textAlign = 'right';
      ctx.fillText('CRT-NINJA // v4.2.0', W - 15, H - 25);
      ctx.fillText('WEAPON: PLASMA_KATANA_X9', W - 15, H - 10);
      ctx.textAlign = 'left';

      // Mouse Target Reticle
      ctx.save();
      ctx.translate(targetMx, targetMy);
      ctx.rotate(time * 1.5);
      ctx.strokeStyle = `rgba(255, 30, 0, ${isAttacking ? 1 : 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-12, 0); ctx.lineTo(-5, 0);
      ctx.moveTo(12, 0); ctx.lineTo(5, 0);
      ctx.moveTo(0, -12); ctx.lineTo(0, -5);
      ctx.moveTo(0, 12); ctx.lineTo(0, 5);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(0,0, 15, 0, Math.PI*2); ctx.setLineDash([3,5]); ctx.stroke();
      
      // Inner rotating triangle
      ctx.rotate(-time * 3);
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(255, 0, 0, ${isAttacking ? 0.3 : 0.1})`;
      poly([[0, -8], [7, 4], [-7, 4]], true, false, 0);
      
      ctx.restore();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  })();
  </script>
"""
    new_lines = lines[:start_idx] + [new_script] + lines[end_idx:]
    with open('public/red-team.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f'Ninja animation successfully upgraded. Replaced lines {start_idx} to {end_idx}.')
else:
    print('Error: Could not find the script tags.')
    print('Start index:', start_idx)
    print('End index:', end_idx)
