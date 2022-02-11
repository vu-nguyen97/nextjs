import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";

function signup() {
  return (
    <div className="formSignUp d-flex justify-content-center align-items-center">
      <div className="formWrapper shadow-lg text-center">
        <div className="h3 mb-3">Sign up</div>

        <div className="bg-facebook w-100 mt-3">
          <i className="bi bi-facebook"></i>
          <span className="ms-2">Facebook</span>
        </div>
        <div className="bg-google w-100 mt-2">
          <i className="bi bi-google"></i>
          <span className="ms-2">Google</span>
        </div>

        <div className="mt-3">
          Have already an account ?{" "}
          <Link href="/signin">
            <a>Login here</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default signup;
