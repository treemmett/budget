export default function localizeISO(date: Date): string {
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
