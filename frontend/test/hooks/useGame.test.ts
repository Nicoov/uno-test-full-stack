import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from '../../hooks/useGame';
import * as api from '../../service/api';

vi.mock('../../service/api', () => ({
  fetchDeck: vi.fn(),
  saveGameResult: vi.fn(),
}));

const mockDeck = [
  { id: 0, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 1, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
  { id: 2, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 3, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
];

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(api.fetchDeck).mockResolvedValue(mockDeck);
  vi.mocked(api.saveGameResult).mockResolvedValue(undefined);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useGame', () => {
  it('should load deck on mount', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.cards).toHaveLength(4);
    expect(result.current.matches).toBe(0);
    expect(result.current.errors).toBe(0);
  });

  it('should flip a card when clicked', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });

    act(() => { result.current.flipCard(0); });

    expect(result.current.cards[0].isFlipped).toBe(true);
  });

  it('should not flip more than 2 cards at a time', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });

    act(() => { result.current.flipCard(0); });
    act(() => { result.current.flipCard(1); });
    act(() => { result.current.flipCard(2); }); 

    const flipped = result.current.cards.filter((c) => c.isFlipped);
    expect(flipped.length).toBeLessThanOrEqual(2);
  });

  it('should increment errors on mismatch', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });

    act(() => { result.current.flipCard(0); }); 
    act(() => { result.current.flipCard(1); }); 

    act(() => { vi.advanceTimersByTime(1000); }); 
    expect(result.current.errors).toBe(1);
  });

  it('should increment matches on correct pair', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });

    act(() => { result.current.flipCard(0); }); 
    act(() => { result.current.flipCard(2); }); 

    act(() => { vi.advanceTimersByTime(1000); });

    expect(result.current.matches).toBe(1);
  });

  it('should set isFinished when all pairs matched', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });


    act(() => { result.current.flipCard(0); });
    act(() => { result.current.flipCard(2); });
    act(() => { vi.advanceTimersByTime(1000); });


    act(() => { result.current.flipCard(1); });
    act(() => { result.current.flipCard(3); });
    act(() => { vi.advanceTimersByTime(1000); });

    expect(result.current.isFinished).toBe(true);
    expect(api.saveGameResult).toHaveBeenCalledOnce();
  });

  it('should reset game correctly', async () => {
    const { result } = renderHook(() => useGame('user-1'));

    await act(async () => { await Promise.resolve(); });

    act(() => { result.current.flipCard(0); });
    act(() => { result.current.resetGame(); });

    await act(async () => { await Promise.resolve(); });

    expect(result.current.matches).toBe(0);
    expect(result.current.errors).toBe(0);
    expect(result.current.isFinished).toBe(false);
  });
});