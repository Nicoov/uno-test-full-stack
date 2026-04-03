import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal';

const mockProps = {
  user: { name: 'Nicolas' },
  duration: 45,
  errors: 3,
  resetGame: vi.fn(),
  handleLogout: vi.fn(),
};

describe('Modal', () => {
  it('should render congratulations message with user name', () => {
    render(<Modal {...mockProps} />);
    expect(screen.getByText('¡Felicidades, Nicolas!')).toBeInTheDocument();
  });

  it('should render duration and errors', () => {
    render(<Modal {...mockProps} />);
    expect(screen.getByText('Completaste el juego en 45s con 3 errores')).toBeInTheDocument();
  });

  it('should call resetGame when clicking play again', () => {
    render(<Modal {...mockProps} />);
    fireEvent.click(screen.getByText('Jugar de nuevo'));
    expect(mockProps.resetGame).toHaveBeenCalledOnce();
  });

  it('should call handleLogout when clicking exit', () => {
    render(<Modal {...mockProps} />);
    fireEvent.click(screen.getByText('Salir'));
    expect(mockProps.handleLogout).toHaveBeenCalledOnce();
  });
});