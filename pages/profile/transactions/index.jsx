import React, { useEffect, useState } from "react";
import { ProfileLayout } from "@components";
import AuthRoute from "../../../src/services/auth.config";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import api from "../../../src/services/axios.config";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "@styles/pages/profile/transactions.module.scss";
import classNames from "classnames";

function Transactions() {
  const [games, setGames] = useState([]);
  const [packs, setPackages] = useState([]);
  const [activedGame, setActivedGame] = useState({});
  const [activedPackages, setActivedPackages] = useState({});

  useEffect(() => {
    api.get("/store/games").then(
      (res) => {
        setGames(res.data?.data || []);
      },
      () => {}
    );
  }, []);

  const onClickGame = (game) => {
    setActivedGame(game);

    api.get("/store/packages", { params: { gameId: game.id } }).then(
      (res) => {
        setPackages(res.data?.data || []);
      },
      () => {}
    );
  };

  const onClickBuy = () => {
    toast("Congratulations, you have successfully purchased the game package", {
      type: "success",
    });

    setTimeout(() => {
      setActivedPackages({});
      setActivedGame({});
    }, 1500);
  };

  const childrenEl = (
    <div>
      <h5 className="text-uppercase">Transactions</h5>
      <div className="mt-3 text-muted-custom">
        Select desired game and in-game recharge pack. You can check the
        transaction information in your{" "}
        <span>
          <Link href="/profile/history">
            <a>history</a>
          </Link>
        </span>{" "}
        management tab.
      </div>

      <Row>
        <Col lg="4" className="mt-3">
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" className="btn-block">
                Choose a game
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                {games.map((game) => (
                  <Dropdown.Item
                    title={game.name}
                    key={game.id}
                    active={game.id === activedGame.id}
                    onClick={() => onClickGame(game)}
                  >
                    {game.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="ms-3">
              <Dropdown.Toggle
                disabled={!Object.keys(activedGame).length || !packs.length}
                variant="outline-dark"
                className="btn-block"
              >
                Choose a pack
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                {packs.map((packObj) => (
                  <Dropdown.Item
                    key={packObj.id}
                    active={packObj.id === activedPackages.id}
                    onClick={() => setActivedPackages(packObj)}
                    title={packObj.name}
                  >
                    {packObj.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>

        <Col lg="8" className="mt-3">
          {activedGame.id && (
            <div className="mb-2 text-center">
              <div className="h4 mb-0 mt-2 text-primary">
                {activedGame.name}
              </div>

              {activedPackages.id && (
                <>
                  <div className="mt-3 d-flex align-items-center justify-content-center">
                    <div className="badge bg-primary text-white">
                      {activedPackages.discountPercentage * 100}%
                    </div>

                    <div className="ms-2 h6 m-0 text-decoration-line-through">
                      {activedPackages.usdValue}$
                    </div>
                    <div className="ms-2 h6 m-0">
                      {activedPackages.usdValue *
                        (1 - activedPackages.discountPercentage)}
                      $
                    </div>
                  </div>

                  {activedPackages.id === packs[0]?.id && (
                    <div className="mt-2 font-size-14">
                      Sale ends 2/28/2022 at 2:00 AM (UTC)
                    </div>
                  )}

                  <Button
                    className={classNames(
                      "text-white w-100 mt-3",
                      styles.buyBtn
                    )}
                    onClick={onClickBuy}
                  >
                    Buy now
                  </Button>
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(Transactions);
