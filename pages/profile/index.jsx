import React from "react";
import { ProfileLayout } from "@components";
import styles from "@styles/pages/profile/general.module.scss";

function General() {
  const childrenEl = (
    <div>
      <h5 className="text-uppercase">Account info</h5>

      <div className="d-flex justify-content-between mt-3">
        <div className={styles.disabledInput}>Vu Nguyen</div>
        <div className={styles.disabledInput}>vunv@falcongame.com.vn</div>
      </div>
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default General;
