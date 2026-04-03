import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreBoard from '../../components/ScoreBoard';

describe('ScoreBoard', () => {
  it('should render matches correctly', () => {
    render(<ScoreBoard matches={3} errors={1} totalPairs={8} />);
    expect(screen.getByText('3/8')).toBeInTheDocument();
  });

  it('should render errors correctly', () => {
    render(<ScoreBoard matches={0} errors={5} totalPairs={8} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render 0 matches and 0 errors initially', () => {
    render(<ScoreBoard matches={0} errors={0} totalPairs={8} />);
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});