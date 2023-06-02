import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemonList from '../data';

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const pokeName = screen.getAllByTestId('pokemon-name')[0];
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent(/pikachu/i);
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent(/electric/i);
  });

  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const pokeKg = screen.getByTestId('pokemon-weight');
    expect(pokeKg).toBeInTheDocument();
    expect(pokeKg).toHaveTextContent(/Average weight: 6.0 kg/i);
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const pokeImg = screen.getAllByRole('img')[0];
    expect(pokeImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokeImg).toBeInTheDocument();
  });
});
describe('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href');

    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemon/25');
  });
});
describe('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  test('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const FaveImg = screen.getAllByRole('img')[1];
    expect(FaveImg).toHaveAttribute('src', '/star-icon.svg');
    expect(FaveImg).toBeInTheDocument();
  });
  test('A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const FaveImg = screen.getAllByRole('img')[1];
    expect(FaveImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(FaveImg).toBeInTheDocument();
  });
});
