import React, { useEffect, useState } from "react";
import { Layout, Card } from "@components";
import AuthRoute from "../src/services/auth.config";
import api from "../src/services/axios.config";
import styles from "@styles/pages/store.module.scss";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get("/store/games").then(
      (res) => {
        setGames(res.data?.data || []);
      },
      () => {}
    );
  }, []);

  return (
    <Layout>
      <div className="main-page py-5">
        {games.length && (
          <div className="container">
            <div className="h5 text-white">List game</div>

            <div className="d-flex flex-wrap">
              {games.map((game, id) => (
                <div key={id} className="mx-2 mt-3">
                  <Card key={id} dataObj={game} className="h-100" />
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
