import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../pages';
import pokemonList from '../data';

const text = 'Próximo Pokémon';
const favoriteById = { 25: false, 4: false, 78: false };

describe('Teste a página Pokédex;', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const PokedexHeading = screen.getByRole('heading', { level: 2 });
    expect(PokedexHeading).toBeInTheDocument();
    expect(PokedexHeading).toHaveTextContent('Encountered Pokémon');
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  test('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const bntNextPokemon = screen.getByRole('button', { name: text });
    expect(bntNextPokemon).toBeInTheDocument();
    expect(bntNextPokemon).toHaveTextContent(text);
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    // clica no botao
    const bntNextPokemon = screen.getByRole('button', { name: text });
    userEvent.click(bntNextPokemon);
    // ver se aparece o pokemon [1] da lista
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    // clica no botao
    userEvent.click(bntNextPokemon);
    // ver se aparece o pokemon [2] da lista
    const otherPokemon = screen.getByText('Caterpie');
    expect(otherPokemon).toBeInTheDocument();
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );

    const bntNextPokemon = screen.getByRole('button', { name: text });

    // verificar se o pokemon [0] está na tela
    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();

    // clica no botao
    userEvent.click(bntNextPokemon);

    // ver se aparece o pokemon [1] da lista
    const lastPokemon = screen.getByText('Charmander');
    expect(lastPokemon).toBeInTheDocument();
    // clica no botao
    userEvent.click(bntNextPokemon);

    // ver se aparece o pokemon [0] da lista
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const currentPokemon = screen.queryByText('Pikachu');
    const lastPokemon = screen.queryByText('Charmander');

    expect(currentPokemon).toBeInTheDocument();
    expect(lastPokemon).not.toBeInTheDocument();
  });
});
describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );

    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilter).toHaveLength(2);
  });
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const btnFilter = screen.getByRole('button', { name: 'Fire' });
    expect(btnFilter).toBeInTheDocument();

    const bntNextPokemon = screen.getByRole('button', { name: text });

    userEvent.click(btnFilter);

    const currentFirePokemon = screen.getByTestId('pokemon-type');
    expect(currentFirePokemon).toHaveTextContent('Fire');
    expect(currentFirePokemon).toBeInTheDocument();

    userEvent.click(bntNextPokemon);

    const nextFirePokemon = screen.getByTestId('pokemon-type');
    expect(nextFirePokemon).toHaveTextContent('Fire');
    expect(nextFirePokemon).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const btnFilter = screen.getByRole('button', { name: 'Fire' });
    expect(btnFilter).toHaveTextContent('Fire');
  });
  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const btnAllFilter = screen.getByRole('button', { name: 'All' });
    expect(btnAllFilter).toHaveTextContent('All');
    expect(btnAllFilter).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const btnAllFilter = screen.getByRole('button', { name: 'All' });
    expect(btnAllFilter).toHaveTextContent('All');
    expect(btnAllFilter).toBeInTheDocument();
  });
  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const btnAllFilter = screen.getByRole('button', { name: 'All' });
    const bntNextPokemon = screen.getByRole('button', { name: text });

    userEvent.click(btnAllFilter);

    const currentPokemon = screen.queryByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();

    userEvent.click(bntNextPokemon);

    const nextPokemon = screen.queryByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });
  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ [pokemonList[0], pokemonList[1], pokemonList[6]] }
        isPokemonFavoriteById={ favoriteById }
      />,
    );
    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();

    const bntNextPokemon = screen.getByRole('button', { name: text });
    userEvent.click(bntNextPokemon);

    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    const btnAllFilter = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAllFilter);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
