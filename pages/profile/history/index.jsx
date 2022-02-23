import React, { useState } from "react";
import { ProfileLayout } from "@components";
import { Dropdown } from "react-bootstrap";
import { GAME_LIST } from "../../../src/components/constants";
import styles from "@styles/pages/profile/history.module.scss";
import AuthRoute from "../../../src/services/auth.config";

const TypeList = [
  { id: 0, name: "day", label: "By day" },
  { id: 1, name: "week", label: "By week" },
  { id: 2, name: "month", label: "By month" },
];

const fakedData = [
  {
    date: "21 March, 2014",
    content: "Lorem ipsum dolor sit amet, consectetur",
    title: "New Web Design",
  },
  {
    date: "21 March, 2014",
    content: "Lorem ipsum dolor sit amet, consectetur",
    title: "New Web Design",
  },
];

function History() {
  const [filterdType, setType] = useState(TypeList[0]);
  const [filterdGame, setGame] = useState(GAME_LIST[0]);

  const dataList = fakedData;

  const childrenEl = (
    <div>
      <div>
        <h5 className="text-uppercase">PURCHASE HISTORY</h5>

        <div className="mt-3 text-muted-custom">
          View your account payment details and transactions.
        </div>

        <hr />
      </div>

      <div className="d-flex align-items-center">
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

      {dataList ? (
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h4>Latest News</h4>

              <ul className={styles.timeline}>
                {dataList.map((data, id) => (
                  <li key={id}>
                    <div className="h6 d-flex align-items-end">
                      <div className="font-size-14">{data.date}:</div>
                      <div className="ms-2">{data.title}</div>
                    </div>
                    <p className="font-size-14">{data.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-size-15 my-5 text-center">
          No charges have been made to your account yet
        </div>
      )}
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(History);
