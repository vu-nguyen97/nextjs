import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

const AuthRoute = (Component, ...rest) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      if (this.props.isLoggedIn) {
        this.setState({ loading: false });
      } else {
        Router.push({
          pathname: "/login",
          query: { from: window.location.pathname },
        });
      }
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <div />;
      }

      return <Component {...rest} />;
    }
  }

  return connect((state) => ({
    isLoggedIn: state?.account?.token,
  }))(AuthenticatedRoute);
};

export default AuthRoute;
