const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the production function without booting unrelated DOM/Canvas sections.
const source = fs.readFileSync(path.join(__dirname, '../js/v25_patch.js'), 'utf8');
const start = source.indexOf('    function layoutTreemap(');
const end = source.indexOf('    var tiles = layoutTreemap(', start);
assert.ok(start >= 0 && end > start, 'production layout function found');
const layout = vm.runInNewContext(source.slice(start, end) + '\nlayoutTreemap;');
const data = source.match(/var PROJECTS = (\[[\s\S]*?\n  \]);/);
assert.ok(data, 'production project data found');
const projects = vm.runInNewContext(data[1]);

function verify(items, w = 560, h = 310) {
  const result = layout(items, 30, 55, w, h);
  assert.equal(result.length, items.length);
  assert.equal(new Set(result.map(r => r.item)).size, items.length);
  if (!items.length) return;
  const total = items.reduce((sum, item) => sum + item.loc, 0);
  let area = 0;
  for (const r of result) {
    assert.ok(items.includes(r.item));
    assert.ok([r.x, r.y, r.w, r.h].every(Number.isFinite));
    assert.ok(r.w > 0 && r.h > 0);
    assert.ok(r.x >= 30 - 1e-8 && r.y >= 55 - 1e-8);
    assert.ok(r.x + r.w <= 30 + w + 1e-8 && r.y + r.h <= 55 + h + 1e-8);
    area += r.w * r.h;
    assert.ok(Math.abs(r.w * r.h - w * h * r.item.loc / total) < 1e-6);
  }
  assert.ok(Math.abs(area - w * h) < 1e-6);
  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      const a = result[i], b = result[j];
      const overlapW = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapH = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      assert.ok(overlapW <= 1e-8 || overlapH <= 1e-8, 'tiles do not overlap');
    }
  }
}

test('two-item split terminates, including last-index half crossing', () => {
  for (const values of [[34400, 32600], [1, 1], [1, 99], [99, 1]]) {
    verify(values.map(loc => ({ loc })));
  }
});
test('all twelve production projects have proportional non-overlapping tiles', () => {
  verify(projects.slice().sort((a, b) => b.loc - a.loc));
});
test('empty and single-item inputs terminate', () => {
  verify([]);
  verify([{ loc: 10 }]);
});
test('deterministic positive-LOC inputs work in both orientations', () => {
  let seed = 25;
  function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed; }
  for (let i = 0; i < 300; i++) {
    const items = Array.from({ length: 2 + random() % 49 }, () => ({ loc: 1 + random() % 100000 }));
    if (i % 3 === 0) items.sort((a, b) => b.loc - a.loc);
    verify(items, i % 2 ? 310 : 560, i % 2 ? 560 : 310);
  }
});
