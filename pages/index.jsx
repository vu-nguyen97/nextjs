import React, { useEffect, useState } from "react";
import { Layout, Card } from "@components";
import AuthRoute from "../src/services/auth.config";
import api from "../src/services/axios.config";

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
            <div className="h6 mb-3 text-white">List game</div>

            {games.map((game, id) => (
              <div key={id}>
                <Card dataObj={game}></Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthRoute(Home);
