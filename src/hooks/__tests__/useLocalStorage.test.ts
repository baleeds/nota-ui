import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../useLocalStorage';

interface TestObject {
  name: string;
}

beforeEach(() => {
  localStorage.clear();
});

test('Objects can be synced with local storage', () => {
  const { result } = renderHook(() => useLocalStorage<TestObject>('test'));

  expect(result.current[0]).toBe(undefined);
  expect(localStorage.getItem('test')).toBe(null);

  act(() => result.current[1]({ name: 'New name' }));
  expect(result.current[0]?.name).toBe('New name');
  expect(localStorage.getItem('test')).toBe(
    JSON.stringify({ name: 'New name' })
  );
});

test('Objects can pull initial values from local storage', () => {
  localStorage.setItem('test', JSON.stringify({ name: 'New name' }));

  const { result } = renderHook(() => useLocalStorage<TestObject>('test'));

  expect(result.current[0]?.name).toBe('New name');
  expect(localStorage.getItem('test')).toBe(
    JSON.stringify({ name: 'New name' })
  );
});

test('Objects can use a fallback value', () => {
  const { result } = renderHook(() =>
    useLocalStorage<TestObject>('test', { name: 'New name' })
  );

  expect(result.current[0]?.name).toBe('New name');
  expect(localStorage.getItem('test')).toBe(
    JSON.stringify({ name: 'New name' })
  );
});

test('Strings can be synced with local storage', () => {
  const { result } = renderHook(() => useLocalStorage('test'));

  expect(result.current[0]).toBe(undefined);
  expect(localStorage.getItem('test')).toBe(null);

  act(() => result.current[1]('New name'));
  expect(result.current[0]).toBe('New name');
  expect(localStorage.getItem('test')).toBe('New name');
});

test('Strings can pull initial values from local storage', () => {
  localStorage.setItem('test', 'New name');

  const { result } = renderHook(() => useLocalStorage('test'));

  expect(result.current[0]).toBe('New name');
  expect(localStorage.getItem('test')).toBe('New name');
});

test('Strings can use a fallback value', () => {
  const { result } = renderHook(() => useLocalStorage('test', 'New name'));

  expect(result.current[0]).toBe('New name');
  expect(localStorage.getItem('test')).toBe('New name');
});
