import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { useQuery } from "react-query";
import * as categoryApi from "../../../services/categoriesApi";

const NavToolbar = () => {
  const currentUser = AuthService.getIsLoggedIn();
  const { data } = useQuery("categories", categoryApi.getCategories, {
    enabled: !!currentUser?.token,
  });

  const NavLink = (category) => {
    return (
      <Link
        to={`/content/${category.name.toLowerCase()}`}
        className='btn btn-ghost'
      >
        {category.name}
      </Link>
    );
  };

  if (!currentUser) {
    return <noscript />;
  }

  return (
    <div className='navbar text-dark-content '>
      <div className='px-2 mx-2 navbar-start'></div>
      <div className='hidden px-2 mx-2 navbar-center lg:flex'>
        <div className='flex items-stretch rounded-lg'>
          {data?.map((category) => NavLink(category))}
        </div>
      </div>
      <div className='navbar-end'></div>
    </div>
  );
};

export default NavToolbar;
