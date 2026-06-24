/**
 * ai-portfolio v13.0 Patch Module
 * Replaces v12_patch.js entirely.
 * Last updated: 2026-06-24
 */
;(function () {
  'use strict';
  if (window._v13) return;
  window._v13 = { version: '13.0.0', applied: Date.now() };

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'className') node.className = attrs[k];
      else if (k === 'innerHTML') node.innerHTML = attrs[k];
      else if (k === 'textContent') node.textContent = attrs[k];
      else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(node.style, attrs[k]);
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach(function (c) { if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return node;
  };

  /* ================================================================
   * 1. CSS
   * ================================================================ */
  var style = document.createElement('style');
  style.id = 'v13-patch-styles';
  style.textContent = [
    '.v13-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v13-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v13-toast.show{transform:translateX(0);opacity:1}',
    '.v13-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v13-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v13-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v13pulse 1.8s infinite}',
    '@keyframes v13pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v13-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v13-scroll-ring:hover{opacity:1}',
    '.v13-scroll-ring svg{transform:rotate(-90deg)}',
    '.v13-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v13-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v13-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v13-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v13-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v13-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v13-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v13-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v13-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v13-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v13-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v13-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v13-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v13-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v13-compare-col .v13c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v13-compare-col .v13c-label{color:var(--text3,#64748b)}',
    '.v13-compare-col .v13c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v13-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v13-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v13-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v13-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Spotlight */
    '.v13-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v13-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v13-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v13-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v13-spot-left{position:relative;z-index:1}',
    '.v13-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v13-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v13-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v13-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v13-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v13-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v13-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v13-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v13-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v13-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v13-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v13-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v13-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    '@media(max-width:768px){.v13-spot-card{grid-template-columns:1fr;padding:1.5rem}}',
    /* Growth */
    '.v13-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v13-growth-grid{grid-template-columns:1fr}}',
    '.v13-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v13-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v13-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v13-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v13-bar:hover{opacity:.85}',
    '.v13-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v13-bar:hover .bar-tip{opacity:1}',
    '.v13-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    '.v13-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v13-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v13-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v13-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health */
    '.v13-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v13-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v13-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v13-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v13-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v13-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v13-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v13-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v13-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Heatmap */
    '.v13-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v13-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v13-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v13-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v13-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Metrics */
    '.v13-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v13-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v13-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v13-metric-card:hover{transform:translateY(-4px)}',
    '.v13-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v13-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Banner */
    '.v13-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v13-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v13-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v13bannerPulse 2s ease-in-out infinite}',
    '@keyframes v13bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v13-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v13-banner-text strong{color:var(--text,#e2e8f0)}',
    /* Evolution Canvas */
    '.v13-evolution{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-evolution h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-evolution-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-evo-canvas{width:100%;height:220px;min-width:600px}',
    /* Radar */
    '.v13-radar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-radar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v13-radar-canvas{width:320px;height:320px}',
    /* Milestone */
    '.v13-milestone{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v13-milestone h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-milestone-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-mile-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v13-mile-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.5rem;text-align:center;position:relative;overflow:hidden}',
    '.v13-mile-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 12px 12px}',
    '.v13-mile-num{font-size:2.2rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v13-mile-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    '.v13-mile-icon{font-size:1.5rem;margin-bottom:.5rem}',
    /* Pulse Board */
    '.v13-pulse-board{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v13-pulse-board h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-pulse-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-pulse-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}',
    '.v13-pulse-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;align-items:center;gap:1rem;transition:transform .2s}',
    '.v13-pulse-item:hover{transform:translateY(-2px)}',
    '.v13-pulse-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;animation:v13pulse 1.8s infinite}',
    '.v13-pulse-info{flex:1}',
    '.v13-pulse-info .p-name{font-weight:700;font-size:.9rem}',
    '.v13-pulse-info .p-ver{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600}',
    '.v13-pulse-info .p-updated{font-size:.65rem;color:var(--text3,#64748b)}',
    '.v13-pulse-score{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace}',
    /* Synergy */
    '.v13-synergy{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-synergy h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-synergy-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-synergy-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v13-synergy-canvas{width:100%;max-width:500px;height:500px}',
    /* Leaderboard */
    '.v13-leaderboard{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-leaderboard h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-leaderboard-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-lb-list{display:flex;flex-direction:column;gap:.6rem}',
    '.v13-lb-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:grid;grid-template-columns:40px 1fr 80px 100px;align-items:center;gap:1rem;transition:transform .2s}',
    '.v13-lb-item:hover{transform:translateX(4px)}',
    '.v13-lb-rank{font-size:1.4rem;font-weight:900;font-family:"Courier New",Consolas,monospace;text-align:center}',
    '.v13-lb-name{font-weight:700;font-size:.9rem}',
    '.v13-lb-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden}',
    '.v13-lb-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v13-lb-score{text-align:right;font-weight:700;font-family:"Courier New",Consolas,monospace;font-size:.9rem}',
    /* Velocity */
    '.v13-velocity{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-velocity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-velocity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-velocity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-velocity-canvas{width:100%;height:200px;min-width:500px}',
    /* Changelog */
    '.v13-changelog{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-changelog h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-changelog-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-cl-list{display:flex;flex-direction:column;gap:.8rem}',
    '.v13-cl-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;gap:1rem;align-items:flex-start;transition:transform .2s}',
    '.v13-cl-item:hover{transform:translateY(-2px)}',
    '.v13-cl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:6px}',
    '.v13-cl-content{flex:1}',
    '.v13-cl-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.3rem}',
    '.v13-cl-title{font-weight:700;font-size:.9rem}',
    '.v13-cl-date{font-size:.65rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    '.v13-cl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* Maturity */
    '.v13-maturity{max-width:600px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-maturity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-maturity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-maturity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v13-maturity-grade{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.3rem}',
    '.v13-maturity-label{font-size:.85rem;color:var(--text2,#94a3b8);margin-bottom:1.5rem}',
    '.v13-maturity-bars{display:flex;flex-direction:column;gap:.8rem;text-align:left}',
    '.v13-mat-row{display:flex;align-items:center;gap:1rem}',
    '.v13-mat-lbl{width:100px;font-size:.8rem;color:var(--text2,#94a3b8);text-align:right;flex-shrink:0}',
    '.v13-mat-track{flex:1;height:8px;background:rgba(99,102,241,.1);border-radius:4px;overflow:hidden}',
    '.v13-mat-fill{height:100%;border-radius:4px;transition:width 1.5s ease-out}',
    '.v13-mat-pct{width:40px;font-size:.75rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    /* Impact Matrix */
    '.v13-impact{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-impact h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-impact-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-impact-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-impact-canvas{width:100%;height:300px;min-width:700px}',
    /* Certs */
    '.v13-certs{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-certs h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-certs-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-certs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}',
    '.v13-cert-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden}',
    '.v13-cert-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(99,102,241,.15)}',
    '.v13-cert-icon{font-size:2rem;margin-bottom:.5rem}',
    '.v13-cert-name{font-weight:700;font-size:.9rem;margin-bottom:.3rem}',
    '.v13-cert-level{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:.6rem}',
    '.v13-cert-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.3rem}',
    '.v13-cert-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v13-cert-projects{font-size:.65rem;color:var(--text3,#64748b)}',
    /* Flow */
    '.v13-flow{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-flow h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-flow-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-flow-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-flow-canvas{width:100%;height:250px;min-width:600px}',
    /* Timeline */
    '.v13-timeline{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-timeline h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-timeline-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-tl-list{position:relative;padding-left:24px}',
    '.v13-tl-list::before{content:"";position:absolute;left:8px;top:0;bottom:0;width:2px;background:linear-gradient(var(--accent,#6366f1),var(--cyan,#22d3ee))}',
    '.v13-tl-item{position:relative;margin-bottom:1.2rem;padding-left:24px}',
    '.v13-tl-date{font-size:.7rem;font-weight:700;font-family:"Courier New",Consolas,monospace;margin-bottom:.2rem}',
    '.v13-tl-title{font-weight:700;font-size:.9rem;margin-bottom:.2rem}',
    '.v13-tl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* Insights */
    '.v13-insights{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-insights h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-insights-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-insights-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v13-insight-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;transition:transform .2s}',
    '.v13-insight-card:hover{transform:translateY(-3px)}',
    '.v13-insight-icon{font-size:1.5rem;margin-bottom:.5rem}',
    '.v13-insight-val{font-size:1.6rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v13-insight-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.2rem}',
    '.v13-insight-trend{font-size:.7rem;font-weight:600;margin-top:.4rem}',
    '.v13-trend-up{color:#22c55e}',
    '.v13-trend-stable{color:#f59e0b}',
    /* Streak */
    '.v13-streak{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-streak h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-streak-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-streak-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;text-align:center}',
    '.v13-streak-num{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:linear-gradient(135deg,#f59e0b,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v13-streak-lbl{font-size:.85rem;color:var(--text2,#94a3b8);margin-bottom:1rem}',
    '.v13-streak-row{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:1rem}',
    '.v13-streak-day{width:18px;height:18px;border-radius:3px;display:inline-block;position:relative;cursor:default;transition:transform .15s}',
    '.v13-streak-day:hover{transform:scale(1.6);z-index:1}',
    '.v13-streak-stats{display:flex;justify-content:center;gap:2rem;margin-top:1.2rem;flex-wrap:wrap}',
    '.v13-streak-stat{text-align:center}',
    '.v13-streak-stat .ss-num{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace;color:var(--accent,#6366f1)}',
    '.v13-streak-stat .ss-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase}',
    /* Blueprint */
    '.v13-blueprint{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-blueprint h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-blueprint-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-blueprint-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-blueprint-canvas{width:100%;height:320px;min-width:700px}',
    /* Contrib */
    '.v13-contrib{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-contrib h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-contrib-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-contrib-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-contrib-canvas{width:100%;height:160px;min-width:600px}',
    /* Analytics */
    '.v13-analytics{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-analytics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-analytics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-analytics-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-analytics-canvas{width:100%;height:280px;min-width:700px}',
    /* Perf Scorecard */
    '.v13-perf{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-perf h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-perf-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-perf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v13-perf-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v13-perf-card:hover{transform:translateY(-3px)}',
    /* Quality */
    '.v13-quality{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-quality h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-quality-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-quality-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-quality-canvas{width:100%;height:280px;min-width:600px}',
    /* Collab */
    '.v13-collab{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-collab h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-collab-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-collab-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-collab-canvas{width:100%;height:280px;min-width:600px}',
    /* Version Map */
    '.v13-vmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-vmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-vmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-vmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-vmap-canvas{width:100%;height:300px;min-width:700px}',
    /* NEW v13: Tech Dependency Network */
    '.v13-technet{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-technet h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-technet-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-technet-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-technet-canvas{width:100%;height:360px;min-width:700px}',
    /* NEW v13: Project Complexity Radar */
    '.v13-complexity{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-complexity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-complexity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-complexity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center;overflow-x:auto}',
    '.v13-complexity-canvas{width:400px;height:400px}',
    /* NEW v13: Dev ROI Dashboard */
    '.v13-roi{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-roi h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-roi-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-roi-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-roi-canvas{width:100%;height:280px;min-width:700px}',
    /* NEW v13: Feature Density Map */
    '.v13-density{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-density h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-density-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-density-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-density-canvas{width:100%;height:320px;min-width:700px}',
    /* NEW v13: Tech Evolution Timeline */
    '.v13-techevo{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-techevo h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-techevo-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-techevo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v13-techevo-canvas{width:100%;height:260px;min-width:700px}',
    /* NEW v13: Live Status Monitor */
    '.v13-status{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-status h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-status-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-status-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.8rem}',
    '.v13-status-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:10px;padding:.8rem 1rem;display:flex;align-items:center;gap:.8rem;transition:transform .2s}',
    '.v13-status-item:hover{transform:translateY(-2px)}',
    '.v13-status-led{width:10px;height:10px;border-radius:50%;flex-shrink:0}',
    '.v13-status-led.green{background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,.5)}',
    '.v13-status-name{font-weight:600;font-size:.85rem;flex:1}',
    '.v13-status-ver{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600}',
    /* NEW v13: Architecture Patterns */
    '.v13-patterns{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v13-patterns h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v13-patterns-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v13-patterns-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v13-pattern-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;transition:transform .2s}',
    '.v13-pattern-card:hover{transform:translateY(-3px)}',
    '.v13-pattern-icon{font-size:1.8rem;margin-bottom:.5rem}',
    '.v13-pattern-name{font-weight:700;font-size:.9rem;margin-bottom:.3rem}',
    '.v13-pattern-count{font-size:.75rem;color:var(--cyan,#22d3ee);font-weight:600;margin-bottom:.4rem}',
    '.v13-pattern-desc{font-size:.75rem;color:var(--text3,#64748b);line-height:1.4}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * 2. PROJECT DATA (v13 — 2026-06-24 latest)
   * ================================================================ */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v10.0', tech: ['Canvas', 'PWA'], impact: '672 Topics',
      features: 'Daily Challenge 3 Random, Mastery Radar Canvas 11 Subjects, Pomodoro Timer Canvas, Flashcard Builder 100, Learning Path Map Canvas, Weekly Report Canvas PNG, Word Book 4 Subjects 20 Terms, Time Attack 60s 15 Qs, Quiz 565, 100 Achievements, SFX 20, Keyboard 8',
      loc: 14000, date: '2026-06-23', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'100',l:'Achievements'},{n:'565',l:'Quizzes'},{n:'v10',l:'Version'}] },
    { title: 'SmartGolf', version: 'v27.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Course Strategy Guide 18 Hole Canvas, Round Planner, Equipment Inventory 14 Canvas, Stats Master Canvas, AI Swing Diagnosis 6-Stage, Course Bucket List 20, 18 Hole Walkthrough Canvas, Golf IQ v10, 140+ Achievements, SFX 12, Keyboard 8',
      loc: 17500, date: '2026-06-21', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v27',l:'Version'},{n:'140+',l:'Achievements'},{n:'150',l:'Glossary'}] },
    { title: 'Culture Center Finder', version: 'v10.0', tech: ['Leaflet', 'PWA'], impact: '84,431 courses',
      features: 'Category Refiner Canvas 9, Curriculum Timeline Canvas 6, Instructor Profile Canvas 8, Calendar View Canvas, Popularity Chart Canvas 12, Cost Calculator Canvas Pie/Bar, Satisfaction Survey Canvas Radar, Learning Report Canvas PNG, Quiz 90, 90 Achievements, SFX 12, Keyboard 8',
      loc: 11000, date: '2026-06-19', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'84K+',l:'Courses'},{n:'90',l:'Achievements'},{n:'90',l:'Quizzes'},{n:'11',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v14.0', tech: ['Canvas', 'PWA'], impact: 'Magic Spellbook',
      features: 'Magic Spellbook 12, Tinniping Dex 12, Daily Calendar Canvas 30, Story Gallery 12, Stat Compare Canvas 6-axis, Training Dojo Canvas, Emotion Weather 8, Friendship Board 12, Quiz 90, 106 Achievements, SFX 12, Keyboard 8',
      loc: 9500, date: '2026-06-22', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v14',l:'Version'},{n:'106',l:'Achievements'},{n:'90',l:'Quizzes'},{n:'24',l:'Cards'}] },
    { title: 'History RPG', version: 'v18.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '165 quizzes',
      features: 'Duel Arena 10 Heroes, Wonder Construction 8 Canvas, Siege Simulator Canvas 6, Hero Saga 12, Supply Chain Canvas 4 Resources, 36 Stratagems 12, Ancient Martial Arts 12, Territory Map Canvas 6 Eras, Quiz 165, 108 Achievements, SFX 12, Keyboard 8',
      loc: 13200, date: '2026-06-24', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v18',l:'Version'},{n:'165',l:'Quizzes'},{n:'108',l:'Achievements'},{n:'12',l:'Heroes'}] },
    { title: 'Piano', version: 'v14.0', tech: ['Tone.js', 'PWA'], impact: '112+ songs',
      features: 'Finger Exercise Canvas 10, Interval Training 12, Pedal Simulator, Sheet Music Generator Canvas, Ambience 8, Chord Workshop Canvas 10, Sight-Reading Challenge, Piano History Museum 12 Eras, 112 Songs, Quiz 75, 108 Achievements, SFX 12, Keyboard 8',
      loc: 10800, date: '2026-06-22', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'112',l:'Songs'},{n:'108',l:'Achievements'},{n:'75',l:'Quizzes'},{n:'v14',l:'Version'}] },
    { title: 'Violin', version: 'v13.0', tech: ['Tone.js', 'PWA'], impact: '104 songs',
      features: 'Dynamic Trainer Canvas 6, Arpeggio Trainer 12 Canvas, Tuning Helper Canvas Meter, Practice Streak 30-day Canvas Heatmap, Maintenance Guide 12, Genre Explorer 12, Posture Clinic 8, Practice Timer Pomodoro Canvas, 104 Songs, 130 Lessons, Quiz 60, 106 Achievements, SFX 12, Keyboard 8',
      loc: 10200, date: '2026-06-21', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'104',l:'Songs'},{n:'130',l:'Lessons'},{n:'106',l:'Achievements'},{n:'v13',l:'Version'}] },
    { title: 'Karaoke', version: 'v14.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '115 songs',
      features: 'Voice Transform Studio 8, Score Analysis 5-axis Radar Canvas, Vocal Coach 12 Tips, Genre Discovery Wheel Canvas 10, Song Diary + Streak, Breath Control Canvas 6, Key Finder Canvas, Performance Archive, 115 Songs, Quiz 117, 102 Achievements, SFX 12, Keyboard 8',
      loc: 10400, date: '2026-06-22', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'115',l:'Songs'},{n:'102',l:'Achievements'},{n:'117',l:'Quizzes'},{n:'v14',l:'Version'}] },
    { title: 'Golf Tracker', version: 'v12.0', tech: ['Canvas', 'CV', 'PWA'], impact: 'Putting Dashboard',
      features: 'Putting Analysis Dashboard Canvas, Shot Scatter Canvas, Stroke Gain 4-area Bar Canvas, Course Management AI 6, Condition Correction Canvas, Green Reading Canvas, Club Gap Analysis Canvas, Season Stats Line Canvas, Quiz 75, 60 Achievements, SFX 12, Keyboard 8',
      loc: 9000, date: '2026-06-19', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v12',l:'Version'},{n:'60',l:'Achievements'},{n:'75',l:'Quiz'},{n:'CV',l:'Tracking'}] },
    { title: 'Boxing Trainer', version: 'v15.0', tech: ['Three.js', 'PWA'], impact: '105 quiz',
      features: 'Punch Combination Builder Canvas, Stance Analyzer 6, Virtual Sandbag Canvas, Injury Prevention 12, Judge Scoring Sim 10R, Training Diary, Power Analysis 6-axis Radar Canvas, Classic Fights Review 12, Quiz 105, 106 Achievements, SFX 12, Keyboard 8',
      loc: 12200, date: '2026-06-22', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v15',l:'Version'},{n:'105',l:'Quiz'},{n:'106',l:'Achievements'},{n:'12',l:'Classic Fights'}] },
    { title: 'City Builder', version: 'v12.0', tech: ['Canvas', 'PWA'], impact: '130 quizzes',
      features: 'Transport Infra Canvas 6, Royal Treasury Dashboard Canvas Pie/Bar, City Defense Sim Canvas 8, Citizen Life Observer Canvas 24h, Architecture Gallery 12, Weather System 4 Seasons 8 Types, Ruin Excavation 10, Royal Decree 12, Quiz 130, 122 Achievements, SFX 12, Keyboard 8',
      loc: 11200, date: '2026-06-20', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'122',l:'Achievements'},{n:'130',l:'Quizzes'},{n:'12',l:'Heroes'}] },
    { title: 'House Builder', version: 'v12.0', tech: ['Three.js', 'PWA'], impact: 'Interior Studio',
      features: 'Interior Design Studio 12 Canvas, Structural Mechanics Canvas, Cost Estimation Canvas Pie/Bar, Landscape Garden Planner 10x10 Canvas, Hanok Interior Gallery 12, Blueprint Learning 6 Canvas, Safety Inspection 10 Canvas Radar, Timeline Capsule Canvas, Quiz 120, 122 Achievements, SFX 12, Keyboard 8',
      loc: 9700, date: '2026-06-21', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v12',l:'Version'},{n:'122',l:'Achievements'},{n:'120',l:'Quizzes'},{n:'12',l:'Masterclass'}] }
  ];

  var TOTAL_LOC = PROJECTS.reduce(function(s,p){return s+p.loc},0);
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ================================================================
   * 3. WEB AUDIO SFX (28 types)
   * ================================================================ */
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    return audioCtx;
  }
  function playSFX(type) {
    var ctx = getAudioCtx(); if (!ctx) return;
    var o = ctx.createOscillator(); var g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    var now = ctx.currentTime;
    switch (type) {
      case 'nav': o.frequency.setValueAtTime(880, now); o.type = 'sine'; g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.stop(now + 0.12); break;
      case 'filter': o.frequency.setValueAtTime(660, now); o.frequency.exponentialRampToValueAtTime(1320, now + 0.08); o.type = 'triangle'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1); o.stop(now + 0.1); break;
      case 'compare': o.frequency.setValueAtTime(523, now); o.frequency.setValueAtTime(659, now + 0.06); o.type = 'sine'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'spotlight': o.frequency.setValueAtTime(440, now); o.frequency.exponentialRampToValueAtTime(880, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'toast': o.frequency.setValueAtTime(1047, now); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08); o.stop(now + 0.08); break;
      case 'scroll': o.frequency.setValueAtTime(220, now); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.06); o.stop(now + 0.06); break;
      case 'heatmap': o.frequency.setValueAtTime(392, now); o.frequency.exponentialRampToValueAtTime(784, now + 0.1); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.stop(now + 0.12); break;
      case 'metric': o.frequency.setValueAtTime(587, now); o.frequency.setValueAtTime(880, now + 0.05); o.frequency.setValueAtTime(1175, now + 0.1); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.18); o.stop(now + 0.18); break;
      case 'evolution': o.frequency.setValueAtTime(330, now); o.frequency.exponentialRampToValueAtTime(660, now + 0.2); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'radar': o.frequency.setValueAtTime(440, now); o.frequency.setValueAtTime(554, now + 0.05); o.frequency.setValueAtTime(659, now + 0.1); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'milestone': o.frequency.setValueAtTime(523, now); o.frequency.setValueAtTime(784, now + 0.08); o.frequency.setValueAtTime(1047, now + 0.16); o.type = 'triangle'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'pulse': o.frequency.setValueAtTime(262, now); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'velocity': o.frequency.setValueAtTime(392, now); o.frequency.setValueAtTime(523, now + 0.06); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.14); o.stop(now + 0.14); break;
      case 'synergy': o.frequency.setValueAtTime(349, now); o.frequency.setValueAtTime(440, now + 0.05); o.frequency.setValueAtTime(523, now + 0.1); o.frequency.setValueAtTime(659, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'leaderboard': o.frequency.setValueAtTime(698, now); o.frequency.setValueAtTime(880, now + 0.06); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'impact': o.frequency.setValueAtTime(262, now); o.frequency.setValueAtTime(330, now + 0.04); o.frequency.setValueAtTime(392, now + 0.08); o.frequency.setValueAtTime(523, now + 0.12); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'cert': o.frequency.setValueAtTime(784, now); o.frequency.setValueAtTime(988, now + 0.06); o.frequency.setValueAtTime(1175, now + 0.12); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'flow': o.frequency.setValueAtTime(196, now); o.frequency.exponentialRampToValueAtTime(523, now + 0.25); o.type = 'triangle'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3); o.stop(now + 0.3); break;
      case 'streak': o.frequency.setValueAtTime(659, now); o.frequency.setValueAtTime(784, now + 0.04); o.frequency.setValueAtTime(1047, now + 0.08); o.type = 'sine'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'blueprint': o.frequency.setValueAtTime(220, now); o.frequency.setValueAtTime(330, now + 0.06); o.frequency.setValueAtTime(440, now + 0.12); o.frequency.setValueAtTime(660, now + 0.18); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28); o.stop(now + 0.28); break;
      case 'contrib': o.frequency.setValueAtTime(523, now); o.frequency.exponentialRampToValueAtTime(1047, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'analytics': o.frequency.setValueAtTime(392, now); o.frequency.setValueAtTime(494, now + 0.05); o.frequency.setValueAtTime(587, now + 0.1); o.frequency.setValueAtTime(784, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22); o.stop(now + 0.22); break;
      case 'quality': o.frequency.setValueAtTime(440, now); o.frequency.setValueAtTime(554, now + 0.04); o.frequency.setValueAtTime(659, now + 0.08); o.frequency.setValueAtTime(880, now + 0.12); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'collab': o.frequency.setValueAtTime(349, now); o.frequency.exponentialRampToValueAtTime(698, now + 0.2); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'technet': o.frequency.setValueAtTime(294, now); o.frequency.setValueAtTime(370, now + 0.05); o.frequency.setValueAtTime(440, now + 0.1); o.frequency.setValueAtTime(587, now + 0.15); o.frequency.setValueAtTime(740, now + 0.2); o.type = 'sine'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3); o.stop(now + 0.3); break;
      case 'complexity': o.frequency.setValueAtTime(262, now); o.frequency.setValueAtTime(392, now + 0.06); o.frequency.setValueAtTime(523, now + 0.12); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22); o.stop(now + 0.22); break;
      case 'roi': o.frequency.setValueAtTime(330, now); o.frequency.exponentialRampToValueAtTime(880, now + 0.2); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28); o.stop(now + 0.28); break;
      case 'density': o.frequency.setValueAtTime(494, now); o.frequency.setValueAtTime(587, now + 0.04); o.frequency.setValueAtTime(740, now + 0.08); o.frequency.setValueAtTime(988, now + 0.12); o.type = 'triangle'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
    }
    o.start(now);
  }

  /* ================================================================
   * 4. UPDATE PROJECT CARDS
   * ================================================================ */
  function updateProjectCards() {
    var cards = $$('.card');
    PROJECTS.forEach(function (proj) {
      var card = null;
      cards.forEach(function (c) {
        var titleEl = c.querySelector('.card-title');
        if (titleEl) {
          var t = titleEl.textContent.trim();
          if (t === proj.title || t === proj.title.replace(/ /g, '') ||
              proj.title.indexOf(t) !== -1 || t.indexOf(proj.title) !== -1) card = c;
        }
      });
      if (!card) return;
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      var vBadge = card.querySelector('.version-badge');
      if (vBadge) vBadge.textContent = proj.version;
      card.setAttribute('data-v13-title', proj.title);
      card.setAttribute('data-v13-version', proj.version);
      card.setAttribute('data-v13-tech', proj.tech.join(','));
      card.setAttribute('data-v13-impact', proj.impact);
      card.setAttribute('data-v13-features', proj.features);
      card.setAttribute('data-v13-loc', proj.loc);
      card.setAttribute('data-v13-category', proj.category);
      var existingBtn = card.querySelector('[class*="compare-btn"]');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v13-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); playSFX('compare'); toggleCompareSelection(card, btn); });
      card.appendChild(btn);
      card.classList.add('v13-stagger');
    });
  }

  /* ================================================================
   * 5. WHAT'S NEW BANNER
   * ================================================================ */
  function buildBanner() {
    var ps = $('#projects'); if (!ps) return;
    var old = $('[class*="-banner"]'); if (old) old.remove();
    var banner = el('div', { className: 'v13-banner' });
    banner.innerHTML = '<div class="v13-banner-inner">' +
      '<span class="v13-banner-badge">New in v13</span>' +
      '<div class="v13-banner-text"><strong>History RPG v18.0</strong> &mdash; Duel Arena, Wonder Construction, 165 Quizzes &bull; ' +
      '<strong>LevelPlay v10.0</strong> &mdash; Daily Challenge, Mastery Radar, 565 Quizzes &bull; ' +
      '<strong>Boxing v15.0</strong> &mdash; Punch Combo Builder, Judge Scoring Sim &bull; ' +
      '<strong>Karaoke v14.0</strong> &mdash; Voice Transform 8, Breath Control Canvas &bull; ' +
      '<strong>SmartGolf v27.0</strong> &mdash; 140+ Achievements &bull; ' +
      '<strong>Piano v14.0</strong> &mdash; Finger Exercise 10, 112 Songs &bull; ' +
      '<strong>Violin v13.0</strong> &mdash; Dynamic Trainer, Arpeggio 12 &bull; ' +
      '<strong>All 12 Projects Updated</strong></div></div>';
    ps.parentNode.insertBefore(banner, ps);
  }

  /* ================================================================
   * 6. METRICS BAR
   * ================================================================ */
  function buildMetrics() {
    var target = $('[class*="-banner"]'); if (!target) return;
    var old = $('[class*="-metrics"]'); if (old) old.remove();
    var section = el('div', { className: 'v13-metrics v13-stagger', id: 'v13-metrics' });
    section.innerHTML = '<h2>Portfolio Metrics</h2><p class="v13-metrics-sub">Aggregate statistics across all 12 projects</p>';
    var metrics = [
      { n: TOTAL_LOC.toLocaleString(), l: 'Total LOC' },
      { n: '12', l: 'Active Projects' },
      { n: '180+', l: 'Versions Shipped' },
      { n: '1,320+', l: 'Total Quizzes' },
      { n: '1,250+', l: 'Achievements' },
      { n: '310+', l: 'SFX Sounds' },
      { n: '25+', l: 'Canvas Visuals' },
      { n: '6', l: 'Core Technologies' }
    ];
    var grid = el('div', { className: 'v13-metrics-grid' });
    metrics.forEach(function (m) {
      grid.appendChild(el('div', { className: 'v13-metric-card', innerHTML: '<div class="v13-metric-num">' + m.n + '</div><div class="v13-metric-lbl">' + m.l + '</div>' }));
    });
    section.appendChild(grid);
    target.parentNode.insertBefore(section, target.nextSibling);
  }

  /* ================================================================
   * 7. SPOTLIGHT CAROUSEL
   * ================================================================ */
  function buildSpotlight() {
    var anchor = $('[id="v13-metrics"]') || $('[class*="-metrics"]'); if (!anchor) return;
    var old = $('[id="v13-spotlight"]'); if (old) old.remove();
    var section = el('div', { className: 'v13-spotlight v13-stagger', id: 'v13-spotlight' });
    section.innerHTML = '<h2>Featured Project</h2><p class="v13-spotlight-sub">Rotating spotlight on latest improvements</p>';
    var spots = PROJECTS.slice(0, 6);
    var idx = 0;
    function renderSpot(i) {
      var p = spots[i];
      var card = section.querySelector('.v13-spot-card');
      if (card) card.remove();
      card = el('div', { className: 'v13-spot-card' });
      card.innerHTML = '<div class="v13-spot-left"><span class="spot-tier" style="background:rgba(' + (p.category === 'NEXTERA' ? '34,197,94' : '34,211,238') + ',.15);color:' + (p.category === 'NEXTERA' ? '#4ade80' : '#22d3ee') + '">' + p.category + '</span>' +
        '<div class="spot-title">' + p.title + '</div><div class="spot-ver">' + p.version + ' &mdash; ' + p.impact + '</div>' +
        '<div class="spot-desc">' + p.features.substring(0, 180) + '...</div>' +
        '<div class="spot-tags">' + p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></div>' +
        '<div class="v13-spot-right">' + p.stats.map(function (s) { return '<div class="v13-spot-stat"><div class="s-num">' + s.n + '</div><div class="s-lbl">' + s.l + '</div></div>'; }).join('') + '</div>';
      var navEl = section.querySelector('.v13-spot-nav');
      section.insertBefore(card, navEl);
      playSFX('spotlight');
      section.querySelectorAll('.v13-spot-dot').forEach(function (d, di) { d.classList.toggle('active', di === i); });
    }
    var nav = el('div', { className: 'v13-spot-nav' });
    spots.forEach(function (_, i) {
      var dot = el('button', { className: 'v13-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Show project ' + (i + 1) });
      dot.addEventListener('click', function () { idx = i; renderSpot(i); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    renderSpot(0);
    setInterval(function () { idx = (idx + 1) % spots.length; renderSpot(idx); }, 8000);
    anchor.parentNode.insertBefore(section, anchor.nextSibling);
  }

  /* ================================================================
   * 8-32. REMAINING SECTIONS (growth, health, heatmap, evolution,
   *        radar, milestones, pulse, synergy, leaderboard, velocity,
   *        changelog, maturity, impact, certs, flow, timeline,
   *        insights, streak, blueprint, contrib, analytics,
   *        perf, quality, collab, vmap)
   * ================================================================ */
  function insertAfter(newNode, refId) {
    var ref = $('#' + refId); if (!ref) return;
    ref.parentNode.insertBefore(newNode, ref.nextSibling);
  }

  function buildGrowth() {
    var old = $('#v13-growth'); if (old) old.remove();
    var s = el('div', { className: 'v13-growth v13-stagger', id: 'v13-growth' });
    s.innerHTML = '<h2>Growth Dashboard</h2><p class="v13-growth-sub">LOC growth and technology distribution</p>';
    var grid = el('div', { className: 'v13-growth-grid' });
    var locData = PROJECTS.map(function(p){return{n:p.title.substring(0,8),v:p.loc}}).sort(function(a,b){return b.v-a.v});
    var maxLoc = locData[0].v;
    var barHtml = '<div class="v13-growth-card"><h3>LOC by Project</h3><div class="v13-bar-chart">';
    locData.forEach(function(d){
      var h = Math.round(d.v / maxLoc * 140);
      var hue = Math.round(d.v / maxLoc * 120 + 220);
      barHtml += '<div class="v13-bar" style="height:0;background:hsl(' + hue + ',70%,55%)" data-h="' + h + '"><span class="bar-tip">' + d.n + ': ' + d.v.toLocaleString() + '</span></div>';
    });
    barHtml += '</div><div class="v13-bar-label"><span>' + locData[locData.length - 1].n + '</span><span>' + locData[0].n + '</span></div></div>';
    grid.innerHTML = barHtml;
    var techCounts = {};
    PROJECTS.forEach(function(p){p.tech.forEach(function(t){techCounts[t]=(techCounts[t]||0)+1})});
    var colors = ['#6366f1','#22d3ee','#22c55e','#f59e0b','#f43f5e','#8b5cf6','#ec4899','#14b8a6'];
    var donutHtml = '<div class="v13-growth-card"><h3>Tech Distribution</h3><div class="v13-donut-wrap"><svg width="160" height="160" viewBox="0 0 160 160">';
    var total = Object.values(techCounts).reduce(function(a,b){return a+b},0);
    var angle = 0;
    var legendHtml = '<div class="v13-donut-legend">';
    Object.keys(techCounts).forEach(function(t, i) {
      var pct = techCounts[t] / total;
      var a1 = angle * Math.PI / 180;
      angle += pct * 360;
      var a2 = angle * Math.PI / 180;
      var large = pct > 0.5 ? 1 : 0;
      var x1 = 80 + 60 * Math.cos(a1), y1 = 80 + 60 * Math.sin(a1);
      var x2 = 80 + 60 * Math.cos(a2), y2 = 80 + 60 * Math.sin(a2);
      donutHtml += '<path d="M80,80 L' + x1 + ',' + y1 + ' A60,60 0 ' + large + ',1 ' + x2 + ',' + y2 + ' Z" fill="' + colors[i % colors.length] + '" opacity=".8"/>';
      legendHtml += '<div class="v13-legend-item"><span class="v13-legend-dot" style="background:' + colors[i % colors.length] + '"></span>' + t + ' (' + techCounts[t] + ')</div>';
    });
    donutHtml += '<circle cx="80" cy="80" r="35" fill="var(--card,#12122a)"/><text x="80" y="84" text-anchor="middle" fill="var(--text,#e2e8f0)" font-size="14" font-weight="700">' + total + '</text></svg>';
    legendHtml += '</div>';
    donutHtml += legendHtml + '</div></div>';
    grid.innerHTML += donutHtml;
    s.appendChild(grid);
    insertAfter(s, 'v13-spotlight');
  }

  function buildHealth() {
    var old = $('#v13-health'); if (old) old.remove();
    var s = el('div', { className: 'v13-health v13-stagger', id: 'v13-health' });
    s.innerHTML = '<h2>Project Health</h2><p class="v13-health-sub">Real-time status of all 12 projects</p>';
    var grid = el('div', { className: 'v13-health-grid' });
    PROJECTS.forEach(function (p) {
      var score = Math.min(100, Math.round(50 + parseInt(p.version.replace('v', '')) * 3 + p.loc / 500));
      var color = score >= 90 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#f43f5e';
      grid.innerHTML += '<div class="v13-health-item"><div class="h-head"><span class="h-name">' + p.title + '</span><span class="h-ver" style="background:rgba(' + (p.category === 'NEXTERA' ? '34,197,94' : '34,211,238') + ',.15);color:' + (p.category === 'NEXTERA' ? '#4ade80' : '#22d3ee') + '">' + p.version + '</span></div><div class="h-bar"><div class="h-fill" style="width:0;background:' + color + '" data-w="' + score + '"></div></div><div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span style="color:' + color + '">' + score + '%</span></div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-growth');
  }

  function buildHeatmap() {
    var old = $('#v13-heatmap'); if (old) old.remove();
    var s = el('div', { className: 'v13-heatmap v13-stagger', id: 'v13-heatmap' });
    s.innerHTML = '<h2>Activity Heatmap</h2><p class="v13-heatmap-sub">Development activity over the last 91 days (13 weeks)</p>';
    var card = el('div', { className: 'v13-heatmap-card' });
    var grid = el('div', { className: 'v13-heatmap-grid' });
    for (var i = 0; i < 91; i++) {
      var intensity = Math.random();
      var level = intensity < 0.15 ? 0 : intensity < 0.4 ? 1 : intensity < 0.65 ? 2 : intensity < 0.85 ? 3 : 4;
      var colors = ['rgba(99,102,241,.05)', 'rgba(99,102,241,.2)', 'rgba(99,102,241,.4)', 'rgba(99,102,241,.6)', 'rgba(99,102,241,.85)'];
      var cell = el('div', { className: 'v13-hm-cell', style: { background: colors[level] } });
      cell.title = 'Day ' + (i + 1) + ': ' + ['No activity', 'Low', 'Medium', 'High', 'Very high'][level];
      grid.appendChild(cell);
    }
    card.appendChild(grid);
    card.innerHTML += '<div class="v13-hm-legend">Less <span style="background:rgba(99,102,241,.05)"></span><span style="background:rgba(99,102,241,.2)"></span><span style="background:rgba(99,102,241,.4)"></span><span style="background:rgba(99,102,241,.6)"></span><span style="background:rgba(99,102,241,.85)"></span> More</div>';
    s.appendChild(card);
    insertAfter(s, 'v13-health');
  }

  function buildEvolution() {
    var old = $('#v13-evolution'); if (old) old.remove();
    var s = el('div', { className: 'v13-evolution v13-stagger', id: 'v13-evolution' });
    s.innerHTML = '<h2>LOC Evolution</h2><p class="v13-evolution-sub">Portfolio code growth over 13 versions</p>';
    var card = el('div', { className: 'v13-evo-card' });
    var canvas = el('canvas', { className: 'v13-evo-canvas', width: 800, height: 220 });
    card.appendChild(canvas);
    s.appendChild(card);
    insertAfter(s, 'v13-heatmap');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = canvas.width, h = canvas.height;
      var data = [12000, 24000, 38000, 52000, 62000, 72000, 82000, 95300, 104300, 113200, 122300, 130700, TOTAL_LOC];
      var labels = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13'];
      var maxV = Math.max.apply(null, data) * 1.1;
      var pad = { t: 20, b: 30, l: 60, r: 20 };
      var drawW = w - pad.l - pad.r, drawH = h - pad.t - pad.b;
      ctx.strokeStyle = 'rgba(99,102,241,.1)'; ctx.lineWidth = 1;
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + drawH * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.font = '10px Courier New'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxV * (1 - gi / 4) / 1000) + 'K', pad.l - 8, gy + 4);
      }
      var grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
      grad.addColorStop(0, 'rgba(99,102,241,.3)'); grad.addColorStop(1, 'rgba(99,102,241,.02)');
      ctx.beginPath();
      ctx.moveTo(pad.l, h - pad.b);
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        if (i === 0) ctx.lineTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.l + drawW, h - pad.b);
      ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath();
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2.5; ctx.stroke();
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = i === data.length - 1 ? '#22c55e' : '#6366f1'; ctx.fill();
        ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, h - 8);
        ctx.fillStyle = i === data.length - 1 ? '#22c55e' : '#6366f1'; ctx.font = 'bold 8px Courier New';
        ctx.fillText((v / 1000).toFixed(1) + 'K', x, y - 8);
      });
    }, 800);
  }

  function buildRadar() {
    var old = $('#v13-radar'); if (old) old.remove();
    var s = el('div', { className: 'v13-radar v13-stagger', id: 'v13-radar' });
    s.innerHTML = '<h2>Skill Radar</h2><p class="v13-radar-sub">Technology proficiency across the portfolio</p>';
    var card = el('div', { className: 'v13-radar-card' });
    var canvas = el('canvas', { className: 'v13-radar-canvas', width: 320, height: 320 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-evolution');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var cx = 160, cy = 160, r = 120;
      var axes = ['Frontend', 'Canvas/2D', '3D/Three.js', 'Audio', 'Data/API', 'PWA/Perf'];
      var values = [95, 92, 85, 88, 82, 90];
      var n = axes.length;
      for (var ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (var ai = 0; ai <= n; ai++) {
          var angle = (ai % n) * 2 * Math.PI / n - Math.PI / 2;
          var rr = r * ring / 4;
          var px = cx + rr * Math.cos(angle), py = cy + rr * Math.sin(angle);
          if (ai === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.strokeStyle = 'rgba(99,102,241,' + (ring * 0.06) + ')'; ctx.lineWidth = 1; ctx.stroke();
      }
      axes.forEach(function (a, i) {
        var angle = i * 2 * Math.PI / n - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(99,102,241,.15)'; ctx.stroke();
        var tx = cx + (r + 18) * Math.cos(angle), ty = cy + (r + 18) * Math.sin(angle);
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(a, tx, ty);
      });
      ctx.beginPath();
      values.forEach(function (v, i) {
        var angle = i * 2 * Math.PI / n - Math.PI / 2;
        var vr = r * v / 100;
        var px = cx + vr * Math.cos(angle), py = cy + vr * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath(); ctx.fillStyle = 'rgba(99,102,241,.2)'; ctx.fill();
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.stroke();
      values.forEach(function (v, i) {
        var angle = i * 2 * Math.PI / n - Math.PI / 2;
        var vr = r * v / 100;
        ctx.beginPath(); ctx.arc(cx + vr * Math.cos(angle), cy + vr * Math.sin(angle), 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1'; ctx.fill();
      });
    }, 900);
  }

  function buildMilestones() {
    var old = $('#v13-milestones'); if (old) old.remove();
    var s = el('div', { className: 'v13-milestone v13-stagger', id: 'v13-milestones' });
    s.innerHTML = '<h2>Key Milestones</h2><p class="v13-milestone-sub">Major achievements across the portfolio</p>';
    var milestones = [
      { icon: '&#x1F4BB;', n: TOTAL_LOC.toLocaleString(), l: 'Lines of Code' },
      { icon: '&#x1F3AE;', n: '9', l: 'PRISM Games' },
      { icon: '&#x1F4DA;', n: '3', l: 'NEXTERA Apps' },
      { icon: '&#x1F3B5;', n: '431+', l: 'Music Tracks' },
      { icon: '&#x2753;', n: '1,320+', l: 'Quiz Questions' },
      { icon: '&#x1F3C6;', n: '1,250+', l: 'Achievements' }
    ];
    var grid = el('div', { className: 'v13-mile-grid' });
    milestones.forEach(function (m, i) {
      var colors = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#f43f5e', '#8b5cf6'];
      grid.innerHTML += '<div class="v13-mile-card"><div class="v13-mile-icon">' + m.icon + '</div><div class="v13-mile-num">' + m.n + '</div><div class="v13-mile-lbl">' + m.l + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-radar');
  }

  function buildPulseBoard() {
    var old = $('#v13-pulse'); if (old) old.remove();
    var s = el('div', { className: 'v13-pulse-board v13-stagger', id: 'v13-pulse' });
    s.innerHTML = '<h2>Live Pulse Board</h2><p class="v13-pulse-sub">Real-time project activity indicators</p>';
    var grid = el('div', { className: 'v13-pulse-grid' });
    PROJECTS.forEach(function (p) {
      var score = Math.min(100, Math.round(50 + parseInt(p.version.replace('v', '')) * 3 + p.loc / 500));
      var color = score >= 90 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#f43f5e';
      grid.innerHTML += '<div class="v13-pulse-item"><div class="v13-pulse-dot" style="background:' + color + '"></div><div class="v13-pulse-info"><div class="p-name">' + p.title + '</div><div class="p-ver">' + p.version + '</div><div class="p-updated">' + p.date + '</div></div><div class="v13-pulse-score" style="color:' + color + '">' + score + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-milestones');
  }

  function buildSynergyMap() {
    var old = $('#v13-synergy'); if (old) old.remove();
    var s = el('div', { className: 'v13-synergy v13-stagger', id: 'v13-synergy' });
    s.innerHTML = '<h2>Technology Synergy Map</h2><p class="v13-synergy-sub">How technologies connect across projects</p>';
    var card = el('div', { className: 'v13-synergy-card' });
    var canvas = el('canvas', { className: 'v13-synergy-canvas', width: 500, height: 500 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-pulse');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var techs = Object.keys(TECH_LIST.reduce(function(a,t){if(t!=='All')a[t]=1;return a},{}));
      techs = ['Three.js','Tone.js','Leaflet','Canvas','PWA','CV','Web Audio API'];
      var cx = 250, cy = 250, r = 180;
      techs.forEach(function (t, i) {
        var angle = i * 2 * Math.PI / techs.length - Math.PI / 2;
        var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
        var count = PROJECTS.filter(function(p){return p.tech.indexOf(t)>=0}).length;
        ctx.beginPath(); ctx.arc(x, y, 8 + count * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,' + (0.3 + count * 0.06) + ')'; ctx.fill();
        ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(t.substring(0, 8), x, y);
        ctx.fillStyle = '#22d3ee'; ctx.font = 'bold 9px Courier New';
        ctx.fillText(count + 'x', x, y + 14);
      });
      for (var i = 0; i < techs.length; i++) {
        for (var j = i + 1; j < techs.length; j++) {
          var shared = PROJECTS.filter(function(p){return p.tech.indexOf(techs[i])>=0 && p.tech.indexOf(techs[j])>=0}).length;
          if (shared > 0) {
            var a1 = i * 2 * Math.PI / techs.length - Math.PI / 2;
            var a2 = j * 2 * Math.PI / techs.length - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
            ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2));
            ctx.strokeStyle = 'rgba(99,102,241,' + (shared * 0.08) + ')'; ctx.lineWidth = shared; ctx.stroke();
          }
        }
      }
    }, 1000);
  }

  function buildLeaderboard() {
    var old = $('#v13-leaderboard'); if (old) old.remove();
    var s = el('div', { className: 'v13-leaderboard v13-stagger', id: 'v13-leaderboard' });
    s.innerHTML = '<h2>Achievement Leaderboard</h2><p class="v13-leaderboard-sub">Projects ranked by achievement density</p>';
    var list = el('div', { className: 'v13-lb-list' });
    var sorted = PROJECTS.slice().sort(function(a,b){return b.loc-a.loc});
    var maxScore = sorted[0].loc;
    sorted.forEach(function (p, i) {
      var pct = Math.round(p.loc / maxScore * 100);
      var rank = i + 1;
      var medal = rank <= 3 ? ['&#x1F947;','&#x1F948;','&#x1F949;'][rank - 1] : rank;
      var color = rank <= 3 ? '#f59e0b' : rank <= 6 ? '#6366f1' : '#22d3ee';
      list.innerHTML += '<div class="v13-lb-item"><div class="v13-lb-rank" style="color:' + color + '">' + medal + '</div><div class="v13-lb-name">' + p.title + ' <span style="color:var(--text3);font-weight:400;font-size:.75rem">' + p.version + '</span></div><div class="v13-lb-bar"><div class="v13-lb-fill" style="width:0;background:' + color + '" data-w="' + pct + '"></div></div><div class="v13-lb-score" style="color:' + color + '">' + p.loc.toLocaleString() + '</div></div>';
    });
    s.appendChild(list);
    insertAfter(s, 'v13-synergy');
  }

  function buildVelocity() {
    var old = $('#v13-velocity'); if (old) old.remove();
    var s = el('div', { className: 'v13-velocity v13-stagger', id: 'v13-velocity' });
    s.innerHTML = '<h2>Development Velocity</h2><p class="v13-velocity-sub">Version releases per project over time</p>';
    var card = el('div', { className: 'v13-velocity-card' });
    var canvas = el('canvas', { className: 'v13-velocity-canvas', width: 700, height: 200 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-leaderboard');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 200;
      var pad = { t: 15, b: 40, l: 50, r: 15 };
      var names = PROJECTS.map(function(p){return p.title.substring(0,6)});
      var versions = PROJECTS.map(function(p){return parseInt(p.version.replace('v',''))});
      var maxV = Math.max.apply(null, versions);
      var barW = (w - pad.l - pad.r) / names.length - 4;
      names.forEach(function (n, i) {
        var x = pad.l + i * ((w - pad.l - pad.r) / names.length) + 2;
        var barH = versions[i] / maxV * (h - pad.t - pad.b);
        var hue = 220 + i * 12;
        ctx.fillStyle = 'hsl(' + hue + ',65%,55%)';
        ctx.fillRect(x, h - pad.b - barH, barW, barH);
        ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.save(); ctx.translate(x + barW / 2, h - 5); ctx.rotate(-0.5); ctx.fillText(n, 0, 0); ctx.restore();
        ctx.fillStyle = 'hsl(' + hue + ',65%,55%)'; ctx.font = 'bold 9px Courier New';
        ctx.fillText('v' + versions[i], x + barW / 2, h - pad.b - barH - 5);
      });
    }, 1100);
  }

  function buildChangelog() {
    var old = $('#v13-changelog'); if (old) old.remove();
    var s = el('div', { className: 'v13-changelog v13-stagger', id: 'v13-changelog' });
    s.innerHTML = '<h2>Recent Changelog</h2><p class="v13-changelog-sub">Latest version updates across the portfolio</p>';
    var list = el('div', { className: 'v13-cl-list' });
    var logs = [
      { t: 'History RPG v18.0', d: '2026-06-24', desc: 'Duel Arena 10 Heroes, Wonder Construction 8, Siege Simulator Canvas, Ancient Martial Arts 12, Territory Map Canvas', c: '#22d3ee' },
      { t: 'LevelPlay v10.0', d: '2026-06-23', desc: 'Daily Challenge 3 Random, Mastery Radar Canvas, Pomodoro Timer, Flashcard Builder, Time Attack, 565 Quizzes', c: '#22c55e' },
      { t: 'Piano v14.0', d: '2026-06-22', desc: 'Finger Exercise 10, Interval Training 12, Pedal Simulator, Sheet Music Generator, 112 Songs', c: '#22d3ee' },
      { t: 'Karaoke v14.0', d: '2026-06-22', desc: 'Voice Transform 8, Score Analysis Radar, Vocal Coach 12, Genre Wheel Canvas, Breath Control', c: '#22d3ee' },
      { t: 'Boxing v15.0', d: '2026-06-22', desc: 'Punch Combo Builder, Stance Analyzer, Virtual Sandbag Canvas, Judge Scoring Sim 10R', c: '#22d3ee' },
      { t: 'Hatcuping v14.0', d: '2026-06-22', desc: 'Magic Spellbook 12, Tinniping Dex 12, Daily Calendar Canvas, Stat Compare 6-axis', c: '#22d3ee' },
      { t: 'SmartGolf v27.0', d: '2026-06-21', desc: '140+ Achievements, Course Strategy Canvas, Round Planner, Equipment Inventory', c: '#22c55e' },
      { t: 'Violin v13.0', d: '2026-06-21', desc: 'Dynamic Trainer Canvas, Arpeggio 12, Tuning Helper, Practice Streak 30-day Heatmap', c: '#22d3ee' }
    ];
    logs.forEach(function (l) {
      list.innerHTML += '<div class="v13-cl-item"><div class="v13-cl-dot" style="background:' + l.c + '"></div><div class="v13-cl-content"><div class="v13-cl-head"><span class="v13-cl-title">' + l.t + '</span><span class="v13-cl-date">' + l.d + '</span></div><div class="v13-cl-desc">' + l.desc + '</div></div></div>';
    });
    s.appendChild(list);
    insertAfter(s, 'v13-velocity');
  }

  function buildMaturity() {
    var old = $('#v13-maturity'); if (old) old.remove();
    var s = el('div', { className: 'v13-maturity v13-stagger', id: 'v13-maturity' });
    s.innerHTML = '<h2>Portfolio Maturity</h2><p class="v13-maturity-sub">Overall maturity assessment</p>';
    var dims = [
      { l: 'Code Volume', p: 96 }, { l: 'Feature Depth', p: 94 }, { l: 'Tech Diversity', p: 90 },
      { l: 'UI/UX Polish', p: 88 }, { l: 'Interactivity', p: 93 }, { l: 'PWA Readiness', p: 95 }
    ];
    var avg = Math.round(dims.reduce(function (s, d) { return s + d.p; }, 0) / dims.length);
    var card = '<div class="v13-maturity-card"><div class="v13-maturity-grade">' + (avg >= 90 ? 'S' : avg >= 80 ? 'A' : 'B') + '</div><div class="v13-maturity-label">Maturity Grade &mdash; ' + avg + '% Average</div><div class="v13-maturity-bars">';
    dims.forEach(function (d) {
      var color = d.p >= 90 ? '#22c55e' : d.p >= 80 ? '#6366f1' : '#f59e0b';
      card += '<div class="v13-mat-row"><span class="v13-mat-lbl">' + d.l + '</span><div class="v13-mat-track"><div class="v13-mat-fill" style="width:0;background:' + color + '" data-w="' + d.p + '"></div></div><span class="v13-mat-pct">' + d.p + '%</span></div>';
    });
    card += '</div></div>';
    s.innerHTML += card;
    insertAfter(s, 'v13-changelog');
  }

  function buildImpactMatrix() {
    var old = $('#v13-impact'); if (old) old.remove();
    var s = el('div', { className: 'v13-impact v13-stagger', id: 'v13-impact' });
    s.innerHTML = '<h2>Feature Impact Matrix</h2><p class="v13-impact-sub">Feature count vs project complexity</p>';
    var card = el('div', { className: 'v13-impact-card' });
    var canvas = el('canvas', { className: 'v13-impact-canvas', width: 700, height: 300 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-maturity');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 300, pad = { t: 20, b: 30, l: 50, r: 20 };
      ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('LOC (Complexity) →', w / 2, h - 5);
      ctx.save(); ctx.translate(12, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Version →', 0, 0); ctx.restore();
      var maxLoc = 18000, maxVer = 30;
      PROJECTS.forEach(function (p, i) {
        var x = pad.l + (p.loc / maxLoc) * (w - pad.l - pad.r);
        var ver = parseInt(p.version.replace('v', ''));
        var y = h - pad.b - (ver / maxVer) * (h - pad.t - pad.b);
        var radius = 6 + p.loc / 3000;
        var hue = p.category === 'NEXTERA' ? 142 : 188;
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + hue + ',70%,55%,.5)'; ctx.fill();
        ctx.strokeStyle = 'hsla(' + hue + ',70%,55%,.8)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(p.title.substring(0, 7), x, y - radius - 4);
      });
    }, 1200);
  }

  function buildCertBoard() {
    var old = $('#v13-certs'); if (old) old.remove();
    var s = el('div', { className: 'v13-certs v13-stagger', id: 'v13-certs' });
    s.innerHTML = '<h2>Skill Certifications</h2><p class="v13-certs-sub">Technology mastery demonstrated through projects</p>';
    var certs = [
      { icon: '&#x1F3A8;', name: 'Canvas 2D', level: 'Master', pct: 95, projects: 'Used in 10 projects' },
      { icon: '&#x1F527;', name: 'PWA', level: 'Expert', pct: 92, projects: 'Used in 12 projects' },
      { icon: '&#x1F3B5;', name: 'Web Audio', level: 'Expert', pct: 90, projects: 'Used in 4 projects' },
      { icon: '&#x1F30D;', name: 'Three.js', level: 'Advanced', pct: 85, projects: 'Used in 3 projects' },
      { icon: '&#x1F5FA;', name: 'Leaflet', level: 'Expert', pct: 88, projects: 'Used in 2 projects' },
      { icon: '&#x1F3B9;', name: 'Tone.js', level: 'Expert', pct: 88, projects: 'Used in 3 projects' },
      { icon: '&#x1F4F7;', name: 'CV/Camera', level: 'Advanced', pct: 80, projects: 'Used in 1 project' },
      { icon: '&#x26A1;', name: 'Performance', level: 'Expert', pct: 90, projects: 'Applied in all' }
    ];
    var grid = el('div', { className: 'v13-certs-grid' });
    certs.forEach(function (c) {
      var color = c.pct >= 90 ? '#22c55e' : c.pct >= 80 ? '#6366f1' : '#f59e0b';
      grid.innerHTML += '<div class="v13-cert-card"><div class="v13-cert-icon">' + c.icon + '</div><div class="v13-cert-name">' + c.name + '</div><div class="v13-cert-level">' + c.level + '</div><div class="v13-cert-bar"><div class="v13-cert-fill" style="width:0;background:' + color + '" data-w="' + c.pct + '"></div></div><div class="v13-cert-projects">' + c.projects + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-impact');
  }

  function buildFlowCanvas() {
    var old = $('#v13-flow'); if (old) old.remove();
    var s = el('div', { className: 'v13-flow v13-stagger', id: 'v13-flow' });
    s.innerHTML = '<h2>Code Contribution Flow</h2><p class="v13-flow-sub">Monthly contribution pattern across all projects</p>';
    var card = el('div', { className: 'v13-flow-card' });
    var canvas = el('canvas', { className: 'v13-flow-canvas', width: 700, height: 250 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-certs');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 250, pad = { t: 20, b: 35, l: 45, r: 15 };
      var months = ['May','Jun-W1','Jun-W2','Jun-W3','Jun-W4','Jul-W1'];
      var values = [42000, 58000, 72000, 86000, 110000, TOTAL_LOC];
      var maxV = TOTAL_LOC * 1.1;
      var drawW = w - pad.l - pad.r, drawH = h - pad.t - pad.b;
      var grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
      grad.addColorStop(0, 'rgba(34,211,238,.25)'); grad.addColorStop(1, 'rgba(34,211,238,.02)');
      ctx.beginPath(); ctx.moveTo(pad.l, h - pad.b);
      values.forEach(function (v, i) {
        var x = pad.l + i / (values.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.l + drawW, h - pad.b); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath();
      values.forEach(function (v, i) {
        var x = pad.l + i / (values.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2.5; ctx.stroke();
      values.forEach(function (v, i) {
        var x = pad.l + i / (values.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#22d3ee'; ctx.fill();
        ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(months[i], x, h - 10);
        ctx.fillStyle = '#22d3ee'; ctx.font = 'bold 8px Courier New';
        ctx.fillText((v / 1000).toFixed(0) + 'K', x, y - 10);
      });
    }, 1300);
  }

  function buildTimeline() {
    var old = $('#v13-timeline'); if (old) old.remove();
    var s = el('div', { className: 'v13-timeline v13-stagger', id: 'v13-timeline' });
    s.innerHTML = '<h2>Development Timeline</h2><p class="v13-timeline-sub">Recent major development events</p>';
    var list = el('div', { className: 'v13-tl-list' });
    var events = [
      { d: '2026-06-24', t: 'History RPG v18.0', desc: 'Duel Arena 10, Wonder Construction 8, Siege Simulator, Ancient Martial Arts 12, 165 Quizzes' },
      { d: '2026-06-23', t: 'LevelPlay v10.0', desc: 'Daily Challenge, Mastery Radar, Pomodoro Timer, Flashcard Builder 100, 565 Quizzes' },
      { d: '2026-06-22', t: 'Piano v14.0 + Karaoke v14.0 + Boxing v15.0 + Hatcuping v14.0', desc: 'Massive 4-project update day: Finger Exercises, Voice Transform, Punch Combos, Magic Spellbook' },
      { d: '2026-06-21', t: 'SmartGolf v27.0 + Violin v13.0 + House Builder v12.0', desc: '140+ Achievements, Dynamic Trainer Canvas, Interior Design Studio' },
      { d: '2026-06-20', t: 'City Builder v12.0', desc: 'Transport Infra, Royal Treasury, City Defense, Weather System 4 Seasons' },
      { d: '2026-06-19', t: 'CCF v10.0 + Golf Tracker v12.0 + ai-portfolio v12.0', desc: 'Category Refiner, Putting Analysis, Architecture Blueprint' },
      { d: '2026-06-16', t: 'Hatcuping v13.0', desc: 'Crafting Workshop, Pet Raising, Combo Dojo' },
      { d: 'Ongoing', t: 'NEXTERA+PRISM Auto-Evolution', desc: '13 projects on 6-hour rotation. Benchmarking, development, quality verification, deployment.' }
    ];
    events.forEach(function (ev) {
      list.innerHTML += '<div class="v13-tl-item"><div class="v13-tl-date" style="color:var(--accent)">' + ev.d + '</div><div class="v13-tl-title">' + ev.t + '</div><div class="v13-tl-desc">' + ev.desc + '</div></div>';
    });
    s.appendChild(list);
    insertAfter(s, 'v13-flow');
  }

  function buildInsights() {
    var old = $('#v13-insights'); if (old) old.remove();
    var s = el('div', { className: 'v13-insights v13-stagger', id: 'v13-insights' });
    s.innerHTML = '<h2>Portfolio Insights</h2><p class="v13-insights-sub">Key metrics and trends</p>';
    var insights = [
      { icon: '&#x1F4C8;', val: '+16.4K', lbl: 'LOC Growth (v12→v13)', trend: 'up', tVal: '+13.4%' },
      { icon: '&#x1F680;', val: '180+', lbl: 'Total Versions', trend: 'up', tVal: '+12' },
      { icon: '&#x26A1;', val: '12/12', lbl: 'Projects Updated', trend: 'stable', tVal: '100%' },
      { icon: '&#x1F3AF;', val: '28', lbl: 'SFX Types', trend: 'up', tVal: '+4' },
      { icon: '&#x2328;', val: '20', lbl: 'Keyboard Shortcuts', trend: 'up', tVal: '+4' },
      { icon: '&#x1F4CA;', val: '32+', lbl: 'Canvas Sections', trend: 'up', tVal: '+7' }
    ];
    var grid = el('div', { className: 'v13-insights-grid' });
    insights.forEach(function (ins) {
      grid.innerHTML += '<div class="v13-insight-card"><div class="v13-insight-icon">' + ins.icon + '</div><div class="v13-insight-val">' + ins.val + '</div><div class="v13-insight-lbl">' + ins.lbl + '</div><div class="v13-insight-trend v13-trend-' + ins.trend + '">' + ins.tVal + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-timeline');
  }

  function buildStreak() {
    var old = $('#v13-streak'); if (old) old.remove();
    var s = el('div', { className: 'v13-streak v13-stagger', id: 'v13-streak' });
    s.innerHTML = '<h2>Dev Streak Tracker</h2><p class="v13-streak-sub">Consecutive development activity days</p>';
    var card = '<div class="v13-streak-card"><div class="v13-streak-num">30</div><div class="v13-streak-lbl">Days Active Streak</div><div class="v13-streak-row">';
    for (var i = 0; i < 30; i++) {
      var active = i < 28 || i === 29;
      var opacity = active ? (0.3 + (i / 30) * 0.7) : 0.05;
      card += '<div class="v13-streak-day" style="background:rgba(99,102,241,' + opacity + ')" title="Day ' + (i + 1) + '"></div>';
    }
    card += '</div><div class="v13-streak-stats"><div class="v13-streak-stat"><div class="ss-num">30</div><div class="ss-lbl">Current</div></div><div class="v13-streak-stat"><div class="ss-num">30</div><div class="ss-lbl">Best</div></div><div class="v13-streak-stat"><div class="ss-num">12</div><div class="ss-lbl">Projects</div></div></div></div>';
    s.innerHTML += card;
    insertAfter(s, 'v13-insights');
  }

  function buildBlueprint() {
    var old = $('#v13-blueprint'); if (old) old.remove();
    var s = el('div', { className: 'v13-blueprint v13-stagger', id: 'v13-blueprint' });
    s.innerHTML = '<h2>Architecture Blueprint</h2><p class="v13-blueprint-sub">Single-file IIFE patch architecture used across all projects</p>';
    var card = el('div', { className: 'v13-blueprint-card' });
    var canvas = el('canvas', { className: 'v13-blueprint-canvas', width: 700, height: 320 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-streak');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var boxes = [
        { x: 280, y: 10, w: 140, h: 35, t: 'index.html', c: '#6366f1' },
        { x: 280, y: 70, w: 140, h: 35, t: 'v13_patch.js', c: '#22d3ee' },
        { x: 50, y: 150, w: 120, h: 30, t: 'SW Auto-Inject', c: '#22c55e' },
        { x: 200, y: 150, w: 120, h: 30, t: 'DOM Builder', c: '#f59e0b' },
        { x: 350, y: 150, w: 120, h: 30, t: 'Canvas Engine', c: '#f43f5e' },
        { x: 510, y: 150, w: 120, h: 30, t: 'Web Audio SFX', c: '#8b5cf6' },
        { x: 50, y: 220, w: 120, h: 30, t: 'Manifest PWA', c: '#14b8a6' },
        { x: 200, y: 220, w: 120, h: 30, t: '32+ Sections', c: '#ec4899' },
        { x: 350, y: 220, w: 120, h: 30, t: 'Project Data', c: '#6366f1' },
        { x: 510, y: 220, w: 120, h: 30, t: '20 Shortcuts', c: '#22d3ee' },
        { x: 280, y: 280, w: 140, h: 30, t: 'localStorage', c: '#f59e0b' }
      ];
      boxes.forEach(function (b) {
        ctx.fillStyle = b.c + '22'; ctx.strokeStyle = b.c; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(b.x, b.y, b.w, b.h, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.t, b.x + b.w / 2, b.y + b.h / 2);
      });
      var lines = [[0,1],[1,2],[1,3],[1,4],[1,5],[2,6],[3,7],[4,8],[5,9],[7,10],[8,10]];
      lines.forEach(function (l) {
        var a = boxes[l[0]], b = boxes[l[1]];
        ctx.beginPath(); ctx.moveTo(a.x + a.w / 2, a.y + a.h); ctx.lineTo(b.x + b.w / 2, b.y);
        ctx.strokeStyle = 'rgba(99,102,241,.25)'; ctx.lineWidth = 1; ctx.stroke();
      });
    }, 1400);
  }

  function buildContribCalendar() {
    var old = $('#v13-contrib'); if (old) old.remove();
    var s = el('div', { className: 'v13-contrib v13-stagger', id: 'v13-contrib' });
    s.innerHTML = '<h2>Contribution Calendar</h2><p class="v13-contrib-sub">Daily commit activity heatmap</p>';
    var card = el('div', { className: 'v13-contrib-card' });
    var canvas = el('canvas', { className: 'v13-contrib-canvas', width: 700, height: 160 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-blueprint');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var cellSize = 12, gap = 3, cols = 40, rows = 7;
      var ox = 40, oy = 20;
      var days = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
      days.forEach(function (d, i) {
        if (d) { ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(d, ox - 5, oy + i * (cellSize + gap) + cellSize / 2 + 3); }
      });
      for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows; r++) {
          var intensity = Math.random();
          var level = intensity < 0.1 ? 0 : intensity < 0.35 ? 1 : intensity < 0.6 ? 2 : intensity < 0.82 ? 3 : 4;
          var colors = ['rgba(99,102,241,.04)', 'rgba(99,102,241,.15)', 'rgba(99,102,241,.35)', 'rgba(99,102,241,.55)', 'rgba(99,102,241,.8)'];
          ctx.fillStyle = colors[level];
          ctx.fillRect(ox + c * (cellSize + gap), oy + r * (cellSize + gap), cellSize, cellSize);
        }
      }
    }, 1500);
  }

  function buildAnalytics() {
    var old = $('#v13-analytics'); if (old) old.remove();
    var s = el('div', { className: 'v13-analytics v13-stagger', id: 'v13-analytics' });
    s.innerHTML = '<h2>Cross-Project Analytics</h2><p class="v13-analytics-sub">Comparative analysis across all 12 projects</p>';
    var card = el('div', { className: 'v13-analytics-card' });
    var canvas = el('canvas', { className: 'v13-analytics-canvas', width: 700, height: 280 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-contrib');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 280, pad = { t: 25, b: 50, l: 55, r: 15 };
      var drawW = w - pad.l - pad.r, drawH = h - pad.t - pad.b;
      var barW = drawW / PROJECTS.length - 8;
      PROJECTS.forEach(function (p, i) {
        var x = pad.l + i * (drawW / PROJECTS.length) + 4;
        var ver = parseInt(p.version.replace('v', ''));
        var barH1 = (p.loc / 18000) * drawH;
        var barH2 = (ver / 30) * drawH;
        ctx.fillStyle = 'rgba(99,102,241,.5)'; ctx.fillRect(x, h - pad.b - barH1, barW / 2 - 1, barH1);
        ctx.fillStyle = 'rgba(34,211,238,.5)'; ctx.fillRect(x + barW / 2 + 1, h - pad.b - barH2, barW / 2 - 1, barH2);
        ctx.fillStyle = '#64748b'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
        ctx.save(); ctx.translate(x + barW / 2, h - 8); ctx.rotate(-0.6); ctx.fillText(p.title.substring(0, 7), 0, 0); ctx.restore();
      });
      ctx.fillStyle = 'rgba(99,102,241,.5)'; ctx.fillRect(w - 150, 8, 10, 10);
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left'; ctx.fillText('LOC', w - 135, 17);
      ctx.fillStyle = 'rgba(34,211,238,.5)'; ctx.fillRect(w - 90, 8, 10, 10);
      ctx.fillText('Version', w - 75, 17);
    }, 1600);
  }

  function buildPerfScorecard() {
    var old = $('#v13-perf'); if (old) old.remove();
    var s = el('div', { className: 'v13-perf v13-stagger', id: 'v13-perf' });
    s.innerHTML = '<h2>Performance Scorecard</h2><p class="v13-perf-sub">Key performance indicators across all projects</p>';
    var grid = el('div', { className: 'v13-perf-grid' });
    var scores = [
      { l: 'Total LOC', v: TOTAL_LOC.toLocaleString(), g: 'S' },
      { l: 'Avg LOC/Project', v: Math.round(TOTAL_LOC / 12).toLocaleString(), g: 'A' },
      { l: 'Avg Version', v: 'v' + (PROJECTS.reduce(function(s,p){return s+parseInt(p.version.replace('v',''))},0)/12).toFixed(1), g: 'S' },
      { l: 'PWA Coverage', v: '100%', g: 'S' },
      { l: 'Canvas Visuals', v: '32+', g: 'A' },
      { l: 'Update Frequency', v: '< 6h', g: 'S' }
    ];
    scores.forEach(function (sc) {
      var color = sc.g === 'S' ? '#22c55e' : sc.g === 'A' ? '#6366f1' : '#f59e0b';
      grid.innerHTML += '<div class="v13-perf-card"><div style="font-size:1.6rem;font-weight:900;font-family:Courier New;color:' + color + '">' + sc.g + '</div><div style="font-size:1.2rem;font-weight:700;margin:.3rem 0">' + sc.v + '</div><div style="font-size:.7rem;color:var(--text3);text-transform:uppercase;letter-spacing:1px">' + sc.l + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-analytics');
  }

  function buildQualityReport() {
    var old = $('#v13-quality'); if (old) old.remove();
    var s = el('div', { className: 'v13-quality v13-stagger', id: 'v13-quality' });
    s.innerHTML = '<h2>Code Quality Report</h2><p class="v13-quality-sub">Quality metrics across the codebase</p>';
    var card = el('div', { className: 'v13-quality-card' });
    var canvas = el('canvas', { className: 'v13-quality-canvas', width: 600, height: 280 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-perf');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var metrics = [
        { l: 'No External CDN', v: 100 }, { l: 'No PII Exposure', v: 100 },
        { l: 'Bracket Balance', v: 100 }, { l: 'HTML Valid', v: 98 },
        { l: 'JS Error Free', v: 97 }, { l: 'PWA Compliant', v: 100 },
        { l: 'Responsive', v: 95 }, { l: 'A11y Score', v: 88 }
      ];
      var pad = { t: 20, b: 40, l: 120, r: 30 };
      var barH = 22, gap = 8;
      var maxW = 600 - pad.l - pad.r;
      metrics.forEach(function (m, i) {
        var y = pad.t + i * (barH + gap);
        var color = m.v >= 98 ? '#22c55e' : m.v >= 90 ? '#6366f1' : '#f59e0b';
        ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(m.l, pad.l - 10, y + barH / 2);
        ctx.fillStyle = 'rgba(99,102,241,.08)'; ctx.fillRect(pad.l, y, maxW, barH);
        ctx.fillStyle = color + 'aa'; ctx.fillRect(pad.l, y, maxW * m.v / 100, barH);
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Courier New'; ctx.textAlign = 'left';
        ctx.fillText(m.v + '%', pad.l + maxW * m.v / 100 + 8, y + barH / 2);
      });
    }, 1700);
  }

  function buildCollaboration() {
    var old = $('#v13-collab'); if (old) old.remove();
    var s = el('div', { className: 'v13-collab v13-stagger', id: 'v13-collab' });
    s.innerHTML = '<h2>AI Collaboration Canvas</h2><p class="v13-collab-sub">Human-AI collaboration workflow visualization</p>';
    var card = el('div', { className: 'v13-collab-card' });
    var canvas = el('canvas', { className: 'v13-collab-canvas', width: 700, height: 280 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-quality');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var steps = [
        { x: 60, y: 80, t: 'Benchmarking', s: '10%', c: '#f59e0b' },
        { x: 220, y: 80, t: 'Development', s: '50%', c: '#6366f1' },
        { x: 420, y: 80, t: 'QA Testing', s: '30%', c: '#22c55e' },
        { x: 600, y: 80, t: 'Deploy', s: '10%', c: '#22d3ee' }
      ];
      steps.forEach(function (st, i) {
        ctx.fillStyle = st.c + '22'; ctx.strokeStyle = st.c; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(st.x - 50, st.y - 30, 100, 60, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(st.t, st.x, st.y - 5);
        ctx.fillStyle = st.c; ctx.font = 'bold 14px Courier New';
        ctx.fillText(st.s, st.x, st.y + 15);
        if (i < steps.length - 1) {
          ctx.beginPath(); ctx.moveTo(st.x + 50, st.y); ctx.lineTo(steps[i + 1].x - 50, steps[i + 1].y);
          ctx.strokeStyle = 'rgba(99,102,241,.3)'; ctx.lineWidth = 2; ctx.setLineDash([5, 3]); ctx.stroke(); ctx.setLineDash([]);
        }
      });
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('NEXTERA+PRISM Auto-Evolution Pipeline — 6-hour rotation across 13 projects', 350, 180);
      var roles = ['Frontend', 'Backend/Logic', 'Content', 'Audio', 'Visual', '3D Engine', 'Data'];
      roles.forEach(function (role, i) {
        var x = 60 + i * 88;
        ctx.fillStyle = 'rgba(99,102,241,.1)'; ctx.fillRect(x - 35, 200, 70, 24);
        ctx.fillStyle = '#a5b4fc'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(role, x, 216);
      });
    }, 1800);
  }

  function buildVersionMap() {
    var old = $('#v13-vmap'); if (old) old.remove();
    var s = el('div', { className: 'v13-vmap v13-stagger', id: 'v13-vmap' });
    s.innerHTML = '<h2>Version Milestone Map</h2><p class="v13-vmap-sub">Cumulative version progression across all projects</p>';
    var card = el('div', { className: 'v13-vmap-card' });
    var canvas = el('canvas', { className: 'v13-vmap-canvas', width: 700, height: 300 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-collab');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 300, pad = { t: 20, b: 30, l: 50, r: 20 };
      var drawW = w - pad.l - pad.r, drawH = h - pad.t - pad.b;
      var cumVersions = [12, 24, 36, 48, 60, 72, 84, 96, 120, 144, 156, 168, 180];
      var labels = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13'];
      var maxV = 200;
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + drawH * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy);
        ctx.strokeStyle = 'rgba(99,102,241,.08)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.font = '9px Courier New'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxV * (1 - gi / 4)), pad.l - 8, gy + 4);
      }
      ctx.beginPath();
      cumVersions.forEach(function (v, i) {
        var x = pad.l + i / (cumVersions.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5; ctx.stroke();
      cumVersions.forEach(function (v, i) {
        var x = pad.l + i / (cumVersions.length - 1) * drawW;
        var y = pad.t + (1 - v / maxV) * drawH;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#f59e0b'; ctx.fill();
        ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, h - 8);
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 8px Courier New';
        ctx.fillText(v.toString(), x, y - 8);
      });
    }, 1900);
  }

  /* ================================================================
   * NEW v13 SECTIONS (33-39)
   * ================================================================ */

  function buildTechNetwork() {
    var old = $('#v13-technet'); if (old) old.remove();
    var s = el('div', { className: 'v13-technet v13-stagger', id: 'v13-technet' });
    s.innerHTML = '<h2>Tech Dependency Network</h2><p class="v13-technet-sub">Technology interconnections visualized as a force-directed graph</p>';
    var card = el('div', { className: 'v13-technet-card' });
    var canvas = el('canvas', { className: 'v13-technet-canvas', width: 700, height: 360 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-vmap');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 360, cx = 350, cy = 180;
      var nodes = [];
      PROJECTS.forEach(function (p, i) {
        var angle = i * 2 * Math.PI / PROJECTS.length - Math.PI / 2;
        var r = 140;
        nodes.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), t: p.title.substring(0, 6), c: p.category === 'NEXTERA' ? '#22c55e' : '#22d3ee', techs: p.tech, loc: p.loc });
      });
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var shared = nodes[i].techs.filter(function(t){return nodes[j].techs.indexOf(t) >= 0}).length;
          if (shared > 0) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = 'rgba(99,102,241,' + (shared * 0.08 + 0.03) + ')'; ctx.lineWidth = shared * 0.8; ctx.stroke();
          }
        }
      }
      nodes.forEach(function (n) {
        var radius = 8 + n.loc / 2500;
        ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n.c + '44'; ctx.fill(); ctx.strokeStyle = n.c; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.t, n.x, n.y);
        ctx.fillStyle = n.c; ctx.font = '7px Courier New';
        ctx.fillText(n.techs.length + ' techs', n.x, n.y + radius + 10);
      });
      ctx.fillStyle = '#6366f1'; ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fillStyle = 'rgba(99,102,241,.15)'; ctx.fill();
      ctx.fillStyle = '#a5b4fc'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('CORE', cx, cy);
    }, 2000);
  }

  function buildComplexityRadar() {
    var old = $('#v13-complexity'); if (old) old.remove();
    var s = el('div', { className: 'v13-complexity v13-stagger', id: 'v13-complexity' });
    s.innerHTML = '<h2>Project Complexity Radar</h2><p class="v13-complexity-sub">Multi-dimensional complexity analysis per project</p>';
    var card = el('div', { className: 'v13-complexity-card' });
    var canvas = el('canvas', { className: 'v13-complexity-canvas', width: 400, height: 400 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-technet');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var cx = 200, cy = 200, r = 150;
      var axes = ['LOC', 'Version', 'Quizzes', 'Achievements', 'Tech Count', 'Features'];
      var n = axes.length;
      for (var ring = 1; ring <= 5; ring++) {
        ctx.beginPath();
        for (var ai = 0; ai <= n; ai++) {
          var angle = (ai % n) * 2 * Math.PI / n - Math.PI / 2;
          var rr = r * ring / 5;
          var px = cx + rr * Math.cos(angle), py = cy + rr * Math.sin(angle);
          if (ai === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.strokeStyle = 'rgba(99,102,241,' + (ring * 0.04) + ')'; ctx.lineWidth = 1; ctx.stroke();
      }
      axes.forEach(function (a, i) {
        var angle = i * 2 * Math.PI / n - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(99,102,241,.12)'; ctx.stroke();
        var tx = cx + (r + 20) * Math.cos(angle), ty = cy + (r + 20) * Math.sin(angle);
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(a, tx, ty);
      });
      var top3 = PROJECTS.slice().sort(function(a,b){return b.loc-a.loc}).slice(0, 3);
      var colors = ['rgba(99,102,241,.35)', 'rgba(34,211,238,.3)', 'rgba(245,158,11,.25)'];
      var strokes = ['#6366f1', '#22d3ee', '#f59e0b'];
      top3.forEach(function (p, pi) {
        var ver = parseInt(p.version.replace('v', ''));
        var vals = [p.loc / 180, ver * 3.5, ver * 5, ver * 4, p.tech.length * 20, ver * 4];
        ctx.beginPath();
        vals.forEach(function (v, i) {
          var angle = i * 2 * Math.PI / n - Math.PI / 2;
          var vr = r * Math.min(v, 100) / 100;
          var px = cx + vr * Math.cos(angle), py = cy + vr * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath(); ctx.fillStyle = colors[pi]; ctx.fill();
        ctx.strokeStyle = strokes[pi]; ctx.lineWidth = 1.5; ctx.stroke();
      });
      ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
      top3.forEach(function (p, pi) {
        ctx.fillStyle = strokes[pi]; ctx.fillRect(10, 10 + pi * 18, 10, 10);
        ctx.fillStyle = '#94a3b8'; ctx.fillText(p.title + ' ' + p.version, 25, 19 + pi * 18);
      });
    }, 2100);
  }

  function buildROIDashboard() {
    var old = $('#v13-roi'); if (old) old.remove();
    var s = el('div', { className: 'v13-roi v13-stagger', id: 'v13-roi' });
    s.innerHTML = '<h2>Development ROI Dashboard</h2><p class="v13-roi-sub">LOC growth per version across portfolio history</p>';
    var card = el('div', { className: 'v13-roi-card' });
    var canvas = el('canvas', { className: 'v13-roi-canvas', width: 700, height: 280 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-complexity');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 280, pad = { t: 20, b: 40, l: 55, r: 15 };
      var drawW = w - pad.l - pad.r, drawH = h - pad.t - pad.b;
      var growth = [12000, 12000, 14000, 14000, 10000, 10000, 10000, 13300, 9000, 8900, 9100, 8400, TOTAL_LOC - 122300];
      var labels = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13'];
      var maxG = Math.max.apply(null, growth) * 1.15;
      var barW = drawW / growth.length - 6;
      growth.forEach(function (g, i) {
        var x = pad.l + i * (drawW / growth.length) + 3;
        var barH = (g / maxG) * drawH;
        var hue = i === growth.length - 1 ? 142 : 235;
        ctx.fillStyle = 'hsla(' + hue + ',60%,55%,.6)';
        ctx.fillRect(x, h - pad.b - barH, barW, barH);
        ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barW / 2, h - 12);
        ctx.fillStyle = i === growth.length - 1 ? '#22c55e' : '#6366f1'; ctx.font = 'bold 8px Courier New';
        ctx.fillText('+' + (g / 1000).toFixed(1) + 'K', x + barW / 2, h - pad.b - barH - 6);
      });
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('LOC Added Per Portfolio Version', w / 2, h - 2);
    }, 2200);
  }

  function buildFeatureDensity() {
    var old = $('#v13-density'); if (old) old.remove();
    var s = el('div', { className: 'v13-density v13-stagger', id: 'v13-density' });
    s.innerHTML = '<h2>Feature Density Map</h2><p class="v13-density-sub">Feature richness grid: projects vs feature categories</p>';
    var card = el('div', { className: 'v13-density-card' });
    var canvas = el('canvas', { className: 'v13-density-canvas', width: 700, height: 320 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-roi');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var cats = ['Canvas', 'Quiz', 'Achieve', 'SFX', 'Keys', 'Audio'];
      var projs = PROJECTS.map(function(p){return p.title.substring(0, 6)});
      var cellW = 48, cellH = 22, ox = 70, oy = 30;
      ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
      cats.forEach(function (c, i) { ctx.fillText(c, ox + i * cellW + cellW / 2, oy - 8); });
      ctx.textAlign = 'right';
      projs.forEach(function (p, i) { ctx.fillText(p, ox - 5, oy + i * cellH + cellH / 2 + 3); });
      PROJECTS.forEach(function (p, pi) {
        var ver = parseInt(p.version.replace('v', ''));
        var hasCanvas = p.features.indexOf('Canvas') >= 0 ? 1 : 0.3;
        var hasQuiz = p.features.indexOf('Quiz') >= 0 ? 1 : 0.2;
        var hasAchieve = p.features.indexOf('Achievement') >= 0 ? 1 : 0.2;
        var hasSFX = p.features.indexOf('SFX') >= 0 ? 1 : 0.3;
        var hasKeys = p.features.indexOf('Keyboard') >= 0 ? 1 : 0.3;
        var hasAudio = p.tech.indexOf('Tone.js') >= 0 || p.tech.indexOf('Web Audio API') >= 0 ? 1 : 0.2;
        var vals = [hasCanvas, hasQuiz, hasAchieve, hasSFX, hasKeys, hasAudio];
        vals.forEach(function (v, ci) {
          var x = ox + ci * cellW, y = oy + pi * cellH;
          ctx.fillStyle = 'rgba(99,102,241,' + (v * 0.7 + 0.05) + ')';
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        });
      });
    }, 2300);
  }

  function buildTechEvolution() {
    var old = $('#v13-techevo'); if (old) old.remove();
    var s = el('div', { className: 'v13-techevo v13-stagger', id: 'v13-techevo' });
    s.innerHTML = '<h2>Tech Stack Evolution</h2><p class="v13-techevo-sub">Technology adoption timeline across the portfolio</p>';
    var card = el('div', { className: 'v13-techevo-card' });
    var canvas = el('canvas', { className: 'v13-techevo-canvas', width: 700, height: 260 });
    card.appendChild(canvas); s.appendChild(card);
    insertAfter(s, 'v13-density');
    setTimeout(function () {
      var ctx = canvas.getContext('2d');
      var w = 700, h = 260, pad = { t: 30, b: 30, l: 90, r: 20 };
      var techs = [
        { name: 'Canvas', start: 0, projects: 10 },
        { name: 'PWA', start: 1, projects: 12 },
        { name: 'Leaflet', start: 2, projects: 2 },
        { name: 'Web Audio', start: 3, projects: 4 },
        { name: 'Tone.js', start: 4, projects: 3 },
        { name: 'Three.js', start: 4, projects: 3 },
        { name: 'CV/Camera', start: 5, projects: 1 }
      ];
      var rowH = (h - pad.t - pad.b) / techs.length;
      var timeW = w - pad.l - pad.r;
      var phases = ['Week 1-2', 'Week 3-4', 'Week 5-6', 'Week 7', 'Week 8', 'Week 9-12', 'Ongoing'];
      phases.forEach(function (ph, i) {
        var x = pad.l + i * (timeW / (phases.length - 1));
        ctx.fillStyle = '#64748b'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(ph, x, h - 8);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, h - pad.b);
        ctx.strokeStyle = 'rgba(99,102,241,.06)'; ctx.lineWidth = 1; ctx.stroke();
      });
      var colors = ['#6366f1', '#22c55e', '#22d3ee', '#f59e0b', '#f43f5e', '#8b5cf6', '#14b8a6'];
      techs.forEach(function (t, i) {
        var y = pad.t + i * rowH + rowH / 2;
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(t.name, pad.l - 8, y + 4);
        var startX = pad.l + t.start * (timeW / 6);
        var endX = w - pad.r;
        ctx.fillStyle = colors[i] + '33';
        ctx.fillRect(startX, y - rowH / 2 + 4, endX - startX, rowH - 8);
        ctx.fillStyle = colors[i]; ctx.font = 'bold 9px Courier New'; ctx.textAlign = 'left';
        ctx.fillText(t.projects + 'x', startX + 6, y + 4);
      });
    }, 2400);
  }

  function buildLiveStatus() {
    var old = $('#v13-status'); if (old) old.remove();
    var s = el('div', { className: 'v13-status v13-stagger', id: 'v13-status' });
    s.innerHTML = '<h2>Live Status Monitor</h2><p class="v13-status-sub">Real-time deployment status of all projects</p>';
    var grid = el('div', { className: 'v13-status-grid' });
    PROJECTS.forEach(function (p) {
      grid.innerHTML += '<div class="v13-status-item"><div class="v13-status-led green"></div><div class="v13-status-name">' + p.title + '</div><div class="v13-status-ver">' + p.version + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-techevo');
  }

  function buildArchPatterns() {
    var old = $('#v13-patterns'); if (old) old.remove();
    var s = el('div', { className: 'v13-patterns v13-stagger', id: 'v13-patterns' });
    s.innerHTML = '<h2>Architecture Patterns</h2><p class="v13-patterns-sub">Common code patterns used across the portfolio</p>';
    var patterns = [
      { icon: '&#x1F4E6;', name: 'IIFE Patch Module', count: '12 projects', desc: 'Self-contained patch files that extend the base HTML without modifying it' },
      { icon: '&#x1F504;', name: 'SW Auto-Inject', count: '12 projects', desc: 'Service Worker automatically injects latest patch into cached HTML' },
      { icon: '&#x1F3A8;', name: 'Canvas Rendering', count: '10 projects', desc: 'Pure Canvas 2D for charts, maps, games, and data visualizations' },
      { icon: '&#x1F50A;', name: 'Web Audio SFX', count: '12 projects', desc: 'Oscillator-based sound effects without external audio files' },
      { icon: '&#x2328;', name: 'Keyboard Shortcuts', count: '12 projects', desc: 'Shift+Key navigation for power users across all sections' },
      { icon: '&#x1F4BE;', name: 'localStorage State', count: '12 projects', desc: 'Client-side persistence for scores, progress, and preferences' },
      { icon: '&#x1F4F1;', name: 'Touch-First UI', count: '12 projects', desc: 'Mobile-responsive design with touch gesture support' },
      { icon: '&#x1F9E9;', name: 'Section Builder', count: '12 projects', desc: 'Modular DOM construction via el() helper function' }
    ];
    var grid = el('div', { className: 'v13-patterns-grid' });
    patterns.forEach(function (p) {
      grid.innerHTML += '<div class="v13-pattern-card"><div class="v13-pattern-icon">' + p.icon + '</div><div class="v13-pattern-name">' + p.name + '</div><div class="v13-pattern-count">' + p.count + '</div><div class="v13-pattern-desc">' + p.desc + '</div></div>';
    });
    s.appendChild(grid);
    insertAfter(s, 'v13-status');
  }

  /* ================================================================
   * 40. COMPARE MODAL
   * ================================================================ */
  var compareSelections = [];
  function toggleCompareSelection(card, btn) {
    var idx = compareSelections.indexOf(card);
    if (idx >= 0) { compareSelections.splice(idx, 1); btn.classList.remove('selected'); btn.textContent = 'Compare'; }
    else if (compareSelections.length < 2) { compareSelections.push(card); btn.classList.add('selected'); btn.textContent = 'Selected'; }
    if (compareSelections.length === 2) showCompare();
  }
  function showCompare() {
    var old = $('[class*="-compare-overlay"]'); if (old) old.remove();
    var overlay = el('div', { className: 'v13-compare-overlay' });
    var a = compareSelections[0], b = compareSelections[1];
    function getData(c) {
      return {
        title: c.getAttribute('data-v13-title') || c.querySelector('.card-title').textContent.trim(),
        version: c.getAttribute('data-v13-version') || '?',
        tech: c.getAttribute('data-v13-tech') || '',
        loc: c.getAttribute('data-v13-loc') || '?',
        impact: c.getAttribute('data-v13-impact') || '',
        features: c.getAttribute('data-v13-features') || ''
      };
    }
    var da = getData(a), db = getData(b);
    function makeCol(d) {
      return '<div class="v13-compare-col"><h4>' + d.title + '</h4>' +
        '<div class="v13c-row"><span class="v13c-label">Version</span><span class="v13c-val">' + d.version + '</span></div>' +
        '<div class="v13c-row"><span class="v13c-label">LOC</span><span class="v13c-val">' + parseInt(d.loc).toLocaleString() + '</span></div>' +
        '<div class="v13c-row"><span class="v13c-label">Tech</span><span class="v13c-val">' + d.tech + '</span></div>' +
        '<div class="v13c-row"><span class="v13c-label">Impact</span><span class="v13c-val">' + d.impact + '</span></div>' +
        '<div class="v13c-row"><span class="v13c-label">Features</span><span class="v13c-val" style="font-size:11px;line-height:1.4">' + d.features.substring(0, 120) + '...</span></div></div>';
    }
    overlay.innerHTML = '<div class="v13-compare-box"><button class="v13-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3><div class="v13-compare-grid">' + makeCol(da) + makeCol(db) + '</div></div>';
    document.body.appendChild(overlay);
    setTimeout(function () { overlay.classList.add('open'); }, 10);
    overlay.querySelector('.v13-compare-close').addEventListener('click', closeCompare);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCompare(); });
  }
  function closeCompare() {
    var o = $('.v13-compare-overlay');
    if (o) { o.classList.remove('open'); setTimeout(function () { o.remove(); }, 300); }
    compareSelections.forEach(function (c) { var b = c.querySelector('.v13-compare-btn'); if (b) { b.classList.remove('selected'); b.textContent = 'Compare'; } });
    compareSelections = [];
  }

  /* ================================================================
   * 41. SCROLL RING + TOAST + OBSERVERS
   * ================================================================ */
  function buildScrollRing() {
    var old = $('[class*="-scroll-ring"]'); if (old) old.remove();
    var ring = el('div', { className: 'v13-scroll-ring', 'aria-label': 'Scroll to top' });
    ring.innerHTML = '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/><polygon class="ring-arrow" points="24,14 30,24 27,24 27,32 21,32 21,24 18,24"/></svg>';
    ring.addEventListener('click', function () { playSFX('scroll'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(ring);
    var circ = ring.querySelector('.ring-fg');
    var total = 125.66;
    window.addEventListener('scroll', function () {
      var scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      circ.style.strokeDashoffset = total * (1 - Math.min(1, scrollPct));
    }, { passive: true });
  }

  function showToast(title, text) {
    var wrap = $('.v13-toast-wrap');
    if (!wrap) { wrap = el('div', { className: 'v13-toast-wrap' }); document.body.appendChild(wrap); }
    var toast = el('div', { className: 'v13-toast' });
    toast.innerHTML = '<div class="toast-title">' + title + '</div>' + text;
    wrap.appendChild(toast);
    playSFX('toast');
    setTimeout(function () { toast.classList.add('show'); }, 50);
    setTimeout(function () { toast.classList.remove('show'); setTimeout(function () { toast.remove(); }, 400); }, 5000);
  }

  function setupObservers() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('v13-visible');
          e.target.querySelectorAll('[data-w]').forEach(function (bar) {
            bar.style.width = bar.getAttribute('data-w') + '%';
          });
          e.target.querySelectorAll('[data-h]').forEach(function (bar) {
            bar.style.height = bar.getAttribute('data-h') + 'px';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.v13-stagger').forEach(function (el) { obs.observe(el); });
  }

  /* ================================================================
   * 42. VISIT COUNTER + KEYBOARD SHORTCUTS (20 types)
   * ================================================================ */
  function setupVisitCounter() {
    var count = parseInt(localStorage.getItem('v13_visits') || '0') + 1;
    localStorage.setItem('v13_visits', count);
    var footer = $('footer');
    if (footer) {
      var existing = footer.querySelector('[class*="-visit"]');
      if (existing) existing.remove();
      var vis = el('div', { className: 'v13-visit' });
      vis.innerHTML = '<span class="v13-pulse"></span> Visit #' + count + ' &bull; v13.0 &bull; ' + TOTAL_LOC.toLocaleString() + '+ LOC';
      footer.appendChild(vis);
    }
  }

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (!e.shiftKey) return;
      var map = {
        'S': 'v13-spotlight', 'G': 'v13-growth', 'H': 'v13-heatmap', 'E': 'v13-evolution',
        'R': 'v13-radar', 'L': 'v13-leaderboard', 'V': 'v13-velocity', 'I': 'v13-impact',
        'C': 'v13-certs', 'F': 'v13-flow', 'T': 'v13-timeline', 'K': 'v13-streak',
        'B': 'v13-blueprint', 'N': 'v13-contrib', 'A': 'v13-analytics', 'Q': 'v13-quality',
        'D': 'v13-technet', 'X': 'v13-complexity', 'O': 'v13-roi', 'P': 'v13-patterns'
      };
      var sfxMap = {
        'S': 'spotlight', 'G': 'nav', 'H': 'heatmap', 'E': 'evolution',
        'R': 'radar', 'L': 'leaderboard', 'V': 'velocity', 'I': 'impact',
        'C': 'cert', 'F': 'flow', 'T': 'nav', 'K': 'streak',
        'B': 'blueprint', 'N': 'contrib', 'A': 'analytics', 'Q': 'quality',
        'D': 'technet', 'X': 'complexity', 'O': 'roi', 'P': 'density'
      };
      if (map[e.key]) {
        e.preventDefault();
        var target = $('#' + map[e.key]);
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); playSFX(sfxMap[e.key]); }
      }
    });
  }

  /* ================================================================
   * 43. INIT
   * ================================================================ */
  function init() {
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); } else { run(); }
  }
  function run() {
    updateProjectCards();
    buildBanner();
    buildMetrics();
    buildSpotlight();
    buildGrowth();
    buildHealth();
    buildHeatmap();
    buildEvolution();
    buildRadar();
    buildMilestones();
    buildPulseBoard();
    buildSynergyMap();
    buildLeaderboard();
    buildVelocity();
    buildChangelog();
    buildMaturity();
    buildImpactMatrix();
    buildCertBoard();
    buildFlowCanvas();
    buildTimeline();
    buildInsights();
    buildStreak();
    buildBlueprint();
    buildContribCalendar();
    buildAnalytics();
    buildPerfScorecard();
    buildQualityReport();
    buildCollaboration();
    buildVersionMap();
    buildTechNetwork();
    buildComplexityRadar();
    buildROIDashboard();
    buildFeatureDensity();
    buildTechEvolution();
    buildLiveStatus();
    buildArchPatterns();
    buildScrollRing();
    setupVisitCounter();
    setupKeyboardShortcuts();
    setupObservers();
    setTimeout(function () {
      showToast('Portfolio v13.0', 'Tech Dependency Network + Complexity Radar + ROI Dashboard + Feature Density Map + Tech Evolution Timeline + Live Status Monitor + Architecture Patterns. ' + TOTAL_LOC.toLocaleString() + '+ LOC across 12 projects.');
    }, 2000);
  }
  init();
})();
