import React from "react";
import { ProfileLayout } from "@components";
import styles from "@styles/pages/profile/general.module.scss";
import AuthRoute from "../../src/services/auth.config";

function General() {
  const childrenEl = (
    <div>
      <h5 className="text-uppercase">Account info</h5>

      <div className="d-flex align-items-center mt-3">
        <div className="me-3">Email</div>
        <div className={styles.disabledInput}>vunv@falcongame.com.vn</div>
      </div>

      <div className="mt-3">Change password</div>
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default AuthRoute(General);
