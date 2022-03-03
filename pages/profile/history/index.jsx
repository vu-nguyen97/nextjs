import React, { useEffect, useState } from "react";
import { ProfileLayout, Loading } from "@components";
import { Dropdown } from "react-bootstrap";
import { GAME_LIST } from "../../../src/components/constants";
import styles from "@styles/pages/profile/history.module.scss";
import AuthRoute from "../../../src/services/auth.config";
import api from "src/services/axios.config";

const TypeList = [
  { id: 0, name: "day", label: "By day" },
  { id: 1, name: "week", label: "By week" },
  { id: 2, name: "month", label: "By month" },
];

function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterdType, setType] = useState(TypeList[0]);
  const [filterdGame, setGame] = useState(GAME_LIST[0]);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    api.get("/store/transactions").then(
      (res) => {
        setListData(res.data || []);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  }, []);

  const childrenEl = (
    <div>
      {isLoading && <Loading />}

      <div>
        <h5 className="text-uppercase">PURCHASE HISTORY</h5>

        <div className="mt-3 text-muted-custom">
          View your account payment details and transactions.
        </div>

        <hr />
      </div>

      <div className="d-flex align-items-center d-none">
        <div>Filter:</div>

        <div className="ms-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" className="btn-block">
              Purchase history
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              {TypeList.map((typeObj) => (
                <Dropdown.Item
                  key={typeObj.id}
                  active={typeObj.id === filterdType.id}
                  onClick={() => setType(typeObj)}
                  title={typeObj.label}
                >
                  {typeObj.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="ms-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark">Game</Dropdown.Toggle>

            <Dropdown.Menu>
              {GAME_LIST.map((gameObj) => (
                <Dropdown.Item
                  active={gameObj.id === filterdGame.id}
                  key={gameObj.id}
                  onClick={() => setGame(gameObj)}
                  title={gameObj.label}
                >
                  {gameObj.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {listData?.length > 0 && (
        <div className="mt-3 mb-5">
          <h5>History</h5>

          <ul className={styles.timeline}>
            {listData.map((data, id) => (
              <li key={id}>
                <div className="d-flex align-items-center">
                  <div className="h6 m-0">{data.gameName}</div>

                  <div className="ms-2 badge bg-info text-lowercase">
                    {data.status}
                  </div>
                </div>

                <div className="font-size-14">
                  <div>You purchased recharge packs with ${data.subTotal}</div>

                  <div>
                    <span>Order id: </span> <span>{data.orderNumber}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && listData?.length === 0 && (
        <div className="font-size-15 my-5 text-center">
          No charges have been made to your account yet
        </div>
      )}
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(History);
