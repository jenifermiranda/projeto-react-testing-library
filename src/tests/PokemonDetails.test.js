import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachu = '/pokemon/25';
const pokemonFavoritado = 'Pokémon favoritado?';

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const pokeName = screen.getByText('Pikachu Details');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent(/Pikachu Details/i);
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const sumary = screen.getByRole('heading', { name: /summary/i });
    expect(sumary).toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const aboutPokemon = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(aboutPokemon).toBeInTheDocument();
  });
});
describe('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const gameLocationText = screen.getByRole('heading', { name: /Game Locations of pikachu/i });
    expect(gameLocationText).toBeInTheDocument();
  });
  test('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });
    const mapImg1 = screen.getAllByRole('img')[1];
    expect(mapImg1).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImg1).toHaveAttribute('alt', 'Pikachu location');
    expect(mapImg1).toBeInTheDocument();

    const mapImg2 = screen.getAllByRole('img')[2];
    expect(mapImg2).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapImg2).toHaveAttribute('alt', 'Pikachu location');
    expect(mapImg2).toBeInTheDocument();
  });
});
describe('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const checkboxFavoritePokemon = screen.getByRole('checkbox', { name: pokemonFavoritado });

    userEvent.click(checkboxFavoritePokemon);

    expect(checkboxFavoritePokemon).toBeChecked();
  });
  test('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const checkboxFavoritePokemon = screen.getByRole('checkbox', { name: pokemonFavoritado });

    userEvent.click(checkboxFavoritePokemon);

    expect(checkboxFavoritePokemon).not.toBeChecked();

    userEvent.click(checkboxFavoritePokemon);

    expect(checkboxFavoritePokemon).toBeChecked();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pikachu);
    });

    const checkboxFavorite = screen.getByLabelText(pokemonFavoritado);
    expect(checkboxFavorite).toBeInTheDocument();
  });
});
