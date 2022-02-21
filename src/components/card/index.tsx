import React from "react";

interface CardProps {
  dataObj?: any;
}

export const Card: React.FC<CardProps> = (props) => {
  const { dataObj } = props;

  return (
    <div className="card" style={{ width: "17rem" }}>
      <div className="position-relative">
        <img src="/1945.jpg" className="card-img-top" alt="card" />
        <div className="card-badge badge bg-info">{dataObj.platform}</div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{dataObj.name}</h5>

        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className="btn btn-primary">Go somewhere</div>
      </div>
    </div>
  );
};
