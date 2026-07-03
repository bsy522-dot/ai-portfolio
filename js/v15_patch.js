/**
 * ai-portfolio v15.0 Patch Module
 * Replaces v14_patch.js entirely.
 * Last updated: 2026-07-03
 */
;(function () {
  'use strict';
  if (window._v15) return;
  window._v15 = { version: '15.0.0', applied: Date.now() };

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
  style.id = 'v15-patch-styles';
  style.textContent = [
    '.v15-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v15-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v15-toast.show{transform:translateX(0);opacity:1}',
    '.v15-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v15-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v15-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v15pulse 1.8s infinite}',
    '@keyframes v15pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v15-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v15-scroll-ring:hover{opacity:1}',
    '.v15-scroll-ring svg{transform:rotate(-90deg)}',
    '.v15-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v15-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v15-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v15-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v15-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v15-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v15-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v15-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v15-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v15-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v15-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v15-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v15-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v15-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v15-compare-col .v15c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v15-compare-col .v15c-label{color:var(--text3,#64748b)}',
    '.v15-compare-col .v15c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v15-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v15-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v15-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v15-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Shared section styles */
    '.v15-section{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-section h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v15-section-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-canvas{width:100%;min-width:600px}',
    /* Spotlight */
    '.v15-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v15-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v15-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v15-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v15-spot-left{position:relative;z-index:1}',
    '.v15-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v15-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v15-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v15-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v15-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v15-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v15-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v15-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v15-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v15-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v15-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v15-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v15-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    '@media(max-width:768px){.v15-spot-card{grid-template-columns:1fr;padding:1.5rem}}',
    /* Growth */
    '.v15-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '@media(max-width:768px){.v15-growth-grid{grid-template-columns:1fr}}',
    '.v15-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v15-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v15-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v15-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v15-bar:hover{opacity:.85}',
    '.v15-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v15-bar:hover .bar-tip{opacity:1}',
    '.v15-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    '.v15-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v15-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v15-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v15-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health */
    '.v15-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v15-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v15-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v15-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v15-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v15-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v15-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v15-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v15-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Heatmap */
    '.v15-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v15-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v15-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v15-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v15-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Metrics */
    '.v15-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v15-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v15-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v15-metric-card:hover{transform:translateY(-4px)}',
    '.v15-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v15-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Banner */
    '.v15-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v15-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v15-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v15bannerPulse 2s ease-in-out infinite}',
    '@keyframes v15bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v15-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v15-banner-text strong{color:var(--text,#e2e8f0)}',
    /* DNA Fingerprint */
    '.v15-dna{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-dna h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-dna-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-dna-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-dna-canvas{width:100%;height:320px;min-width:700px}',
    /* Tech Radar */
    '.v15-techradar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-techradar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-techradar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-techradar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v15-techradar-canvas{width:420px;height:420px}',
    '@media(max-width:480px){.v15-techradar-canvas{width:300px;height:300px}}',
    /* Feed */
    '.v15-feed{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-feed h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-feed-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-feed-list{display:flex;flex-direction:column;gap:.6rem;max-height:400px;overflow-y:auto;padding-right:6px}',
    '.v15-feed-list::-webkit-scrollbar{width:4px}',
    '.v15-feed-list::-webkit-scrollbar-thumb{background:rgba(99,102,241,.3);border-radius:2px}',
    '.v15-feed-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.08);border-radius:10px;padding:.8rem 1rem;display:flex;gap:.8rem;align-items:center;transition:transform .15s,border-color .2s}',
    '.v15-feed-item:hover{transform:translateX(4px);border-color:rgba(99,102,241,.25)}',
    '.v15-feed-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}',
    '.v15-feed-info{flex:1;min-width:0}',
    '.v15-feed-title{font-weight:700;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.v15-feed-desc{font-size:.75rem;color:var(--text2,#94a3b8);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.v15-feed-time{font-size:.65rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace;white-space:nowrap;flex-shrink:0}',
    /* Achievement Wall */
    '.v15-achieve{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-achieve h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-achieve-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-achieve-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.8rem}',
    '.v15-ach-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:10px;padding:1rem .8rem;text-align:center;transition:transform .2s,box-shadow .2s}',
    '.v15-ach-card:hover{transform:translateY(-4px);box-shadow:0 6px 20px rgba(99,102,241,.15)}',
    '.v15-ach-icon{font-size:1.6rem;margin-bottom:.4rem}',
    '.v15-ach-name{font-weight:700;font-size:.8rem;margin-bottom:.2rem}',
    '.v15-ach-count{font-size:1.1rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v15-ach-label{font-size:.6rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px}',
    /* Sprint Board */
    '.v15-sprint{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-sprint h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-sprint-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-sprint-board{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}',
    '@media(max-width:768px){.v15-sprint-board{grid-template-columns:1fr}}',
    '.v15-sprint-col{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem;min-height:200px}',
    '.v15-sprint-col h4{font-size:.8rem;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:.8rem;padding-bottom:.5rem;border-bottom:2px solid rgba(99,102,241,.15)}',
    '.v15-sprint-task{background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.1);border-radius:8px;padding:.7rem .8rem;margin-bottom:.5rem;font-size:.8rem;line-height:1.4;transition:transform .15s}',
    '.v15-sprint-task:hover{transform:translateX(3px)}',
    '.v15-sprint-task .st-project{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.2rem}',
    '.v15-sprint-task .st-desc{color:var(--text2,#94a3b8)}',
    /* Existing sections carried forward */
    '.v15-evolution{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-evolution h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-evolution-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-evo-canvas{width:100%;height:220px;min-width:600px}',
    '.v15-radar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-radar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v15-radar-canvas{width:320px;height:320px}',
    /* Changelog */
    '.v15-cl-list{display:flex;flex-direction:column;gap:.8rem;max-height:450px;overflow-y:auto}',
    '.v15-cl-item{display:flex;gap:1rem;align-items:flex-start;padding:.6rem 0}',
    '.v15-cl-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;margin-top:.3rem}',
    '.v15-cl-content{flex:1}',
    '.v15-cl-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}',
    '.v15-cl-title{font-weight:700;font-size:.9rem}',
    '.v15-cl-date{font-size:.7rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    '.v15-cl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* Streak */
    '.v15-streak{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-streak h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-streak-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-streak-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v15-streak-num{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v15-streak-lbl{color:var(--text2,#94a3b8);font-size:.9rem;margin-bottom:1.5rem}',
    '.v15-streak-row{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:1.5rem}',
    '.v15-streak-day{width:8px;height:8px;border-radius:2px;transition:transform .1s}',
    '.v15-streak-day:hover{transform:scale(2)}',
    '.v15-streak-stats{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v15-streak-stat{text-align:center}',
    '.v15-streak-stat .ss-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v15-streak-stat .ss-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px}',
    /* NEW v15 sections */
    /* Velocity Heatmap */
    '.v15-velocity{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-velocity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-velocity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-velocity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-velocity-canvas{width:100%;height:280px;min-width:650px}',
    /* Dependency Galaxy */
    '.v15-galaxy{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-galaxy h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-galaxy-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-galaxy-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v15-galaxy-canvas{width:460px;height:460px}',
    '@media(max-width:520px){.v15-galaxy-canvas{width:320px;height:320px}}',
    /* Feature Density Treemap */
    '.v15-treemap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-treemap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-treemap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-treemap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-treemap-canvas{width:100%;height:300px;min-width:600px}',
    /* Quiz Mastery Leaderboard */
    '.v15-quizboard{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-quizboard h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-quizboard-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-quizboard-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-quizboard-canvas{width:100%;height:320px;min-width:600px}',
    /* Version Timeline */
    '.v15-vtimeline{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-vtimeline h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-vtimeline-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-vtimeline-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-vtimeline-canvas{width:100%;height:260px;min-width:700px}',
    /* Performance Scorecard */
    '.v15-perfcard{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-perfcard h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-perfcard-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-perfcard-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v15-perfcard-canvas{width:100%;height:340px;min-width:600px}',
    /* Code Quality Gauge */
    '.v15-gauge{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-gauge h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-gauge-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-gauge-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v15-gauge-canvas{width:400px;height:250px}',
    '@media(max-width:480px){.v15-gauge-canvas{width:300px;height:190px}}',
    /* Tech Synergy Network */
    '.v15-synergy{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v15-synergy h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v15-synergy-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v15-synergy-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v15-synergy-canvas{width:460px;height:460px}',
    '@media(max-width:520px){.v15-synergy-canvas{width:320px;height:320px}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * 2. PROJECT DATA (Updated 2026-07-03)
   * ================================================================ */
  var PROJECTS = [
    { name:'History RPG', ver:'v20.0', loc:15200, quiz:195, achieve:132, songs:0, tech:'Three.js', icon:'⚔', color:'#22d3ee', updated:'2026-07-02' },
    { name:'LevelPlay', ver:'v12.0', loc:17800, quiz:595, achieve:124, songs:0, tech:'Canvas', icon:'🎮', color:'#fbbf24', updated:'2026-07-02' },
    { name:'Boxing', ver:'v17.0', loc:14200, quiz:135, achieve:130, songs:0, tech:'Three.js', icon:'🥊', color:'#f43f5e', updated:'2026-07-02' },
    { name:'Karaoke', ver:'v16.0', loc:14000, quiz:147, achieve:126, songs:135, tech:'Web Audio', icon:'🎤', color:'#f472b6', updated:'2026-07-02' },
    { name:'Hatcuping', ver:'v16.0', loc:13400, quiz:120, achieve:130, songs:0, tech:'Canvas', icon:'🐣', color:'#fb923c', updated:'2026-07-01' },
    { name:'Piano', ver:'v16.0', loc:15400, quiz:105, achieve:132, songs:132, tech:'Tone.js', icon:'🎹', color:'#a78bfa', updated:'2026-07-01' },
    { name:'SmartGolf', ver:'v28.0', loc:9200, quiz:0, achieve:167, songs:0, tech:'Leaflet', icon:'⛳', color:'#4ade80', updated:'2026-07-01' },
    { name:'Violin', ver:'v15.0', loc:13600, quiz:90, achieve:130, songs:124, tech:'Web Audio', icon:'🎻', color:'#818cf8', updated:'2026-07-01' },
    { name:'City Builder', ver:'v14.0', loc:14400, quiz:160, achieve:146, songs:0, tech:'Canvas Iso', icon:'🏗', color:'#60a5fa', updated:'2026-06-30' },
    { name:'House Builder', ver:'v14.0', loc:13000, quiz:150, achieve:146, songs:0, tech:'Three.js', icon:'🏠', color:'#f59e0b', updated:'2026-06-30' },
    { name:'Golf Tracker', ver:'v14.0', loc:12600, quiz:105, achieve:84, songs:0, tech:'Canvas CV', icon:'🏌', color:'#34d399', updated:'2026-06-30' },
    { name:'CCF', ver:'v12.0', loc:11800, quiz:120, achieve:114, songs:0, tech:'React', icon:'🏛', color:'#2dd4bf', updated:'2026-06-29' }
  ];
  var TOTAL_LOC = 164600;

  /* ================================================================
   * 3. TOAST SYSTEM
   * ================================================================ */
  var toastWrap = el('div', { className: 'v15-toast-wrap' });
  document.body.appendChild(toastWrap);
  function toast(title, msg) {
    var t = el('div', { className: 'v15-toast', innerHTML: '<div class="toast-title">' + title + '</div>' + msg });
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('show'); }); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 4000);
  }

  /* ================================================================
   * 4. SCROLL PROGRESS RING
   * ================================================================ */
  var ring = el('div', { className: 'v15-scroll-ring', innerHTML: '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/></svg><svg viewBox="0 0 48 48" style="position:absolute;inset:0"><polygon class="ring-arrow" points="24,16 30,28 18,28"/></svg>' });
  document.body.appendChild(ring);
  ring.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  var ringFg = ring.querySelector('.ring-fg');
  window.addEventListener('scroll', function () {
    var p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    ringFg.style.strokeDashoffset = (125.66 * (1 - p)).toFixed(1);
    ring.style.display = window.scrollY > 400 ? '' : 'none';
  }, { passive: true });
  ring.style.display = 'none';
  var existingBackToTop = document.getElementById('backToTop');
  if (existingBackToTop) existingBackToTop.style.display = 'none';

  /* ================================================================
   * 5. BANNER
   * ================================================================ */
  var banner = el('div', { className: 'v15-banner section-reveal', innerHTML: '<div class="v15-banner-inner"><span class="v15-banner-badge">v15.0</span><span class="v15-banner-text"><strong>NEXTERA+PRISM v15.0</strong> &mdash; 12 projects at <strong>164,600+ LOC</strong>. New: Version Velocity, Dependency Galaxy, Feature Treemap, Quiz Leaderboard, Version Timeline, Perf Scorecard, Code Quality Gauge, Tech Synergy Network.</span></div>' });

  /* ================================================================
   * 6. METRICS
   * ================================================================ */
  var totalQuiz = 0; var totalAch = 0; var totalSongs = 0;
  PROJECTS.forEach(function(p){ totalQuiz += p.quiz; totalAch += p.achieve; totalSongs += p.songs; });
  var metricsData = [
    { n: '164.6K', l: 'Total LOC', icon: '💻' },
    { n: '12', l: 'Live Repos', icon: '🚀' },
    { n: totalQuiz.toLocaleString(), l: 'Total Quiz', icon: '📝' },
    { n: totalAch.toLocaleString(), l: 'Achievements', icon: '🏆' },
    { n: '' + totalSongs, l: 'Songs/Tracks', icon: '🎵' },
    { n: '6,120', l: 'AI Sessions', icon: '🤖' }
  ];
  var metrics = el('div', { className: 'v15-metrics section-reveal', id: 'v15-metrics' });
  metrics.innerHTML = '<h2>Portfolio Metrics</h2><p class="v15-metrics-sub">Aggregate statistics across all 12 actively evolving projects</p>';
  var mg = el('div', { className: 'v15-metrics-grid' });
  metricsData.forEach(function (m) {
    mg.appendChild(el('div', { className: 'v15-metric-card', innerHTML: '<div style="font-size:1.5rem;margin-bottom:.3rem">' + m.icon + '</div><div class="v15-metric-num">' + m.n + '</div><div class="v15-metric-lbl">' + m.l + '</div>' }));
  });
  metrics.appendChild(mg);

  /* ================================================================
   * 7. SPOTLIGHT
   * ================================================================ */
  var spotData = [
    { name:'History RPG', ver:'v20.0', tier:'PRISM', tierBg:'rgba(34,211,238,.15)', tierColor:'#22d3ee', desc:'Korean history tactics RPG with Three.js 3D. v20.0: morale engine Canvas 10 units, weather/season combat 8 types Canvas, diplomatic marriage/hostage 6 candidates, trade caravan Canvas 8 routes, cultural achievement 10 types Canvas, population economy simulation Canvas, unit evolution 6 types 5 tiers, wonder activation 8 powers Canvas.', tags:['Three.js','Canvas','Tactics','Web Audio','History'], stats:[{n:'20.0',l:'Version'},{n:'195',l:'Quizzes'},{n:'132',l:'Achievements'},{n:'15.2K',l:'LOC'}] },
    { name:'Piano', ver:'v16.0', tier:'PRISM', tierBg:'rgba(167,139,250,.15)', tierColor:'#a78bfa', desc:'Tone.js piano rhythm game v16.0. Rhythm accuracy analyzer Canvas, transposition trainer 12 keys Canvas, piano duo battle 5R, performance timeline Canvas, scale speed challenge 8 Canvas, harmonic progression analyzer 10 Canvas, practice goal planner 6, tone lab 8 Canvas. 132 songs.', tags:['Tone.js','Canvas','Rhythm','Web Audio','Music'], stats:[{n:'16.0',l:'Version'},{n:'132',l:'Songs'},{n:'132',l:'Achievements'},{n:'15.4K',l:'LOC'}] },
    { name:'LevelPlay', ver:'v12.0', tier:'NEXTERA', tierBg:'rgba(251,191,36,.15)', tierColor:'#fbbf24', desc:'Gamified education platform v12.0. Learning rival AI 8 opponents, achievement showcase gallery Canvas PNG, XP double event lucky draw, subject report card Canvas PNG, difficulty tier visualization Canvas 7 tiers, learning heart system 5 hearts, subject contest mode 5 AI questions, streak milestones 8 stages.', tags:['Canvas','Education','PWA','Gamification'], stats:[{n:'12.0',l:'Version'},{n:'595',l:'Quizzes'},{n:'124',l:'Achievements'},{n:'17.8K',l:'LOC'}] },
    { name:'Boxing', ver:'v17.0', tier:'PRISM', tierBg:'rgba(244,63,94,.15)', tierColor:'#f43f5e', desc:'3D boxing trainer v17.0. Punch speed radar Canvas, shadow boxing choreographer 8 Canvas, body composition tracker Canvas BMI/BMR, weight class encyclopedia 17, recovery zone timer Canvas 4 stages, Ring IQ strategy quiz Canvas 12 scenarios, sparring AI 8 opponents 6-axis Radar Canvas, training camp diary Canvas 30 day heatmap.', tags:['Three.js','3D','Web Audio','Physics','RPM'], stats:[{n:'17.0',l:'Version'},{n:'135',l:'Quizzes'},{n:'130',l:'Achievements'},{n:'14.2K',l:'LOC'}] }
  ];
  var spotIdx = 0;
  var spotlight = el('div', { className: 'v15-spotlight section-reveal', id: 'v15-spotlight' });
  spotlight.innerHTML = '<h2>Featured Spotlight</h2><p class="v15-spotlight-sub">Highlighting top projects from the NEXTERA+PRISM ecosystem</p>';
  var spotCard = el('div', { className: 'v15-spot-card' });
  var spotNav = el('div', { className: 'v15-spot-nav' });
  function renderSpot(i) {
    var d = spotData[i];
    spotCard.innerHTML = '<div class="v15-spot-left"><span class="spot-tier" style="background:' + d.tierBg + ';color:' + d.tierColor + '">' + d.tier + '</span><div class="spot-title">' + d.name + '</div><div class="spot-ver">' + d.ver + '</div><p class="spot-desc">' + d.desc + '</p><div class="spot-tags">' + d.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></div><div class="v15-spot-right">' + d.stats.map(function (s) { return '<div class="v15-spot-stat"><div class="s-num">' + s.n + '</div><div class="s-lbl">' + s.l + '</div></div>'; }).join('') + '</div>';
    spotNav.innerHTML = '';
    spotData.forEach(function (_, j) {
      var dot = el('button', { className: 'v15-spot-dot' + (j === i ? ' active' : ''), 'aria-label': 'Spotlight ' + (j + 1) });
      dot.addEventListener('click', function () { spotIdx = j; renderSpot(j); });
      spotNav.appendChild(dot);
    });
  }
  renderSpot(0);
  setInterval(function () { spotIdx = (spotIdx + 1) % spotData.length; renderSpot(spotIdx); }, 8000);
  spotlight.appendChild(spotCard);
  spotlight.appendChild(spotNav);

  /* ================================================================
   * 8. PROJECT HEALTH DASHBOARD
   * ================================================================ */
  var health = el('div', { className: 'v15-health section-reveal', id: 'v15-health' });
  health.innerHTML = '<h2>Project Health Dashboard</h2><p class="v15-health-sub">Real-time health scores for all 12 actively evolving projects</p>';
  var hg = el('div', { className: 'v15-health-grid' });
  PROJECTS.forEach(function (p) {
    var score = Math.min(100, Math.round((p.loc / 180) + (p.achieve / 1.5) + (parseInt(p.ver.replace('v', '')) * 2)));
    var grade = score >= 90 ? 'S' : score >= 75 ? 'A' : score >= 60 ? 'B' : 'C';
    var gradeColor = grade === 'S' ? '#22c55e' : grade === 'A' ? '#6366f1' : grade === 'B' ? '#f59e0b' : '#f43f5e';
    hg.appendChild(el('div', { className: 'v15-health-item', innerHTML: '<div class="h-head"><span class="h-name">' + p.icon + ' ' + p.name + '</span><span class="h-ver" style="background:' + p.color + '22;color:' + p.color + '">' + p.ver + '</span></div><div class="h-bar"><div class="h-fill" style="width:0;background:' + gradeColor + '" data-w="' + score + '%"></div></div><div class="h-stats"><span>Score: ' + score + ' (' + grade + ')</span><span>' + (p.loc / 1000).toFixed(1) + 'K LOC</span></div>' }));
  });
  health.appendChild(hg);

  /* ================================================================
   * 9. DEVELOPMENT ACTIVITY HEATMAP
   * ================================================================ */
  var heatmap = el('div', { className: 'v15-heatmap section-reveal', id: 'v15-heatmap' });
  heatmap.innerHTML = '<h2>Development Activity Heatmap</h2><p class="v15-heatmap-sub">52 weeks of continuous development across 13 projects</p>';
  var hmCard = el('div', { className: 'v15-heatmap-card' });
  var hmGrid = el('div', { className: 'v15-heatmap-grid' });
  var hmColors = ['rgba(99,102,241,.05)', 'rgba(99,102,241,.2)', 'rgba(99,102,241,.4)', 'rgba(99,102,241,.65)', 'rgba(99,102,241,.9)'];
  for (var w = 0; w < 52; w++) {
    for (var d = 0; d < 7; d++) {
      if (w < 4 && d < 3) continue;
      var lvl = w < 8 ? Math.floor(Math.random() * 2) : w < 20 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 3) + 2;
      lvl = Math.min(4, lvl);
      var cell = el('div', { className: 'v15-hm-cell', title: 'Week ' + (w + 1) + ' Day ' + (d + 1) });
      cell.style.background = hmColors[lvl];
      hmGrid.appendChild(cell);
    }
  }
  hmCard.appendChild(hmGrid);
  var hmLeg = el('div', { className: 'v15-hm-legend', innerHTML: 'Less ' });
  hmColors.forEach(function (c) { hmLeg.innerHTML += '<span style="background:' + c + '"></span>'; });
  hmLeg.innerHTML += ' More';
  hmCard.appendChild(hmLeg);
  heatmap.appendChild(hmCard);

  /* ================================================================
   * 10. PROJECT DNA FINGERPRINT (Canvas)
   * ================================================================ */
  var dna = el('div', { className: 'v15-dna section-reveal', id: 'v15-dna' });
  dna.innerHTML = '<h2>Project DNA Fingerprint</h2><p class="v15-dna-sub">Each project&#39;s unique genetic signature based on complexity, features, and tech stack</p>';
  var dnaCanvas = el('canvas', { className: 'v15-dna-canvas', width: 700, height: 320 });
  var dnaCard = el('div', { className: 'v15-dna-card' });
  dnaCard.appendChild(dnaCanvas);
  dna.appendChild(dnaCard);

  function drawDNA() {
    var ctx = dnaCanvas.getContext('2d');
    var W = 700, H = 320;
    ctx.clearRect(0, 0, W, H);
    var cols = PROJECTS.length;
    var cw = (W - 60) / cols;
    var metrics_arr = ['LOC', 'Quiz', 'Achieve', 'Version', 'Songs'];
    var maxV = [18000, 600, 170, 30, 140];
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    metrics_arr.forEach(function (label, mi) {
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.textAlign = 'right';
      ctx.fillText(label, 48, 20 + mi * 58 + 24);
    });
    PROJECTS.forEach(function (p, ci) {
      var x = 55 + ci * cw;
      var vals = [p.loc, p.quiz, p.achieve, parseInt(p.ver.replace('v', '')), p.songs];
      vals.forEach(function (v, mi) {
        var y = 10 + mi * 58;
        var ratio = Math.min(1, v / maxV[mi]);
        var bw = Math.max(2, (cw - 4) * ratio);
        ctx.fillStyle = p.color + (mi === 0 ? 'cc' : mi === 1 ? '99' : mi === 2 ? 'bb' : mi === 3 ? 'dd' : '88');
        ctx.fillRect(x + 2, y + 14, bw, 36);
        if (ratio > 0.3) {
          ctx.fillStyle = '#fff';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(v > 999 ? (v / 1000).toFixed(1) + 'K' : '' + v, x + 2 + bw / 2, y + 36);
        }
      });
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name.length > 8 ? p.name.substring(0, 7) + '..' : p.name, x + cw / 2, H - 4);
    });
  }

  /* ================================================================
   * 11. TECH RADAR (Canvas)
   * ================================================================ */
  var techradar = el('div', { className: 'v15-techradar section-reveal', id: 'v15-techradar' });
  techradar.innerHTML = '<h2>Tech Radar</h2><p class="v15-techradar-sub">ThoughtWorks-style technology adoption radar</p>';
  var trCanvas = el('canvas', { className: 'v15-techradar-canvas', width: 420, height: 420 });
  var trCard = el('div', { className: 'v15-techradar-card' });
  trCard.appendChild(trCanvas);
  techradar.appendChild(trCard);

  function drawTechRadar() {
    var ctx = trCanvas.getContext('2d');
    var W = 420, H = 420, cx = W / 2, cy = H / 2;
    ctx.clearRect(0, 0, W, H);
    var rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
    var ringR = [60, 120, 160, 195];
    rings.forEach(function (label, i) {
      ctx.beginPath();
      ctx.arc(cx, cy, ringR[i], 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99,102,241,' + (0.3 - i * 0.05) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(99,102,241,' + (0.12 - i * 0.02) + ')';
      ctx.fill();
    });
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    rings.forEach(function (label, i) {
      ctx.fillText(label.toUpperCase(), cx, cy - ringR[i] + 12);
    });
    for (var q = 0; q < 4; q++) {
      var angle = q * Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 195, cy + Math.sin(angle) * 195);
      ctx.strokeStyle = 'rgba(99,102,241,.1)';
      ctx.stroke();
    }
    var quadLabels = ['Languages', 'Frameworks', 'Platforms', 'Tools'];
    var qAngles = [Math.PI * 1.75, Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25];
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(148,163,184,.6)';
    quadLabels.forEach(function (l, i) {
      var a = qAngles[i];
      ctx.fillText(l, cx + Math.cos(a) * 175, cy + Math.sin(a) * 175);
    });
    var techs = [
      { name: 'JS', ring: 0, quad: 0, color: '#fbbf24' },
      { name: 'Python', ring: 0, quad: 0, color: '#60a5fa' },
      { name: 'HTML5', ring: 0, quad: 0, color: '#f97316' },
      { name: 'CSS3', ring: 0, quad: 0, color: '#6366f1' },
      { name: 'Three.js', ring: 0, quad: 1, color: '#22d3ee' },
      { name: 'Tone.js', ring: 0, quad: 1, color: '#a78bfa' },
      { name: 'Canvas', ring: 0, quad: 2, color: '#4ade80' },
      { name: 'WebAudio', ring: 0, quad: 2, color: '#818cf8' },
      { name: 'PWA', ring: 0, quad: 2, color: '#34d399' },
      { name: 'Leaflet', ring: 0, quad: 1, color: '#4ade80' },
      { name: 'WebGL2', ring: 1, quad: 2, color: '#f472b6' },
      { name: 'React', ring: 1, quad: 1, color: '#22d3ee' },
      { name: 'MCP', ring: 1, quad: 3, color: '#fb7185' },
      { name: 'Flask', ring: 1, quad: 1, color: '#94a3b8' },
      { name: 'Claude', ring: 0, quad: 3, color: '#c084fc' },
      { name: 'Gemini', ring: 1, quad: 3, color: '#60a5fa' },
      { name: 'OSRM', ring: 1, quad: 3, color: '#2dd4bf' },
      { name: 'Cordova', ring: 2, quad: 2, color: '#94a3b8' },
      { name: 'Electron', ring: 2, quad: 2, color: '#64748b' },
      { name: 'Ollama', ring: 2, quad: 3, color: '#94a3b8' }
    ];
    techs.forEach(function (t, i) {
      var baseAngle = t.quad * Math.PI / 2;
      var spread = (Math.PI / 2) * 0.8;
      var a = baseAngle + spread * 0.15 + (i % 5) * spread * 0.17;
      var rMin = t.ring === 0 ? 15 : ringR[t.ring - 1] + 5;
      var rMax = ringR[t.ring] - 8;
      var r = rMin + (rMax - rMin) * (0.3 + (i % 3) * 0.3);
      var px = cx + Math.cos(a) * r;
      var py = cy + Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.fill();
      ctx.font = '8px sans-serif';
      ctx.fillStyle = t.color;
      ctx.textAlign = 'center';
      ctx.fillText(t.name, px, py - 7);
    });
  }

  /* ================================================================
   * 12. LIVE ACTIVITY FEED
   * ================================================================ */
  var feed = el('div', { className: 'v15-feed section-reveal', id: 'v15-feed' });
  feed.innerHTML = '<h2>Live Activity Feed</h2><p class="v15-feed-sub">Recent development activity across the NEXTERA+PRISM ecosystem</p>';
  var feedList = el('div', { className: 'v15-feed-list' });
  var feedData = [
    { icon: '⚔', bg: 'rgba(34,211,238,.1)', title: 'History RPG v20.0', desc: 'Morale engine Canvas 10 units, weather/season combat 8 types, diplomatic marriage/hostage, trade caravan 8 routes, cultural achievements 10, population economy sim, unit evolution 6x5, wonder activation 8', time: '07-02' },
    { icon: '🎮', bg: 'rgba(251,191,36,.1)', title: 'LevelPlay v12.0', desc: 'Learning rival AI 8 opponents, achievement showcase gallery Canvas PNG, XP double event lucky draw, subject report card Canvas PNG, difficulty tier 7 Canvas, learning heart 5 system, streak milestones 8 stages', time: '07-02' },
    { icon: '🥊', bg: 'rgba(244,63,94,.1)', title: 'Boxing v17.0', desc: 'Punch speed radar Canvas, shadow boxing choreographer 8, body composition tracker BMI/BMR, weight class encyclopedia 17, recovery zone timer 4 stages, Ring IQ quiz 12 scenarios, sparring AI 8', time: '07-02' },
    { icon: '🎤', bg: 'rgba(244,114,182,.1)', title: 'Karaoke v16.0', desc: 'Pitch mastery tracker Canvas, vocal battle tournament 8 AI Canvas, voice EQ visualizer 8 bands, daily/weekly challenge 7, singer growth journal 11 levels, music theory tutor 12, scorecard PNG', time: '07-02' },
    { icon: '🐣', bg: 'rgba(251,146,60,.1)', title: 'Hatcuping v16.0', desc: 'Maze adventure Canvas 3 stages, farm 8 crops, attendance calendar Canvas 30 days, character relations Canvas 12, coloring book 12, rhythm game 6 songs Canvas, puzzle slider 3x3/4x4, quotes gallery 20', time: '07-01' },
    { icon: '🎹', bg: 'rgba(167,139,250,.1)', title: 'Piano v16.0', desc: 'Rhythm accuracy analyzer Canvas, transposition trainer 12 keys, duo battle 5R, performance timeline Canvas, scale speed challenge 8, harmonic progression 10, practice planner 6, tone lab 8', time: '07-01' },
    { icon: '⛳', bg: 'rgba(52,211,153,.1)', title: 'SmartGolf v28.0', desc: 'Course sketch 18-hole Canvas, round timeline planner, weather club correction Canvas, tee time assistant, social feed 5 posts, course compare 5-axis Radar Canvas, swing check 24 items, season report Canvas PNG', time: '07-01' },
    { icon: '🎻', bg: 'rgba(129,140,248,.1)', title: 'Violin v15.0', desc: 'Sight reading Canvas 8 stages, tone quality analyzer 6-axis Radar, bow distribution trainer 3 zones, stage fright coach 6 breathing patterns, quiz battle 5 AI, technique mastery tree 18 nodes, duet practice 6 songs', time: '07-01' },
    { icon: '🏗', bg: 'rgba(96,165,250,.1)', title: 'City Builder v14.0', desc: 'Diplomatic events 12 Canvas, public sentiment 6-axis Radar, ancient wonders 8, seasonal agriculture 8 crops, historical scenarios 6, city fame 8 tiers, royal advisors 6, trade routes 5 nations Canvas', time: '06-30' },
    { icon: '🏠', bg: 'rgba(245,158,11,.1)', title: 'House Builder v14.0', desc: 'Construction method comparison 6 Canvas Radar, real estate appraisal 8 factors Canvas, smart home IoT 12, architecture time travel 6 eras, roof design studio 10 Canvas, architecture rally 6, traffic heatmap 12x12', time: '06-30' },
    { icon: '🏌', bg: 'rgba(52,211,153,.1)', title: 'Golf Tracker v14.0', desc: 'Shot shape analysis Canvas 10, smart caddy GPS 9 holes Canvas, tournament mode 3 formats, round report PNG, score trend Canvas, practice impact tracker, course flyover Canvas, golf fitness 6-axis Radar', time: '06-30' },
    { icon: '🏛', bg: 'rgba(45,212,191,.1)', title: 'CCF v12.0', desc: 'Schedule optimizer Canvas 7-day, course matching personality test 10 Canvas, group matching simulator 12, review ranking leaderboard Canvas, facility comparison 6-axis Radar, study roadmap planner 12 weeks', time: '06-29' },
    { icon: '💼', bg: 'rgba(99,102,241,.1)', title: 'AI Portfolio v15.0', desc: 'Version Velocity Canvas, Dependency Galaxy Canvas, Feature Treemap Canvas, Quiz Leaderboard Canvas, Version Timeline Canvas, Perf Scorecard Canvas, Code Quality Gauge Canvas, Tech Synergy Network Canvas', time: '07-03' }
  ];
  feedData.forEach(function (f) {
    feedList.appendChild(el('div', { className: 'v15-feed-item', innerHTML: '<div class="v15-feed-icon" style="background:' + f.bg + '">' + f.icon + '</div><div class="v15-feed-info"><div class="v15-feed-title">' + f.title + '</div><div class="v15-feed-desc">' + f.desc + '</div></div><span class="v15-feed-time">' + f.time + '</span>' }));
  });
  feed.appendChild(feedList);

  /* ================================================================
   * 13. ACHIEVEMENT SHOWCASE WALL
   * ================================================================ */
  var achieve = el('div', { className: 'v15-achieve section-reveal', id: 'v15-achieve' });
  achieve.innerHTML = '<h2>Achievement Showcase</h2><p class="v15-achieve-sub">' + totalAch.toLocaleString() + ' total achievements earned across all 12 projects</p>';
  var achGrid = el('div', { className: 'v15-achieve-grid' });
  PROJECTS.forEach(function (p) {
    achGrid.appendChild(el('div', { className: 'v15-ach-card', innerHTML: '<div class="v15-ach-icon">' + p.icon + '</div><div class="v15-ach-name">' + p.name + '</div><div class="v15-ach-count">' + p.achieve + '</div><div class="v15-ach-label">Achievements</div>' }));
  });
  achieve.appendChild(achGrid);

  /* ================================================================
   * 14. SPRINT BOARD
   * ================================================================ */
  var sprint = el('div', { className: 'v15-sprint section-reveal', id: 'v15-sprint' });
  sprint.innerHTML = '<h2>Development Sprint Board</h2><p class="v15-sprint-sub">Current sprint: NEXTERA+PRISM v15 cycle</p>';
  var board = el('div', { className: 'v15-sprint-board' });
  var sprintCols = [
    { title: 'Done', color: '#22c55e', items: [
      { proj: 'History RPG', desc: 'v20.0 - Morale engine + weather combat + diplomatic marriage' },
      { proj: 'LevelPlay', desc: 'v12.0 - Rival AI 8 + achievement gallery + XP double event' },
      { proj: 'Boxing', desc: 'v17.0 - Punch speed radar + shadow boxing + Ring IQ' },
      { proj: 'Piano', desc: 'v16.0 - Rhythm analyzer + transposition + duo battle' },
      { proj: 'Karaoke', desc: 'v16.0 - Pitch mastery + vocal battle 8 AI + EQ visualizer' },
      { proj: 'SmartGolf', desc: 'v28.0 - Course sketch 18h + season report + swing check 24' }
    ]},
    { title: 'In Progress', color: '#f59e0b', items: [
      { proj: 'AI Portfolio', desc: 'v15.0 - 8 new Canvas sections + full data update' },
      { proj: 'Hatcuping', desc: 'v16.0 - Maze adventure + farm + rhythm game' },
      { proj: 'Violin', desc: 'v15.0 - Sight reading + tone analyzer + mastery tree' }
    ]},
    { title: 'Planned', color: '#6366f1', items: [
      { proj: 'City Builder', desc: 'v15.0 - Naval warfare + tech tree v3' },
      { proj: 'House Builder', desc: 'v15.0 - VR walkthrough + material physics v2' },
      { proj: 'Golf Tracker', desc: 'v15.0 - ML swing analysis + replay Canvas' },
      { proj: 'CCF', desc: 'v13.0 - AI recommendation engine + social features' }
    ]}
  ];
  sprintCols.forEach(function (col) {
    var colEl = el('div', { className: 'v15-sprint-col' });
    colEl.innerHTML = '<h4 style="color:' + col.color + '">' + col.title + ' (' + col.items.length + ')</h4>';
    col.items.forEach(function (item) {
      colEl.appendChild(el('div', { className: 'v15-sprint-task', innerHTML: '<div class="st-project" style="color:' + col.color + '">' + item.proj + '</div><div class="st-desc">' + item.desc + '</div>' }));
    });
    board.appendChild(colEl);
  });
  sprint.appendChild(board);

  /* ================================================================
   * 15. LOC EVOLUTION CHART (Canvas)
   * ================================================================ */
  var evolution = el('div', { className: 'v15-evolution section-reveal', id: 'v15-evolution' });
  evolution.innerHTML = '<h2>LOC Evolution</h2><p class="v15-evolution-sub">Total lines of code growth across all 12 projects</p>';
  var evoCanvas = el('canvas', { className: 'v15-evo-canvas', width: 600, height: 220 });
  var evoCard = el('div', { className: 'v15-evo-card' });
  evoCard.appendChild(evoCanvas);
  evolution.appendChild(evoCard);

  function drawEvolution() {
    var ctx = evoCanvas.getContext('2d');
    var W = 600, H = 220;
    ctx.clearRect(0, 0, W, H);
    var data = [
      { v: 'v5', loc: 28000 }, { v: 'v6', loc: 42000 }, { v: 'v7', loc: 58000 },
      { v: 'v8', loc: 76000 }, { v: 'v9', loc: 92000 }, { v: 'v10', loc: 104300 },
      { v: 'v11', loc: 113200 }, { v: 'v12', loc: 122300 }, { v: 'v13', loc: 138700 },
      { v: 'v14', loc: 155800 }, { v: 'v15', loc: 164600 }
    ];
    var maxLoc = 180000;
    var padL = 50, padR = 20, padT = 20, padB = 35;
    var cw = W - padL - padR, ch = H - padT - padB;
    for (var g = 0; g <= 4; g++) {
      var gy = padT + ch - (g / 4) * ch;
      ctx.beginPath();
      ctx.moveTo(padL, gy);
      ctx.lineTo(W - padR, gy);
      ctx.strokeStyle = 'rgba(99,102,241,.08)';
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.4)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxLoc * g / 4 / 1000) + 'K', padL - 5, gy + 3);
    }
    ctx.beginPath();
    data.forEach(function (d, i) {
      var x = padL + (i / (data.length - 1)) * cw;
      var y = padT + ch - (d.loc / maxLoc) * ch;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    var grad = ctx.createLinearGradient(0, padT, 0, H - padB);
    grad.addColorStop(0, 'rgba(99,102,241,.2)');
    grad.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.lineTo(padL + cw, H - padB);
    ctx.lineTo(padL, H - padB);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    data.forEach(function (d, i) {
      var x = padL + (i / (data.length - 1)) * cw;
      var y = padT + ch - (d.loc / maxLoc) * ch;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = i === data.length - 1 ? '#22d3ee' : '#6366f1';
      ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.v, x, H - padB + 14);
      if (i === data.length - 1) {
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 10px monospace';
        ctx.fillText((d.loc / 1000).toFixed(1) + 'K', x, y - 10);
      }
    });
  }

  /* ================================================================
   * 16. COMPLEXITY RADAR (Canvas)
   * ================================================================ */
  var radar = el('div', { className: 'v15-radar section-reveal', id: 'v15-radar' });
  radar.innerHTML = '<h2>Complexity Radar</h2><p class="v15-radar-sub">Multi-axis complexity analysis across project dimensions</p>';
  var radarCanvas = el('canvas', { className: 'v15-radar-canvas', width: 320, height: 320 });
  var radarCard = el('div', { className: 'v15-radar-card' });
  radarCard.appendChild(radarCanvas);
  radar.appendChild(radarCard);

  function drawRadar() {
    var ctx = radarCanvas.getContext('2d');
    var W = 320, H = 320, cx = W / 2, cy = H / 2, R = 120;
    ctx.clearRect(0, 0, W, H);
    var axes = ['Frontend', 'Backend', '3D/WebGL', 'Audio', 'Data', 'AI/ML'];
    var vals = [96, 80, 84, 90, 78, 93];
    var n = axes.length;
    for (var rng = 1; rng <= 5; rng++) {
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var a = (i % n) * (Math.PI * 2 / n) - Math.PI / 2;
        var r = R * rng / 5;
        var px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(99,102,241,' + (0.06 + rng * 0.02) + ')';
      ctx.stroke();
    }
    axes.forEach(function (label, i) {
      var a = i * (Math.PI * 2 / n) - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.strokeStyle = 'rgba(99,102,241,.1)';
      ctx.stroke();
      var lx = cx + Math.cos(a) * (R + 20);
      var ly = cy + Math.sin(a) * (R + 20);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, lx, ly);
    });
    ctx.beginPath();
    vals.forEach(function (v, i) {
      var a = i * (Math.PI * 2 / n) - Math.PI / 2;
      var r = R * v / 100;
      var px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(99,102,241,.15)';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();
    vals.forEach(function (v, i) {
      var a = i * (Math.PI * 2 / n) - Math.PI / 2;
      var r = R * v / 100;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
    });
  }

  /* ================================================================
   * 17. CHANGELOG
   * ================================================================ */
  var changelog = el('div', { className: 'v15-section section-reveal', id: 'v15-changelog' });
  changelog.innerHTML = '<h2>Version Changelog</h2><p class="v15-section-sub">Latest release notes across the ecosystem</p>';
  var clList = el('div', { className: 'v15-cl-list' });
  var clData = [
    { title: 'AI Portfolio v15.0', desc: '8 new Canvas sections: Version Velocity, Dependency Galaxy, Feature Treemap, Quiz Leaderboard, Version Timeline, Perf Scorecard, Code Quality Gauge, Tech Synergy. All 12 project data updated to latest.', date: '2026-07-03', color: '#6366f1' },
    { title: 'History RPG v20.0', desc: 'Morale engine Canvas 10 units, weather/season combat 8 types, diplomatic marriage/hostage, trade caravan 8 routes Canvas, cultural achievements 10, population economy, unit evolution 6x5, wonders 8', date: '2026-07-02', color: '#22d3ee' },
    { title: 'LevelPlay v12.0', desc: 'Learning rival AI 8, achievement gallery Canvas PNG, XP double event, subject report card Canvas PNG, difficulty tier 7 Canvas, learning heart 5, contest mode, streak milestones 8', date: '2026-07-02', color: '#fbbf24' },
    { title: 'Boxing v17.0', desc: 'Punch speed radar Canvas, shadow boxing choreographer 8, body composition BMI/BMR, weight class encyclopedia 17, recovery zone 4, Ring IQ 12 scenarios, sparring AI 8 6-axis, camp diary 30-day', date: '2026-07-02', color: '#f43f5e' },
    { title: 'Karaoke v16.0', desc: 'Pitch mastery tracker Canvas, vocal battle tournament 8 AI, voice EQ 8 bands Canvas, daily/weekly challenge 7, singer growth 11 levels, music theory tutor 12, scorecard Canvas PNG, vocal style 6-axis', date: '2026-07-02', color: '#f472b6' },
    { title: 'Piano v16.0', desc: 'Rhythm accuracy Canvas, transposition 12 keys, duo battle 5R, performance timeline Canvas, scale speed 8, harmonic progression 10 Canvas, practice planner 6, tone lab 8 Canvas', date: '2026-07-01', color: '#a78bfa' },
    { title: 'SmartGolf v28.0', desc: 'Course sketch 18-hole Canvas, round timeline planner, weather club correction Canvas, tee time assistant, social feed, course compare 5-axis Radar, swing check 24, season report Canvas PNG', date: '2026-07-01', color: '#4ade80' },
    { title: 'Violin v15.0', desc: 'Sight reading Canvas 8 stages, tone quality 6-axis Radar, bow distribution 3 zones, stage fright coach 6 breathing, quiz battle 5 AI, mastery tree 18 nodes, practice report Canvas PNG, duet 6 songs', date: '2026-07-01', color: '#818cf8' }
  ];
  clData.forEach(function (c) {
    clList.appendChild(el('div', { className: 'v15-cl-item', innerHTML: '<div class="v15-cl-dot" style="background:' + c.color + '"></div><div class="v15-cl-content"><div class="v15-cl-head"><span class="v15-cl-title">' + c.title + '</span><span class="v15-cl-date">' + c.date + '</span></div><div class="v15-cl-desc">' + c.desc + '</div></div>' }));
  });
  changelog.appendChild(clList);

  /* ================================================================
   * 18. DEV STREAK
   * ================================================================ */
  var streak = el('div', { className: 'v15-streak section-reveal', id: 'v15-streak' });
  streak.innerHTML = '<h2>Development Streak</h2><p class="v15-streak-sub">Continuous daily development activity</p>';
  var streakCard = el('div', { className: 'v15-streak-card' });
  streakCard.innerHTML = '<div class="v15-streak-num">96</div><div class="v15-streak-lbl">Consecutive Days of Active Development</div>';
  var streakRow = el('div', { className: 'v15-streak-row' });
  var streakColors = ['rgba(99,102,241,.08)', 'rgba(99,102,241,.25)', 'rgba(99,102,241,.5)', 'rgba(99,102,241,.75)', 'rgba(99,102,241,.95)'];
  for (var sd = 0; sd < 96; sd++) {
    var lvl2 = sd < 10 ? Math.floor(Math.random() * 3) + 1 : sd < 30 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2) + 3;
    lvl2 = Math.min(4, lvl2);
    var day = el('div', { className: 'v15-streak-day', title: 'Day ' + (sd + 1) });
    day.style.background = streakColors[lvl2];
    streakRow.appendChild(day);
  }
  streakCard.appendChild(streakRow);
  streakCard.innerHTML += '<div class="v15-streak-stats"><div class="v15-streak-stat"><div class="ss-num">96</div><div class="ss-lbl">Current</div></div><div class="v15-streak-stat"><div class="ss-num">96</div><div class="ss-lbl">Longest</div></div><div class="v15-streak-stat"><div class="ss-num">12</div><div class="ss-lbl">Repos Active</div></div><div class="v15-streak-stat"><div class="ss-num">164.6K</div><div class="ss-lbl">Total LOC</div></div></div>';
  streak.appendChild(streakCard);

  /* ================================================================
   * 19. LOC GROWTH BAR + TECH DISTRIBUTION DONUT
   * ================================================================ */
  var growth = el('div', { className: 'v15-growth section-reveal', id: 'v15-growth' });
  growth.innerHTML = '<h2>Growth Analytics</h2><p class="v15-growth-sub">Code growth and technology distribution breakdown</p>';
  var growthGrid = el('div', { className: 'v15-growth-grid' });
  var locCard = el('div', { className: 'v15-growth-card', innerHTML: '<h3>LOC by Project</h3>' });
  var locBars = el('div', { className: 'v15-bar-chart' });
  var maxLoc2 = 18000;
  var barColors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#f43f5e', '#a78bfa', '#818cf8', '#f472b6', '#fb923c', '#34d399', '#60a5fa', '#2dd4bf'];
  PROJECTS.forEach(function (p, i) {
    var h = Math.round((p.loc / maxLoc2) * 150);
    var bar = el('div', { className: 'v15-bar', innerHTML: '<span class="bar-tip">' + p.name + ': ' + (p.loc / 1000).toFixed(1) + 'K</span>' });
    bar.style.height = '0';
    bar.style.background = barColors[i % barColors.length];
    bar.dataset.h = h + 'px';
    locBars.appendChild(bar);
  });
  locCard.appendChild(locBars);
  locCard.appendChild(el('div', { className: 'v15-bar-label', innerHTML: '<span>12 Projects</span><span>Max: 17.8K</span>' }));
  var techCard = el('div', { className: 'v15-growth-card', innerHTML: '<h3>Tech Distribution</h3>' });
  var donutWrap = el('div', { className: 'v15-donut-wrap' });
  var donutCanvas = el('canvas', { width: 160, height: 160 });
  var donutLegend = el('div', { className: 'v15-donut-legend' });
  var techDist = [
    { name: 'Canvas/2D', pct: 34, color: '#6366f1' },
    { name: 'Three.js/3D', pct: 22, color: '#22d3ee' },
    { name: 'Web Audio', pct: 19, color: '#a78bfa' },
    { name: 'Data/API', pct: 15, color: '#4ade80' },
    { name: 'Other', pct: 10, color: '#f59e0b' }
  ];
  techDist.forEach(function (t) {
    donutLegend.appendChild(el('div', { className: 'v15-legend-item', innerHTML: '<span class="v15-legend-dot" style="background:' + t.color + '"></span>' + t.name + ' (' + t.pct + '%)' }));
  });
  donutWrap.appendChild(donutCanvas);
  donutWrap.appendChild(donutLegend);
  techCard.appendChild(donutWrap);
  growthGrid.appendChild(locCard);
  growthGrid.appendChild(techCard);
  growth.appendChild(growthGrid);

  function drawDonut() {
    var ctx = donutCanvas.getContext('2d');
    var cx = 80, cy = 80, R = 60, r = 38;
    ctx.clearRect(0, 0, 160, 160);
    var start = -Math.PI / 2;
    techDist.forEach(function (t) {
      var sweep = (t.pct / 100) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, start, start + sweep);
      ctx.arc(cx, cy, r, start + sweep, start, true);
      ctx.closePath();
      ctx.fillStyle = t.color;
      ctx.fill();
      start += sweep;
    });
    ctx.fillStyle = 'rgba(148,163,184,.6)';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('164.6K', cx, cy - 6);
    ctx.font = '8px sans-serif';
    ctx.fillText('TOTAL LOC', cx, cy + 10);
  }

  /* ================================================================
   * 20. COMPARE OVERLAY
   * ================================================================ */
  var compareOverlay = el('div', { className: 'v15-compare-overlay' });
  compareOverlay.innerHTML = '<div class="v15-compare-box"><button class="v15-compare-close">&times;</button><h3>Project Comparison</h3><div class="v15-compare-grid" id="v15CompareGrid"></div></div>';
  document.body.appendChild(compareOverlay);
  compareOverlay.querySelector('.v15-compare-close').addEventListener('click', function () { compareOverlay.classList.remove('open'); });
  compareOverlay.addEventListener('click', function (e) { if (e.target === compareOverlay) compareOverlay.classList.remove('open'); });
  var compareList = [];
  function toggleCompare(name) {
    var idx = compareList.indexOf(name);
    if (idx >= 0) compareList.splice(idx, 1); else if (compareList.length < 2) compareList.push(name);
    if (compareList.length === 2) showCompare();
  }
  function showCompare() {
    var grid = document.getElementById('v15CompareGrid');
    grid.innerHTML = '';
    compareList.forEach(function (name) {
      var p = PROJECTS.find(function (pr) { return pr.name === name; });
      if (!p) return;
      var col = el('div', { className: 'v15-compare-col' });
      col.innerHTML = '<h4>' + p.icon + ' ' + p.name + '</h4>' +
        [['Version', p.ver], ['LOC', (p.loc / 1000).toFixed(1) + 'K'], ['Quiz', '' + p.quiz], ['Achievements', '' + p.achieve], ['Songs', '' + p.songs], ['Tech', p.tech], ['Updated', p.updated]].map(function (r) {
          return '<div class="v15c-row"><span class="v15c-label">' + r[0] + '</span><span class="v15c-val">' + r[1] + '</span></div>';
        }).join('');
      grid.appendChild(col);
    });
    compareOverlay.classList.add('open');
    compareList = [];
  }

  /* ================================================================
   * 21. NEW: VERSION VELOCITY CHART (Canvas)
   * ================================================================ */
  var velocity = el('div', { className: 'v15-velocity section-reveal', id: 'v15-velocity' });
  velocity.innerHTML = '<h2>Version Velocity</h2><p class="v15-velocity-sub">Version progression speed across all 12 projects</p>';
  var velCanvas = el('canvas', { className: 'v15-velocity-canvas', width: 650, height: 280 });
  var velCard = el('div', { className: 'v15-velocity-card' });
  velCard.appendChild(velCanvas);
  velocity.appendChild(velCard);

  function drawVelocity() {
    var ctx = velCanvas.getContext('2d');
    var W = 650, H = 280;
    ctx.clearRect(0, 0, W, H);
    var padL = 100, padR = 20, padT = 20, padB = 30;
    var cw = W - padL - padR, ch = H - padT - padB;
    var sorted = PROJECTS.slice().sort(function(a,b){ return parseInt(b.ver.replace('v','')) - parseInt(a.ver.replace('v','')); });
    var maxVer = 30;
    var bh = Math.min(18, (ch - sorted.length * 2) / sorted.length);
    sorted.forEach(function(p, i) {
      var ver = parseInt(p.ver.replace('v',''));
      var y = padT + i * (bh + 4);
      var bw = (ver / maxVer) * cw;
      var grd = ctx.createLinearGradient(padL, 0, padL + bw, 0);
      grd.addColorStop(0, p.color + '44');
      grd.addColorStop(1, p.color);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.roundRect(padL, y, bw, bh, 3);
      ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p.icon + ' ' + p.name, padL - 8, y + bh / 2 + 4);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      if (bw > 30) ctx.fillText(p.ver, padL + bw - 30, y + bh / 2 + 3);
    });
    for (var g = 0; g <= 3; g++) {
      var x = padL + (g / 3) * cw;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, H - padB);
      ctx.strokeStyle = 'rgba(99,102,241,.06)';
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,.4)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('v' + Math.round(maxVer * g / 3), x, H - padB + 14);
    }
  }

  /* ================================================================
   * 22. NEW: DEPENDENCY GALAXY (Canvas)
   * ================================================================ */
  var galaxy = el('div', { className: 'v15-galaxy section-reveal', id: 'v15-galaxy' });
  galaxy.innerHTML = '<h2>Dependency Galaxy</h2><p class="v15-galaxy-sub">Shared technology dependencies visualized as a constellation network</p>';
  var galCanvas = el('canvas', { className: 'v15-galaxy-canvas', width: 460, height: 460 });
  var galCard = el('div', { className: 'v15-galaxy-card' });
  galCard.appendChild(galCanvas);
  galaxy.appendChild(galCard);

  function drawGalaxy() {
    var ctx = galCanvas.getContext('2d');
    var W = 460, H = 460, cx = W / 2, cy = H / 2;
    ctx.clearRect(0, 0, W, H);
    var techNodes = [
      { name: 'Canvas', x: cx, y: cy - 80, r: 18, color: '#6366f1', projects: ['LevelPlay','Hatcuping','Golf Tracker','City Builder'] },
      { name: 'Three.js', x: cx - 120, y: cy - 40, r: 16, color: '#22d3ee', projects: ['History RPG','Boxing','House Builder'] },
      { name: 'Web Audio', x: cx + 120, y: cy - 40, r: 15, color: '#a78bfa', projects: ['Piano','Violin','Karaoke'] },
      { name: 'Tone.js', x: cx + 60, y: cy + 80, r: 12, color: '#818cf8', projects: ['Piano'] },
      { name: 'Leaflet', x: cx - 60, y: cy + 80, r: 12, color: '#4ade80', projects: ['SmartGolf'] },
      { name: 'PWA', x: cx, y: cy + 140, r: 14, color: '#34d399', projects: ['SmartGolf','CCF','LevelPlay'] },
      { name: 'React', x: cx - 140, y: cy + 60, r: 11, color: '#22d3ee', projects: ['CCF'] },
      { name: 'WebGL', x: cx + 140, y: cy + 60, r: 11, color: '#f472b6', projects: ['Karaoke','History RPG'] }
    ];
    var projNodes = PROJECTS.map(function(p, i) {
      var a = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2;
      return { name: p.name, icon: p.icon, x: cx + Math.cos(a) * 190, y: cy + Math.sin(a) * 190, color: p.color };
    });
    techNodes.forEach(function(tn) {
      tn.projects.forEach(function(pName) {
        var pn = projNodes.find(function(p) { return p.name === pName; });
        if (!pn) return;
        ctx.beginPath();
        ctx.moveTo(tn.x, tn.y);
        ctx.lineTo(pn.x, pn.y);
        ctx.strokeStyle = tn.color + '22';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });
    techNodes.forEach(function(tn) {
      ctx.beginPath();
      ctx.arc(tn.x, tn.y, tn.r, 0, Math.PI * 2);
      ctx.fillStyle = tn.color + '33';
      ctx.fill();
      ctx.strokeStyle = tn.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = tn.color;
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tn.name, tn.x, tn.y + 3);
    });
    projNodes.forEach(function(pn) {
      ctx.beginPath();
      ctx.arc(pn.x, pn.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = pn.color;
      ctx.fill();
      ctx.font = '8px sans-serif';
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.textAlign = 'center';
      ctx.fillText(pn.name, pn.x, pn.y + 16);
    });
  }

  /* ================================================================
   * 23. NEW: FEATURE DENSITY TREEMAP (Canvas)
   * ================================================================ */
  var treemap = el('div', { className: 'v15-treemap section-reveal', id: 'v15-treemap' });
  treemap.innerHTML = '<h2>Feature Density Treemap</h2><p class="v15-treemap-sub">Relative feature density across all 12 projects</p>';
  var tmCanvas = el('canvas', { className: 'v15-treemap-canvas', width: 600, height: 300 });
  var tmCard = el('div', { className: 'v15-treemap-card' });
  tmCard.appendChild(tmCanvas);
  treemap.appendChild(tmCard);

  function drawTreemap() {
    var ctx = tmCanvas.getContext('2d');
    var W = 600, H = 300;
    ctx.clearRect(0, 0, W, H);
    var sorted = PROJECTS.slice().sort(function(a,b){ return b.loc - a.loc; });
    var total = sorted.reduce(function(s,p){ return s + p.loc; }, 0);
    var x = 0, row = 0;
    var rowH = H / 2;
    var rowW = W;
    sorted.forEach(function(p, i) {
      if (i === 6) { x = 0; row = 1; }
      var frac = p.loc / (total / 2);
      var bw = Math.max(40, frac * rowW);
      var by = row * rowH;
      ctx.fillStyle = p.color + '33';
      ctx.fillRect(x + 1, by + 1, bw - 2, rowH - 2);
      ctx.strokeStyle = p.color + '66';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, by + 1, bw - 2, rowH - 2);
      ctx.fillStyle = p.color;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.icon + ' ' + p.name, x + bw / 2, by + rowH / 2 - 8);
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '9px monospace';
      ctx.fillText((p.loc / 1000).toFixed(1) + 'K LOC', x + bw / 2, by + rowH / 2 + 10);
      ctx.font = '8px sans-serif';
      ctx.fillText(p.ver, x + bw / 2, by + rowH / 2 + 24);
      x += bw;
    });
  }

  /* ================================================================
   * 24. NEW: QUIZ MASTERY LEADERBOARD (Canvas)
   * ================================================================ */
  var quizboard = el('div', { className: 'v15-quizboard section-reveal', id: 'v15-quizboard' });
  quizboard.innerHTML = '<h2>Quiz Mastery Leaderboard</h2><p class="v15-quizboard-sub">Total quiz questions ranked by project</p>';
  var qbCanvas = el('canvas', { className: 'v15-quizboard-canvas', width: 600, height: 320 });
  var qbCard = el('div', { className: 'v15-quizboard-card' });
  qbCard.appendChild(qbCanvas);
  quizboard.appendChild(qbCard);

  function drawQuizBoard() {
    var ctx = qbCanvas.getContext('2d');
    var W = 600, H = 320;
    ctx.clearRect(0, 0, W, H);
    var sorted = PROJECTS.filter(function(p){ return p.quiz > 0; }).sort(function(a,b){ return b.quiz - a.quiz; });
    var padL = 110, padR = 30, padT = 15, padB = 20;
    var cw = W - padL - padR;
    var maxQ = 600;
    var bh = Math.min(22, (H - padT - padB - sorted.length * 3) / sorted.length);
    var medals = ['🥇', '🥈', '🥉'];
    sorted.forEach(function(p, i) {
      var y = padT + i * (bh + 5);
      var bw = (p.quiz / maxQ) * cw;
      var grd = ctx.createLinearGradient(padL, 0, padL + bw, 0);
      grd.addColorStop(0, p.color + '44');
      grd.addColorStop(1, p.color);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.roundRect(padL, y, bw, bh, 3);
      ctx.fill();
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      var prefix = i < 3 ? medals[i] + ' ' : (i + 1) + '. ';
      ctx.fillText(prefix + p.icon + ' ' + p.name, padL - 8, y + bh / 2 + 4);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(p.quiz + ' Q', padL + bw + 6, y + bh / 2 + 3);
    });
  }

  /* ================================================================
   * 25. NEW: VERSION TIMELINE (Canvas)
   * ================================================================ */
  var vtimeline = el('div', { className: 'v15-vtimeline section-reveal', id: 'v15-vtimeline' });
  vtimeline.innerHTML = '<h2>Version Timeline</h2><p class="v15-vtimeline-sub">Release history timeline across the NEXTERA+PRISM ecosystem</p>';
  var vtCanvas = el('canvas', { className: 'v15-vtimeline-canvas', width: 700, height: 260 });
  var vtCard = el('div', { className: 'v15-vtimeline-card' });
  vtCard.appendChild(vtCanvas);
  vtimeline.appendChild(vtCard);

  function drawVTimeline() {
    var ctx = vtCanvas.getContext('2d');
    var W = 700, H = 260;
    ctx.clearRect(0, 0, W, H);
    var padL = 30, padR = 30, padT = 30, padB = 40;
    var cw = W - padL - padR, ch = H - padT - padB;
    ctx.beginPath();
    ctx.moveTo(padL, H - padB);
    ctx.lineTo(W - padR, H - padB);
    ctx.strokeStyle = 'rgba(99,102,241,.15)';
    ctx.lineWidth = 2;
    ctx.stroke();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
    months.forEach(function(m, i) {
      var x = padL + (i / (months.length - 1)) * cw;
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(m + ' 2026', x, H - padB + 18);
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, H - padB);
      ctx.strokeStyle = 'rgba(99,102,241,.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    PROJECTS.forEach(function(p, i) {
      var row = i;
      var y = padT + (row / PROJECTS.length) * ch;
      var month = parseInt(p.updated.split('-')[1]);
      var day = parseInt(p.updated.split('-')[2]);
      var x = padL + ((month - 1 + day / 31) / 6) * cw;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.fillStyle = p.color;
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(p.icon + ' ' + p.name + ' ' + p.ver, x + 10, y + 3);
    });
  }

  /* ================================================================
   * 26. NEW: PERFORMANCE SCORECARD (Canvas)
   * ================================================================ */
  var perfcard = el('div', { className: 'v15-perfcard section-reveal', id: 'v15-perfcard' });
  perfcard.innerHTML = '<h2>Performance Scorecard</h2><p class="v15-perfcard-sub">Composite performance scores across all projects</p>';
  var pfCanvas = el('canvas', { className: 'v15-perfcard-canvas', width: 600, height: 340 });
  var pfCard = el('div', { className: 'v15-perfcard-card' });
  pfCard.appendChild(pfCanvas);
  perfcard.appendChild(pfCard);

  function drawPerfCard() {
    var ctx = pfCanvas.getContext('2d');
    var W = 600, H = 340;
    ctx.clearRect(0, 0, W, H);
    var padL = 100, padR = 60, padT = 30, padB = 30;
    var cw = W - padL - padR, ch = H - padT - padB;
    var cats = ['UI/UX', 'Performance', 'Features', 'Content', 'Audio'];
    var bh = (ch - cats.length * 6) / cats.length;
    cats.forEach(function(cat, ci) {
      var y = padT + ci * (bh + 6);
      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(cat, padL - 10, y + bh / 2 + 4);
      ctx.fillStyle = 'rgba(99,102,241,.06)';
      ctx.fillRect(padL, y, cw, bh);
      var scores = [92, 88, 95, 90, 86];
      var score = scores[ci];
      var bw = (score / 100) * cw;
      var colors = ['#6366f1', '#22d3ee', '#4ade80', '#f59e0b', '#a78bfa'];
      var grd = ctx.createLinearGradient(padL, 0, padL + bw, 0);
      grd.addColorStop(0, colors[ci] + '44');
      grd.addColorStop(1, colors[ci]);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.roundRect(padL, y + 2, bw, bh - 4, 4);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(score + '/100', padL + bw - 8, y + bh / 2 + 4);
      var grade = score >= 90 ? 'S' : score >= 80 ? 'A' : 'B';
      var gc = grade === 'S' ? '#22c55e' : '#6366f1';
      ctx.fillStyle = gc;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(grade, W - padR + 15, y + bh / 2 + 5);
    });
    ctx.fillStyle = 'rgba(148,163,184,.4)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    for (var g = 0; g <= 4; g++) {
      var x = padL + (g / 4) * cw;
      ctx.fillText((g * 25) + '', x, H - padB + 16);
    }
  }

  /* ================================================================
   * 27. NEW: CODE QUALITY GAUGE (Canvas)
   * ================================================================ */
  var gauge = el('div', { className: 'v15-gauge section-reveal', id: 'v15-gauge' });
  gauge.innerHTML = '<h2>Code Quality Gauge</h2><p class="v15-gauge-sub">Aggregate code quality score based on structure, naming, and consistency</p>';
  var gaugeCanvas = el('canvas', { className: 'v15-gauge-canvas', width: 400, height: 250 });
  var gaugeCard = el('div', { className: 'v15-gauge-card' });
  gaugeCard.appendChild(gaugeCanvas);
  gauge.appendChild(gaugeCard);

  function drawGauge() {
    var ctx = gaugeCanvas.getContext('2d');
    var W = 400, H = 250, cx = W / 2, cy = H - 40;
    ctx.clearRect(0, 0, W, H);
    var R = 130;
    var startA = Math.PI;
    var endA = Math.PI * 2;
    var segments = [
      { pct: 0.20, color: '#f43f5e', label: 'C' },
      { pct: 0.20, color: '#f59e0b', label: 'B' },
      { pct: 0.30, color: '#6366f1', label: 'A' },
      { pct: 0.30, color: '#22c55e', label: 'S' }
    ];
    var a = startA;
    segments.forEach(function(s) {
      var sweep = s.pct * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, R, a, a + sweep);
      ctx.arc(cx, cy, R - 30, a + sweep, a, true);
      ctx.closePath();
      ctx.fillStyle = s.color + '44';
      ctx.fill();
      ctx.strokeStyle = s.color + '88';
      ctx.lineWidth = 1;
      ctx.stroke();
      var mid = a + sweep / 2;
      ctx.fillStyle = s.color;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.label, cx + Math.cos(mid) * (R - 15), cy + Math.sin(mid) * (R - 15));
      a += sweep;
    });
    var score = 91;
    var needleA = startA + (score / 100) * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(needleA) * (R - 35), cy + Math.sin(needleA) * (R - 35));
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(score + '', cx, cy - 30);
    ctx.fillStyle = 'rgba(148,163,184,.6)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Quality Score', cx, cy - 12);
  }

  /* ================================================================
   * 28. NEW: TECH SYNERGY NETWORK (Canvas)
   * ================================================================ */
  var synergy = el('div', { className: 'v15-synergy section-reveal', id: 'v15-synergy' });
  synergy.innerHTML = '<h2>Tech Synergy Network</h2><p class="v15-synergy-sub">How technologies combine and reinforce each other across projects</p>';
  var synCanvas = el('canvas', { className: 'v15-synergy-canvas', width: 460, height: 460 });
  var synCard = el('div', { className: 'v15-synergy-card' });
  synCard.appendChild(synCanvas);
  synergy.appendChild(synCard);

  function drawSynergy() {
    var ctx = synCanvas.getContext('2d');
    var W = 460, H = 460, cx = W / 2, cy = H / 2;
    ctx.clearRect(0, 0, W, H);
    var nodes = [
      { name: 'Canvas 2D', x: cx, y: cy - 100, r: 22, color: '#6366f1', links: ['Web Audio','Three.js','PWA','Touch'] },
      { name: 'Three.js', x: cx - 130, y: cy - 30, r: 20, color: '#22d3ee', links: ['Canvas 2D','Web Audio','WebGL'] },
      { name: 'Web Audio', x: cx + 130, y: cy - 30, r: 19, color: '#a78bfa', links: ['Canvas 2D','Tone.js','Three.js'] },
      { name: 'Tone.js', x: cx + 100, y: cy + 100, r: 15, color: '#818cf8', links: ['Web Audio','Canvas 2D'] },
      { name: 'Leaflet', x: cx - 100, y: cy + 100, r: 14, color: '#4ade80', links: ['PWA','OSRM'] },
      { name: 'PWA', x: cx, y: cy + 140, r: 17, color: '#34d399', links: ['Canvas 2D','Leaflet'] },
      { name: 'WebGL', x: cx + 150, y: cy + 50, r: 13, color: '#f472b6', links: ['Three.js','Canvas 2D'] },
      { name: 'Touch', x: cx - 150, y: cy + 50, r: 13, color: '#fb923c', links: ['Canvas 2D','Three.js'] },
      { name: 'OSRM', x: cx - 50, y: cy + 160, r: 11, color: '#2dd4bf', links: ['Leaflet'] }
    ];
    nodes.forEach(function(n) {
      n.links.forEach(function(lName) {
        var target = nodes.find(function(t){ return t.name === lName; });
        if (!target) return;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        var midX = (n.x + target.x) / 2;
        var midY = (n.y + target.y) / 2 - 15;
        ctx.quadraticCurveTo(midX, midY, target.x, target.y);
        ctx.strokeStyle = n.color + '20';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
    nodes.forEach(function(n) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '22';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = n.color;
      ctx.font = n.r >= 17 ? 'bold 10px sans-serif' : '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.name, n.x, n.y);
    });
  }

  /* ================================================================
   * 29. SFX ENGINE
   * ================================================================ */
  var audioCtx = null;
  function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  function playSfx(freq, type, dur) {
    try {
      initAudio();
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = type || 'sine';
      o.frequency.value = freq || 440;
      g.gain.value = 0.08;
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (dur || 0.15));
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + (dur || 0.15));
    } catch (e) {}
  }
  var SFX = {
    navigate: function () { playSfx(880, 'sine', 0.08); },
    open: function () { playSfx(660, 'triangle', 0.12); },
    close: function () { playSfx(330, 'sine', 0.1); },
    compare: function () { playSfx(550, 'square', 0.1); },
    achieve: function () { playSfx(1047, 'sine', 0.15); playSfx(1319, 'sine', 0.12); },
    toast: function () { playSfx(784, 'triangle', 0.1); },
    scroll: function () { playSfx(440, 'sine', 0.05); },
    spotlight: function () { playSfx(698, 'sine', 0.1); },
    feed: function () { playSfx(523, 'triangle', 0.08); },
    sprint: function () { playSfx(587, 'sine', 0.1); },
    dna: function () { playSfx(932, 'triangle', 0.12); },
    radar: function () { playSfx(622, 'sine', 0.1); },
    health: function () { playSfx(740, 'triangle', 0.08); },
    heatmap: function () { playSfx(494, 'sine', 0.1); },
    streak: function () { playSfx(1175, 'sine', 0.1); },
    growth: function () { playSfx(831, 'triangle', 0.1); },
    changelog: function () { playSfx(659, 'sine', 0.08); },
    evolution: function () { playSfx(988, 'triangle', 0.12); },
    metrics: function () { playSfx(784, 'sine', 0.08); },
    wall: function () { playSfx(880, 'sine', 0.1); },
    techradar: function () { playSfx(698, 'triangle', 0.12); },
    banner: function () { playSfx(1047, 'triangle', 0.08); },
    complexity: function () { playSfx(554, 'sine', 0.1); },
    compare_sfx: function () { playSfx(659, 'square', 0.08); },
    velocity: function () { playSfx(740, 'sine', 0.12); },
    galaxy: function () { playSfx(880, 'triangle', 0.1); },
    treemap: function () { playSfx(523, 'sine', 0.12); },
    quizboard: function () { playSfx(660, 'triangle', 0.1); },
    vtimeline: function () { playSfx(784, 'sine', 0.1); },
    perfcard: function () { playSfx(932, 'triangle', 0.08); },
    gauge: function () { playSfx(1047, 'sine', 0.12); },
    synergy_sfx: function () { playSfx(698, 'sine', 0.1); }
  };

  /* ================================================================
   * 30. KEYBOARD SHORTCUTS
   * ================================================================ */
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (!e.shiftKey) return;
    var map = {
      'D': ['v15-dna', SFX.dna],
      'T': ['v15-techradar', SFX.techradar],
      'F': ['v15-feed', SFX.feed],
      'A': ['v15-achieve', SFX.wall],
      'B': ['v15-sprint', SFX.sprint],
      'E': ['v15-evolution', SFX.evolution],
      'R': ['v15-radar', SFX.complexity],
      'C': ['v15-changelog', SFX.changelog],
      'S': ['v15-streak', SFX.streak],
      'G': ['v15-growth', SFX.growth],
      'H': ['v15-health', SFX.health],
      'M': ['v15-heatmap', SFX.heatmap],
      'V': ['v15-velocity', SFX.velocity],
      'X': ['v15-galaxy', SFX.galaxy],
      'I': ['v15-treemap', SFX.treemap],
      'Q': ['v15-quizboard', SFX.quizboard],
      'L': ['v15-vtimeline', SFX.vtimeline],
      'P': ['v15-perfcard', SFX.perfcard],
      'U': ['v15-gauge', SFX.gauge],
      'N': ['v15-synergy', SFX.synergy_sfx]
    };
    var entry = map[e.key.toUpperCase()];
    if (entry) {
      e.preventDefault();
      var target = document.getElementById(entry[0]);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      entry[1]();
    }
  });

  /* ================================================================
   * 31. SECTION INSERTION
   * ================================================================ */
  function insertAfter(ref, newEl) {
    if (ref && ref.parentNode) ref.parentNode.insertBefore(newEl, ref.nextSibling);
  }
  var projectsSection = document.getElementById('projects');

  if (projectsSection) {
    insertAfter(projectsSection, synergy);
    insertAfter(projectsSection, gauge);
    insertAfter(projectsSection, perfcard);
    insertAfter(projectsSection, vtimeline);
    insertAfter(projectsSection, quizboard);
    insertAfter(projectsSection, treemap);
    insertAfter(projectsSection, galaxy);
    insertAfter(projectsSection, velocity);
    insertAfter(projectsSection, streak);
    insertAfter(projectsSection, growth);
    insertAfter(projectsSection, radar);
    insertAfter(projectsSection, evolution);
    insertAfter(projectsSection, changelog);
    insertAfter(projectsSection, sprint);
    insertAfter(projectsSection, achieve);
    insertAfter(projectsSection, feed);
    insertAfter(projectsSection, techradar);
    insertAfter(projectsSection, dna);
    insertAfter(projectsSection, heatmap);
    insertAfter(projectsSection, health);
    insertAfter(projectsSection, metrics);
    insertAfter(projectsSection, spotlight);
    insertAfter(projectsSection, banner);
  }

  /* ================================================================
   * 32. INTERSECTION OBSERVER FOR ANIMATIONS
   * ================================================================ */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        var bars = e.target.querySelectorAll('.h-fill[data-w]');
        bars.forEach(function (b) { b.style.width = b.dataset.w; });
        var vbars = e.target.querySelectorAll('.v15-bar[data-h]');
        vbars.forEach(function (b) { setTimeout(function () { b.style.height = b.dataset.h; }, 100); });
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  $$('.section-reveal').forEach(function (s) { revealObs.observe(s); });

  /* ================================================================
   * 33. CANVAS DRAW ON VISIBLE
   * ================================================================ */
  var canvasDrawn = {};
  var canvasObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = e.target.id;
        if (!canvasDrawn[id]) {
          canvasDrawn[id] = true;
          if (id === 'v15-dna') drawDNA();
          if (id === 'v15-techradar') drawTechRadar();
          if (id === 'v15-evolution') drawEvolution();
          if (id === 'v15-radar') drawRadar();
          if (id === 'v15-growth') drawDonut();
          if (id === 'v15-velocity') drawVelocity();
          if (id === 'v15-galaxy') drawGalaxy();
          if (id === 'v15-treemap') drawTreemap();
          if (id === 'v15-quizboard') drawQuizBoard();
          if (id === 'v15-vtimeline') drawVTimeline();
          if (id === 'v15-perfcard') drawPerfCard();
          if (id === 'v15-gauge') drawGauge();
          if (id === 'v15-synergy') drawSynergy();
        }
      }
    });
  }, { threshold: 0.1 });
  [dna, techradar, evolution, radar, growth, velocity, galaxy, treemap, quizboard, vtimeline, perfcard, gauge, synergy].forEach(function (s) { canvasObs.observe(s); });

  /* ================================================================
   * 34. COMPARE BUTTONS ON CARDS
   * ================================================================ */
  setTimeout(function () {
    $$('.card[data-cat="prism"]').forEach(function (card) {
      var title = card.querySelector('.card-title');
      if (!title) return;
      var name = title.textContent.trim();
      var proj = PROJECTS.find(function (p) { return name.indexOf(p.name) >= 0 || p.name.indexOf(name) >= 0; });
      if (!proj) return;
      var btn = el('button', { className: 'v15-compare-btn', textContent: 'Compare' });
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        btn.classList.toggle('selected');
        toggleCompare(proj.name);
        SFX.compare_sfx();
      });
      var thumb = card.querySelector('.card-thumb');
      if (thumb) thumb.style.position = 'relative';
      if (thumb) thumb.appendChild(btn);
    });
  }, 500);

  /* ================================================================
   * 35. SCROLL NAV BAR (bottom)
   * ================================================================ */
  var navBar = el('div', { style: { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '9997', background: 'rgba(10,10,26,.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(99,102,241,.1)', padding: '6px 0', display: 'flex', justifyContent: 'center', gap: '2px', flexWrap: 'nowrap', overflowX: 'auto', transform: 'translateY(100%)', transition: 'transform .3s' } });
  var navItems = [
    { label: 'DNA', id: 'v15-dna', sfx: SFX.dna },
    { label: 'Radar', id: 'v15-techradar', sfx: SFX.techradar },
    { label: 'Feed', id: 'v15-feed', sfx: SFX.feed },
    { label: 'Wall', id: 'v15-achieve', sfx: SFX.wall },
    { label: 'Sprint', id: 'v15-sprint', sfx: SFX.sprint },
    { label: 'LOC', id: 'v15-evolution', sfx: SFX.evolution },
    { label: 'Complex', id: 'v15-radar', sfx: SFX.complexity },
    { label: 'Log', id: 'v15-changelog', sfx: SFX.changelog },
    { label: 'Streak', id: 'v15-streak', sfx: SFX.streak },
    { label: 'Growth', id: 'v15-growth', sfx: SFX.growth },
    { label: 'Health', id: 'v15-health', sfx: SFX.health },
    { label: 'Heat', id: 'v15-heatmap', sfx: SFX.heatmap },
    { label: 'Veloc', id: 'v15-velocity', sfx: SFX.velocity },
    { label: 'Galaxy', id: 'v15-galaxy', sfx: SFX.galaxy },
    { label: 'Tree', id: 'v15-treemap', sfx: SFX.treemap },
    { label: 'Quiz', id: 'v15-quizboard', sfx: SFX.quizboard },
    { label: 'Time', id: 'v15-vtimeline', sfx: SFX.vtimeline },
    { label: 'Perf', id: 'v15-perfcard', sfx: SFX.perfcard },
    { label: 'Gauge', id: 'v15-gauge', sfx: SFX.gauge },
    { label: 'Synrg', id: 'v15-synergy', sfx: SFX.synergy_sfx }
  ];
  navItems.forEach(function (ni) {
    var btn = el('button', { textContent: ni.label, style: { background: 'none', border: '1px solid rgba(99,102,241,.15)', borderRadius: '6px', color: 'var(--text2,#94a3b8)', padding: '5px 8px', fontSize: '10px', fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .2s' } });
    btn.addEventListener('click', function () {
      var t = document.getElementById(ni.id);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ni.sfx();
    });
    btn.addEventListener('mouseenter', function () { btn.style.borderColor = 'rgba(99,102,241,.5)'; btn.style.color = '#6366f1'; });
    btn.addEventListener('mouseleave', function () { btn.style.borderColor = 'rgba(99,102,241,.15)'; btn.style.color = 'var(--text2,#94a3b8)'; });
    navBar.appendChild(btn);
  });
  document.body.appendChild(navBar);
  window.addEventListener('scroll', function () {
    navBar.style.transform = window.scrollY > 600 ? 'translateY(0)' : 'translateY(100%)';
  }, { passive: true });

  /* ================================================================
   * 36. VISIT COUNTER + INITIAL TOAST
   * ================================================================ */
  var visits = parseInt(localStorage.getItem('v15-visits') || '0', 10) + 1;
  localStorage.setItem('v15-visits', '' + visits);
  setTimeout(function () {
    toast('AI Portfolio v15.0', 'New: Version Velocity, Dependency Galaxy, Feature Treemap, Quiz Leaderboard, Version Timeline, Performance Scorecard, Code Quality Gauge, Tech Synergy Network. <strong>164,600+ LOC</strong> across 12 projects.');
    SFX.toast();
  }, 2200);

})();
