import React from 'react';
import styles from './Home.module.css';
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import WeatherHistory from "../../components/WeatherHistoryCard/WeatherHistoryCard";
import ContainerCard from "../../components/ContainerCard/ContainerCard";

const Home: React.FC = () => {
  return (
    <div className={styles.cardContainerWrapper}>
      <div className={styles.overNavbar}>
        <div className={styles.staticCards}>
          <ContainerCard>
            <WeatherCard />
          </ContainerCard>
          <ContainerCard title="Card 2" description="Descrição do card 2" />
          <ContainerCard title="Card 3" description="Descrição do card 3" />
        </div>
      </div>
      <WeatherHistory />
    </div>
  );
};

export default Home;