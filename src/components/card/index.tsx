import classNames from "classnames";
import React from "react";

interface CardProps {
  dataObj?: any;
  className?: string;
  onClick?: () => {};
}

export const Card: React.FC<CardProps> = (props) => {
  const { dataObj, className, onClick } = props;

  return (
    <div
      className={classNames("card shadow", className, {
        "cursor-pointer": onClick,
      })}
      onClick={onClick}
    >
      <div className="">
        <div className="card-img-wrapper position-relative">
          <img
            src={dataObj.icon || "/avatar-game.jpg"}
            className="card-img"
            alt="card"
          />
        </div>
      </div>

      <div className="card-opacity-layer">
        <h6 className="card-title m-0 card-content-hightlight">
          {dataObj.name}
        </h6>
        <div className="black-layer"></div>
      </div>
    </div>
  );
};
