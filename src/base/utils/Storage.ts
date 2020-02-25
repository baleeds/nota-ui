export const Storage = {
  get(key: string, defaultValue: any) {
    let item;
    try {
      item = localStorage.getItem(key);
      if (!item) throw new Error('item not found');
      return JSON.parse(item);
    } catch (e) {
      return item || defaultValue;
    }
  },
  set(key: string, value: any) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
