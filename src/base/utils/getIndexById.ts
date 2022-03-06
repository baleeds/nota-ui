export function getIndexById<T extends { id: string }>(items: T[], id: string) {
  return items.findIndex(item => item.id === id);
}
