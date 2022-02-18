import React from "react";
import { Container } from "react-bootstrap";
import { Button } from "@components";

interface MainProps {
  title?: string;
}

export const Main: React.FC<MainProps> = (props) => {
  return (
    <div className="text-center py-4 bg-dark-theme">
      <Container>
        <h1 className="display-2 text-white">{props?.title || "superplate"}</h1>
        <p className="lead text-white">
          The frontend boilerplate with superpowers!
        </p>
        <Button
          variant="primary"
          size="lg"
          // href="https://pankod.github.io/superplate/"
          // target="_blank"
        >
          Docs
        </Button>
      </Container>
    </div>
  );
};
