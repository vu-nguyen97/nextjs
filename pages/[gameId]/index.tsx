import React, { useEffect, useState } from "react";
import { Layout, Loading, ModalInfo } from "@components";
import { useRouter } from "next/router";
import api from "../../src/services/axios.config";
import { Button } from "react-bootstrap";
import styles from "@styles/pages/store.module.scss";
import classNames from "classnames";
import { RootState, useAppDispatch } from "@redux/store";
import { addOrder } from "@redux/actions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PackagesCard } from "@components/card/PackagesCard";
import { Pack } from "@redux/slices/order";

interface Game {
  id: string;
  icon: string;
  name: string;
}

function DetailGame() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [gameInfo, setGame] = useState<Game>();
  const [packs, setPacks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const orderData = useSelector((state: RootState) => state.order.data);

  useEffect(() => {
    const { gameId } = router.query;
    if (!gameId) return;

    const onGetListGame = api.get("/store/games");
    const onGetListPackage = api.get("/store/packages", {
      params: { gameId },
    });

    Promise.all([onGetListGame, onGetListPackage]).then(
      (res) => {
        const activedGame = res[0].data.find((game: any) => game.id === gameId);

        setIsLoading(false);
        if (activedGame) {
          setGame(activedGame);
        }
        setPacks(res[1].data || []);
      },
      () => setIsLoading(false)
    );
  }, [router]);

  const addToCart = (pack: Pack) => {
    if (orderData?.id) {
      if (orderData.gameId !== gameInfo?.id) {
        return setIsOpenModal(true);
      }

      const newPackages = [
        ...orderData.packages,
        {
          id: pack.id,
          quantity: 1,
        },
      ];

      setIsLoading(true);
      return api({
        method: "put",
        url: `store/orders/${orderData?.id}`,
        data: {
          accountId: "",
          packages: newPackages,
        },
      }).then(
        (res) => {
          dispatch(addOrder(res.data));
          setIsLoading(false);
          toast("You just added a package to your cart", { type: "success" });
        },
        () => setIsLoading(false)
      );
    }

    setIsLoading(true);
    api({
      method: "post",
      url: "store/orders",
      data: {
        gameId: gameInfo?.id,
        accountId: "",
        packages: [
          {
            id: pack.id,
            quantity: 1,
          },
        ],
      },
    }).then(
      (res) => {
        dispatch(addOrder(res.data));
        toast("You just added a package to your cart", { type: "success" });
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  return (
    <Layout>
      {isLoading && <Loading />}

      <div className="container my-5">
        {gameInfo?.id && (
          <div>
            <div className="d-flex align-items-center">
              <img
                src={gameInfo?.icon || "/avatar-game.jpg"}
                className="me-2 rounded"
                width={40}
                height={40}
              />
              <div className="h3 m-0 text-uppercase">{gameInfo?.name}</div>
            </div>

            <div className="mt-4">
              {packs.length > 0 && (
                <div className="d-flex justify-content-center flex-wrap">
                  {packs.map((pack: Pack) => (
                    <PackagesCard
                      key={pack.id}
                      dataObj={pack}
                      onAddCart={() => addToCart(pack)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ModalInfo
        isOpen={isOpenModal}
        size="sm"
        onHide={() => setIsOpenModal(false)}
      >
        <div>
          <i className="h1 bi bi-exclamation-triangle text-warning"></i>
          <div className="mt-3">
            You can only buy packages of a game in one transaction.
          </div>

          <div className="mt-3">
            <Button
              size="sm"
              onClick={() => setIsOpenModal(false)}
              className="px-4"
            >
              Ok
            </Button>
          </div>
        </div>
      </ModalInfo>
    </Layout>
  );
}

export default DetailGame;
