import React from "react";
import classNames from "classnames";

const GridCard = ({ children, classes }) => {
  const cardClasses = classNames(
    "bg-base-100",
    "rounded-box",
    "mx-2",
    "grid",
    "w-72",
    "flex-shrink-0",
    "gap-4",
    "place-self-start",
    "p-4",
    "py-8",
    "shadow-xl",
    "xl:mx-0",
    "xl:w-full",
    "card",
    "container",
    "overflow-x-auto",
    classes
  );

  return <div className={cardClasses}>{children}</div>;
};

export default GridCard;
