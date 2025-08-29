export function formatDateForInput(value?: string | null): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const d = new Date(normalized);

  if (Number.isNaN(d.getTime())) {
    const m = value.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : "";
  }
  
  return d.toISOString().slice(0, 10);
}
