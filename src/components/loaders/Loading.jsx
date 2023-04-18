import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <div className='w-full h-full fixed block top-0 left-0 bg-base-200 opacity-75 z-50'>
        <span
          className='text-primary opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0'
          style={{
            top: "50%",
          }}
        >
          <FontAwesomeIcon icon={faCircleNotch} spin={true} size='3x' />
        </span>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default Loading;
