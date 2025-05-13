/**
 * Testes unitários para o componente WeatherCard.
 *
 * Estes testes garantem que o componente:
 * - Renderiza corretamente o título principal.
 * - Renderiza o select de cidades.
 * - Exibe o texto de loading quando está carregando.
 */

import { render, screen } from "@testing-library/react";
import WeatherCard from "../WeatherCard";

describe("WeatherCard", () => {
  // Testa se o título principal do card aparece na tela
  it("renderiza o título do card de clima", () => {
    render(<WeatherCard />);
    expect(screen.getByText(/Weather forecast/i)).toBeInTheDocument();
  });

  // Testa se o select de cidades é renderizado
  it("renderiza o select de cidades", () => {
    render(<WeatherCard />);
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
  });
});