import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste se a página contém as informações sobre a Pokédex;', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', { level: 2 });
    expect(aboutHeading).toBeInTheDocument();
    expect(aboutHeading).toHaveTextContent('About Pokédex');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(aboutText1).toBeInTheDocument();

    const aboutText2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(aboutText2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImage).toBeInTheDocument();
  });
});
