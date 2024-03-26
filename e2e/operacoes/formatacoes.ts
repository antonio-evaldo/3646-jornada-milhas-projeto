export function formatarDataParaForm(data: Date): string {
  return data.toLocaleString('en-US', { dateStyle: 'short' });
}
