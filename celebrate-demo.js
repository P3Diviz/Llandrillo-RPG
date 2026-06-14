/*
================================================================
  Hero Profile Card — celebrate-demo.js
  Coleg Llandrillo · Academi Ddigidol 2025
  LECTURER DEMO VERSION — do NOT give this file to students.

  Same stat bar logic as student version.
  Custom celebration message congratulates the whole class.
  Message stays on screen for 7 seconds.
================================================================
*/

/* ── START ──────────────────────────────────────────────────── */

window.addEventListener('load', function () {
  setStatBars();
  setupButton();
});

/* ── STAT BARS ──────────────────────────────────────────────── */

function setStatBars() {
  var bars = document.querySelectorAll('.bar-fill');
  for (var i = 0; i < bars.length; i++) {
    var pts = parseInt(bars[i].getAttribute('data-points'), 10) || 0;
    if (pts > 4) {
      pts = 4;
    }
    if (pts < 0) {
      pts = 0;
    }
    bars[i].style.width = (pts / 4) * 100 + '%';
  }
}

/* ── BUTTON ─────────────────────────────────────────────────── */

function setupButton() {
  var btn = document.getElementById('activate-btn');
  if (!btn) {
    return;
  }
  btn.addEventListener('click', function () {
    btn.disabled = true;
    btn.textContent = '★ Cwblhau / Complete ★';
    fireParticles();
    showMessage();
  });
}

/* ── PARTICLES ──────────────────────────────────────────────── */

function getThemeColours() {
  var cl = document.body.classList;
  if (cl.contains('theme-wizard')) {
    return ['#40d8c0', '#8060d0', '#e86040', '#60e8d0', '#ffffff'];
  }
  if (cl.contains('theme-knight')) {
    return ['#7070e0', '#8050c0', '#e8a040', '#9090f8', '#ffffff'];
  }
  if (cl.contains('theme-dragon')) {
    return ['#e04040', '#c03030', '#e8a040', '#f06060', '#ffffff'];
  }
  if (cl.contains('theme-assassin')) {
    return ['#50c060', '#78c030', '#e8a040', '#60d070', '#ffffff'];
  }
  return ['#aaaaaa', '#cccccc', '#eeeeee', '#888888', '#ffffff'];
}

function getThemeStrip() {
  var cl = document.body.classList;
  if (cl.contains('theme-wizard')) {
    return '#40d8c0';
  }
  if (cl.contains('theme-knight')) {
    return '#7070e0';
  }
  if (cl.contains('theme-dragon')) {
    return '#e04040';
  }
  if (cl.contains('theme-assassin')) {
    return '#50c060';
  }
  return '#aaaaaa';
}

function fireParticles() {
  var colours = getThemeColours();
  /* more particles for the class reveal moment */
  for (var i = 0; i < 130; i++) {
    (function (delay) {
      setTimeout(function () {
        createParticle(colours[Math.floor(Math.random() * colours.length)]);
      }, delay);
    })(i * 24);
  }
}

function createParticle(colour) {
  var p = document.createElement('div');
  var size = Math.random() * 10 + 4;
  var startX = Math.random() * window.innerWidth;
  var vx = (Math.random() - 0.5) * 440;
  var vy = -(Math.random() * 520 + 160);

  p.style.cssText = [
    'position:fixed',
    'width:' + size + 'px',
    'height:' + size + 'px',
    'background:' + colour,
    'border-radius:' + (Math.random() > 0.5 ? '50%' : '3px'),
    'left:' + startX + 'px',
    'top:' + window.innerHeight + 'px',
    'pointer-events:none',
    'z-index:9999',
  ].join(';');

  document.body.appendChild(p);

  var posX = startX;
  var posY = window.innerHeight;
  var opacity = 1;

  var timer = setInterval(function () {
    vy += 14;
    posX += vx / 60;
    posY += vy / 60;
    opacity -= 0.011;
    p.style.left = posX + 'px';
    p.style.top = posY + 'px';
    p.style.opacity = opacity;
    if (opacity <= 0 || posY > window.innerHeight + 20) {
      clearInterval(timer);
      if (p.parentNode) {
        p.parentNode.removeChild(p);
      }
    }
  }, 16);
}

/* ── MESSAGE OVERLAY ────────────────────────────────────────── */

function showMessage() {
  var strip = getThemeStrip();

  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'z-index:10000',
    'pointer-events:none',
    'backdrop-filter:blur(6px)',
    '-webkit-backdrop-filter:blur(6px)',
  ].join(';');

  var panel = document.createElement('div');
  panel.style.cssText = [
    'background:rgba(0,0,0,0.6)',
    'border:1px solid rgba(255,255,255,0.2)',
    'border-top:1px solid rgba(255,255,255,0.35)',
    'border-left:4px solid ' + strip,
    'border-radius:16px',
    'padding:48px 60px',
    'text-align:center',
    'font-family:Arial,sans-serif',
    'box-shadow:0 16px 48px rgba(0,0,0,0.6)',
    'animation:popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
    'max-width:520px',
  ].join(';');

  panel.innerHTML =
    '<p style="font-size:44px;margin-bottom:16px;">★</p>' +
    '<p style="font-size:26px;font-weight:700;letter-spacing:1px;' +
    'color:#ffffff;margin-bottom:8px;">' +
    'Llongyfarchiadau i bawb!' +
    '</p>' +
    '<p style="font-size:16px;font-weight:400;letter-spacing:0;' +
    'text-transform:none;color:rgba(255,255,255,0.7);margin-bottom:26px;">' +
    'Congratulations to you all!' +
    '</p>' +
    '<p style="font-size:14px;font-weight:600;letter-spacing:0.5px;' +
    'color:#ffffff;margin-bottom:6px;line-height:1.6;">' +
    "Da iawn \u2014 rydych chi'n godwyr c\u00f4d nawr!" +
    '</p>' +
    '<p style="font-size:14px;font-weight:400;letter-spacing:0.5px;' +
    'text-transform:none;color:rgba(255,255,255,0.6);margin-bottom:26px;line-height:1.6;">' +
    'Well done \u2014 you are coders now!' +
    '</p>' +
    '<p style="font-size:11px;font-weight:700;letter-spacing:2px;' +
    'color:#4ade80;margin-bottom:4px;">' +
    'CROESO I GOLEG LLANDRILLO' +
    '</p>' +
    '<p style="font-size:11px;font-weight:400;letter-spacing:2px;' +
    'text-transform:none;color:rgba(74,222,128,0.6);">' +
    'WELCOME TO COLEG LLANDRILLO' +
    '</p>';

  var sty = document.createElement('style');
  sty.textContent =
    '@keyframes popIn{from{transform:scale(0.3);opacity:0;}to{transform:scale(1);opacity:1;}}';
  document.head.appendChild(sty);

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  /* 7 seconds — gives the whole class time to read */
  setTimeout(function () {
    overlay.style.transition = 'opacity 1.5s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 1500);
  }, 7000);
}
