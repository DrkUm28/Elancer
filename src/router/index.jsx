import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Content from "../components/layout/content";
import RequireAuth from "./RequireAuth";
import Portfolio from "../pages/profile";
import Profile from "../pages/profile/Profile";
import ProfileApplications from "../pages/profile/Applications";
import ProfileJobOffers from "../pages/profile/JobOffers";
import Offer from "../pages/profile/offers/Offer";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Landing from "../pages/landing";
import Design from "../pages/contents/designs";
import Website from "../pages/contents/websites";
import Animation from "../pages/contents/animations";
import Apps from "../pages/contents/apps";
import Job from "../pages/contents/jobs";
import Seller from "../pages/contents/sellers";

import Admin from "../pages/admin";
import Users from "../pages/admin/users";
import Categories from "../pages/admin/categories";
import Jobs from "../pages/admin/jobs";
import Applications from "../pages/admin/applications";

const Router = () => {
  return (
    <Fragment>
      <Routes>
        {/* Public routes */}
        <Route
          path='/'
          element={
            <Content>
              <Landing />
            </Content>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/content/designs'
          element={
            <Content>
              <Design />
            </Content>
          }
        />
        <Route
          path='/content/websites'
          element={
            <Content>
              <Website />
            </Content>
          }
        />
        <Route
          path='/content/animations'
          element={
            <Content>
              <Animation />
            </Content>
          }
        />
        <Route
          path='/content/apps'
          element={
            <Content>
              <Apps />
            </Content>
          }
        />
        <Route
          path='/content/jobs/:jobId'
          element={
            <Content>
              <Job />
            </Content>
          }
        />
        <Route
          path='/content/sellers/:sellerId'
          element={
            <Content>
              <Seller />
            </Content>
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <div className='flex flex-col justify-between'>
              <Portfolio />
            </div>
          }
        />

        {/* Private routes */}
        <Route
          path='/profile/:userId/user'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path='/profile/:userId/applications'
          element={
            <RequireAuth>
              <ProfileApplications />
            </RequireAuth>
          }
        />
        <Route
          path='/profile/:userId/jobs'
          element={
            <RequireAuth>
              <ProfileJobOffers />
            </RequireAuth>
          }
        />
        <Route
          path='/profile/:userId/jobs/:jobId'
          element={
            <RequireAuth>
              <Offer />
            </RequireAuth>
          }
        />
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/users'
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
          <Route
          path='/admin/categories'
          element={
              <RequireAuth>
                  <Categories />
              </RequireAuth>
          }
          />
        <Route
          path='/admin/jobs'
          element={
            <RequireAuth>
              <Jobs />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/applications'
          element={
            <RequireAuth>
              <Applications />
            </RequireAuth>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default Router;
