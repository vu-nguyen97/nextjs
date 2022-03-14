import classNames from "classnames";
import React from "react";
import { Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

interface PackagesCard {
  dataObj?: any;
  className?: string;
  onClick?: () => {};
  onAddCart?: any;
}

export const PackagesCard: React.FC<PackagesCard> = (props) => {
  const { dataObj, className, onClick, onAddCart } = props;

  return (
    <div
      className={classNames("PackagesCard card shadow mx-3", className, {
        "cursor-pointer": onClick,
      })}
      onClick={onClick}
    >
      <div>
        <div className="PackagesCard-img position-relative">
          <div className="card-img">
            <img
              src={dataObj.icon || "/avatar-game.jpg"}
              className="w-100 h-100 img-contain"
              alt="card"
            />
          </div>
        </div>

        <div>
          <div data-tip={dataObj.description} className="float-icon-left">
            <i className="h4 bi bi-question-circle-fill icon-question" />
          </div>

          <ReactTooltip place="top" type="info" className="tooltip-width" />
        </div>
      </div>

      <div className="p-3 text-center">
        <div className="d-flex align-items-center justify-content-center mb-1">
          <div className="font-size-17 text-decoration-line-through">
            ${dataObj.usdValue}
          </div>
          <div className="h3 m-0 ms-2 fw-bold">
            ${dataObj.usdValue * (1 - dataObj.discountPercentage)}
          </div>
        </div>

        <Button className="my-2" variant="success" onClick={onAddCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
