# Desafio SIL Sistemas

Este projeto é um site React + TypeScript que exibe:
- Previsão do tempo para cidades brasileiras (WeatherAPI)
- Conversor de moedas (AwesomeAPI)
- Principais notícias do mundo (GNews)

A interface é responsiva, utiliza Material UI (MUI) para estilização e consome dados de APIs externas de forma segura e centralizada.

## Como executar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repositório
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   VITE_WEATHER_API_KEY=sua_chave_weatherapi
   VITE_GNEWS_API_KEY=sua_chave_gnews
   ```

   Substitua pelos valores reais das suas chaves de API.

4. **Execute o projeto**
   ```sh
   npm run dev
   ```
   ou
   ```sh
   yarn dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## Como rodar os testes

```sh
npm test
```
ou
```sh
yarn test
```

Os testes estão localizados em `src/components/__tests__`.

## APIs utilizadas

- [WeatherAPI](https://www.weatherapi.com/) — Previsão do tempo
- [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) — Conversão de moedas
- [GNews](https://gnews.io/docs/) — Notícias

## Tecnologias

- React + TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Testing Library & Jest

---![print-sil](https://github.com/user-attachments/assets/1627dfd5-cddb-40b8-afd8-2c9980011c46)
