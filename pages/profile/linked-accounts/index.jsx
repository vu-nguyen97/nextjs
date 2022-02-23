import React, { useEffect, useRef, useState } from "react";
import { ProfileLayout } from "@components";
import styles from "@styles/pages/profile/linked-accounts.module.scss";
import AuthRoute from "../../../src/services/auth.config";
import api from "../../../src/services/axios.config";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FormikControl from "src/components/form-control/FormikControl";
import * as Yup from "yup";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

function LinkedAccounts() {
  const [games, setGames] = useState([]);
  const [activedGame, setActivedGame] = useState({});
  const [openModalVerify, setOpenModalVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [linkedInfo, setLinkedInfo] = useState([]);
  const [gameOnVerify, setGameOnVerify] = useState({
    gameId: "",
    accId: "",
  });

  const formRef = useRef(null);
  const schema = Yup.object().shape({
    accountId: Yup.string().required(),
    gameId: Yup.string().required(),
  });
  const initialValues = {
    accountId: "",
    gameId: 1,
  };

  useEffect(() => {
    const onGetListGame = api.get("/store/games");
    const onGetLinkedAccounts = api.get("/users/linked-accounts", {
      params: { gameId: "" },
    });

    Promise.all([onGetListGame, onGetLinkedAccounts]).then(
      (res) => {
        setGames(res[0].data?.data || []);
        setLinkedInfo(res[1].data?.data || []);
      },
      () => {}
    );
  }, []);

  const handleLinkAccount = (values) => {
    // Todo: validate form
    if (!Object.keys(activedGame).length) return;

    const { accountId } = values;

    api
      .post("/users/create-linked-accounts", {
        gameId: activedGame.id,
        accountId,
      })
      .then(
        (res) => {
          console.log("create-linked-accounts", res);
          if (typeof res.data?.data === "string") {
            toast(res.data?.data, { type: "success" });
            setGameOnVerify({
              gameId: activedGame.id,
              accId: accountId,
            });
            setOpenModalVerify(true);
          }
        },
        () => {}
      );
  };

  const onKeyPressAccId = (e) => {
    const currentValue = formRef.current.values.accountId;
    const currentLength = currentValue.length;

    if (e.which < 48 || e.which > 57 || currentLength >= 10) {
      e.preventDefault();
    }
  };

  const onVerifyAcc = () => {
    api
      .post("/users/verify-linked-accounts", {
        gameId: gameOnVerify.gameId,
        accountId: gameOnVerify.accId,
        otp,
      })
      .then(
        (res) => {
          console.log("verify", res);
          toast(res.data?.data, { type: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        () => {
          setOtp("");
          setOpenModalVerify(false);
        }
      );
  };

  const childrenEl = (
    <div>
      <h5 className="text-uppercase">Link account</h5>

      <div className="text-muted-custom">
        Connect to your account in our games.
      </div>

      <div>
        <h5 className="mt-3">Linked accounts</h5>

        {linkedInfo.length !== 0 ? (
          <div className="ms-3">
            {linkedInfo.map((linkedAcc) => {
              const { game, linkedAccounts } = linkedAcc;

              return (
                <div key={game.id}>
                  <div className="h6">{game.name}</div>

                  <ul>
                    {linkedAccounts.map((acc, id) => {
                      const { verified } = acc;
                      const slicedId = acc.id;
                      // const slicedId =
                      //   acc.id.length > 5
                      //     ? acc.id.slice(0, 2) + "..." + acc.id.slice(-3)
                      //     : acc.id;

                      return (
                        <li key={id} className="font-size-14">
                          <span className="fw-bold">Account Id</span>
                          <span>: {slicedId}</span>

                          {!verified && (
                            <Button
                              className="ms-3 font-size-11"
                              variant="outline-warning"
                              size="sm"
                              onClick={() => {
                                setOpenModalVerify(true);
                                setGameOnVerify({
                                  gameId: game.id,
                                  accId: acc.id,
                                });
                              }}
                            >
                              Verify
                            </Button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-muted-custom">
            You have not linked any accounts yet
          </div>
        )}
      </div>

      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => handleLinkAccount(values)}
      >
        {(formik) => (
          <Form>
            <div className="mt-5 h6">Link a new account</div>

            <div className="mt-3">
              <Dropdown>
                <Dropdown.Toggle variant="outline-dark" className="btn-block">
                  {activedGame.name || "Choose game"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {games.map((game) => (
                    <Dropdown.Item
                      key={game.id}
                      active={game.id === activedGame.id}
                      onClick={() => setActivedGame(game)}
                    >
                      {game.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="mt-3 d-flex align-items-start">
              <FormikControl
                type="text"
                control="input"
                formik={formik}
                name="accountId"
                placeholder="Account id"
                classNames="w-50"
                onKeyPress={(e) => onKeyPressAccId(e)}
              />
            </div>

            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Modal
        centered
        show={openModalVerify}
        onHide={() => setOpenModalVerify(false)}
      >
        <Modal.Body className="text-center">
          <Modal.Title className="mb-3">Verify account</Modal.Title>

          <div>Enter the 6-digit code we sent to your account in game.</div>

          <OtpInput
            containerStyle="mt-3 d-flex justify-content-center"
            inputStyle={styles.otpInput}
            value={otp}
            onChange={(value) => setOtp(value)}
            numInputs={6}
            separator={<span className="px-2">-</span>}
          />

          <Button variant="primary" className="mt-4" onClick={onVerifyAcc}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(LinkedAccounts);
