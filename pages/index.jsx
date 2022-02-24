import React, { useEffect, useState } from "react";
import { Layout, Card } from "@components";
import AuthRoute from "../src/services/auth.config";
import api from "../src/services/axios.config";
import styles from "@styles/pages/store.module.scss";
import { useRouter } from "next/router";

const Home = () => {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/store/games").then(
      (res) => {
        setGames(res?.data || []);
      },
      () => {}
    );
  }, []);

  const fakeContent = [
    "The game can fly - Shoot chicken - Shoot flies. The game is completely free with simple gameplay, attractive and great graphics.",
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
  ];

  const onClickGame = (game) => {
    router.push(`/${game.id}`);
  };

  return (
    <Layout>
      <div className="main-page py-5">
        {games.length !== 0 && (
          <div className="container">
            <div className="h5 text-white">List game</div>

            <div className="d-flex flex-wrap">
              {games.map((game, id) => (
                <div key={id} className="mx-2 mt-3">
                  <Card
                    key={id}
                    dataObj={game}
                    description={fakeContent[id]}
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
