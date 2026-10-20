import test from 'node:test';
import assert from 'node:assert/strict';
import { recentUpdates, formatMonth } from '../src/lib/news.mjs';

test('includes the one-year boundary, excludes old and future entries, and sorts newest first', () => {
  const entries = ['2025-10-07', '2025-10-08', '2026-10-08', '2026-10-09', '2026-04-28'].map(date => ({ date }));
  assert.deepEqual(recentUpdates(entries, new Date('2026-10-08T18:00:00Z')).map(x => x.date), ['2026-10-08', '2026-04-28', '2025-10-08']);
  assert.deepEqual(entries.map(x => x.date), ['2025-10-07', '2025-10-08', '2026-10-08', '2026-10-09', '2026-04-28']);
});
test('clamps the leap-day anniversary correctly', () => {
  const entries = ['2023-02-27', '2023-02-28', '2023-03-01'].map(date => ({ date }));
  assert.deepEqual(recentUpdates(entries, new Date('2024-02-29T00:00:00Z')).map(x => x.date), ['2023-03-01', '2023-02-28']);
});
test('handles an empty recent window and formats months without a timezone shift', () => {
  assert.deepEqual(recentUpdates([{ date: '2022-01-01' }], new Date('2026-10-08')), []);
  assert.equal(formatMonth('2026-05-01'), 'May 2026');
});
