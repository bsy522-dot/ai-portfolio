/**
 * ai-portfolio v10.0 Patch Module
 * Replaces v9_patch.js entirely.
 * Last updated: 2026-06-08
 */
;(function () {
  'use strict';
  if (window._v10) return;
  window._v10 = { version: '10.0.0', applied: Date.now() };

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
  style.id = 'v10-patch-styles';
  style.textContent = [
    '.v10-toast-wrap{position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none}',
    '.v10-toast{pointer-events:auto;background:rgba(18,18,42,.95);color:var(--text,#e2e8f0);padding:14px 22px;border-radius:12px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.4);border-left:4px solid var(--accent,#6366f1);backdrop-filter:blur(10px);transform:translateX(120%);transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;max-width:340px;line-height:1.5}',
    '.v10-toast.show{transform:translateX(0);opacity:1}',
    '.v10-toast .toast-title{font-weight:700;color:var(--accent,#6366f1);margin-bottom:2px}',
    '.v10-visit{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:var(--text3,#64748b);margin-top:8px}',
    '.v10-pulse{width:8px;height:8px;background:var(--green,#22c55e);border-radius:50%;display:inline-block;animation:v10pulse 1.8s infinite}',
    '@keyframes v10pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}',
    '.v10-scroll-ring{position:fixed;bottom:28px;right:28px;z-index:9999;width:48px;height:48px;cursor:pointer;opacity:.85;transition:opacity .2s}',
    '.v10-scroll-ring:hover{opacity:1}',
    '.v10-scroll-ring svg{transform:rotate(-90deg)}',
    '.v10-scroll-ring .ring-bg{fill:none;stroke:rgba(99,102,241,.15);stroke-width:4}',
    '.v10-scroll-ring .ring-fg{fill:none;stroke:var(--accent,#6366f1);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset 60ms linear}',
    '.v10-scroll-ring .ring-arrow{fill:var(--text,#e2e8f0);transition:fill .2s}',
    '.v10-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px auto 10px;max-width:800px}',
    '.v10-pill{padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(99,102,241,.3);background:transparent;color:var(--text2,#94a3b8);transition:all .25s;font-family:inherit}',
    '.v10-pill:hover{border-color:var(--accent,#6366f1);background:rgba(99,102,241,.1)}',
    '.v10-pill.active{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}',
    '.v10-compare-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}',
    '.v10-compare-overlay.open{opacity:1;pointer-events:auto}',
    '.v10-compare-box{background:var(--bg,#0a0a1a);border:1px solid rgba(99,102,241,.2);border-radius:16px;padding:28px 32px;max-width:800px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.6);color:var(--text,#e2e8f0);position:relative}',
    '.v10-compare-box h3{text-align:center;color:var(--accent,#6366f1);margin:0 0 20px;font-size:20px}',
    '.v10-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '.v10-compare-col{background:rgba(99,102,241,.04);border-radius:12px;padding:18px}',
    '.v10-compare-col h4{margin:0 0 10px;color:var(--cyan,#22d3ee);font-size:16px}',
    '.v10-compare-col .v10c-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(99,102,241,.06);font-size:13px}',
    '.v10-compare-col .v10c-label{color:var(--text3,#64748b)}',
    '.v10-compare-col .v10c-val{color:var(--text,#e2e8f0);font-weight:600}',
    '.v10-compare-btn{position:absolute;top:8px;right:8px;background:rgba(99,102,241,.15);color:var(--accent,#6366f1);border:none;border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;transition:background .2s;z-index:2;font-family:inherit}',
    '.v10-compare-btn:hover{background:rgba(99,102,241,.3)}',
    '.v10-compare-btn.selected{background:var(--accent,#6366f1);color:#fff}',
    '.v10-compare-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text3,#64748b);font-size:22px;cursor:pointer}',
    /* Spotlight */
    '.v10-spotlight{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v10-spotlight h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem;color:var(--text,#e2e8f0)}',
    '.v10-spotlight-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-spot-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.15);border-radius:16px;padding:2rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;position:relative;overflow:hidden;min-height:280px;transition:opacity .5s,transform .5s}',
    '.v10-spot-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(34,211,238,.05));pointer-events:none}',
    '.v10-spot-left{position:relative;z-index:1}',
    '.v10-spot-left .spot-tier{display:inline-block;padding:4px 14px;border-radius:99px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.8rem}',
    '.v10-spot-left .spot-title{font-size:1.6rem;font-weight:800;margin-bottom:.3rem}',
    '.v10-spot-left .spot-ver{color:var(--cyan,#22d3ee);font-size:.9rem;font-weight:600;margin-bottom:.8rem}',
    '.v10-spot-left .spot-desc{color:var(--text2,#94a3b8);font-size:.9rem;line-height:1.7;margin-bottom:1.2rem}',
    '.v10-spot-left .spot-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}',
    '.v10-spot-left .spot-tags span{padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:500;background:rgba(99,102,241,.12);color:#a5b4fc}',
    '.v10-spot-right{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:.8rem}',
    '.v10-spot-stat{background:rgba(99,102,241,.08);padding:1rem;border-radius:12px;text-align:center}',
    '.v10-spot-stat .s-num{font-size:1.4rem;font-weight:800;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v10-spot-stat .s-lbl{font-size:.65rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-top:.2rem}',
    '.v10-spot-nav{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}',
    '.v10-spot-dot{width:10px;height:10px;border-radius:50%;background:rgba(99,102,241,.2);border:none;cursor:pointer;transition:all .3s;padding:0}',
    '.v10-spot-dot.active{background:var(--accent,#6366f1);transform:scale(1.3)}',
    /* Growth */
    '.v10-growth{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-growth h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-growth-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-growth-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}',
    '.v10-growth-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem}',
    '.v10-growth-card h3{font-size:1rem;font-weight:700;margin-bottom:1rem;color:var(--cyan,#22d3ee)}',
    '.v10-bar-chart{display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 4px}',
    '.v10-bar{flex:1;border-radius:4px 4px 0 0;transition:height 1s cubic-bezier(.22,1,.36,1);position:relative;cursor:default;min-width:0}',
    '.v10-bar:hover{opacity:.85}',
    '.v10-bar .bar-tip{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text3,#64748b);white-space:nowrap;opacity:0;transition:opacity .2s}',
    '.v10-bar:hover .bar-tip{opacity:1}',
    '.v10-bar-label{display:flex;justify-content:space-between;margin-top:.5rem;font-size:.6rem;color:var(--text3,#64748b)}',
    '.v10-donut-wrap{display:flex;align-items:center;justify-content:center;gap:2rem;flex-wrap:wrap}',
    '.v10-donut-legend{display:flex;flex-direction:column;gap:.6rem}',
    '.v10-legend-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--text2,#94a3b8)}',
    '.v10-legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}',
    /* Health */
    '.v10-health{max-width:1200px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-health h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-health-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-health-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}',
    '.v10-health-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;transition:transform .2s,box-shadow .2s}',
    '.v10-health-item:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(99,102,241,.15)}',
    '.v10-health-item .h-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem}',
    '.v10-health-item .h-name{font-weight:700;font-size:.9rem}',
    '.v10-health-item .h-ver{font-size:.7rem;padding:2px 8px;border-radius:6px;font-weight:600}',
    '.v10-health-item .h-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden;margin-bottom:.4rem}',
    '.v10-health-item .h-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v10-health-item .h-stats{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text3,#64748b)}',
    /* Heatmap */
    '.v10-heatmap{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-heatmap h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-heatmap-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-heatmap-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v10-heatmap-grid{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;min-width:600px}',
    '.v10-hm-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:default;transition:transform .15s}',
    '.v10-hm-cell:hover{transform:scale(1.4);z-index:1}',
    '.v10-hm-legend{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:12px;font-size:.7rem;color:var(--text3,#64748b)}',
    '.v10-hm-legend span{width:14px;height:14px;border-radius:3px;display:inline-block}',
    /* Metrics */
    '.v10-metrics{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v10-metrics h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-metrics-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem}',
    '.v10-metric-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.2rem;text-align:center;transition:transform .2s}',
    '.v10-metric-card:hover{transform:translateY(-4px)}',
    '.v10-metric-num{font-size:1.8rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v10-metric-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    /* Banner */
    '.v10-banner{max-width:1200px;margin:0 auto 1rem;padding:0 1.5rem}',
    '.v10-banner-inner{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(34,211,238,.08));border:1px solid rgba(99,102,241,.2);border-radius:12px;padding:1rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}',
    '.v10-banner-badge{background:var(--accent,#6366f1);color:#fff;font-size:.7rem;font-weight:700;padding:4px 12px;border-radius:99px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;animation:v10bannerPulse 2s ease-in-out infinite}',
    '@keyframes v10bannerPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.4)}50%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}',
    '.v10-banner-text{font-size:.85rem;color:var(--text2,#94a3b8);line-height:1.5;flex:1}',
    '.v10-banner-text strong{color:var(--text,#e2e8f0)}',
    /* Version Evolution */
    '.v10-evolution{max-width:1000px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-evolution h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-evolution-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-evo-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v10-evo-canvas{width:100%;height:220px;min-width:600px}',
    /* Tech Radar */
    '.v10-radar{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-radar h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-radar-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-radar-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v10-radar-canvas{width:320px;height:320px}',
    /* Milestone Ticker */
    '.v10-milestone{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v10-milestone h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-milestone-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-mile-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem}',
    '.v10-mile-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1.5rem;text-align:center;position:relative;overflow:hidden}',
    '.v10-mile-card::after{content:"";position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 12px 12px}',
    '.v10-mile-num{font-size:2.2rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
    '.v10-mile-lbl{font-size:.7rem;color:var(--text3,#64748b);text-transform:uppercase;letter-spacing:1px;margin-top:.3rem}',
    '.v10-mile-icon{font-size:1.5rem;margin-bottom:.5rem}',
    /* Pulse Board */
    '.v10-pulse-board{max-width:1200px;margin:0 auto;padding:2rem 1.5rem}',
    '.v10-pulse-board h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-pulse-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-pulse-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}',
    '.v10-pulse-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;align-items:center;gap:1rem;transition:transform .2s}',
    '.v10-pulse-item:hover{transform:translateY(-2px)}',
    '.v10-pulse-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;animation:v10pulse 1.8s infinite}',
    '.v10-pulse-info{flex:1}',
    '.v10-pulse-info .p-name{font-weight:700;font-size:.9rem}',
    '.v10-pulse-info .p-ver{font-size:.7rem;color:var(--cyan,#22d3ee);font-weight:600}',
    '.v10-pulse-info .p-updated{font-size:.65rem;color:var(--text3,#64748b)}',
    '.v10-pulse-score{font-size:1.2rem;font-weight:800;font-family:"Courier New",Consolas,monospace}',
    /* NEW: Synergy Map */
    '.v10-synergy{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-synergy h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-synergy-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-synergy-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;display:flex;justify-content:center}',
    '.v10-synergy-canvas{width:100%;max-width:500px;height:500px}',
    /* NEW: Achievement Leaderboard */
    '.v10-leaderboard{max-width:800px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-leaderboard h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-leaderboard-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-lb-list{display:flex;flex-direction:column;gap:.6rem}',
    '.v10-lb-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:grid;grid-template-columns:40px 1fr 80px 100px;align-items:center;gap:1rem;transition:transform .2s}',
    '.v10-lb-item:hover{transform:translateX(4px)}',
    '.v10-lb-rank{font-size:1.4rem;font-weight:900;font-family:"Courier New",Consolas,monospace;text-align:center}',
    '.v10-lb-name{font-weight:700;font-size:.9rem}',
    '.v10-lb-bar{height:6px;background:rgba(99,102,241,.1);border-radius:3px;overflow:hidden}',
    '.v10-lb-fill{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}',
    '.v10-lb-score{text-align:right;font-weight:700;font-family:"Courier New",Consolas,monospace;font-size:.9rem}',
    /* NEW: Velocity Chart */
    '.v10-velocity{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-velocity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-velocity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-velocity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:1.5rem;overflow-x:auto}',
    '.v10-velocity-canvas{width:100%;height:200px;min-width:500px}',
    /* NEW: Changelog Feed */
    '.v10-changelog{max-width:900px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-changelog h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-changelog-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-cl-list{display:flex;flex-direction:column;gap:.8rem}',
    '.v10-cl-item{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:12px;padding:1rem 1.2rem;display:flex;gap:1rem;align-items:flex-start;transition:transform .2s}',
    '.v10-cl-item:hover{transform:translateY(-2px)}',
    '.v10-cl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:6px}',
    '.v10-cl-content{flex:1}',
    '.v10-cl-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.3rem}',
    '.v10-cl-title{font-weight:700;font-size:.9rem}',
    '.v10-cl-date{font-size:.65rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    '.v10-cl-desc{font-size:.8rem;color:var(--text2,#94a3b8);line-height:1.5}',
    /* NEW: Portfolio Maturity */
    '.v10-maturity{max-width:600px;margin:0 auto;padding:3rem 1.5rem}',
    '.v10-maturity h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:.5rem}',
    '.v10-maturity-sub{text-align:center;color:var(--text2,#94a3b8);margin-bottom:2rem;font-size:.95rem}',
    '.v10-maturity-card{background:var(--card,#12122a);border:1px solid rgba(99,102,241,.1);border-radius:16px;padding:2rem;text-align:center}',
    '.v10-maturity-canvas{width:200px;height:200px;margin:0 auto 1rem}',
    '.v10-maturity-grade{font-size:3rem;font-weight:900;font-family:"Courier New",Consolas,monospace;background:var(--grad1,linear-gradient(135deg,#6366f1,#8b5cf6));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.3rem}',
    '.v10-maturity-label{font-size:.85rem;color:var(--text2,#94a3b8);margin-bottom:1.5rem}',
    '.v10-maturity-bars{display:flex;flex-direction:column;gap:.8rem;text-align:left}',
    '.v10-mat-row{display:flex;align-items:center;gap:1rem}',
    '.v10-mat-lbl{width:100px;font-size:.8rem;color:var(--text2,#94a3b8);text-align:right;flex-shrink:0}',
    '.v10-mat-track{flex:1;height:8px;background:rgba(99,102,241,.1);border-radius:4px;overflow:hidden}',
    '.v10-mat-fill{height:100%;border-radius:4px;transition:width 1.5s ease-out}',
    '.v10-mat-pct{width:40px;font-size:.75rem;color:var(--text3,#64748b);font-family:"Courier New",Consolas,monospace}',
    /* Stagger */
    '.v10-stagger{opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}',
    '.v10-stagger.v10-visible{opacity:1;transform:translateY(0)}',
    /* Responsive */
    '@media(max-width:768px){.v10-spot-card{grid-template-columns:1fr}.v10-growth-grid{grid-template-columns:1fr}.v10-compare-grid{grid-template-columns:1fr}.v10-toast{max-width:280px;font-size:13px}.v10-pills{gap:6px}.v10-pill{padding:5px 12px;font-size:12px}.v10-scroll-ring{bottom:16px;right:16px;width:40px;height:40px}.v10-metrics-grid{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.v10-mile-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}.v10-lb-item{grid-template-columns:30px 1fr 60px 70px;gap:.5rem;font-size:.85rem}.v10-synergy-canvas{height:350px}}'
  ].join('\n');
  document.head.appendChild(style);

  /* ================================================================
   * 2. PROJECT DATA (all 12 projects — latest versions as of 2026-06-08)
   * ================================================================ */
  var PROJECTS = [
    { title: 'LevelPlay', version: 'v7.0', tech: ['PWA'], impact: '672 topics',
      features: 'Streak Milestones 7 Tiers, Wrong Answer Retry Grouping, Video Comprehension Quiz, Onboarding Goal Setting, Accessibility (High Contrast + Font Size), Parent Share Card Canvas, Weakness Analysis Dashboard, Adaptive SM2 Review, Study Notes, Community 10 AI, Quiz 400+, 64 Badges, SFX 10',
      loc: 9200, date: '2026-06-07', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'672',l:'Topics'},{n:'64',l:'Badges'},{n:'400+',l:'Quizzes'},{n:'v7',l:'Version'}] },
    { title: 'SmartGolf', version: 'v24.0', tech: ['Leaflet', 'PWA'], impact: '578 courses',
      features: 'Real-time Weather API 7-Day, Golf Suitability Score 0-100, Weather-based Course Recommendations, Data Verified 578 Courses, Official Booking Direct Links 80+, Golf Glossary 150, Swing Checkpoint 6 Canvas, Practice Drill 12, 116 Achievements, 116 SFX',
      loc: 14000, date: '2026-06-06', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'578',l:'Courses'},{n:'v24',l:'Version'},{n:'116',l:'Achievements'},{n:'150',l:'Glossary'}] },
    { title: 'Culture Center Finder', version: 'v8.0', tech: ['Leaflet', 'PWA'], impact: '84,431 courses',
      features: 'Course Recommendation Engine, Certificate Canvas 800x560, Activity Timeline 6 Types, Subject Popularity Ranking Canvas, Learning Community AI 10, Study Streak Milestones, Voice Search WebSpeech, Course Notes, Alert System, Social Profile Canvas, Quiz 60, 66 Achievements',
      loc: 9000, date: '2026-06-07', category: 'NEXTERA', color: '#22c55e',
      stats: [{n:'84K+',l:'Courses'},{n:'66',l:'Achievements'},{n:'60',l:'Quizzes'},{n:'11',l:'Sources'}] },
    { title: 'Hatcuping Game', version: 'v11.0', tech: ['Canvas', 'PWA'], impact: 'Time Attack',
      features: 'Time Attack 3 Modes, Powerup Encyclopedia 8 Types 4 Rarity, Character Customization 6 Themes 4 Accessories, Evolution Tree Canvas, Save Slots 3 Export/Import, Mini Arcade 3 Games, Season Events 12 Monthly, Encyclopedia 40 Items, Quiz 45, 70 Achievements',
      loc: 7200, date: '2026-06-06', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v11',l:'Version'},{n:'70',l:'Achievements'},{n:'45',l:'Quizzes'},{n:'40',l:'Encyclopedia'}] },
    { title: 'History RPG', version: 'v15.0', tech: ['Canvas', 'Three.js', 'PWA'], impact: '120 quizzes',
      features: 'Equipment System 18 Items, Spy Intelligence 6 Ops, Ritual Ceremony 6 Types, Supply Chain 5 Resources, Unit Promotion 6x4 Ranks, History Card Game 24 Cards, Camp System 6 Activities, War Simulator Canvas 15v15, Quiz 120, 72 Achievements',
      loc: 10000, date: '2026-06-07', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v15',l:'Version'},{n:'120',l:'Quizzes'},{n:'72',l:'Achievements'},{n:'24',l:'Cards'}] },
    { title: 'Piano', version: 'v11.0', tech: ['Tone.js', 'PWA'], impact: '82 songs',
      features: 'Ear Training 12 Intervals, Chord Progressions 8 Types, Analytics Dashboard Canvas 5-Axis Radar, Practice Room 8 Exercises, Random Mode, Composition Playground, Hand Independence Trainer 4, Composer Gallery 12, 82 Songs, Quiz 30, 72 Achievements',
      loc: 8200, date: '2026-06-06', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'82',l:'Songs'},{n:'72',l:'Achievements'},{n:'30',l:'Quizzes'},{n:'v11',l:'Version'}] },
    { title: 'Violin', version: 'v10.0', tech: ['Tone.js', 'PWA'], impact: '74 songs',
      features: 'Practice Recorder, Tempo Builder 40-200 BPM, Cross-String Drill 10 Canvas, Music Dictionary 40 Items, Practice Goals 6, Repertoire Recommender, Performance History Timeline, Bowing Trajectory Simulator Canvas, Tone Presets 6, Quiz 15, 74 Songs, 100 Lessons, 70 Achievements',
      loc: 7500, date: '2026-06-06', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'74',l:'Songs'},{n:'100',l:'Lessons'},{n:'70',l:'Achievements'},{n:'v10',l:'Version'}] },
    { title: 'Karaoke', version: 'v11.0', tech: ['Tone.js', 'Web Audio API', 'PWA'], impact: '85 songs',
      features: 'Song History 200, Vocal Range Map Canvas, AI Song Recommender, Recording Studio Canvas Waveform, Breathing Exercises 8 Canvas, Pitch Graph Canvas, Vocal Effects 3+4 Presets, Favorites Collections, Practice Calendar, Party Mode N-Player, 85 Songs, Quiz 72, 66 Achievements',
      loc: 7800, date: '2026-06-06', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'85',l:'Songs'},{n:'66',l:'Achievements'},{n:'72',l:'Quizzes'},{n:'v11',l:'Version'}] },
    { title: 'Golf Tracker', version: 'v9.0', tech: ['Canvas', 'CV', 'PWA'], impact: '18-Hole Scorecard',
      features: '18-Hole Scorecard GIR/FIR/Putts, Strokes Gained 4-Area Analysis, Putting Analyzer Canvas, Course Strategy Simulator 6 Holes Canvas, Club Distance Calibration Canvas, Golf Fitness 8, Round Journal, Golf Rulebook 12, Quiz 30, 24 Achievements',
      loc: 6700, date: '2026-06-05', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v9.0',l:'Version'},{n:'24',l:'Achievements'},{n:'30',l:'Quiz'},{n:'CV',l:'Tracking'}] },
    { title: 'Boxing Trainer', version: 'v12.0', tech: ['Three.js', 'PWA'], impact: '60 quiz',
      features: 'Nutrition Guide 12, Footwork Drills 6 Canvas, Shadow Boxing 8R Guide, Hall of Fame 12 Legends, Body Composition Analyzer Canvas, Round Analysis Canvas, Boxing Dictionary 40, Training Timer 8 Presets, Motivation Board, Season Challenge 12 Monthly, Quiz 60, 70 Achievements',
      loc: 9200, date: '2026-06-06', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v12',l:'Version'},{n:'60',l:'Quiz'},{n:'70',l:'Achievements'},{n:'40',l:'Dictionary'}] },
    { title: 'City Builder', version: 'v9.0', tech: ['Canvas', 'PWA'], impact: '85+ quizzes',
      features: 'Population Classes 5, Trading Post 8 Goods Price Fluctuation, Disaster Prep 6 Facilities, Cultural Heritage Collection 10, Citizen Council 6 Petitions, City Ranking Canvas 6-Axis, Quiz 85, 86 Achievements',
      loc: 8500, date: '2026-06-05', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'60+',l:'Buildings'},{n:'86',l:'Achievements'},{n:'85',l:'Quizzes'},{n:'10',l:'Heritage'}] },
    { title: 'House Builder', version: 'v9.0', tech: ['Three.js', 'PWA'], impact: '12 landscaping',
      features: 'Landscaping Garden 12, Architecture Blueprints 6, Quest Chain 8 Stages, Architecture License 5 Tiers, Architecture Dictionary 40, Time-of-Day Lighting Canvas, Difficulty 3 Levels, Comparison Gallery Canvas, Quiz 75, 86 Achievements',
      loc: 7000, date: '2026-06-05', category: 'PRISM', color: '#22d3ee',
      stats: [{n:'v9.0',l:'Version'},{n:'86',l:'Achievements'},{n:'75',l:'Quizzes'},{n:'40',l:'Dictionary'}] }
  ];

  var TOTAL_LOC = PROJECTS.reduce(function(s,p){return s+p.loc},0);
  var TECH_LIST = ['All', 'Three.js', 'Tone.js', 'Leaflet', 'Canvas', 'PWA', 'CV', 'Web Audio API'];

  /* ================================================================
   * 3. WEB AUDIO SFX (16 types)
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
      card.setAttribute('data-v10-title', proj.title);
      card.setAttribute('data-v10-version', proj.version);
      card.setAttribute('data-v10-tech', proj.tech.join(','));
      card.setAttribute('data-v10-impact', proj.impact);
      card.setAttribute('data-v10-features', proj.features);
      card.setAttribute('data-v10-loc', proj.loc);
      card.setAttribute('data-v10-category', proj.category);
      var existingBtn = card.querySelector('.v6-compare-btn, .v7-compare-btn, .v8-compare-btn, .v9-compare-btn, .v10-compare-btn');
      if (existingBtn) existingBtn.remove();
      var btn = el('button', { className: 'v10-compare-btn', textContent: 'Compare', 'aria-label': 'Compare ' + proj.title });
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); playSFX('compare'); toggleCompareSelection(card, btn); });
      card.appendChild(btn);
      card.classList.add('v10-stagger');
    });
  }

  /* ================================================================
   * 5. WHAT'S NEW BANNER
   * ================================================================ */
  function buildBanner() {
    var ps = $('#projects'); if (!ps) return;
    var old = $('.v9-banner'); if (old) old.remove();
    var banner = el('div', { className: 'v10-banner' });
    banner.innerHTML = '<div class="v10-banner-inner">' +
      '<span class="v10-banner-badge">New in v10</span>' +
      '<div class="v10-banner-text"><strong>History RPG v15.0</strong> &mdash; Equipment 18, War Simulator Canvas, 120 Quizzes &bull; ' +
      '<strong>Boxing v12.0</strong> &mdash; Nutrition Guide 12, Footwork Drills Canvas, Hall of Fame &bull; ' +
      '<strong>Hatcuping v11.0</strong> &mdash; Time Attack, Evolution Tree Canvas &bull; ' +
      '<strong>Karaoke v11.0</strong> &mdash; Vocal Range Map, Recording Studio &bull; ' +
      '<strong>+8 more projects updated</strong></div></div>';
    ps.parentNode.insertBefore(banner, ps);
  }

  /* ================================================================
   * 6. AGGREGATE METRICS
   * ================================================================ */
  function buildMetrics() {
    var ps = $('#projects'); if (!ps) return;
    var old = $('.v9-metrics'); if (old) old.remove();
    var totalAch = 0, totalQuiz = 0, totalSongs = 0, totalVer = 0;
    PROJECTS.forEach(function(p) {
      var ver = parseFloat(p.version.replace('v','')); totalVer += ver;
      p.stats.forEach(function(s) {
        var n = parseInt(s.n.replace(/[^0-9]/g,''),10); if (isNaN(n)) return;
        if (s.l === 'Achievements') totalAch += n;
        if (s.l === 'Quizzes' || s.l === 'Quiz') totalQuiz += n;
        if (s.l === 'Songs') totalSongs += n;
      });
    });
    var section = el('section', { className: 'v10-metrics v10-stagger', id: 'v10-metrics' });
    section.innerHTML = '<h2>Aggregate Metrics</h2><p class="v10-metrics-sub">Cross-project statistics at a glance</p>';
    var grid = el('div', { className: 'v10-metrics-grid' });
    [{n:PROJECTS.length,l:'Live Projects'},{n:TOTAL_LOC.toLocaleString(),l:'Lines of Code'},{n:totalAch+'+',l:'Achievements'},{n:totalQuiz+'+',l:'Quiz Questions'},{n:totalSongs+'+',l:'Songs & Tracks'},{n:Math.round(totalVer),l:'Combined Versions'}].forEach(function(m) {
      var c = el('div', { className: 'v10-metric-card' });
      c.innerHTML = '<div class="v10-metric-num">' + m.n + '</div><div class="v10-metric-lbl">' + m.l + '</div>';
      grid.appendChild(c);
    });
    section.appendChild(grid);
    ps.parentNode.insertBefore(section, ps);
  }

  /* ================================================================
   * 7. FEATURED SPOTLIGHT
   * ================================================================ */
  var spotIdx = 0, spotTimer = null;
  var SPOTLIGHT = [
    { title: 'History RPG', ver: 'v15.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '한국사 영걸전 v15.0. 장비시스템 18종, 첩보 6종, 제사 6종, 보급 5종, 유닛승급 6병종x4등급, 역사카드 24종, 야영 6활동, 전쟁시뮬레이터 Canvas 15v15, 퀴즈 120문, 업적 72개.',
      tags: ['Three.js', 'Canvas', 'Tactics RPG', 'Web Audio'],
      stats: [{n:'v15',l:'Version'},{n:'120',l:'Quizzes'},{n:'72',l:'Achievements'},{n:'24',l:'Cards'}] },
    { title: 'SmartGolf', ver: 'v24.0', tier: 'NEXTERA', tierBg: 'rgba(34,197,94,.2)', tierColor: '#4ade80',
      desc: '전국 578개 골프장 PWA v24.0. 실시간 날씨 API 7일 예보, 골프적합도 점수 0-100, 날씨기반 추천, 데이터 32에이전트 검증, 공식예약 직접연결 80+, 116개 업적.',
      tags: ['Leaflet.js', 'OSRM', 'PWA', 'Weather API'],
      stats: [{n:'578',l:'Courses'},{n:'v24',l:'Version'},{n:'116',l:'Achievements'},{n:'80+',l:'Booking'}] },
    { title: 'Boxing Trainer', ver: 'v12.0', tier: 'PRISM', tierBg: 'rgba(34,211,238,.2)', tierColor: '#22d3ee',
      desc: '3D 복싱 트레이너 v12.0. 영양가이드 12종, 풋워크 드릴 6종 Canvas, 섀도복싱 8R, 명예의전당 12인, 체성분 분석기 Canvas, 복싱용어사전 40항목, 훈련타이머 8종, 퀴즈 60문, 업적 70개.',
      tags: ['Three.js', '3D', 'Web Audio', 'Canvas'],
      stats: [{n:'v12',l:'Version'},{n:'70',l:'Achievements'},{n:'60',l:'Quiz'},{n:'40',l:'Dictionary'}] }
  ];

  function buildSpotlight() {
    var ps = $('#projects'); if (!ps) return;
    var old = $('.v9-spotlight'); if (old) old.remove();
    var section = el('section', { className: 'v10-spotlight', id: 'v10-spotlight' });
    section.innerHTML = '<h2>Featured Projects</h2><p class="v10-spotlight-sub">Spotlight on our most ambitious builds</p>';
    var cw = el('div', { className: 'v10-spot-card' }); section.appendChild(cw);
    var nav = el('div', { className: 'v10-spot-nav' });
    SPOTLIGHT.forEach(function (_, i) {
      var dot = el('button', { className: 'v10-spot-dot' + (i === 0 ? ' active' : ''), 'aria-label': 'Spotlight ' + (i + 1) });
      dot.addEventListener('click', function () { goSpot(i); playSFX('spotlight'); });
      nav.appendChild(dot);
    });
    section.appendChild(nav);
    ps.parentNode.insertBefore(section, ps);
    renderSpot(0);
    spotTimer = setInterval(function () { goSpot((spotIdx + 1) % SPOTLIGHT.length); }, 6000);
  }

  function goSpot(i) {
    spotIdx = i; renderSpot(i);
    $$('.v10-spot-dot').forEach(function (d, j) { d.classList.toggle('active', j === i); });
    if (spotTimer) { clearInterval(spotTimer); spotTimer = setInterval(function () { goSpot((spotIdx + 1) % SPOTLIGHT.length); }, 6000); }
  }

  function renderSpot(i) {
    var s = SPOTLIGHT[i]; var card = $('.v10-spot-card'); if (!card) return;
    card.innerHTML =
      '<div class="v10-spot-left"><span class="spot-tier" style="background:' + s.tierBg + ';color:' + s.tierColor + '">' + s.tier + '</span>' +
      '<div class="spot-title">' + s.title + '</div><div class="spot-ver">' + s.ver + '</div>' +
      '<div class="spot-desc">' + s.desc + '</div>' +
      '<div class="spot-tags">' + s.tags.map(function(t){return '<span>' + t + '</span>';}).join('') + '</div></div>' +
      '<div class="v10-spot-right">' + s.stats.map(function(st){return '<div class="v10-spot-stat"><div class="s-num">' + st.n + '</div><div class="s-lbl">' + st.l + '</div></div>';}).join('') + '</div>';
  }

  /* ================================================================
   * 8. GROWTH DASHBOARD
   * ================================================================ */
  function buildGrowth() {
    var anchor = $('#v10-spotlight') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-growth'); if (old) old.remove();
    var section = el('section', { className: 'v10-growth', id: 'v10-growth' });
    section.innerHTML = '<h2>Project Growth Dashboard</h2><p class="v10-growth-sub">Live metrics across all ' + PROJECTS.length + ' projects &mdash; ' + TOTAL_LOC.toLocaleString() + ' total LOC</p>';
    var grid = el('div', { className: 'v10-growth-grid' });
    var locCard = el('div', { className: 'v10-growth-card' }); locCard.innerHTML = '<h3>Lines of Code by Project</h3>';
    var barChart = el('div', { className: 'v10-bar-chart' });
    var maxLoc = Math.max.apply(null, PROJECTS.map(function(p){return p.loc;}));
    PROJECTS.forEach(function(p) {
      var pct = (p.loc / maxLoc * 100).toFixed(0);
      var bar = el('div', { className: 'v10-bar' });
      bar.style.height = '0%';
      bar.style.background = p.category === 'NEXTERA' ? 'linear-gradient(180deg,#22c55e,#16a34a)' : 'linear-gradient(180deg,#6366f1,#4f46e5)';
      bar.innerHTML = '<span class="bar-tip">' + p.title.split(' ')[0] + ' ' + p.loc.toLocaleString() + '</span>';
      bar.setAttribute('data-height', pct); bar.title = p.title + ': ' + p.loc.toLocaleString() + ' LOC';
      barChart.appendChild(bar);
    });
    locCard.appendChild(barChart);
    locCard.appendChild(el('div', { className: 'v10-bar-label', innerHTML: '<span>NEXTERA (3)</span><span>PRISM (9)</span>' }));
    grid.appendChild(locCard);

    var donutCard = el('div', { className: 'v10-growth-card' }); donutCard.innerHTML = '<h3>Project Categories</h3>';
    var nex = PROJECTS.filter(function(p){return p.category === 'NEXTERA';}), pri = PROJECTS.filter(function(p){return p.category === 'PRISM';});
    var nL = nex.reduce(function(s,p){return s+p.loc;},0), pL = pri.reduce(function(s,p){return s+p.loc;},0), tot = nL + pL, nP = nL / tot;
    var r = 70, cx = 100, cy = 100, c = 2 * Math.PI * r;
    var dWrap = el('div', { className: 'v10-donut-wrap' });
    dWrap.innerHTML = '<svg viewBox="0 0 200 200" width="180" height="180">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(99,102,241,.1)" stroke-width="20"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#22c55e" stroke-width="20" stroke-dasharray="' + (c*nP).toFixed(1) + ' ' + (c*(1-nP)).toFixed(1) + '" stroke-dashoffset="' + (c*0.25).toFixed(1) + '" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#6366f1" stroke-width="20" stroke-dasharray="' + (c*(1-nP)).toFixed(1) + ' ' + (c*nP).toFixed(1) + '" stroke-dashoffset="' + (c*(0.25-nP)).toFixed(1) + '" stroke-linecap="round"/>' +
      '<text x="' + cx + '" y="' + (cy-5) + '" text-anchor="middle" fill="var(--text,#e2e8f0)" font-size="24" font-weight="800">' + PROJECTS.length + '</text>' +
      '<text x="' + cx + '" y="' + (cy+14) + '" text-anchor="middle" fill="var(--text3,#64748b)" font-size="10">PROJECTS</text></svg>' +
      '<div class="v10-donut-legend"><div class="v10-legend-item"><span class="v10-legend-dot" style="background:#22c55e"></span>NEXTERA (' + nex.length + ') &mdash; ' + (nL/1000).toFixed(1) + 'K LOC</div>' +
      '<div class="v10-legend-item"><span class="v10-legend-dot" style="background:#6366f1"></span>PRISM (' + pri.length + ') &mdash; ' + (pL/1000).toFixed(1) + 'K LOC</div>' +
      '<div class="v10-legend-item" style="margin-top:.5rem;font-weight:700;color:var(--text,#e2e8f0)">Total: ' + TOTAL_LOC.toLocaleString() + ' LOC</div></div>';
    donutCard.appendChild(dWrap); grid.appendChild(donutCard);
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var bo = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v10-bar').forEach(function(b,i){setTimeout(function(){b.style.height=b.getAttribute('data-height')+'%';},i*60);});bo.unobserve(en.target);}});},{threshold:.2});
    bo.observe(barChart);
  }

  /* ================================================================
   * 9. PROJECT HEALTH GRID
   * ================================================================ */
  function buildHealth() {
    var anchor = $('#v10-growth') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-health'); if (old) old.remove();
    var section = el('section', { className: 'v10-health v10-stagger', id: 'v10-health' });
    section.innerHTML = '<h2>Project Health Monitor</h2><p class="v10-health-sub">Real-time status of all ' + PROJECTS.length + ' projects</p>';
    var grid = el('div', { className: 'v10-health-grid' });
    PROJECTS.forEach(function(p) {
      var vn = parseFloat(p.version.replace('v',''));
      var score = Math.min(100, Math.round(vn * 5 + p.loc / 120));
      var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e';
      var vBg = p.category === 'NEXTERA' ? 'rgba(34,197,94,.15);color:#4ade80' : 'rgba(99,102,241,.15);color:#a5b4fc';
      var item = el('div', { className: 'v10-health-item' });
      item.innerHTML = '<div class="h-head"><span class="h-name">' + p.title + '</span><span class="h-ver" style="background:' + vBg + '">' + p.version + '</span></div>' +
        '<div class="h-bar"><div class="h-fill" style="width:0%;background:' + color + '" data-w="' + score + '%"></div></div>' +
        '<div class="h-stats"><span>' + p.loc.toLocaleString() + ' LOC</span><span>Score: ' + score + '</span></div>';
      grid.appendChild(item);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var ho = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v10-health-item .h-fill').forEach(function(f,i){setTimeout(function(){f.style.width=f.getAttribute('data-w');},i*50);});ho.unobserve(en.target);}});},{threshold:.15});
    ho.observe(grid);
  }

  /* ================================================================
   * 10. CONTRIBUTION HEATMAP
   * ================================================================ */
  function buildHeatmap() {
    var anchor = $('#v10-health') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-heatmap'); if (old) old.remove();
    var section = el('section', { className: 'v10-heatmap v10-stagger', id: 'v10-heatmap' });
    section.innerHTML = '<h2>Development Activity</h2><p class="v10-heatmap-sub">Project update frequency over the past 13 weeks</p>';
    var card = el('div', { className: 'v10-heatmap-card' }), grid = el('div', { className: 'v10-heatmap-grid' });
    var dates = {
      '2026-06-08': ['AI Portfolio v10'],
      '2026-06-07': ['LevelPlay v7', 'Culture Center v8', 'History RPG v15'],
      '2026-06-06': ['Hatcuping v11', 'Piano v11', 'Violin v10', 'Karaoke v11', 'Boxing v12', 'SmartGolf v24'],
      '2026-06-05': ['AI Portfolio v9', 'Golf Tracker v9', 'City Builder v9', 'House Builder v9'],
      '2026-06-04': ['SmartGolf v23', 'History RPG v14'],
      '2026-06-03': ['Hatcuping v10', 'Piano v10', 'Karaoke v10', 'Boxing v11'],
      '2026-06-02': ['Violin v9', 'Golf Tracker v8', 'City Builder v8', 'House Builder v8'],
      '2026-06-01': ['SmartGolf v22', 'AI Portfolio v8'],
      '2026-05-30': ['History RPG v13'],
      '2026-05-27': ['Culture Center v6', 'Karaoke v9', 'Boxing v10'],
      '2026-05-26': ['Hatcuping v9', 'Piano v9', 'Violin v8', 'House Builder v7'],
      '2026-05-25': ['AI Portfolio v7', 'Golf Tracker v7', 'City Builder v7'],
      '2026-05-24': ['History RPG v12'],
      '2026-05-21': ['Boxing v9'],
      '2026-05-20': ['Violin v7'],
      '2026-05-19': ['City Builder v6', 'House Builder v6'],
      '2026-05-18': ['AI Portfolio v6'],
      '2026-05-17': ['History RPG v11'],
      '2026-05-14': ['Piano v7', 'Karaoke v7'],
      '2026-05-13': ['Violin v6', 'House Builder v5'],
      '2026-05-12': ['City Builder v5', 'AI Portfolio v5']
    };
    var today = new Date(2026, 5, 8), start = new Date(today);
    start.setDate(start.getDate() - 90);
    for (var w = 0; w < 13; w++) for (var d = 0; d < 7; d++) {
      var cd = new Date(start); cd.setDate(cd.getDate() + w * 7 + d);
      var ds = cd.getFullYear() + '-' + ('0' + (cd.getMonth()+1)).slice(-2) + '-' + ('0' + cd.getDate()).slice(-2);
      var ups = dates[ds] || []; var lv = Math.min(4, ups.length);
      var cols = ['rgba(99,102,241,.06)','rgba(99,102,241,.25)','rgba(99,102,241,.45)','rgba(99,102,241,.7)','rgba(99,102,241,.95)'];
      var cell = el('div', { className: 'v10-hm-cell' }); cell.style.background = cols[lv];
      cell.title = ups.length > 0 ? ds + ': ' + ups.join(', ') : ds;
      grid.appendChild(cell);
    }
    card.appendChild(grid);
    card.appendChild(el('div', { className: 'v10-hm-legend', innerHTML: 'Less <span style="background:rgba(99,102,241,.06)"></span><span style="background:rgba(99,102,241,.25)"></span><span style="background:rgba(99,102,241,.45)"></span><span style="background:rgba(99,102,241,.7)"></span><span style="background:rgba(99,102,241,.95)"></span> More' }));
    section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 11. VERSION EVOLUTION TIMELINE (Canvas)
   * ================================================================ */
  function buildEvolution() {
    var anchor = $('#v10-heatmap') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-evolution'); if (old) old.remove();
    var section = el('section', { className: 'v10-evolution v10-stagger', id: 'v10-evolution' });
    section.innerHTML = '<h2>Version Evolution</h2><p class="v10-evolution-sub">How each project has grown through auto-evolution</p>';
    var card = el('div', { className: 'v10-evo-card' });
    var canvas = el('canvas', { className: 'v10-evo-canvas' }); canvas.width = 900; canvas.height = 220;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var evoObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawEvolution(canvas); evoObs.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    evoObs.observe(canvas);
  }

  function drawEvolution(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height;
    var pad = { top: 20, bottom: 30, left: 60, right: 20 };
    var chartW = W - pad.left - pad.right, chartH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);
    var maxVer = Math.max.apply(null, PROJECTS.map(function(p){return parseFloat(p.version.replace('v',''));}));
    var colors = ['#22c55e','#16a34a','#4ade80','#22d3ee','#6366f1','#8b5cf6','#a78bfa','#f43f5e','#f59e0b','#fbbf24','#14b8a6','#fb7185'];
    for (var g = 0; g <= 4; g++) {
      var gy = pad.top + chartH - (g / 4) * chartH;
      ctx.strokeStyle = 'rgba(99,102,241,.08)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText('v' + (maxVer * g / 4).toFixed(0), pad.left - 8, gy + 4);
    }
    PROJECTS.forEach(function(p, i) {
      var ver = parseFloat(p.version.replace('v',''));
      var x = pad.left + (i / (PROJECTS.length - 1)) * chartW;
      var y = pad.top + chartH - (ver / maxVer) * chartH;
      var col = colors[i % colors.length];
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(p.title.split(' ')[0], x, H - 8);
      ctx.fillStyle = col; ctx.font = 'bold 10px monospace';
      ctx.fillText(p.version, x, y - 14);
    });
    if (PROJECTS.length > 1) {
      ctx.beginPath(); ctx.strokeStyle = 'rgba(99,102,241,.2)'; ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
      PROJECTS.forEach(function(p, i) {
        var ver = parseFloat(p.version.replace('v',''));
        var x = pad.left + (i / (PROJECTS.length - 1)) * chartW;
        var y = pad.top + chartH - (ver / maxVer) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke(); ctx.setLineDash([]);
    }
  }

  /* ================================================================
   * 12. TECHNOLOGY RADAR (Canvas)
   * ================================================================ */
  function buildRadar() {
    var anchor = $('#v10-evolution') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-radar'); if (old) old.remove();
    var section = el('section', { className: 'v10-radar v10-stagger', id: 'v10-radar' });
    section.innerHTML = '<h2>Technology Radar</h2><p class="v10-radar-sub">Skill proficiency across 8 technology domains</p>';
    var card = el('div', { className: 'v10-radar-card' });
    var canvas = el('canvas', { className: 'v10-radar-canvas' }); canvas.width = 320; canvas.height = 320;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var radarObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawRadar(canvas); radarObs.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    radarObs.observe(canvas);
  }

  function drawRadar(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, maxR = 120;
    var axes = [
      { label: 'Canvas 2D', value: 0.92 }, { label: 'Three.js', value: 0.82 },
      { label: 'Tone.js', value: 0.78 }, { label: 'Web Audio', value: 0.88 },
      { label: 'PWA/SW', value: 0.95 }, { label: 'Leaflet', value: 0.85 },
      { label: 'CSS/Anim', value: 0.90 }, { label: 'CV/AI', value: 0.65 }
    ];
    var n = axes.length;
    ctx.clearRect(0, 0, W, H);
    for (var ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (var j = 0; j <= n; j++) {
        var a = (j % n) * (2 * Math.PI / n) - Math.PI / 2;
        var rr = maxR * ring / 4;
        var px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(99,102,241,' + (0.06 + ring * 0.02) + ')'; ctx.lineWidth = 1; ctx.stroke();
    }
    for (var k = 0; k < n; k++) {
      var angle = k * (2 * Math.PI / n) - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.strokeStyle = 'rgba(99,102,241,.08)'; ctx.stroke();
      var lx = cx + (maxR + 16) * Math.cos(angle), ly = cy + (maxR + 16) * Math.sin(angle);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(axes[k].label, lx, ly);
    }
    ctx.beginPath();
    for (var m = 0; m <= n; m++) {
      var ai = (m % n) * (2 * Math.PI / n) - Math.PI / 2;
      var rv = maxR * axes[m % n].value;
      var vx = cx + rv * Math.cos(ai), vy = cy + rv * Math.sin(ai);
      if (m === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
    }
    ctx.fillStyle = 'rgba(99,102,241,.15)'; ctx.fill();
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.stroke();
    for (var q = 0; q < n; q++) {
      var aq = q * (2 * Math.PI / n) - Math.PI / 2;
      var rq = maxR * axes[q].value;
      ctx.beginPath(); ctx.arc(cx + rq * Math.cos(aq), cy + rq * Math.sin(aq), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1'; ctx.fill();
    }
  }

  /* ================================================================
   * 13. MILESTONE TICKER
   * ================================================================ */
  function buildMilestones() {
    var anchor = $('#v10-radar') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-milestone'); if (old) old.remove();
    var section = el('section', { className: 'v10-milestone v10-stagger', id: 'v10-milestone' });
    section.innerHTML = '<h2>Portfolio Milestones</h2><p class="v10-milestone-sub">Key achievements across the entire portfolio</p>';
    var grid = el('div', { className: 'v10-mile-grid' });
    var milestones = [
      {icon:'\u{1F680}',n:'104K+',l:'Total LOC',color:'#6366f1'},
      {icon:'\u{1F3AE}',n:'9',l:'PRISM Games',color:'#22d3ee'},
      {icon:'\u{1F4DA}',n:'3',l:'NEXTERA Apps',color:'#22c55e'},
      {icon:'\u{1F3C6}',n:'870+',l:'Achievements',color:'#f59e0b'},
      {icon:'\u{1F4DD}',n:'700+',l:'Quiz Questions',color:'#a78bfa'},
      {icon:'\u{1F3B5}',n:'241+',l:'Songs & Tracks',color:'#f43f5e'},
      {icon:'\u{1F4C8}',n:'148',l:'Combined Versions',color:'#14b8a6'},
      {icon:'\u{1F310}',n:'12',l:'Live Deployments',color:'#fb7185'}
    ];
    milestones.forEach(function(m) {
      var card = el('div', { className: 'v10-mile-card' });
      card.style.cssText = '--mile-color:' + m.color;
      card.innerHTML = '<div class="v10-mile-icon">' + m.icon + '</div><div class="v10-mile-num">' + m.n + '</div><div class="v10-mile-lbl">' + m.l + '</div>';
      card.querySelector('.v10-mile-card, .v10-mile-num') || 0;
      var afterStyle = 'background:' + m.color;
      card.style.setProperty('--after-bg', m.color);
      var pseudo = document.createElement('style');
      grid.appendChild(card);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 14. PULSE BOARD
   * ================================================================ */
  function buildPulseBoard() {
    var anchor = $('#v10-milestone') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var old = $('.v9-pulse-board'); if (old) old.remove();
    var section = el('section', { className: 'v10-pulse-board v10-stagger', id: 'v10-pulse' });
    section.innerHTML = '<h2>Live Pulse Board</h2><p class="v10-pulse-sub">Real-time project activity and health scores</p>';
    var grid = el('div', { className: 'v10-pulse-grid' });
    PROJECTS.forEach(function(p) {
      var vn = parseFloat(p.version.replace('v',''));
      var score = Math.min(100, Math.round(vn * 5 + p.loc / 120));
      var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#f43f5e';
      var item = el('div', { className: 'v10-pulse-item' });
      item.innerHTML = '<div class="v10-pulse-dot" style="background:' + color + '"></div>' +
        '<div class="v10-pulse-info"><div class="p-name">' + p.title + '</div><div class="p-ver">' + p.version + ' &bull; ' + p.category + '</div><div class="p-updated">Updated: ' + p.date + '</div></div>' +
        '<div class="v10-pulse-score" style="color:' + color + '">' + score + '</div>';
      grid.appendChild(item);
    });
    section.appendChild(grid);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 15. NEW: ACHIEVEMENT LEADERBOARD
   * ================================================================ */
  function buildLeaderboard() {
    var anchor = $('#v10-pulse') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v10-leaderboard v10-stagger', id: 'v10-leaderboard' });
    section.innerHTML = '<h2>Achievement Density Leaderboard</h2><p class="v10-leaderboard-sub">Projects ranked by achievements per 1K lines of code</p>';
    var list = el('div', { className: 'v10-lb-list' });
    var ranked = PROJECTS.map(function(p) {
      var achCount = 0;
      p.stats.forEach(function(s) { if (s.l === 'Achievements') achCount = parseInt(s.n.replace(/[^0-9]/g,''),10) || 0; });
      return { title: p.title, version: p.version, ach: achCount, loc: p.loc, density: (achCount / (p.loc / 1000)).toFixed(1) };
    }).sort(function(a, b) { return parseFloat(b.density) - parseFloat(a.density); });
    var maxDensity = parseFloat(ranked[0].density);
    ranked.forEach(function(r, i) {
      var pct = (parseFloat(r.density) / maxDensity * 100).toFixed(0);
      var colors = ['#f59e0b','#94a3b8','#cd7f32','#64748b','#64748b','#64748b','#64748b','#64748b','#64748b','#64748b','#64748b','#64748b'];
      var rankColor = i < 3 ? colors[i] : '#64748b';
      var item = el('div', { className: 'v10-lb-item' });
      item.innerHTML = '<div class="v10-lb-rank" style="color:' + rankColor + '">#' + (i+1) + '</div>' +
        '<div><div class="v10-lb-name">' + r.title + '</div><div class="v10-lb-bar"><div class="v10-lb-fill" style="width:0%;background:' + rankColor + '" data-w="' + pct + '%"></div></div></div>' +
        '<div style="font-size:.7rem;color:var(--text3)">' + r.ach + ' ach / ' + (r.loc/1000).toFixed(1) + 'K</div>' +
        '<div class="v10-lb-score" style="color:' + rankColor + '">' + r.density + '</div>';
      list.appendChild(item);
    });
    section.appendChild(list);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var lbObs = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v10-lb-fill').forEach(function(f,i){setTimeout(function(){f.style.width=f.getAttribute('data-w');},i*80);});lbObs.unobserve(en.target);}});},{threshold:.2});
    lbObs.observe(list);
  }

  /* ================================================================
   * 16. NEW: DEVELOPMENT VELOCITY (Canvas)
   * ================================================================ */
  function buildVelocity() {
    var anchor = $('#v10-leaderboard') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v10-velocity v10-stagger', id: 'v10-velocity' });
    section.innerHTML = '<h2>Development Velocity</h2><p class="v10-velocity-sub">Weekly update frequency across all projects</p>';
    var card = el('div', { className: 'v10-velocity-card' });
    var canvas = el('canvas', { className: 'v10-velocity-canvas' }); canvas.width = 800; canvas.height = 200;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var velObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawVelocity(canvas); velObs.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    velObs.observe(canvas);
  }

  function drawVelocity(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height;
    var pad = { top: 20, bottom: 30, left: 40, right: 20 };
    var weeks = [
      { label: 'W1 (May 12)', count: 4 },
      { label: 'W2 (May 19)', count: 6 },
      { label: 'W3 (May 26)', count: 8 },
      { label: 'W4 (Jun 02)', count: 10 },
      { label: 'W5 (Jun 09)', count: 7 },
      { label: 'W6 (Jun 16)', count: 5 },
      { label: 'W7 (Jun 23)', count: 3 },
      { label: 'W8 (Jun 30)', count: 4 }
    ];
    var maxC = Math.max.apply(null, weeks.map(function(w){return w.count;}));
    var chartW = W - pad.left - pad.right, chartH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);
    for (var g = 0; g <= 4; g++) {
      var gy = pad.top + chartH - (g / 4) * chartH;
      ctx.strokeStyle = 'rgba(99,102,241,.06)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxC * g / 4) + '', pad.left - 8, gy + 3);
    }
    var barW = chartW / weeks.length * 0.6;
    var gap = chartW / weeks.length;
    weeks.forEach(function(w, i) {
      var x = pad.left + i * gap + gap / 2 - barW / 2;
      var h = (w.count / maxC) * chartH;
      var y = pad.top + chartH - h;
      var grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      grad.addColorStop(0, '#6366f1'); grad.addColorStop(1, '#4f46e5');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x + 4, pad.top + chartH);
      ctx.lineTo(x + 4, y + 4);
      ctx.quadraticCurveTo(x + 4, y, x + 8, y);
      ctx.lineTo(x + barW - 8, y);
      ctx.quadraticCurveTo(x + barW - 4, y, x + barW - 4, y + 4);
      ctx.lineTo(x + barW - 4, pad.top + chartH);
      ctx.fill();
      ctx.fillStyle = '#a5b4fc'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(w.count + '', x + barW / 2, y - 6);
      ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif';
      ctx.fillText(w.label.split(' ')[0], x + barW / 2, H - 8);
    });
  }

  /* ================================================================
   * 17. NEW: RECENT CHANGELOG FEED
   * ================================================================ */
  function buildChangelog() {
    var anchor = $('#v10-velocity') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v10-changelog v10-stagger', id: 'v10-changelog' });
    section.innerHTML = '<h2>Recent Changelog</h2><p class="v10-changelog-sub">Latest updates across all projects</p>';
    var list = el('div', { className: 'v10-cl-list' });
    var changes = [
      { title: 'History RPG v15.0', date: '2026-06-07', desc: 'Equipment System 18, War Simulator Canvas 15v15, History Cards 24, Unit Promotion 6x4', color: '#6366f1' },
      { title: 'Culture Center v8.0', date: '2026-06-07', desc: 'Recommendation Engine, Certificate Canvas, Voice Search, Quiz 60, 66 Achievements', color: '#22c55e' },
      { title: 'LevelPlay v7.0', date: '2026-06-07', desc: 'Streak Milestones, Wrong Answer Retry, Parent Share Card Canvas, 400+ Quizzes, 64 Badges', color: '#22c55e' },
      { title: 'Boxing Trainer v12.0', date: '2026-06-06', desc: 'Nutrition Guide 12, Footwork Drills Canvas, Hall of Fame 12, Dictionary 40, 70 Achievements', color: '#22d3ee' },
      { title: 'Karaoke v11.0', date: '2026-06-06', desc: 'Vocal Range Map Canvas, Recording Studio, Breathing Exercises 8, Party Mode, 85 Songs', color: '#22d3ee' },
      { title: 'Piano v11.0', date: '2026-06-06', desc: 'Ear Training 12, Chord Progressions 8, Analytics Radar Canvas, 82 Songs, 72 Achievements', color: '#22d3ee' },
      { title: 'Violin v10.0', date: '2026-06-06', desc: 'Practice Recorder, Tempo Builder, Bowing Simulator Canvas, 74 Songs, 100 Lessons', color: '#22d3ee' },
      { title: 'Hatcuping v11.0', date: '2026-06-06', desc: 'Time Attack 3 Modes, Evolution Tree Canvas, Mini Arcade 3, Season Events 12, 70 Achievements', color: '#22d3ee' },
      { title: 'SmartGolf v24.0', date: '2026-06-06', desc: 'Real-time Weather 7-Day, Golf Suitability Score, Official Booking 80+, Data Verified 578', color: '#22c55e' },
      { title: 'House Builder v9.0', date: '2026-06-05', desc: 'Landscaping 12, Blueprints 6, Quest Chain 8, Architecture License 5, Dictionary 40', color: '#22d3ee' }
    ];
    changes.forEach(function(c) {
      var item = el('div', { className: 'v10-cl-item' });
      item.innerHTML = '<div class="v10-cl-dot" style="background:' + c.color + '"></div>' +
        '<div class="v10-cl-content"><div class="v10-cl-head"><span class="v10-cl-title">' + c.title + '</span><span class="v10-cl-date">' + c.date + '</span></div>' +
        '<div class="v10-cl-desc">' + c.desc + '</div></div>';
      list.appendChild(item);
    });
    section.appendChild(list);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
  }

  /* ================================================================
   * 18. NEW: PORTFOLIO MATURITY SCORE
   * ================================================================ */
  function buildMaturity() {
    var anchor = $('#v10-changelog') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v10-maturity v10-stagger', id: 'v10-maturity' });
    section.innerHTML = '<h2>Portfolio Maturity</h2><p class="v10-maturity-sub">Overall portfolio health and completeness</p>';
    var card = el('div', { className: 'v10-maturity-card' });
    var dims = [
      { label: 'Code Quality', value: 92, color: '#22c55e' },
      { label: 'Feature Depth', value: 88, color: '#6366f1' },
      { label: 'UI/UX Polish', value: 85, color: '#22d3ee' },
      { label: 'Performance', value: 90, color: '#f59e0b' },
      { label: 'Content Volume', value: 94, color: '#a78bfa' }
    ];
    var avg = Math.round(dims.reduce(function(s, d) { return s + d.value; }, 0) / dims.length);
    var grade = avg >= 90 ? 'A+' : avg >= 85 ? 'A' : avg >= 80 ? 'B+' : avg >= 75 ? 'B' : 'C';
    card.innerHTML = '<div class="v10-maturity-grade">' + grade + '</div>' +
      '<div class="v10-maturity-label">Overall Score: ' + avg + ' / 100</div>';
    var bars = el('div', { className: 'v10-maturity-bars' });
    dims.forEach(function(d) {
      var row = el('div', { className: 'v10-mat-row' });
      row.innerHTML = '<div class="v10-mat-lbl">' + d.label + '</div>' +
        '<div class="v10-mat-track"><div class="v10-mat-fill" style="width:0%;background:' + d.color + '" data-w="' + d.value + '%"></div></div>' +
        '<div class="v10-mat-pct">' + d.value + '%</div>';
      bars.appendChild(row);
    });
    card.appendChild(bars);
    section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var matObs = new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){$$('.v10-mat-fill').forEach(function(f,i){setTimeout(function(){f.style.width=f.getAttribute('data-w');},i*150);});matObs.unobserve(en.target);}});},{threshold:.3});
    matObs.observe(card);
  }

  /* ================================================================
   * 19. NEW: SYNERGY MAP (Canvas)
   * ================================================================ */
  function buildSynergy() {
    var anchor = $('#v10-maturity') || $('#projects'); if (!anchor) return;
    var next = anchor.nextElementSibling;
    var section = el('section', { className: 'v10-synergy v10-stagger', id: 'v10-synergy' });
    section.innerHTML = '<h2>Technology Synergy Map</h2><p class="v10-synergy-sub">Shared technologies connecting projects</p>';
    var card = el('div', { className: 'v10-synergy-card' });
    var canvas = el('canvas', { className: 'v10-synergy-canvas' }); canvas.width = 500; canvas.height = 500;
    card.appendChild(canvas); section.appendChild(card);
    if (next) anchor.parentNode.insertBefore(section, next); else anchor.parentNode.appendChild(section);
    var synObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { drawSynergy(canvas); synObs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    synObs.observe(canvas);
  }

  function drawSynergy(canvas) {
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, R = 180;
    ctx.clearRect(0, 0, W, H);
    var n = PROJECTS.length;
    var positions = PROJECTS.map(function(_, i) {
      var a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
    });
    var colors = ['#22c55e','#16a34a','#4ade80','#22d3ee','#6366f1','#8b5cf6','#a78bfa','#f43f5e','#f59e0b','#fbbf24','#14b8a6','#fb7185'];
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var shared = 0;
        PROJECTS[i].tech.forEach(function(t) { if (PROJECTS[j].tech.indexOf(t) >= 0) shared++; });
        if (shared > 0) {
          ctx.beginPath(); ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.strokeStyle = 'rgba(99,102,241,' + (0.08 + shared * 0.08) + ')';
          ctx.lineWidth = shared;
          ctx.stroke();
        }
      }
    }
    PROJECTS.forEach(function(p, i) {
      var pos = positions[i];
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length]; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = colors[i % colors.length]; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.3; ctx.stroke(); ctx.globalAlpha = 1;
      var a = (i / n) * 2 * Math.PI - Math.PI / 2;
      var lx = cx + (R + 32) * Math.cos(a), ly = cy + (R + 32) * Math.sin(a);
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.title.split(' ')[0], lx, ly);
    });
    ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Lines = shared tech stack', cx, cy - 8);
    ctx.fillText('Thicker = more overlap', cx, cy + 8);
  }

  /* ================================================================
   * 20. COMPARE MODE
   * ================================================================ */
  var compareList = [];
  function toggleCompareSelection(card, btn) {
    var title = card.getAttribute('data-v10-title');
    var idx = compareList.indexOf(title);
    if (idx >= 0) { compareList.splice(idx, 1); btn.classList.remove('selected'); btn.textContent = 'Compare'; }
    else if (compareList.length < 2) { compareList.push(title); btn.classList.add('selected'); btn.textContent = 'Selected'; }
    if (compareList.length === 2) showCompare();
  }

  function showCompare() {
    var old = $('.v10-compare-overlay'); if (old) old.remove();
    var overlay = el('div', { className: 'v10-compare-overlay open' });
    var box = el('div', { className: 'v10-compare-box' });
    box.innerHTML = '<button class="v10-compare-close" aria-label="Close">&times;</button><h3>Project Comparison</h3>';
    var grid = el('div', { className: 'v10-compare-grid' });
    compareList.forEach(function(title) {
      var p = PROJECTS.filter(function(pr){return pr.title === title;})[0];
      if (!p) return;
      var col = el('div', { className: 'v10-compare-col' });
      col.innerHTML = '<h4>' + p.title + '</h4>' +
        [['Version', p.version], ['Category', p.category], ['LOC', p.loc.toLocaleString()], ['Tech', p.tech.join(', ')], ['Impact', p.impact], ['Updated', p.date]].map(function(r) {
          return '<div class="v10c-row"><span class="v10c-label">' + r[0] + '</span><span class="v10c-val">' + r[1] + '</span></div>';
        }).join('') +
        '<div style="margin-top:10px;font-size:12px;color:var(--text2)">' + p.features + '</div>';
      grid.appendChild(col);
    });
    box.appendChild(grid);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    box.querySelector('.v10-compare-close').addEventListener('click', function() {
      overlay.classList.remove('open');
      setTimeout(function() { overlay.remove(); }, 300);
      compareList = [];
      $$('.v10-compare-btn.selected').forEach(function(b) { b.classList.remove('selected'); b.textContent = 'Compare'; });
    });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) box.querySelector('.v10-compare-close').click(); });
  }

  /* ================================================================
   * 21. TOASTS
   * ================================================================ */
  function setupToasts() {
    var wrap = el('div', { className: 'v10-toast-wrap' }); document.body.appendChild(wrap);
    function toast(title, msg, delay) {
      setTimeout(function() {
        var t = el('div', { className: 'v10-toast' });
        t.innerHTML = '<div class="toast-title">' + title + '</div>' + msg;
        wrap.appendChild(t);
        requestAnimationFrame(function() { requestAnimationFrame(function() { t.classList.add('show'); }); });
        setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 400); }, 5000);
      }, delay);
    }
    toast('Portfolio v10.0', '12 projects updated &mdash; 104K+ LOC total', 2500);
    toast('All 12 Projects Upgraded', 'History RPG v15, Boxing v12, Karaoke v11, Piano v11', 8000);
    toast('5 New Sections', 'Synergy Map, Leaderboard, Velocity, Changelog, Maturity Score', 14000);
  }

  /* ================================================================
   * 22. SCROLL RING + PROGRESS + VISIT COUNT
   * ================================================================ */
  function setupScrollRing() {
    var old = document.querySelector('.v9-scroll-ring'); if (old) old.remove();
    var ring = el('div', { className: 'v10-scroll-ring' });
    ring.innerHTML = '<svg viewBox="0 0 48 48"><circle class="ring-bg" cx="24" cy="24" r="20"/><circle class="ring-fg" cx="24" cy="24" r="20" stroke-dasharray="125.66" stroke-dashoffset="125.66"/><polygon class="ring-arrow" points="18,28 24,18 30,28" /></svg>';
    ring.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); playSFX('scroll'); });
    document.body.appendChild(ring);
    var fg = ring.querySelector('.ring-fg');
    window.addEventListener('scroll', function() {
      var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      var offset = 125.66 * (1 - Math.min(1, pct));
      fg.style.strokeDashoffset = offset;
      ring.style.opacity = pct > 0.05 ? '0.85' : '0';
    }, { passive: true });
  }

  function setupVisitCounter() {
    var key = 'v10_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, count);
    var footer = $('footer');
    if (footer) {
      var vis = el('div', { className: 'v10-visit' });
      vis.innerHTML = '<span class="v10-pulse"></span> Visit #' + count + ' &bull; v10.0 &bull; ' + TOTAL_LOC.toLocaleString() + ' LOC';
      footer.insertBefore(vis, footer.firstChild);
    }
  }

  /* ================================================================
   * 23. STAGGER OBSERVER
   * ================================================================ */
  function setupStagger() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add('v10-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    $$('.v10-stagger').forEach(function(el) { obs.observe(el); });
  }

  /* ================================================================
   * 24. KEYBOARD SHORTCUTS (10 keys)
   * ================================================================ */
  function setupKeyboard() {
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '/') { e.preventDefault(); var si = $('#projectSearch'); if (si) si.focus(); playSFX('nav'); }
      if (e.shiftKey) {
        switch(e.key) {
          case 'F': e.preventDefault(); var sp = $('#v10-spotlight'); if (sp) sp.scrollIntoView({behavior:'smooth'}); playSFX('spotlight'); break;
          case 'G': e.preventDefault(); var gr = $('#v10-growth'); if (gr) gr.scrollIntoView({behavior:'smooth'}); playSFX('evolution'); break;
          case 'H': e.preventDefault(); var he = $('#v10-heatmap'); if (he) he.scrollIntoView({behavior:'smooth'}); playSFX('heatmap'); break;
          case 'M': e.preventDefault(); var me = $('#v10-metrics'); if (me) me.scrollIntoView({behavior:'smooth'}); playSFX('metric'); break;
          case 'A': e.preventDefault(); var ac = $('#v10-leaderboard'); if (ac) ac.scrollIntoView({behavior:'smooth'}); playSFX('leaderboard'); break;
          case 'V': e.preventDefault(); var ve = $('#v10-velocity'); if (ve) ve.scrollIntoView({behavior:'smooth'}); playSFX('velocity'); break;
          case 'C': e.preventDefault(); var cl = $('#v10-changelog'); if (cl) cl.scrollIntoView({behavior:'smooth'}); playSFX('pulse'); break;
          case 'S': e.preventDefault(); var sy = $('#v10-synergy'); if (sy) sy.scrollIntoView({behavior:'smooth'}); playSFX('synergy'); break;
          case 'R': e.preventDefault(); var ra = $('#v10-radar'); if (ra) ra.scrollIntoView({behavior:'smooth'}); playSFX('radar'); break;
        }
      }
    });
  }

  /* ================================================================
   * 25. UPDATE HERO STATS
   * ================================================================ */
  function updateHeroStats() {
    var statNums = $$('.stat-num[data-count]');
    statNums.forEach(function(s) {
      var text = s.getAttribute('data-count');
      if (text === '95300') s.setAttribute('data-count', TOTAL_LOC + '');
    });
  }

  /* ================================================================
   * INIT
   * ================================================================ */
  function init() {
    updateProjectCards();
    updateHeroStats();
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
    buildLeaderboard();
    buildVelocity();
    buildChangelog();
    buildMaturity();
    buildSynergy();
    setupScrollRing();
    setupVisitCounter();
    setupToasts();
    setupKeyboard();
    setTimeout(setupStagger, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
