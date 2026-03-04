import sys
import re

with open('public/red-team.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace JUST the JS logic without touching the complex CSS
js_old = r'[ \t]*/\* ── ROAMING RED NINJA VIRTUAL PET ── \*/.*?</script>'
js_new = '''    /* ── ROAMING RED NINJA VIRTUAL PET ── */
    (function() {
      const ninja = document.createElement('div');
      ninja.id = 'roaming-ninja';
      ninja.innerHTML = `
        <div class="ninja-body">
          <div class="ninja-head">
            <div class="ninja-band"></div>
            <div class="ninja-eye-slit">
              <div class="ninja-pupil left"></div>
              <div class="ninja-pupil right"></div>
            </div>
            <div class="ninja-tails"></div>
          </div>
          <div class="ninja-arm back"></div>
          <div class="ninja-arm front"></div>
          <div class="ninja-leg back"></div>
          <div class="ninja-leg front"></div>
        </div>
      `;
      document.body.appendChild(ninja);

      // Top, Right, Bottom, Left
      let state = 0; 

      // Constants for ninja size
      const NW = 80;
      const NH = 90;

      // Start Top-Left
      let currentX = 0;
      let currentY = -60; // Offset so feet touch the top edge
      
      ninja.style.left = currentX + 'px';
      ninja.style.top = currentY + 'px';
      // Upside down, facing right
      ninja.style.transform = 'rotate(180deg) scaleX(-1)';

      const speed = 250; // pixels per sec

      function moveNinjaLoop() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        let targetX = currentX;
        let targetY = currentY;
        let nextTransform = '';

        if (state === 0) {
            // Running across the TOP edge (Left to Right)
            targetX = w - (NH/2);
            targetY = -80; // stick feet to top
            nextTransform = 'rotate(180deg) scaleX(-1)';
            state = 1;
        } else if (state === 1) {
            // Running down the RIGHT edge (Top to Bottom)
            targetX = w - 40; // stick feet to right
            targetY = h - (NW/2);
            nextTransform = 'rotate(-90deg) scaleX(1)';
            state = 2;
        } else if (state === 2) {
            // Running across the BOTTOM edge (Right to Left)
            targetX = -10;
            targetY = h - 90; // Feet touch bottom
            nextTransform = 'rotate(0deg) scaleX(-1)';
            state = 3;
        } else if (state === 3) {
            // Running up the LEFT edge (Bottom to Top)
            targetX = -40; // feet touch left edge
            targetY = -10;
            nextTransform = 'rotate(90deg) scaleX(1)';
            state = 0;
        }

        const dist = Math.hypot(targetX - currentX, targetY - currentY);
        let timeToTravel = (dist / speed); 
        if (timeToTravel < 0.5) timeToTravel = 0.5;

        // Apply visual orientation rotation instantly (0.2s), but movement linearly over time
        ninja.style.transitionDuration = `${timeToTravel}s, ${timeToTravel}s, 0.2s`;
        ninja.style.transform = nextTransform;
        
        currentX = targetX;
        currentY = targetY;
        ninja.style.left = currentX + 'px';
        ninja.style.top = currentY + 'px';

        // Pause for 0.5 second at each corner before continuing the loop
        setTimeout(moveNinjaLoop, (timeToTravel * 1000) + 500);
      }

      // Initial jump to start the loop
      setTimeout(moveNinjaLoop, 1000);
    })();
  </script>'''
html = re.sub(js_old, js_new, html, flags=re.DOTALL)

with open('public/red-team.html', 'w', encoding='utf-8') as f:
    f.write(html)
