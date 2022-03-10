import React, { useEffect, useState } from "react";
import { Layout, Card, Loading } from "@components";
import AuthRoute from "../src/services/auth.config";
import api from "../src/services/axios.config";
import styles from "@styles/pages/store.module.scss";
import { useRouter } from "next/router";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get("/store/games").then(
      (res) => {
        setIsLoading(false);
        setGames(res?.data || []);
      },
      () => setIsLoading(false)
    );
  }, []);

  const onClickGame = (game) => {
    router.push(`/${game.id}`);
  };

  return (
    <Layout>
      <div className="main-page py-lg-5 py-4">
        {isLoading && <Loading />}

        {games.length !== 0 && (
          <div className="container">
            <div className="h5">List game</div>

            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              {games.map((game, id) => (
                <div key={id} className="mx-2 mt-3">
                  <Card
                    key={id}
                    dataObj={game}
                    className="h-100"
                    onClick={() => onClickGame(game)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthRoute(Home);
