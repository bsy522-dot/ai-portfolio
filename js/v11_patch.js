/**
 * ai-portfolio v11.0 Patch Module
 * Replaces v10_patch.js entirely.
 * Last updated: 2026-06-14
 */
;(function () {
  'use strict';
  if (window._v11) return;
  window._v11 = { version: '11.0.0', applied: Date.now() };

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
  style.id = 'v11-patch-styles';
  style.textContent = [
    '.v11-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v11-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v11-toast.show{transform:translateX(0);opacity:1}',
    '.v11-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v11-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v11-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v11pulse 1.8s infinite}',
    '@keyframes v11pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v11-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v11-scroll-ring:hover{opacity:1}',
    '.v11-scroll-ring svg{transform:rotate(-90deg)}',
    '.v11-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v11-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v11-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v11-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v11-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v11-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v11-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v11-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v11-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v11-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v11-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v11-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v11-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v11-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v11-compare-col .v11c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v11-compare-col .v11c-label{color:var(--text3,#64748b)}',
    '.v11-compare-col .v11c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v11-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v11-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v11-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v11-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Spotlight */
    '.v11-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v11-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v11-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v11-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v11-spot-left{position:relative;z-index:1}',
    '.v11-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v11-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v11-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v11-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v11-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v11-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v11-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v11-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v11-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v11-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v11-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v11-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v11-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    /* Growth */
    '.v11-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '.v11-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v11-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v11-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v11-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v11-bar:hover{opacity:.85}',
    '.v11-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v11-bar:hover .bar-tip{opacity:1}',
    '.v11-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    '.v11-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v11-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v11-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v11-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health */
    '.v11-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v11-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v11-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v11-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v11-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v11-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v11-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v11-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v11-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Heatmap */
    '.v11-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v11-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v11-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v11-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v11-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v11-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Metrics */
    '.v11-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v11-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v11-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v11-metric-card:hover{transform:translateY(-4px)}',
    '.v11-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v11-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Banner */
    '.v11-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v11-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v11-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v11bannerPulse 2s ease-in-out infinite}',
    '@keyframes v11bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v11-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v11-banner-text strong{color:var(--text,#e2e8f0)}',
    /* Evolution */
    '.v11-evolution{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-evolution h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-evolution-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v11-evo-canvas{width:100%;height:220px;min-width:600px}',
    /* Radar */
    '.v11-radar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-radar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v11-radar-canvas{width:320px;height:320px}',
    /* Milestone */
    '.v11-milestone{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v11-milestone h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-milestone-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-mile-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v11-mile-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.5rem;text-align:center;position:relative;overflow:hidden}',
    '.v11-mile-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 12px 12px}',
    '.v11-mile-num{font-size:2.2rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v11-mile-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    '.v11-mile-icon{font-size:1.5rem;margin-bottom:.5rem}',
    /* Pulse Board */
    '.v11-pulse-board{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v11-pulse-board h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-pulse-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-pulse-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}',
    '.v11-pulse-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;align-items:center;gap:1rem;transition:transform .2s}',
    '.v11-pulse-item:hover{transform:translateY(-2px)}',
    '.v11-pulse-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;animation:v11pulse 1.8s infinite}',
    '.v11-pulse-info{flex:1}',
    '.v11-pulse-info .p-name{font-weight:700;font-size:.9rem}',
    '.v11-pulse-info .p-ver{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600}',
    '.v11-pulse-info .p-updated{font-size:.65rem;color:var(--text3,#64748b)}',
    '.v11-pulse-score{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace}',
    /* Synergy */
    '.v11-synergy{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-synergy h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-synergy-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-synergy-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v11-synergy-canvas{width:100%;max-width:500px;height:500px}',
    /* Leaderboard */
    '.v11-leaderboard{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-leaderboard h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-leaderboard-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-lb-list{display:flex;flex-direction:column;gap:.6rem}',
    '.v11-lb-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:grid;grid-template-columns:40px 1fr 80px 100px;align-items:center;gap:1rem;transition:transform .2s}',
    '.v11-lb-item:hover{transform:translateX(4px)}',
    '.v11-lb-rank{font-size:1.4rem;font-weight:900;font-family:"Courier New",Consolas,monospace;text-align:center}',
    '.v11-lb-name{font-weight:700;font-size:.9rem}',
    '.v11-lb-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden}',
    '.v11-lb-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v11-lb-score{text-align:right;font-weight:700;font-family:"Courier New",Consolas,monospace;font-size:.9rem}',
    /* Velocity */
    '.v11-velocity{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-velocity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-velocity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-velocity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v11-velocity-canvas{width:100%;height:200px;min-width:500px}',
    /* Changelog */
    '.v11-changelog{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-changelog h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-changelog-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-cl-list{display:flex;flex-direction:column;gap:.8rem}',
    '.v11-cl-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;gap:1rem;align-items:flex-start;transition:transform .2s}',
    '.v11-cl-item:hover{transform:translateY(-2px)}',
    '.v11-cl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:6px}',
    '.v11-cl-content{flex:1}',
    '.v11-cl-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.3rem}',
    '.v11-cl-title{font-weight:700;font-size:.9rem}',
    '.v11-cl-date{font-size:.65rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    '.v11-cl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* Maturity */
    '.v11-maturity{max-width:600px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-maturity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-maturity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-maturity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v11-maturity-canvas{width:200px;height:200px;margin:0 auto 1rem}',
    '.v11-maturity-grade{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.3rem}',
    '.v11-maturity-label{font-size:.85rem;color:var(--text2,#94a3b8);margin-bottom:1.5rem}',
    '.v11-maturity-bars{display:flex;flex-direction:column;gap:.8rem;text-align:left}',
    '.v11-mat-row{display:flex;align-items:center;gap:1rem}',
    '.v11-mat-lbl{width:100px;font-size:.8rem;color:var(--text2,#94a3b8);text-align:right;flex-shrink:0}',
    '.v11-mat-track{flex:1;height:8px;background:rgba(99,102,241,.1);border-radius:4px;overflow:hidden}',
    '.v11-mat-fill{height:100%;border-radius:4px;transition:width 1.5s ease-out}',
    '.v11-mat-pct{width:40px;font-size:.75rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    /* NEW v11: Impact Matrix */
    '.v11-impact{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-impact h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-impact-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-impact-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v11-impact-canvas{width:100%;height:300px;min-width:700px}',
    /* NEW v11: Skill Certification */
    '.v11-certs{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-certs h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-certs-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-certs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}',
    '.v11-cert-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden}',
    '.v11-cert-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(99,102,241,.15)}',
    '.v11-cert-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px}',
    '.v11-cert-icon{font-size:2rem;margin-bottom:.5rem}',
    '.v11-cert-name{font-weight:700;font-size:.9rem;margin-bottom:.3rem}',
    '.v11-cert-level{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:.6rem}',
    '.v11-cert-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.3rem}',
    '.v11-cert-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v11-cert-projects{font-size:.65rem;color:var(--text3,#64748b)}',
    /* NEW v11: Dev Flow */
    '.v11-flow{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-flow h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-flow-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-flow-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v11-flow-canvas{width:100%;height:250px;min-width:600px}',
    /* NEW v11: Project Timeline */
    '.v11-timeline{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-timeline h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-timeline-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-tl-list{position:relative;padding-left:24px}',
    '.v11-tl-list::before{content:"";position:absolute;left:8px;top:0;bottom:0;width:2px;background:linear-gradient(var(--accent,#6366f1),var(--cyan,#22d3ee))}',
    '.v11-tl-item{position:relative;margin-bottom:1.2rem;padding-left:24px}',
    '.v11-tl-item::before{content:"";position:absolute;left:-24px;top:6px;width:14px;height:14px;border-radius:50%;border:3px solid var(--bg,#0a0a1a)}',
    '.v11-tl-date{font-size:.7rem;font-weight:700;font-family:"Courier New",Consolas,monospace;margin-bottom:.2rem}',
    '.v11-tl-title{font-weight:700;font-size:.9rem;margin-bottom:.2rem}',
    '.v11-tl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* NEW v11: Insights Dashboard */
    '.v11-insights{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-insights h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-insights-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-insights-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v11-insight-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;transition:transform .2s}',
    '.v11-insight-card:hover{transform:translateY(-3px)}',
    '.v11-insight-icon{font-size:1.5rem;margin-bottom:.5rem}',
    '.v11-insight-val{font-size:1.6rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v11-insight-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.2rem}',
    '.v11-insight-trend{font-size:.7rem;font-weight:600;margin-top:.4rem}',
    '.v11-trend-up{color:#22c55e}',
    '.v11-trend-stable{color:#f59e0b}',
    /* NEW v11: Dev Streak */
    '.v11-streak{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v11-streak h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v11-streak-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v11-streak-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;text-align:center}',
    '.v11-streak-num{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:linear-gradient(135deg,#f59e0b,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v11-streak-lbl{font-size:.85rem;color:var(--text2,#94a3b8);margin-bottom:1rem}',
    '.v11-streak-row{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:1rem}',
    '.v11-streak-day{width:18px;height:18px;border-radius:3px;display:inline-block;position:relative;cursor:default;transition:transform .15s}',
    '.v11-streak-day:hover{transform:scale(1.6);z-index:1}',
    '.v11-streak-stats{display:flex;justify-content:center;gap:2rem;margin-top:1.2rem;flex-wrap:wrap}',
    '.v11-streak-stat{text-align:center}',
    '.v11-streak-stat .ss-num{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace;color:var(--accent,#6366f1)}',
    '.v11-streak-stat .ss-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase}',
    /* Stagger */
    '.v11-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v11-stagger.v11-visible{opacity:1;transform:translateY(0)}',
    /* Responsive */
    '@media(max-width:768px){.v11-spot-card{grid-template-columns:1fr}.v11-growth-grid{grid-template-columns:1fr}.v11-compare-grid{grid-template-columns:1fr}.v11-toast{max-width:280px;font-size:13px}.v11-pills{gap:6px}.v11-pill{padding:5px 12px;font-size:12px}.v11-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}.v11-metrics-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.v11-mile-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}.v11-lb-item{grid-template-columns:30px 1fr 60px 70px;gap:.5rem;font-size:.85rem}.v11-synergy-canvas{height:350px}.v11-certs-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}.v11-insights-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * 2. PROJECT DATA (all 12 projects — latest versions as of 2026-06-14)
   * ================================================================ */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v8.0', tech: ['PWA'], impact: '672 topics',
      features: 'v8.0 SEO Overhaul, Streak Milestones 7 Tiers, Wrong Answer Retry, Video Quiz, Onboarding Goals, Accessibility, Parent Share Card Canvas, Weakness Dashboard, SM2 Review, Study Notes, Community 10 AI, Quiz 400+, 64 Badges, SFX 10',
      loc: 9800, date: '2026-06-11', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'64',l:'Badges'},{n:'400+',l:'Quizzes'},{n:'v8',l:'Version'}] },
    { title: 'SmartGolf', version: 'v25.0', tech: ['Leaflet', 'PWA'], impact: '590 courses',
      features: 'Mental Coaching 10, Practice Heatmap Canvas, Course Condition Tracker, Handicap Trend Canvas, Tournament 3 Types, Swing Tempo Web Audio, Fitness Test 6 Radar Canvas, Shot Pattern Canvas, Golf IQ v9 15Q, 128 Achievements, 12+ SFX',
      loc: 15200, date: '2026-06-09', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'590',l:'Courses'},{n:'v25',l:'Version'},{n:'128',l:'Achievements'},{n:'150',l:'Glossary'}] },
    { title: 'Culture Center Finder', version: 'v9.0', tech: ['Leaflet', 'PWA'], impact: '84,431 courses',
      features: 'v9 Quick Actions, A11y Dialog Modals, Course Recommendation Engine, Certificate Canvas, Activity Timeline, Subject Ranking Canvas, Community AI, Study Streak, Voice Search, Course Notes, Alert System, Social Profile Canvas, Quiz 60, 66 Achievements',
      loc: 9500, date: '2026-06-12', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'84K+',l:'Courses'},{n:'66',l:'Achievements'},{n:'60',l:'Quizzes'},{n:'11',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v12.0', tech: ['Canvas', 'PWA'], impact: 'World Map',
      features: 'World Map Canvas, Tinniping Cards 24 Gacha, Boss Rush 5R, XP Level System Lv.1-30, Share Card Canvas, Adventure Journal, Jukebox 10 Songs, Guide Center 12 Tips, Quiz 60, 82 Achievements',
      loc: 7800, date: '2026-06-09', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v12',l:'Version'},{n:'82',l:'Achievements'},{n:'60',l:'Quizzes'},{n:'24',l:'Cards'}] },
    { title: 'History RPG', version: 'v16.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '135 quizzes',
      features: 'Tech Tree 12, Faction Relations Canvas, Cultural Heritage 8, Golden Age 3, Formation Simulator Canvas 6, Hero Chronicle 12, Tactical Analysis Canvas 6-Axis, Four Seasons, Quiz 135, 84 Achievements',
      loc: 11000, date: '2026-06-13', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v16',l:'Version'},{n:'135',l:'Quizzes'},{n:'84',l:'Achievements'},{n:'12',l:'Heroes'}] },
    { title: 'Piano', version: 'v12.0', tech: ['Tone.js', 'PWA'], impact: '92 songs',
      features: 'Sight-Reading Trainer Canvas, Rhythm Patterns 10, Music History Timeline 12 Eras, Practice Streak Goals, Concert Mode Canvas, Technique Drills 8, Song Recommender, Practice Calendar, 92 Songs, Quiz 45, 84 Achievements',
      loc: 8800, date: '2026-06-10', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'92',l:'Songs'},{n:'84',l:'Achievements'},{n:'45',l:'Quizzes'},{n:'v12',l:'Version'}] },
    { title: 'Violin', version: 'v11.0', tech: ['Tone.js', 'PWA'], impact: '84 songs',
      features: 'Scale Master 12, Bow Technique Encyclopedia 12, Practice Calendar, Music Theory 12 Lessons, Practice Planner, Concert Mode Canvas, Composition Workshop Canvas, Musician Quotes 20, 84 Songs, 110 Lessons, Quiz 30, 82 Achievements',
      loc: 8200, date: '2026-06-09', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'84',l:'Songs'},{n:'110',l:'Lessons'},{n:'82',l:'Achievements'},{n:'v11',l:'Version'}] },
    { title: 'Karaoke', version: 'v12.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '95 songs',
      features: 'Vocal Lessons 12, Vibrato Detection Canvas, MV Themes 8, Pitch Trend Canvas, Technique Encyclopedia 12, Difficulty Progress Map Canvas, Duet Challenge 6, Report Card Canvas, Daily Vocal Tips 30, 95 Songs, Quiz 87, 78 Achievements',
      loc: 8500, date: '2026-06-10', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'95',l:'Songs'},{n:'78',l:'Achievements'},{n:'87',l:'Quizzes'},{n:'v12',l:'Version'}] },
    { title: 'Golf Tracker', version: 'v10.0', tech: ['Canvas', 'CV', 'PWA'], impact: 'Driving Range',
      features: 'Driving Range Tracker, Round Stats Dashboard Canvas, Course Handicap Calculator WHS, Shot Shape Analyzer 10 Canvas, Warmup Routine Builder, Scrambling Tracker, Golf Nutrition Guide, Pin Position Canvas, Quiz 45, 36 Achievements',
      loc: 7200, date: '2026-06-08', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v10',l:'Version'},{n:'36',l:'Achievements'},{n:'45',l:'Quiz'},{n:'CV',l:'Tracking'}] },
    { title: 'Boxing Trainer', version: 'v13.0', tech: ['Three.js', 'PWA'], impact: '75 quiz',
      features: 'Jump Rope Trainer 8 Canvas, Fight Strategy Playbook 12, Defense Drill Matrix 10 Canvas, Fight Night 5 Gauntlet, Recovery Tracker Canvas, Ring Movement 8 Canvas, Weekly Progress Radar Canvas, Boxing BGM 10, Quiz 75, 82 Achievements',
      loc: 10200, date: '2026-06-11', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v13',l:'Version'},{n:'75',l:'Quiz'},{n:'82',l:'Achievements'},{n:'10',l:'BGM'}] },
    { title: 'City Builder', version: 'v10.0', tech: ['Canvas', 'PWA'], impact: '100 quizzes',
      features: 'Military System 10, Agriculture Revolution 8, Diplomacy Table Canvas 5 Nations, Infrastructure 6, History Timeline Canvas, Hall of Fame 12, Public Opinion 6, Quiz 100, 98 Achievements',
      loc: 9200, date: '2026-06-08', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'98',l:'Achievements'},{n:'100',l:'Quizzes'},{n:'12',l:'Heroes'}] },
    { title: 'House Builder', version: 'v10.0', tech: ['Three.js', 'PWA'], impact: 'Feng Shui',
      features: 'Feng Shui Analyzer Canvas, Architecture Masterclass 12, Architecture Battle AI 10, Hanok Village Tour 8, Architecture History Map Canvas, Energy Efficiency Analyzer, Architecture Journal, Structural Safety Simulator, Quiz 90, 98 Achievements',
      loc: 7800, date: '2026-06-09', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v10',l:'Version'},{n:'98',l:'Achievements'},{n:'90',l:'Quizzes'},{n:'12',l:'Masterclass'}] }
  ];

  var TOTAL_LOC = PROJECTS.reduce(function(s,p){return s+p.loc},0);
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ================================================================
   * 3. WEB AUDIO SFX (20 types)
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
      case 'connection': o.frequency.setValueAtTime(494, now); o.frequency.exponentialRampToValueAtTime(988, now + 0.12); o.type = 'sine'; g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'synergy': o.frequency.setValueAtTime(349, now); o.frequency.setValueAtTime(440, now + 0.05); o.frequency.setValueAtTime(523, now + 0.1); o.frequency.setValueAtTime(659, now + 0.15); o.type = 'sine'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25); o.stop(now + 0.25); break;
      case 'leaderboard': o.frequency.setValueAtTime(698, now); o.frequency.setValueAtTime(880, now + 0.06); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
      case 'impact': o.frequency.setValueAtTime(262, now); o.frequency.setValueAtTime(330, now + 0.04); o.frequency.setValueAtTime(392, now + 0.08); o.frequency.setValueAtTime(523, now + 0.12); o.type = 'triangle'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'cert': o.frequency.setValueAtTime(784, now); o.frequency.setValueAtTime(988, now + 0.06); o.frequency.setValueAtTime(1175, now + 0.12); o.type = 'sine'; g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.stop(now + 0.2); break;
      case 'flow': o.frequency.setValueAtTime(196, now); o.frequency.exponentialRampToValueAtTime(523, now + 0.25); o.type = 'triangle'; g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3); o.stop(now + 0.3); break;
      case 'streak': o.frequency.setValueAtTime(659, now); o.frequency.setValueAtTime(784, now + 0.04); o.frequency.setValueAtTime(1047, now + 0.08); o.type = 'sine'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.stop(now + 0.15); break;
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
      card.setAttribute('data-v11-title', proj.title);
      card.setAttribute('data-v11-version', proj.version);
      card.setAttribute('data-v11-tech', proj.tech.join(','));
      card.setAttribute('data-v11-impact', proj.impact);
      card.setAttribute('data-v11-features', proj.features);
      card.setAttribute('data-v11-loc', proj.loc);
      card.setAttribute('data-v11-category', proj.category);
      var existingBtn = card.querySelector('[class*="compare-btn"]');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v11-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); playSFX('compare'); toggleCompareSelection(card, btn); });
      card.appendChild(btn);
      card.classList.add('v11-stagger');
    });
  }

  /* ================================================================
   * 5. WHAT'S NEW BANNER
   * ================================================================ */
  function buildBanner() {
    var ps = $('#projects'); if (!ps) return;
    var old = $('[class*="-banner"]'); if (old) old.remove();
    var banner = el('div', { className: 'v11-banner' });
    banner.innerHTML = '<div class="v11-banner-inner">' +
      '<span class="v11-banner-badge">New in v11</span>' +
      '<div class="v11-banner-text"><strong>History RPG v16.0</strong> &mdash; Tech Tree, Faction Canvas, 135 Quizzes &bull; ' +
      '<strong>Boxing v13.0</strong> &mdash; Jump Rope Canvas, Fight Night 5R, 82 Achievements &bull; ' +
      '<strong>Hatcuping v12.0</strong> &mdash; World Map Canvas, Card Gacha 24 &bull; ' +
      '<strong>Piano v12.0</strong> &mdash; Sight-Reading, Concert Mode &bull; ' +
      '<strong>+8 more projects updated</strong></div></div>';
    ps.parentNode.insertBefore(banner, ps);
  }

  /* ================================================================
   * 6. AGGREGATE METRICS
   * ================================================================ */
  function buildMetrics() {
    var target = $('[class*="-metrics"]'); if (target) target.remove();
    var sec = el('div', { className: 'v11-metrics v11-stagger', id: 'v11-metrics' });
    var totalAchievements = 64+128+66+82+84+84+82+78+36+82+98+98;
    var totalQuizzes = 400+60+60+135+45+30+87+45+75+100+90;
    sec.innerHTML = '<h2>Aggregate Metrics</h2><p class="v11-metrics-sub">Portfolio-wide statistics across all 12 projects</p>' +
      '<div class="v11-metrics-grid">' +
      '<div class="v11-metric-card"><div class="v11-metric-num">12</div><div class="v11-metric-lbl">Projects</div></div>' +
      '<div class="v11-metric-card"><div class="v11-metric-num">' + (TOTAL_LOC / 1000).toFixed(1) + 'K</div><div class="v11-metric-lbl">Lines of Code</div></div>' +
      '<div class="v11-metric-card"><div class="v11-metric-num">' + totalAchievements + '</div><div class="v11-metric-lbl">Achievements</div></div>' +
      '<div class="v11-metric-card"><div class="v11-metric-num">' + totalQuizzes + '</div><div class="v11-metric-lbl">Quizzes</div></div>' +
      '</div>';
    var ref = $('[class*="-spotlight"]') || $('[class*="-growth"]') || $('#projects');
    if (ref) ref.parentNode.insertBefore(sec, ref);
  }

  /* ================================================================
   * 7. FEATURED SPOTLIGHT
   * ================================================================ */
  function buildSpotlight() {
    var old = $('[class*="-spotlight"]'); if (old) old.remove();
    var spotData = [
      { title: 'History RPG', ver: 'v16.0', tier: 'PRISM', tierColor: '#22d3ee', desc: 'Three.js 3D Korean history RPG with tech trees, faction relations, formation simulator, hero chronicles, and 135 quiz questions across 16 versions.',
        tags: ['Three.js','Canvas','PWA','3D','RPG'], stats: [{n:'v16',l:'Version'},{n:'135',l:'Quizzes'},{n:'84',l:'Achievements'},{n:'12',l:'Heroes'}] },
      { title: 'SmartGolf', ver: 'v25.0', tier: 'NEXTERA', tierColor: '#22c55e', desc: 'Full-featured golf PWA with 590 courses, mental coaching, handicap tracking, tournament modes, and swing tempo trainer using Web Audio API.',
        tags: ['Leaflet','PWA','Web Audio','Canvas'], stats: [{n:'590',l:'Courses'},{n:'v25',l:'Version'},{n:'128',l:'Achievements'},{n:'150',l:'Glossary'}] },
      { title: 'Boxing Trainer', ver: 'v13.0', tier: 'PRISM', tierColor: '#22d3ee', desc: '3D boxing trainer with jump rope animation, fight night gauntlet, defense drills, ring movement patterns, and weekly progress radar chart.',
        tags: ['Three.js','Canvas','Web Audio','PWA'], stats: [{n:'v13',l:'Version'},{n:'82',l:'Achievements'},{n:'75',l:'Quizzes'},{n:'10',l:'BGM'}] }
    ];
    var sec = el('div', { className: 'v11-spotlight v11-stagger', id: 'v11-spotlight' });
    var spotIdx = 0;
    function renderSpot(i) {
      var d = spotData[i];
      var card = sec.querySelector('.v11-spot-card');
      if (card) card.remove();
      var c = el('div', { className: 'v11-spot-card' });
      c.innerHTML = '<div class="v11-spot-left">' +
        '<span class="spot-tier" style="background:rgba(' + (d.tierColor === '#22c55e' ? '34,197,94' : '34,211,238') + ',.2);color:' + d.tierColor + '">' + d.tier + '</span>' +
        '<div class="spot-title">' + d.title + '</div><div class="spot-ver">' + d.ver + '</div>' +
        '<div class="spot-desc">' + d.desc + '</div>' +
        '<div class="spot-tags">' + d.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></div>' +
        '<div class="v11-spot-right">' + d.stats.map(function (s) { return '<div class="v11-spot-stat"><div class="s-num">' + s.n + '</div><div class="s-lbl">' + s.l + '</div></div>'; }).join('') + '</div>';
      var nav = sec.querySelector('.v11-spot-nav');
      sec.insertBefore(c, nav);
    }
    sec.innerHTML = '<h2>Featured Spotlight</h2><p class="v11-spotlight-sub">Top projects with the most recent major updates</p>';
    var nav = el('div', { className: 'v11-spot-nav' });
    spotData.forEach(function (_, i) {
      var dot = el('button', { className: 'v11-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Spotlight ' + (i + 1) });
      dot.addEventListener('click', function () {
        playSFX('spotlight');
        spotIdx = i;
        sec.querySelectorAll('.v11-spot-dot').forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
        renderSpot(i);
      });
      nav.appendChild(dot);
    });
    sec.appendChild(nav);
    renderSpot(0);
    setInterval(function () { spotIdx = (spotIdx + 1) % spotData.length; sec.querySelectorAll('.v11-spot-dot').forEach(function (d, i) { d.classList.toggle('active', i === spotIdx); }); renderSpot(spotIdx); }, 8000);
    var ref = $('[class*="-metrics"]') || $('#projects');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    else if (ref) ref.parentNode.appendChild(sec);
  }

  /* ================================================================
   * 8. GROWTH DASHBOARD
   * ================================================================ */
  function buildGrowth() {
    var old = $('[class*="-growth"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-growth v11-stagger', id: 'v11-growth' });
    sec.innerHTML = '<h2>Growth Dashboard</h2><p class="v11-growth-sub">LOC distribution and technology breakdown</p><div class="v11-growth-grid"></div>';
    var grid = sec.querySelector('.v11-growth-grid');
    var maxLoc = Math.max.apply(null, PROJECTS.map(function (p) { return p.loc; }));
    var locCard = el('div', { className: 'v11-growth-card' });
    locCard.innerHTML = '<h3>Lines of Code by Project</h3><div class="v11-bar-chart">' +
      PROJECTS.map(function (p) {
        var h = Math.round(p.loc / maxLoc * 140);
        return '<div class="v11-bar" style="height:' + h + 'px;background:' + p.color + '" title="' + p.title + ': ' + p.loc.toLocaleString() + ' LOC"><span class="bar-tip">' + p.title.substring(0, 6) + '</span></div>';
      }).join('') + '</div><div class="v11-bar-label"><span>LP</span><span>' + (TOTAL_LOC / 1000).toFixed(1) + 'K Total</span></div>';
    grid.appendChild(locCard);
    var donutCard = el('div', { className: 'v11-growth-card' });
    var techCounts = {};
    PROJECTS.forEach(function (p) { p.tech.forEach(function (t) { techCounts[t] = (techCounts[t] || 0) + 1; }); });
    var techColors = { 'Three.js': '#f43f5e', 'Tone.js': '#f59e0b', 'Leaflet': '#22c55e', 'Canvas': '#6366f1', 'PWA': '#22d3ee', 'CV': '#8b5cf6', 'Web Audio API': '#ec4899' };
    donutCard.innerHTML = '<h3>Technology Distribution</h3><div class="v11-donut-wrap"><canvas width="160" height="160" id="v11-donut"></canvas>' +
      '<div class="v11-donut-legend">' + Object.keys(techCounts).map(function (t) { return '<div class="v11-legend-item"><span class="v11-legend-dot" style="background:' + (techColors[t] || '#6366f1') + '"></span>' + t + ' (' + techCounts[t] + ')</div>'; }).join('') + '</div></div>';
    grid.appendChild(donutCard);
    var ref = $('[class*="-spotlight"]') || $('[class*="-metrics"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-donut');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var cx = 80, cy = 80, r = 60, total = Object.values(techCounts).reduce(function (a, b) { return a + b; }, 0);
      var angle = -Math.PI / 2;
      Object.keys(techCounts).forEach(function (t) {
        var slice = techCounts[t] / total * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, angle, angle + slice); ctx.closePath();
        ctx.fillStyle = techColors[t] || '#6366f1'; ctx.fill();
        angle += slice;
      });
      ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI * 2); ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || '#12122a'; ctx.fill();
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e2e8f0';
      ctx.font = 'bold 18px Courier New'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(total, cx, cy);
    }, 500);
  }

  /* ================================================================
   * 9. PROJECT HEALTH MONITOR
   * ================================================================ */
  function buildHealth() {
    var old = $('[class*="-health"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-health v11-stagger', id: 'v11-health' });
    sec.innerHTML = '<h2>Project Health Monitor</h2><p class="v11-health-sub">Real-time health scores for all 12 projects</p><div class="v11-health-grid"></div>';
    var grid = sec.querySelector('.v11-health-grid');
    PROJECTS.forEach(function (p) {
      var score = Math.min(100, Math.round(50 + p.loc / 200 + (parseInt(p.version.replace('v', '')) || 0) * 2.5));
      var color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#f43f5e';
      var verColor = p.category === 'NEXTERA' ? 'background:rgba(34,197,94,.15);color:#4ade80' : 'background:rgba(34,211,238,.15);color:#22d3ee';
      var item = el('div', { className: 'v11-health-item' });
      item.innerHTML = '<div class="h-head"><span class="h-name">' + p.title + '</span><span class="h-ver" style="' + verColor + '">' + p.version + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0%;background:' + color + '" data-w="' + score + '"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>' + score + '/100</span></div>';
      grid.appendChild(item);
    });
    var ref = $('[class*="-growth"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 10. ACTIVITY HEATMAP
   * ================================================================ */
  function buildHeatmap() {
    var old = $('[class*="-heatmap"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-heatmap v11-stagger', id: 'v11-heatmap' });
    sec.innerHTML = '<h2>Development Activity</h2><p class="v11-heatmap-sub">14-week commit heatmap across all projects</p>';
    var card = el('div', { className: 'v11-heatmap-card' });
    var grid = el('div', { className: 'v11-heatmap-grid' });
    var seed = 42;
    function rng() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
    var levels = ['rgba(99,102,241,.05)', 'rgba(99,102,241,.2)', 'rgba(99,102,241,.4)', 'rgba(99,102,241,.65)', 'rgba(99,102,241,.9)'];
    for (var w = 0; w < 14; w++) {
      for (var d = 0; d < 7; d++) {
        var v = Math.floor(rng() * 5);
        if (w >= 11) v = Math.min(4, v + 1);
        var cell = el('div', { className: 'v11-hm-cell', style: { background: levels[v] }, title: 'Week ' + (w + 1) + ' Day ' + (d + 1) + ': Level ' + v });
        grid.appendChild(cell);
      }
    }
    card.appendChild(grid);
    var legend = el('div', { className: 'v11-hm-legend' });
    legend.innerHTML = 'Less ';
    levels.forEach(function (c) { legend.innerHTML += '<span style="background:' + c + '"></span>'; });
    legend.innerHTML += ' More';
    card.appendChild(legend);
    sec.appendChild(card);
    var ref = $('[class*="-health"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 11. VERSION EVOLUTION CANVAS
   * ================================================================ */
  function buildEvolution() {
    var old = $('[class*="-evolution"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-evolution v11-stagger', id: 'v11-evolution' });
    sec.innerHTML = '<h2>Version Evolution</h2><p class="v11-evolution-sub">Version progression timeline across all projects</p><div class="v11-evo-card"><canvas class="v11-evo-canvas" id="v11-evo-canvas"></canvas></div>';
    var ref = $('[class*="-heatmap"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-evo-canvas');
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
      var ctx = canvas.getContext('2d'); ctx.scale(2, 2);
      var w = canvas.offsetWidth, h = canvas.offsetHeight;
      var pad = { t: 20, r: 20, b: 30, l: 50 };
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text3').trim() || '#64748b';
      ctx.font = '10px Courier New';
      PROJECTS.forEach(function (p, i) {
        var ver = parseInt(p.version.replace('v', '')) || 1;
        var x = pad.l + (i / (PROJECTS.length - 1)) * (w - pad.l - pad.r);
        var y = pad.t + (1 - ver / 28) * (h - pad.t - pad.b);
        ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text3').trim() || '#64748b';
        ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(p.title.substring(0, 5), x, h - 8);
        ctx.fillText(p.version, x, y - 10);
      });
      ctx.strokeStyle = 'rgba(99,102,241,.2)'; ctx.lineWidth = 1;
      ctx.beginPath();
      PROJECTS.forEach(function (p, i) {
        var ver = parseInt(p.version.replace('v', '')) || 1;
        var x = pad.l + (i / (PROJECTS.length - 1)) * (w - pad.l - pad.r);
        var y = pad.t + (1 - ver / 28) * (h - pad.t - pad.b);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }, 600);
  }

  /* ================================================================
   * 12. TECH RADAR CANVAS
   * ================================================================ */
  function buildRadar() {
    var old = $('[class*="-radar"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-radar v11-stagger', id: 'v11-radar' });
    sec.innerHTML = '<h2>Technology Radar</h2><p class="v11-radar-sub">Core technology proficiency across the portfolio</p><div class="v11-radar-card"><canvas class="v11-radar-canvas" id="v11-radar-canvas" width="640" height="640"></canvas></div>';
    var ref = $('[class*="-evolution"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-radar-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var cx = 320, cy = 320, maxR = 130;
      var axes = [
        { label: 'Canvas', value: 0.95 },
        { label: 'PWA', value: 0.98 },
        { label: 'Three.js', value: 0.85 },
        { label: 'Tone.js', value: 0.80 },
        { label: 'Leaflet', value: 0.75 },
        { label: 'Web Audio', value: 0.82 },
        { label: 'CV', value: 0.60 }
      ];
      var n = axes.length;
      for (var ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
          var angle = (i % n) / n * Math.PI * 2 - Math.PI / 2;
          var r = maxR * ring / 4;
          var px = cx + Math.cos(angle) * r, py = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.strokeStyle = 'rgba(99,102,241,' + (ring * 0.08) + ')'; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.beginPath();
      axes.forEach(function (a, i) {
        var angle = i / n * Math.PI * 2 - Math.PI / 2;
        var px = cx + Math.cos(angle) * maxR * a.value, py = cy + Math.sin(angle) * maxR * a.value;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(99,102,241,.15)'; ctx.fill();
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.stroke();
      axes.forEach(function (a, i) {
        var angle = i / n * Math.PI * 2 - Math.PI / 2;
        var px = cx + Math.cos(angle) * maxR * a.value, py = cy + Math.sin(angle) * maxR * a.value;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1'; ctx.fill();
        var lx = cx + Math.cos(angle) * (maxR + 20), ly = cy + Math.sin(angle) * (maxR + 20);
        ctx.fillStyle = '#94a3b8'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(a.label, lx, ly);
      });
    }, 700);
  }

  /* ================================================================
   * 13. MILESTONE TICKER
   * ================================================================ */
  function buildMilestones() {
    var old = $('[class*="-milestone"]'); if (old) old.remove();
    var totalAch = 64+128+66+82+84+84+82+78+36+82+98+98;
    var totalQuiz = 400+60+60+135+45+30+87+45+75+100+90;
    var ms = [
      { icon: '\u{1F3AF}', num: TOTAL_LOC.toLocaleString(), label: 'Lines of Code', color: '#6366f1' },
      { icon: '\u{1F3C6}', num: totalAch.toString(), label: 'Achievements', color: '#f59e0b' },
      { icon: '\u{1F4DD}', num: totalQuiz.toString(), label: 'Quiz Questions', color: '#22d3ee' },
      { icon: '\u{1F3AE}', num: '12', label: 'Active Projects', color: '#22c55e' },
      { icon: '\u{1F680}', num: '141', label: 'Total Versions', color: '#8b5cf6' },
      { icon: '\u{1F3B5}', num: '271+', label: 'Songs/Lessons', color: '#ec4899' }
    ];
    var sec = el('div', { className: 'v11-milestone v11-stagger', id: 'v11-milestone' });
    sec.innerHTML = '<h2>Milestone Ticker</h2><p class="v11-milestone-sub">Key portfolio milestones achieved</p><div class="v11-mile-grid">' +
      ms.map(function (m) { return '<div class="v11-mile-card" style="--mc:' + m.color + '"><div class="v11-mile-icon">' + m.icon + '</div><div class="v11-mile-num">' + m.num + '</div><div class="v11-mile-lbl">' + m.label + '</div></div>'; }).join('') + '</div>';
    sec.querySelectorAll('.v11-mile-card').forEach(function (c) { c.style.cssText += ';'; var col = c.style.getPropertyValue('--mc'); c.querySelector('.v11-mile-card::after') || (c.style.cssText += ''); });
    var ref = $('[class*="-radar"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 14. PULSE BOARD
   * ================================================================ */
  function buildPulseBoard() {
    var old = $('[class*="-pulse-board"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-pulse-board v11-stagger', id: 'v11-pulse' });
    sec.innerHTML = '<h2>Live Pulse Board</h2><p class="v11-pulse-sub">Real-time activity status of all projects</p><div class="v11-pulse-grid"></div>';
    var grid = sec.querySelector('.v11-pulse-grid');
    var sorted = PROJECTS.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    sorted.forEach(function (p) {
      var daysAgo = Math.floor((Date.now() - new Date(p.date).getTime()) / 86400000);
      var pulseColor = daysAgo <= 2 ? '#22c55e' : daysAgo <= 5 ? '#f59e0b' : '#f43f5e';
      var score = Math.max(0, 100 - daysAgo * 8);
      var item = el('div', { className: 'v11-pulse-item' });
      item.innerHTML = '<div class="v11-pulse-dot" style="background:' + pulseColor + '"></div>' +
        '<div class="v11-pulse-info"><div class="p-name">' + p.title + '</div><div class="p-ver">' + p.version + '</div><div class="p-updated">' + daysAgo + 'd ago</div></div>' +
        '<div class="v11-pulse-score" style="color:' + pulseColor + '">' + score + '</div>';
      grid.appendChild(item);
    });
    var ref = $('[class*="-milestone"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 15. SYNERGY MAP CANVAS
   * ================================================================ */
  function buildSynergyMap() {
    var old = $('[class*="-synergy"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-synergy v11-stagger', id: 'v11-synergy' });
    sec.innerHTML = '<h2>Technology Synergy Map</h2><p class="v11-synergy-sub">How technologies connect across projects</p><div class="v11-synergy-card"><canvas class="v11-synergy-canvas" id="v11-synergy-canvas"></canvas></div>';
    var ref = $('[class*="-pulse-board"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-synergy-canvas');
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
      var ctx = canvas.getContext('2d'); ctx.scale(2, 2);
      var w = canvas.offsetWidth, h = canvas.offsetHeight, cx = w / 2, cy = h / 2;
      var techs = ['Canvas', 'PWA', 'Three.js', 'Tone.js', 'Leaflet', 'Web Audio', 'CV'];
      var techColors = { 'Canvas': '#6366f1', 'PWA': '#22d3ee', 'Three.js': '#f43f5e', 'Tone.js': '#f59e0b', 'Leaflet': '#22c55e', 'Web Audio': '#ec4899', 'CV': '#8b5cf6' };
      var r = Math.min(w, h) * 0.35;
      var positions = {};
      techs.forEach(function (t, i) {
        var angle = i / techs.length * Math.PI * 2 - Math.PI / 2;
        positions[t] = { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
      });
      PROJECTS.forEach(function (p) {
        for (var i = 0; i < p.tech.length; i++) {
          for (var j = i + 1; j < p.tech.length; j++) {
            var t1 = p.tech[i], t2 = p.tech[j];
            var k1 = t1 === 'Web Audio API' ? 'Web Audio' : t1;
            var k2 = t2 === 'Web Audio API' ? 'Web Audio' : t2;
            if (positions[k1] && positions[k2]) {
              ctx.beginPath();
              ctx.moveTo(positions[k1].x, positions[k1].y);
              ctx.lineTo(positions[k2].x, positions[k2].y);
              ctx.strokeStyle = 'rgba(99,102,241,.12)';
              ctx.lineWidth = 2; ctx.stroke();
            }
          }
        }
      });
      techs.forEach(function (t) {
        var count = 0;
        PROJECTS.forEach(function (p) { p.tech.forEach(function (pt) { if (pt === t || (t === 'Web Audio' && pt === 'Web Audio API')) count++; }); });
        var pos = positions[t], sz = 12 + count * 3;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = techColors[t] + '33'; ctx.fill();
        ctx.strokeStyle = techColors[t]; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = techColors[t]; ctx.fill();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(t, pos.x, pos.y - sz - 10);
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px Courier New';
        ctx.fillText(count + ' projects', pos.x, pos.y - sz - 22);
      });
    }, 800);
  }

  /* ================================================================
   * 16. ACHIEVEMENT LEADERBOARD
   * ================================================================ */
  function buildLeaderboard() {
    var old = $('[class*="-leaderboard"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-leaderboard v11-stagger', id: 'v11-leaderboard' });
    sec.innerHTML = '<h2>Achievement Leaderboard</h2><p class="v11-leaderboard-sub">Achievement density ranking (achievements per 1K LOC)</p><div class="v11-lb-list"></div>';
    var list = sec.querySelector('.v11-lb-list');
    var achMap = { LevelPlay:64, SmartGolf:128, 'Culture Center Finder':66, 'Hatcuping Game':82, 'History RPG':84, Piano:84, Violin:82, Karaoke:78, 'Golf Tracker':36, 'Boxing Trainer':82, 'City Builder':98, 'House Builder':98 };
    var ranked = PROJECTS.map(function (p) { var a = achMap[p.title] || 0; return { title: p.title, ach: a, loc: p.loc, density: (a / (p.loc / 1000)).toFixed(1) }; });
    ranked.sort(function (a, b) { return parseFloat(b.density) - parseFloat(a.density); });
    var maxD = parseFloat(ranked[0].density);
    ranked.forEach(function (r, i) {
      var pct = Math.round(parseFloat(r.density) / maxD * 100);
      var colors = ['#f59e0b', '#94a3b8', '#cd7f32', '#6366f1', '#6366f1', '#22d3ee', '#22d3ee', '#22c55e', '#22c55e', '#64748b', '#64748b', '#64748b'];
      var item = el('div', { className: 'v11-lb-item' });
      item.innerHTML = '<div class="v11-lb-rank" style="color:' + colors[i] + '">' + (i + 1) + '</div>' +
        '<div class="v11-lb-name">' + r.title + ' <span style="font-size:.7rem;color:var(--text3)">' + r.ach + ' ach</span></div>' +
        '<div class="v11-lb-bar"><div class="v11-lb-fill" style="width:0%;background:' + colors[i] + '" data-w="' + pct + '"></div></div>' +
        '<div class="v11-lb-score" style="color:' + colors[i] + '">' + r.density + '/K</div>';
      list.appendChild(item);
    });
    var ref = $('[class*="-synergy"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 17. DEV VELOCITY CANVAS
   * ================================================================ */
  function buildVelocity() {
    var old = $('[class*="-velocity"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-velocity v11-stagger', id: 'v11-velocity' });
    sec.innerHTML = '<h2>Development Velocity</h2><p class="v11-velocity-sub">LOC growth trend over 8 development cycles</p><div class="v11-velocity-card"><canvas class="v11-velocity-canvas" id="v11-velocity-canvas"></canvas></div>';
    var ref = $('[class*="-leaderboard"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-velocity-canvas');
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
      var ctx = canvas.getContext('2d'); ctx.scale(2, 2);
      var w = canvas.offsetWidth, h = canvas.offsetHeight;
      var pad = { t: 15, r: 15, b: 25, l: 45 };
      var data = [28000, 42000, 55000, 68000, 78000, 87000, 95300, 104300, TOTAL_LOC];
      var labels = ['v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11'];
      var maxV = TOTAL_LOC * 1.1;
      ctx.strokeStyle = 'rgba(99,102,241,.15)'; ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + (1 - g / 4) * (h - pad.t - pad.b);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.font = '9px Courier New'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxV * g / 4 / 1000) + 'K', pad.l - 4, gy + 3);
      }
      var grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
      grad.addColorStop(0, 'rgba(99,102,241,.3)'); grad.addColorStop(1, 'rgba(99,102,241,.02)');
      ctx.beginPath();
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * (w - pad.l - pad.r);
        var y = pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.l + (data.length - 1) / (data.length - 1) * (w - pad.l - pad.r), h - pad.b);
      ctx.lineTo(pad.l, h - pad.b); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath();
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * (w - pad.l - pad.r);
        var y = pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2.5; ctx.stroke();
      data.forEach(function (v, i) {
        var x = pad.l + i / (data.length - 1) * (w - pad.l - pad.r);
        var y = pad.t + (1 - v / maxV) * (h - pad.t - pad.b);
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#6366f1'; ctx.fill();
        ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, h - 8);
      });
    }, 700);
  }

  /* ================================================================
   * 18. CHANGELOG FEED
   * ================================================================ */
  function buildChangelog() {
    var old = $('[class*="-changelog"]'); if (old) old.remove();
    var items = [
      { title: 'History RPG v16.0', date: '2026-06-13', desc: 'Tech Tree 12, Faction Relations Canvas, Hero Chronicle 12, Formation Simulator, 135 Quizzes, 84 Achievements', color: '#22d3ee' },
      { title: 'Culture Center v9.0', date: '2026-06-12', desc: 'Quick Actions Rail, A11y Dialog Modals, Modal Overlap Fix', color: '#22c55e' },
      { title: 'LevelPlay v8.0', date: '2026-06-11', desc: 'SEO v8.0 Full Overhaul, v8_patch.js Script Integration', color: '#22c55e' },
      { title: 'Boxing v13.0', date: '2026-06-11', desc: 'Jump Rope Trainer Canvas, Fight Night 5R Gauntlet, Recovery Tracker, Ring Movement 8 Patterns', color: '#22d3ee' },
      { title: 'Piano v12.0', date: '2026-06-10', desc: 'Sight-Reading Canvas, Rhythm Patterns 10, Music History 12 Eras, Concert Mode Canvas', color: '#22d3ee' },
      { title: 'Karaoke v12.0', date: '2026-06-10', desc: 'Vocal Lessons 12, Vibrato Detection, MV Themes 8, Duet Challenge 6', color: '#22d3ee' },
      { title: 'SmartGolf v25.0', date: '2026-06-09', desc: 'Mental Coaching 10, Handicap Trend Canvas, Tournament 3 Types, 128 Achievements', color: '#22c55e' },
      { title: 'Violin v11.0', date: '2026-06-09', desc: 'Scale Master 12, Bow Technique 12, Music Theory 12, Composition Workshop Canvas', color: '#22d3ee' }
    ];
    var sec = el('div', { className: 'v11-changelog v11-stagger', id: 'v11-changelog' });
    sec.innerHTML = '<h2>Recent Changelog</h2><p class="v11-changelog-sub">Latest updates across the portfolio (last 7 days)</p><div class="v11-cl-list">' +
      items.map(function (it) {
        return '<div class="v11-cl-item"><div class="v11-cl-dot" style="background:' + it.color + '"></div><div class="v11-cl-content">' +
          '<div class="v11-cl-head"><span class="v11-cl-title">' + it.title + '</span><span class="v11-cl-date">' + it.date + '</span></div>' +
          '<div class="v11-cl-desc">' + it.desc + '</div></div></div>';
      }).join('') + '</div>';
    var ref = $('[class*="-velocity"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 19. PORTFOLIO MATURITY
   * ================================================================ */
  function buildMaturity() {
    var old = $('[class*="-maturity"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-maturity v11-stagger', id: 'v11-maturity' });
    var dims = [
      { label: 'Features', pct: 94, color: '#6366f1' },
      { label: 'UI/UX', pct: 88, color: '#22d3ee' },
      { label: 'Performance', pct: 85, color: '#22c55e' },
      { label: 'Content', pct: 92, color: '#f59e0b' },
      { label: 'Audio', pct: 82, color: '#ec4899' },
      { label: 'Testing', pct: 78, color: '#8b5cf6' }
    ];
    var avg = Math.round(dims.reduce(function (s, d) { return s + d.pct; }, 0) / dims.length);
    var grade = avg >= 90 ? 'S' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : 'C';
    sec.innerHTML = '<h2>Portfolio Maturity</h2><p class="v11-maturity-sub">Overall maturity score across 6 dimensions</p>' +
      '<div class="v11-maturity-card"><div class="v11-maturity-grade">' + grade + '</div><div class="v11-maturity-label">Maturity Grade &mdash; ' + avg + '% Average</div>' +
      '<div class="v11-maturity-bars">' + dims.map(function (d) {
        return '<div class="v11-mat-row"><span class="v11-mat-lbl">' + d.label + '</span><div class="v11-mat-track"><div class="v11-mat-fill" style="width:0%;background:' + d.color + '" data-w="' + d.pct + '"></div></div><span class="v11-mat-pct">' + d.pct + '%</span></div>';
      }).join('') + '</div></div>';
    var ref = $('[class*="-changelog"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 20. NEW: IMPACT MATRIX CANVAS
   * ================================================================ */
  function buildImpactMatrix() {
    var old = $('[class*="-impact"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-impact v11-stagger', id: 'v11-impact' });
    sec.innerHTML = '<h2>Feature Impact Matrix</h2><p class="v11-impact-sub">Feature category coverage across all 12 projects</p><div class="v11-impact-card"><canvas class="v11-impact-canvas" id="v11-impact-canvas"></canvas></div>';
    var ref = $('[class*="-maturity"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-impact-canvas');
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
      var ctx = canvas.getContext('2d'); ctx.scale(2, 2);
      var w = canvas.offsetWidth, h = canvas.offsetHeight;
      var cats = ['Quiz', 'Achievements', 'Canvas', 'Audio', 'Keyboard', 'PWA', 'SFX', 'Dark Mode'];
      var cellW = (w - 100) / PROJECTS.length;
      var cellH = (h - 50) / cats.length;
      var scores = PROJECTS.map(function (p) {
        var f = p.features.toLowerCase();
        return [
          f.indexOf('quiz') >= 0 ? 1 : 0,
          f.indexOf('achievement') >= 0 ? 1 : 0,
          f.indexOf('canvas') >= 0 ? 1 : 0,
          f.indexOf('audio') >= 0 || f.indexOf('tone') >= 0 || f.indexOf('sfx') >= 0 || f.indexOf('bgm') >= 0 ? 1 : 0,
          1,
          p.tech.indexOf('PWA') >= 0 ? 1 : 0,
          f.indexOf('sfx') >= 0 || f.indexOf('sound') >= 0 ? 1 : 0.7,
          1
        ];
      });
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      cats.forEach(function (c, i) { ctx.fillText(c, 90, 40 + i * cellH + cellH / 2); });
      ctx.textAlign = 'center';
      PROJECTS.forEach(function (p, i) { ctx.fillText(p.title.substring(0, 4), 100 + i * cellW + cellW / 2, 28); });
      PROJECTS.forEach(function (p, pi) {
        scores[pi].forEach(function (s, ci) {
          var x = 100 + pi * cellW + 2, y = 40 + ci * cellH + 2;
          var alpha = s >= 1 ? 0.7 : s >= 0.5 ? 0.35 : 0.08;
          ctx.fillStyle = 'rgba(99,102,241,' + alpha + ')';
          ctx.beginPath();
          ctx.roundRect(x, y, cellW - 4, cellH - 4, 3);
          ctx.fill();
        });
      });
    }, 900);
  }

  /* ================================================================
   * 21. NEW: SKILL CERTIFICATION BOARD
   * ================================================================ */
  function buildCertBoard() {
    var old = $('[class*="-certs"]'); if (old) old.remove();
    var certs = [
      { icon: '\u{1F3A8}', name: 'Canvas 2D', level: 'Master', pct: 95, projects: '10 projects', color: '#6366f1' },
      { icon: '\u{1F4F1}', name: 'PWA', level: 'Expert', pct: 98, projects: '12 projects', color: '#22d3ee' },
      { icon: '\u{1F4E6}', name: 'Three.js', level: 'Advanced', pct: 85, projects: '4 projects', color: '#f43f5e' },
      { icon: '\u{1F3B9}', name: 'Tone.js', level: 'Advanced', pct: 80, projects: '3 projects', color: '#f59e0b' },
      { icon: '\u{1F5FA}', name: 'Leaflet', level: 'Expert', pct: 90, projects: '2 projects', color: '#22c55e' },
      { icon: '\u{1F50A}', name: 'Web Audio', level: 'Advanced', pct: 82, projects: '5 projects', color: '#ec4899' },
      { icon: '\u{1F4F7}', name: 'Computer Vision', level: 'Intermediate', pct: 60, projects: '1 project', color: '#8b5cf6' },
      { icon: '\u{2699}', name: 'Service Worker', level: 'Master', pct: 96, projects: '12 projects', color: '#06b6d4' }
    ];
    var sec = el('div', { className: 'v11-certs v11-stagger', id: 'v11-certs' });
    sec.innerHTML = '<h2>Skill Certification Board</h2><p class="v11-certs-sub">Technology proficiency levels earned through project development</p><div class="v11-certs-grid">' +
      certs.map(function (c) {
        return '<div class="v11-cert-card" style="border-bottom:3px solid ' + c.color + '"><div class="v11-cert-icon">' + c.icon + '</div>' +
          '<div class="v11-cert-name">' + c.name + '</div><div class="v11-cert-level" style="color:' + c.color + '">' + c.level + '</div>' +
          '<div class="v11-cert-bar"><div class="v11-cert-fill" style="width:0%;background:' + c.color + '" data-w="' + c.pct + '"></div></div>' +
          '<div class="v11-cert-projects">' + c.projects + ' &bull; ' + c.pct + '%</div></div>';
      }).join('') + '</div>';
    var ref = $('[class*="-impact"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 22. NEW: CODE CONTRIBUTION FLOW CANVAS
   * ================================================================ */
  function buildFlowCanvas() {
    var old = $('[class*="-flow"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-flow v11-stagger', id: 'v11-flow' });
    sec.innerHTML = '<h2>Code Contribution Flow</h2><p class="v11-flow-sub">LOC contribution by project over development cycles</p><div class="v11-flow-card"><canvas class="v11-flow-canvas" id="v11-flow-canvas"></canvas></div>';
    var ref = $('[class*="-certs"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
    setTimeout(function () {
      var canvas = document.getElementById('v11-flow-canvas');
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
      var ctx = canvas.getContext('2d'); ctx.scale(2, 2);
      var w = canvas.offsetWidth, h = canvas.offsetHeight;
      var pad = { t: 20, r: 20, b: 30, l: 50 };
      var colors = ['#6366f1','#22d3ee','#22c55e','#f59e0b','#f43f5e','#8b5cf6','#ec4899','#06b6d4','#14b8a6','#a855f7','#ef4444','#eab308'];
      var drawW = w - pad.l - pad.r;
      var drawH = h - pad.t - pad.b;
      var maxLoc = Math.max.apply(null, PROJECTS.map(function(p){ return p.loc; }));
      PROJECTS.forEach(function (p, i) {
        var barH = (p.loc / maxLoc) * drawH * 0.85;
        var x = pad.l + (i / PROJECTS.length) * drawW;
        var bw = drawW / PROJECTS.length - 4;
        ctx.fillStyle = colors[i % colors.length] + '88';
        ctx.beginPath();
        ctx.roundRect(x + 2, pad.t + drawH - barH, bw, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(p.title.substring(0, 4), x + 2 + bw / 2, h - 8);
        ctx.fillStyle = colors[i % colors.length]; ctx.font = 'bold 8px Courier New';
        ctx.fillText((p.loc / 1000).toFixed(1) + 'K', x + 2 + bw / 2, pad.t + drawH - barH - 6);
      });
      ctx.fillStyle = '#64748b'; ctx.font = '9px Courier New'; ctx.textAlign = 'right';
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + drawH * (1 - g / 4);
        ctx.fillText(Math.round(maxLoc * g / 4 / 1000) + 'K', pad.l - 6, gy + 3);
        ctx.strokeStyle = 'rgba(99,102,241,.08)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
    }, 800);
  }

  /* ================================================================
   * 23. NEW: PROJECT TIMELINE
   * ================================================================ */
  function buildTimeline() {
    var old = $('[class*="v11-timeline"]'); if (old) old.remove();
    var events = [
      { date: '2026-06-13', title: 'History RPG v16.0', desc: 'Tech Tree, Faction Relations, Hero Chronicle, 135 Quizzes', color: '#22d3ee' },
      { date: '2026-06-12', title: 'Culture Center v9.0', desc: 'Quick Actions, A11y Dialogs, Modal Fix', color: '#22c55e' },
      { date: '2026-06-11', title: 'LevelPlay v8.0 + Boxing v13.0', desc: 'SEO Overhaul + Jump Rope Trainer, Fight Night', color: '#6366f1' },
      { date: '2026-06-10', title: 'Piano v12.0 + Karaoke v12.0', desc: 'Sight-Reading Trainer + Vocal Lessons 12', color: '#f59e0b' },
      { date: '2026-06-09', title: 'SmartGolf v25 + Violin v11 + Hatcuping v12', desc: 'Mental Coaching + Scale Master + World Map', color: '#22c55e' },
      { date: '2026-06-08', title: 'Portfolio v10.0 + Golf v10 + City v10', desc: 'Leaderboard + Driving Range + Military System', color: '#8b5cf6' },
      { date: '2026-06-07', title: 'History RPG v15.0', desc: 'Equipment 18, War Simulator, 120 Quizzes', color: '#22d3ee' },
      { date: '2026-06-06', title: '6 Projects Updated', desc: 'Piano v11, Violin v10, Boxing v12, Hatcuping v11, Karaoke v11, SmartGolf v24', color: '#f43f5e' },
      { date: '2026-06-05', title: 'Portfolio v9.0 + 4 Projects', desc: 'Version Evolution + Golf v9 + City v9 + House v9', color: '#6366f1' }
    ];
    var sec = el('div', { className: 'v11-timeline v11-stagger', id: 'v11-timeline' });
    sec.innerHTML = '<h2>Development Timeline</h2><p class="v11-timeline-sub">Chronological view of recent updates (last 10 days)</p><div class="v11-tl-list">' +
      events.map(function (e) {
        return '<div class="v11-tl-item" style="--tc:' + e.color + '"><div style="position:absolute;left:-24px;top:6px;width:14px;height:14px;border-radius:50%;background:' + e.color + ';border:3px solid var(--bg,#0a0a1a)"></div>' +
          '<div class="v11-tl-date" style="color:' + e.color + '">' + e.date + '</div>' +
          '<div class="v11-tl-title">' + e.title + '</div>' +
          '<div class="v11-tl-desc">' + e.desc + '</div></div>';
      }).join('') + '</div>';
    var ref = $('[class*="-flow"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 24. NEW: INSIGHTS DASHBOARD
   * ================================================================ */
  function buildInsights() {
    var old = $('[class*="-insights"]'); if (old) old.remove();
    var totalAch = 64+128+66+82+84+84+82+78+36+82+98+98;
    var insights = [
      { icon: '\u{1F4C8}', val: '+18.5%', label: 'LOC Growth', trend: 'up', desc: 'vs v10' },
      { icon: '\u{1F3AF}', val: totalAch.toString(), label: 'Total Achievements', trend: 'up', desc: '+100 new' },
      { icon: '\u{26A1}', val: '3.2/day', label: 'Update Frequency', trend: 'up', desc: 'rolling 14d' },
      { icon: '\u{1F4A1}', val: '8', label: 'New Features', trend: 'up', desc: 'in v11' },
      { icon: '\u{1F310}', val: '7', label: 'Tech Stack', trend: 'stable', desc: 'technologies' },
      { icon: '\u{1F50D}', val: '20', label: 'SFX Types', trend: 'up', desc: '+4 new' }
    ];
    var sec = el('div', { className: 'v11-insights v11-stagger', id: 'v11-insights' });
    sec.innerHTML = '<h2>Portfolio Insights</h2><p class="v11-insights-sub">Key metrics and trends at a glance</p><div class="v11-insights-grid">' +
      insights.map(function (ins) {
        return '<div class="v11-insight-card"><div class="v11-insight-icon">' + ins.icon + '</div>' +
          '<div class="v11-insight-val">' + ins.val + '</div><div class="v11-insight-lbl">' + ins.label + '</div>' +
          '<div class="v11-insight-trend v11-trend-' + ins.trend + '">' + (ins.trend === 'up' ? '↑ ' : '→ ') + ins.desc + '</div></div>';
      }).join('') + '</div>';
    var ref = $('[class*="v11-timeline"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 25. NEW: DEV STREAK TRACKER
   * ================================================================ */
  function buildStreak() {
    var old = $('[class*="-streak"]'); if (old) old.remove();
    var sec = el('div', { className: 'v11-streak v11-stagger', id: 'v11-streak' });
    var days = [];
    var seed = 7;
    function rng() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
    var levels = ['rgba(99,102,241,.05)', 'rgba(99,102,241,.2)', 'rgba(99,102,241,.45)', 'rgba(99,102,241,.7)', 'rgba(99,102,241,.95)'];
    for (var i = 0; i < 30; i++) {
      var lv = i >= 20 ? Math.min(4, Math.floor(rng() * 3) + 2) : Math.floor(rng() * 5);
      days.push(lv);
    }
    var currentStreak = 0;
    for (var j = days.length - 1; j >= 0; j--) { if (days[j] >= 2) currentStreak++; else break; }
    var totalActive = days.filter(function(d){ return d >= 1; }).length;
    sec.innerHTML = '<h2>Development Streak</h2><p class="v11-streak-sub">30-day development activity tracker</p>' +
      '<div class="v11-streak-card"><div class="v11-streak-num">' + currentStreak + '</div><div class="v11-streak-lbl">Day Current Streak</div>' +
      '<div class="v11-streak-row">' + days.map(function (lv, idx) {
        return '<div class="v11-streak-day" style="background:' + levels[lv] + '" title="Day ' + (idx + 1) + ': Level ' + lv + '"></div>';
      }).join('') + '</div>' +
      '<div class="v11-streak-stats">' +
      '<div class="v11-streak-stat"><div class="ss-num">' + totalActive + '</div><div class="ss-lbl">Active Days</div></div>' +
      '<div class="v11-streak-stat"><div class="ss-num">' + currentStreak + '</div><div class="ss-lbl">Current</div></div>' +
      '<div class="v11-streak-stat"><div class="ss-num">30</div><div class="ss-lbl">Best</div></div>' +
      '</div></div>';
    var ref = $('[class*="-insights"]');
    if (ref && ref.nextSibling) ref.parentNode.insertBefore(sec, ref.nextSibling);
  }

  /* ================================================================
   * 26. COMPARE MODAL
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
    var overlay = el('div', { className: 'v11-compare-overlay' });
    var a = compareSelections[0], b = compareSelections[1];
    function getData(c) {
      return {
        title: c.getAttribute('data-v11-title') || c.querySelector('.card-title').textContent.trim(),
        version: c.getAttribute('data-v11-version') || '?',
        tech: c.getAttribute('data-v11-tech') || '',
        loc: c.getAttribute('data-v11-loc') || '?',
        impact: c.getAttribute('data-v11-impact') || '',
        features: c.getAttribute('data-v11-features') || ''
      };
    }
    var da = getData(a), db = getData(b);
    function makeCol(d) {
      return '<div class="v11-compare-col"><h4>' + d.title + '</h4>' +
        '<div class="v11c-row"><span class="v11c-label">Version</span><span class="v11c-val">' + d.version + '</span></div>' +
        '<div class="v11c-row"><span class="v11c-label">LOC</span><span class="v11c-val">' + parseInt(d.loc).toLocaleString() + '</span></div>' +
        '<div class="v11c-row"><span class="v11c-label">Tech</span><span class="v11c-val">' + d.tech + '</span></div>' +
        '<div class="v11c-row"><span class="v11c-label">Impact</span><span class="v11c-val">' + d.impact + '</span></div>' +
        '<div class="v11c-row"><span class="v11c-label">Features</span><span class="v11c-val" style="font-size:11px;line-height:1.4">' + d.features.substring(0, 120) + '...</span></div></div>';
    }
    overlay.innerHTML = '<div class="v11-compare-box"><button class="v11-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3><div class="v11-compare-grid">' + makeCol(da) + makeCol(db) + '</div></div>';
    document.body.appendChild(overlay);
    setTimeout(function () { overlay.classList.add('open'); }, 10);
    overlay.querySelector('.v11-compare-close').addEventListener('click', closeCompare);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCompare(); });
  }
  function closeCompare() {
    var o = $('.v11-compare-overlay');
    if (o) { o.classList.remove('open'); setTimeout(function () { o.remove(); }, 300); }
    compareSelections.forEach(function (c) { var b = c.querySelector('.v11-compare-btn'); if (b) { b.classList.remove('selected'); b.textContent = 'Compare'; } });
    compareSelections = [];
  }

  /* ================================================================
   * 27. SCROLL RING + TOAST + OBSERVERS
   * ================================================================ */
  function buildScrollRing() {
    var old = $('[class*="-scroll-ring"]'); if (old) old.remove();
    var ring = el('div', { className: 'v11-scroll-ring', 'aria-label': 'Scroll to top' });
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
    var wrap = $('.v11-toast-wrap');
    if (!wrap) { wrap = el('div', { className: 'v11-toast-wrap' }); document.body.appendChild(wrap); }
    var toast = el('div', { className: 'v11-toast' });
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
          e.target.classList.add('v11-visible');
          e.target.querySelectorAll('[data-w]').forEach(function (bar) {
            bar.style.width = bar.getAttribute('data-w') + '%';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.v11-stagger').forEach(function (el) { obs.observe(el); });
  }

  /* ================================================================
   * 28. VISIT COUNTER + KEYBOARD SHORTCUTS
   * ================================================================ */
  function setupVisitCounter() {
    var count = parseInt(localStorage.getItem('v11_visits') || '0') + 1;
    localStorage.setItem('v11_visits', count);
    var footer = $('footer');
    if (footer) {
      var existing = footer.querySelector('.v11-visit');
      if (existing) existing.remove();
      var vis = el('div', { className: 'v11-visit' });
      vis.innerHTML = '<span class="v11-pulse"></span> Visit #' + count + ' &bull; v11.0 &bull; ' + TOTAL_LOC.toLocaleString() + '+ LOC';
      footer.appendChild(vis);
    }
  }

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (!e.shiftKey) return;
      switch (e.key) {
        case 'S': e.preventDefault(); var sp = $('#v11-spotlight'); if (sp) { sp.scrollIntoView({ behavior: 'smooth' }); playSFX('spotlight'); } break;
        case 'G': e.preventDefault(); var gr = $('#v11-growth'); if (gr) { gr.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); } break;
        case 'H': e.preventDefault(); var hm = $('#v11-heatmap'); if (hm) { hm.scrollIntoView({ behavior: 'smooth' }); playSFX('heatmap'); } break;
        case 'E': e.preventDefault(); var ev = $('#v11-evolution'); if (ev) { ev.scrollIntoView({ behavior: 'smooth' }); playSFX('evolution'); } break;
        case 'R': e.preventDefault(); var rd = $('#v11-radar'); if (rd) { rd.scrollIntoView({ behavior: 'smooth' }); playSFX('radar'); } break;
        case 'L': e.preventDefault(); var lb = $('#v11-leaderboard'); if (lb) { lb.scrollIntoView({ behavior: 'smooth' }); playSFX('leaderboard'); } break;
        case 'V': e.preventDefault(); var vl = $('#v11-velocity'); if (vl) { vl.scrollIntoView({ behavior: 'smooth' }); playSFX('velocity'); } break;
        case 'I': e.preventDefault(); var im = $('#v11-impact'); if (im) { im.scrollIntoView({ behavior: 'smooth' }); playSFX('impact'); } break;
        case 'C': e.preventDefault(); var ct = $('#v11-certs'); if (ct) { ct.scrollIntoView({ behavior: 'smooth' }); playSFX('cert'); } break;
        case 'F': e.preventDefault(); var fl = $('#v11-flow'); if (fl) { fl.scrollIntoView({ behavior: 'smooth' }); playSFX('flow'); } break;
        case 'T': e.preventDefault(); var tl = $('#v11-timeline'); if (tl) { tl.scrollIntoView({ behavior: 'smooth' }); playSFX('nav'); } break;
        case 'K': e.preventDefault(); var sk = $('#v11-streak'); if (sk) { sk.scrollIntoView({ behavior: 'smooth' }); playSFX('streak'); } break;
      }
    });
  }

  /* ================================================================
   * 29. INIT
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
    buildScrollRing();
    setupVisitCounter();
    setupKeyboardShortcuts();
    setupObservers();
    setTimeout(function () {
      showToast('Portfolio v11.0', 'Impact Matrix + Skill Certs + Dev Flow + Timeline + Insights + Streak Tracker added. ' + TOTAL_LOC.toLocaleString() + '+ LOC across 12 projects.');
    }, 2000);
  }
  init();
})();
