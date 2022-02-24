import classNames from "classnames";
import React from "react";

interface CardProps {
  dataObj?: any;
  className?: string;
  description?: string;
  onClick?: () => {};
}

export const Card: React.FC<CardProps> = (props) => {
  const { dataObj, className, description, onClick } = props;

  return (
    <div
      className={classNames("card", className, { "cursor-pointer": onClick })}
      style={{ width: "15.5rem" }}
      onClick={onClick}
    >
      <div className="position-relative">
        <img
          src={dataObj.icon || "/avatar-game.jpg"}
          className="card-img-top"
          alt="card"
        />
        <div className="card-badge badge bg-info">{dataObj.platform}</div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{dataObj.name}</h5>

        <p className="card-text font-size-14">{description}</p>
      </div>
    </div>
  );
};
