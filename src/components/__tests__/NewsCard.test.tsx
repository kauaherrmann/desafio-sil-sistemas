/**
 * Testes unitários para o componente NewsCard.
 *
 * Estes testes garantem que o componente:
 * - Renderiza corretamente o título principal.
 * - Exibe uma mensagem de "No news found." quando não há notícias.
 */

import { render, screen } from "@testing-library/react";
import NewsCard from "../NewsCard";

describe("NewsCard", () => {
  // Testa se o título principal do card aparece na tela
  it("renderiza o título do card de notícias", () => {
    render(<NewsCard />);
    expect(screen.getByText(/News/i)).toBeInTheDocument();
  });

  // Testa se a mensagem de 'No news found.' aparece quando não há notícias
  it("exibe mensagem de 'No news found.' quando não há notícias", () => {
    render(<NewsCard />);
    expect(screen.getByText(/No news found\./i)).toBeInTheDocument();
  });
});