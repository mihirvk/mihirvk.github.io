/** A rolling calendar-year window, evaluated when the static site is built. */
export function recentUpdates(entries, now = new Date()) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const cutoff = new Date(end);
  cutoff.setUTCFullYear(end.getUTCFullYear() - 1);
  if (cutoff.getUTCMonth() !== end.getUTCMonth()) cutoff.setUTCDate(0);
  return entries.filter(({ date }) => {
    const event = new Date(`${date}T00:00:00Z`);
    return event >= cutoff && event <= end;
  }).sort((a, b) => b.date.localeCompare(a.date));
}
export function formatMonth(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
