import React, { useEffect, useState } from "react";
import { Layout, ModalInfo } from "@components";
import { useRouter } from "next/router";
import api from "../../src/services/axios.config";
import { Button } from "react-bootstrap";
import styles from "@styles/pages/store.module.scss";
import classNames from "classnames";
import { RootState, useAppDispatch } from "@redux/store";
import { addOrder } from "@redux/actions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function DetailGame() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [gameInfo, setGame] = useState({
    id: "",
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
  const [quantity, setQuantity] = useState(1);
  const [accInfo, setAccInfo] = useState([]);
  const [activeAccId, setActiveAccId] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const orderData = useSelector((state: RootState) => state.order.data);

  useEffect(() => {
    const { gameId } = router.query;
    if (!gameId) return;

    const onGetListGame = api.get("/store/games");
    const onGetListPackage = api.get("/store/packages", {
      params: { gameId },
    });
    const onGetLinkedAccByName = api.get("/users/linked-accounts", {
      params: { gameId },
    });

    Promise.all([onGetListGame, onGetListPackage, onGetLinkedAccByName]).then(
      (res) => {
        const activedGame = res[0].data.find((game: any) => game.id === gameId);

        if (activedGame) {
          setGame(activedGame);
        }
        setPacks(res[1].data || []);
        setactivedPack(res[1].data[0]);
        setAccInfo(res[2].data?.linkedAccounts || []);

        if (res[2].data?.linkedAccounts?.length === 1) {
          setActiveAccId(res[2].data.linkedAccounts[0].id);
        }
      },
      () => {}
    );
  }, [router]);

  const addToCart = () => {
    if (orderData?.id) {
      if (orderData.gameId !== gameInfo.id) {
        return setIsOpenModal(true);
      }

      const newPackages = [
        ...orderData.packages,
        {
          id: activedPack.id,
          quantity,
        },
      ];

      return api({
        method: "put",
        url: `store/orders/${orderData?.id}`,
        data: {
          // check orderData.accountId !== activeAccId
          accountId: activeAccId,
          packages: newPackages,
        },
      }).then(
        (res) => {
          dispatch(addOrder(res.data));
          toast("You just added a package to your cart", { type: "success" });
        },
        () => {}
      );
    }

    api({
      method: "post",
      url: "store/orders",
      data: {
        gameId: gameInfo.id,
        accountId: activeAccId,
        packages: [
          {
            id: activedPack.id,
            quantity,
          },
        ],
      },
    }).then(
      (res) => {
        dispatch(addOrder(res.data));
        toast("You just added a package to your cart", { type: "success" });
      },
      () => {}
    );
  };

  return (
    <Layout>
      <div className="container my-5">
        {gameInfo.name !== "" && (
          <div className="row">
            <div className="col-8 d-flex justify-content-center">
              <img
                src={gameInfo.icon || "/avatar-game.jpg"}
                className="w-100 h-100 img-contain"
              />
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
                      ${packObj.usdValue}
                    </div>
                  ))}
                </div>

                <div className="mt-2 d-flex align-items-center">
                  <div className="w-50">Quantity</div>
                  <select
                    className={classNames("", styles.quantity)}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
                      <option value={item} key={id}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {accInfo.length > 0 && (
                  <div className="mt-3 d-flex align-items-center">
                    <div className="w-50">Account id</div>

                    {accInfo.length === 1 ? (
                      <div className="">{accInfo[0].id}</div>
                    ) : (
                      <select
                        className={classNames("", styles.quantity)}
                        onChange={(e) => setActiveAccId(e.target.value)}
                      >
                        {accInfo.map((item, id) => (
                          <option value={item.id} key={id}>
                            {item}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 d-flex flex-column">
                <Button className="mt-2" disabled>
                  <div className="w-100 text-uppercase font-size-13">
                    Buy now
                    <span className="h6 m-0 ms-2">
                      $
                      {activedPack.usdValue *
                        quantity *
                        (1 - activedPack.discountPercentage)}
                    </span>
                  </div>
                </Button>

                <Button
                  className="mt-3 w-100"
                  variant="dark"
                  onClick={() => addToCart()}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ModalInfo isOpen={isOpenModal} onHide={() => setIsOpenModal(false)}>
        <div>
          <i className="h1 bi bi-exclamation-triangle text-warning"></i>
          <div className="mt-3">
            Please prepay for packages in your cart before adding a new game.
          </div>

          <div className="mt-3">
            <Button size="sm" onClick={() => setIsOpenModal(false)}>
              Ok
            </Button>
          </div>
        </div>
      </ModalInfo>
    </Layout>
  );
}

export default DetailGame;
