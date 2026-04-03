import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameHistory from '../../components/History';
import { GameResult } from '../../types';

const mockHistory: GameResult[] = [
  {
    id: '1',
    matches: 8,
    errors: 3,
    duration: 45,
    createdAt: '2024-01-15T10:00:00.000Z',
  },
  {
    id: '2',
    matches: 8,
    errors: 7,
    duration: 72,
    createdAt: '2024-01-16T10:00:00.000Z',
  },
];

describe('GameHistory', () => {
  it('should render empty message when no history', () => {
    render(<GameHistory history={[]} />);
    expect(screen.getByText('No tienes partidas anteriores')).toBeInTheDocument();
  });

  it('should render history rows correctly', () => {
    render(<GameHistory history={mockHistory} />);
    const matchCells = screen.getAllByText('8');
    expect(matchCells).toHaveLength(2);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('45s')).toBeInTheDocument();
  });

  it('should render correct number of rows', () => {
    render(<GameHistory history={mockHistory} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});