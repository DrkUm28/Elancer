import React from "react";
import { useNavigate } from "react-router-dom";
import GridContainer from "../../components/layout/grid/GridContainer";
import GridCard from "../../components/layout/grid/GridCard";

const Admin = () => {
  const navigate = useNavigate();
  const redirectTo = (route) => navigate(`/admin/${route}`);

  return (
    <div className='flex flex-wrap justify-center'>
      <h1 className='text-4xl font-bold mb-9 mt-9'>Admin Panel</h1>
      <GridContainer>
        <GridCard classes={"col-span-3 bg-neutral-focus"}>
          <div className='hero'>
            <div className='hero-content text-center'>
              <div className='max-w-md'>
                <h1 className='text-3xl'>Users</h1>
                <p className='py-6'></p>
                <button
                  className='btn btn-secondary'
                  onClick={() => redirectTo("users")}
                >
                  Ban here
                </button>
              </div>
            </div>
          </div>
        </GridCard>
        <GridCard classes={"col-span-3 bg-neutral-focus"}>
          <div className='hero'>
            <div className='hero-content text-center'>
              <div className='max-w-md'>
                <h1 className='text-3xl'>Applications</h1>
                <p className='py-6'></p>
                <button
                  className='btn btn-primary'
                  onClick={() => redirectTo("applications")}
                >
                  Click me!
                </button>
              </div>
            </div>
          </div>
        </GridCard>
        <GridCard classes={"col-span-3 bg-neutral-focus"}>
          <div className='hero'>
            <div className='hero-content text-center'>
              <div className='max-w-md'>
                <h1 className='text-3xl'>Categories</h1>
                <p className='py-6'></p>
                <button
                  className='btn btn-error'
                  onClick={() => redirectTo("categories")}
                >
                  Go away!
                </button>
              </div>
            </div>
          </div>
        </GridCard>
        <GridCard classes={"col-span-3 bg-neutral-focus"}>
          <div className='hero'>
            <div className='hero-content text-center'>
              <div className='max-w-md'>
                <h1 className='text-3xl'>Jobs</h1>
                <p className='py-6'></p>
                <button
                  className='btn btn-info'
                  onClick={() => redirectTo("jobs")}
                >
                  Blame who?
                </button>
              </div>
            </div>
          </div>
        </GridCard>
      </GridContainer>
    </div>
  );
};

export default Admin;
