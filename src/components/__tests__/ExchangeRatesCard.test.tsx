/**
 * Testes unitários para o componente ExchangeRatesCard.
 * 
 * Estes testes garantem que o componente:
 * - Renderiza corretamente o título principal.
 * - Exibe uma mensagem de instrução adequada quando nenhuma moeda está selecionada.
 */

import { render, screen } from "@testing-library/react";
import ExchangeRatesCard from "../ExchangeRatesCard";

describe("ExchangeRatesCard", () => {
  // Testa se o título principal do card aparece na tela
  it("renderiza o título do card de câmbio", () => {
    render(<ExchangeRatesCard />);
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
  });

  // Testa se a mensagem de instrução aparece quando nenhuma moeda está selecionada
  it("exibe mensagem de instrução quando moedas não estão selecionadas", () => {
    render(<ExchangeRatesCard />);
    expect(
      screen.getByText(/Please select both currencies to see the exchange rate/i)
    ).toBeInTheDocument();
  });

});