import React, { useEffect, useRef, useState } from "react";
import { ProfileLayout, Loading } from "@components";
import styles from "@styles/pages/profile/linked-accounts.module.scss";
import AuthRoute from "../../../src/services/auth.config";
import api from "../../../src/services/axios.config";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FormikControl from "src/components/form-control/FormikControl";
import * as Yup from "yup";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import classNames from "classnames";

function LinkedAccounts() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [openModalVerify, setOpenModalVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [linkedInfo, setLinkedInfo] = useState([]);
  const [gameOnVerify, setGameOnVerify] = useState({
    gameId: "",
    accId: "",
  });
  const [guideImgs, setGuideImgs] = useState([]);

  const formRef = useRef(null);
  const schema = Yup.object().shape({
    accountId: Yup.number()
      .typeError("Must be a number")
      .test(
        "len",
        "Must be greater than 5 characters",
        (val) => String(val).length > 5
      )
      .required(),
    game: Yup.string().required(),
  });
  const initialValues = {
    accountId: "",
    game: "",
  };

  useEffect(() => {
    const onGetListGame = api.get("/store/games");
    const onGetLinkedAccounts = api.get("/users/linked-accounts", {
      params: { gameId: "" },
    });

    Promise.all([onGetListGame, onGetLinkedAccounts]).then(
      (res) => {
        setGames(res[0]?.data || []);
        setLinkedInfo(res[1]?.data || []);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  }, []);

  const handleLinkAccount = (values) => {
    const { accountId, gameId } = values;

    api
      .post("/users/create-linked-accounts", {
        gameId,
        accountId,
      })
      .then(
        (res) => {
          if (typeof res?.data === "string") {
            toast(res?.data, { type: "success" });
            setGameOnVerify({
              gameId,
              accId: accountId,
            });
            setOpenModalVerify(true);
          }
        },
        () => {}
      );
  };

  const onKeyPressAccId = (e) => {
    const currentLength = formRef.current.values.accountId?.length;

    if (e.which < 48 || e.which > 57 || currentLength >= 15) {
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
          toast(res.data, { type: "success" });
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

  const onChangeGame = (gameId) => {
    const activedGame = games.find((game) => game.id === gameId);
    setGuideImgs(activedGame?.guideImages || []);
  };

  const childrenEl = (
    <div>
      {isLoading && <Loading />}

      <h5 className="text-uppercase">Link account</h5>

      <div className="text-muted-custom">
        Connect and manage your accounts in our games.
      </div>

      <div>
        <h5 className="mt-3">Linked accounts</h5>
        <div>
          <span className="fw-bold">Note: </span>
          <span>
            Only verified accounts can be used to create transactions.
          </span>
        </div>

        {!isLoading && !linkedInfo.length && (
          <div className="font-size-15 mt-3 fst-italic text-center">
            You have not linked any accounts yet
          </div>
        )}

        {linkedInfo.length > 0 && (
          <div className="ms-3 mt-2">
            {linkedInfo.map((linkedAcc) => {
              const { game, linkedAccounts } = linkedAcc;

              return (
                <div key={game.id}>
                  <div className="h6">{game.name}</div>

                  <ul>
                    {linkedAccounts.map((acc, id) => {
                      const { verified } = acc;

                      return (
                        <li key={id} className="font-size-14">
                          <span className="fw-bold">Account Id</span>
                          <span>: {acc.id}</span>

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
            <div className="mt-5 h5">Link a new account</div>
            <div className="font-size-15">
              Select the game and enter your account id. Then, you will need to
              open the game and get the verification code in the notification
              box to verify your account.
            </div>

            <div className="row mt-3">
              <div className="col-lg-4 col-md-6 col-12">
                <FormikControl
                  options={games}
                  optionKey="name"
                  optionValue="id"
                  control="select"
                  name="game"
                  containerClass=""
                  defaultOption="Select a game"
                  onChange={onChangeGame}
                />

                <FormikControl
                  type="text"
                  control="input"
                  name="accountId"
                  placeholder="Account id"
                  classNames="mt-3"
                  onKeyPress={(e) => onKeyPressAccId(e)}
                />

                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </div>

              <div className="col-lg-8 col-md-6 col-12 d-flex align-items-start justify-content-center">
                {guideImgs.length > 0 && (
                  <img
                    className={classNames(
                      "w-100 h-100 img-contain",
                      styles.guideImg
                    )}
                    src={guideImgs[0]}
                  />
                )}
              </div>
            </div>
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
