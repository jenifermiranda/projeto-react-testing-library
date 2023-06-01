import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Ao favoritar a partir da página de detalhes', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavorite = screen.getByText('No favorite Pokémon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    // pega o elemento na Home clica em 'More Details' clica no checkbox
    act(() => {
      history.push('/pokemon/25');
    });

    const favoritePokemon = getByRole('checkbox');

    // simula a acao do user
    userEvent.click(favoritePokemon);

    // faz o teste
    expect(favoritePokemon).toBeChecked();
  });
});
