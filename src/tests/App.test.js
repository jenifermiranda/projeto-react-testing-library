import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('deve renderizar o componente Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByText('Home');
    expect(homeTitle).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByText('About');
    expect(aboutTitle).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', { name: 'Favorite Pokémon' });
    expect(favoriteTitle).toBeInTheDocument();
  });
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/naoexiste');
  });

  const notFoundTitle = screen.getByText('Page requested not found');
  // const notFoundTitle = screen.getByRole('heading', { level: 1 }).toHaveTextContent(/Page requested not found/i);

  expect(notFoundTitle).toBeInTheDocument();
});
