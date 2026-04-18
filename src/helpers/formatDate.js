export function formatDate(dateString) {
  const date = new Date(dateString);
  const defaultOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('ru-RU', defaultOptions);
}
