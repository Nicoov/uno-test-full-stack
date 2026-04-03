import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from '../../components/Game';
import * as api from '../../service/api';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../../service/api', () => ({
  fetchDeck: vi.fn(),
  saveGameResult: vi.fn(),
  getGameHistory: vi.fn(),
}));

const mockUser = {
  id: 'user-1',
  name: 'Nicolas',
  run: '19910416-0',
};

const mockDeck = [
  { id: 0, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 1, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
  { id: 2, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 3, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
];

beforeEach(() => {
  vi.mocked(api.fetchDeck).mockResolvedValue(mockDeck);
  vi.mocked(api.saveGameResult).mockResolvedValue(undefined);
  vi.mocked(api.getGameHistory).mockResolvedValue([]);
});

describe('Game', () => {
  it('should show loading state initially', () => {
    render(<Game user={mockUser} />);
    expect(screen.getByText('Cargando cartas...')).toBeInTheDocument();
  });

  it('should render user name after loading', async () => {
    render(<Game user={mockUser} />);
    expect(await screen.findByText('Hola, Nicolas')).toBeInTheDocument();
  });

  it('should render board after loading', async () => {
    render(<Game user={mockUser} />);
    await screen.findByText('Hola, Nicolas');
    expect(screen.getByText('Memory Game 🐾')).toBeInTheDocument();
  });

  it('should render logout button', async () => {
    render(<Game user={mockUser} />);
    await screen.findByText('Hola, Nicolas');
    expect(screen.getByText('Salir')).toBeInTheDocument();
  });

  it('should load game history on mount', async () => {
    render(<Game user={mockUser} />);
    await screen.findByText('Hola, Nicolas');
    expect(api.getGameHistory).toHaveBeenCalledWith(mockUser.run);
  });
});