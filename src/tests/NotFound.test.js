import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/semnome');
    });

    const notFoundHeading = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundHeading).toHaveTextContent('Page requested not found');
  });

  test('Teste se a página mostra a imagem pré-definida', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/semnome');
    });

    const notFoundImage = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImage).toBeInTheDocument();
  });
});
