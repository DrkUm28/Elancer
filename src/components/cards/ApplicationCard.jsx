import React from "react";
import { Link } from "react-router-dom";

const ContentCard = ({
  imgSrc,
  linkTo,
  linkText,
  offerStatus,
  offerAmmount,
}) => {
  return (
    <div className='p-6'>
      <div className='card w-96 bg-neutral rounded-md'>
        <figure>
          <img src={imgSrc} width='360' height='202' alt=''></img>
        </figure>
        <div className='card-body p-2 items-center text-center'>
          <div className='p-2'>
            <Link to={linkTo} className='btn btn-sm btn-ghost'>
              {linkText}
            </Link>
          </div>
        </div>
        <div className='card-actions m-5 justify-center'>
          <div className='badge badge-outline'>${offerAmmount}</div>
          <div className='badge badge-outline'>{offerStatus}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
