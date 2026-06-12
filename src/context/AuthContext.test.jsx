import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('arranca sin usuario ni token', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('restaura la sesión desde localStorage al montar', () => {
    localStorage.setItem('token', 'tok-123');
    localStorage.setItem('user', JSON.stringify({ name: 'David' }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.token).toBe('tok-123');
    expect(result.current.user).toEqual({ name: 'David' });
  });

  it('login guarda usuario y token en estado y localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login({ name: 'Ana' }, 'jwt-abc');
    });

    expect(result.current.user).toEqual({ name: 'Ana' });
    expect(result.current.token).toBe('jwt-abc');
    expect(localStorage.getItem('token')).toBe('jwt-abc');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ name: 'Ana' });
  });

  it('logout limpia estado y localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login({ name: 'Ana' }, 'jwt-abc');
    });
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
