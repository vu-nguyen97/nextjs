import React, { useEffect, useState } from "react";
import { Layout } from "@components";
import { useRouter } from "next/router";
import api from "../../src/services/axios.config";
import Image from "next/image";
import { Button } from "react-bootstrap";
import styles from "@styles/pages/store.module.scss";
import classNames from "classnames";

function DetailGame() {
  const router = useRouter();
  const [gameInfo, setGame] = useState({
    icon: "",
    name: "",
    platform: "android",
  });
  const [packs, setPacks] = useState([]);
  const [activedPack, setactivedPack] = useState({
    id: "",
    usdValue: 0,
    discountPercentage: 0,
  });

  useEffect(() => {
    const { gameId } = router.query;
    if (!gameId) return;

    const onGetListGame = api.get("/store/games");
    const onGetListPackage = api.get("/store/packages", {
      params: { gameId },
    });

    Promise.all([onGetListGame, onGetListPackage]).then(
      (res) => {
        const activedGame = res[0].data.find((game) => game.id === gameId);

        if (activedGame) {
          setGame(activedGame);
        }
        setPacks(res[1].data || []);
        setactivedPack(res[1].data[0]);
      },
      () => {}
    );
  }, [router]);

  return (
    <Layout>
      <div className="container my-5">
        {gameInfo && (
          <div className="row">
            <div className="col-8 d-flex justify-content-center">
              <div className={classNames("position-relative", styles.gameBg)}>
                {gameInfo.icon && (
                  <Image
                    loader={() => gameInfo.icon}
                    unoptimized
                    priority
                    layout="fill"
                    className="img-contain"
                    src={gameInfo.icon}
                  />
                )}
              </div>
            </div>

            <div className="col-4">
              <div className="h5 mt-3 text-uppercase">{gameInfo.name}</div>
              <div className="badge bg-primary text-white">
                {gameInfo.platform}
              </div>

              <div className="mt-3">
                <div>PACK</div>

                <div className="d-flex">
                  {packs.map((packObj) => (
                    <div
                      key={packObj.id}
                      className={classNames(
                        "px-2 py-1 m-2 rounded-3 cursor-pointer",
                        styles.packValue,
                        {
                          [styles.actived]: activedPack.id === packObj.id,
                        }
                      )}
                      onClick={() => setactivedPack(packObj)}
                    >
                      {packObj.usdValue}$
                    </div>
                  ))}
                </div>

                <div className="mt-2 d-flex align-items-center">
                  <div>QUANTITY</div>
                  <select className={classNames("ms-3", styles.quantity)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
                      <option value={item} key={id}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 d-flex flex-column">
                <Button className="w-100">
                  Buy now (
                  <span className="h6 m-0">
                    {activedPack.usdValue *
                      (1 - activedPack.discountPercentage)}
                    $
                  </span>
                  )
                </Button>

                <Button className="mt-3 w-100" variant="outline-dark">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DetailGame;
