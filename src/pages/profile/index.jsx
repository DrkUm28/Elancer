import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProfile } from "../../services/usersApi";
import Loading from "../../components/loaders/Loading";
import DynamicToolbar from "../../components/toolbars/DynamicToolbar";
import ContentCard from "../../components/cards/ContentCard";
import AuthService from "../../services/AuthService";

const Portfolio = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = AuthService.getIsLoggedIn();

  const { data, isFetching } = useQuery(["profile", params.userId], () =>
    getProfile(params.userId)
  );

  const onUserProfileClick = () => {
    navigate(`/profile/${currentUser.id}/user`);
  };

  const onMyApplicationsClick = () => {
    navigate(`/profile/${currentUser.id}/applications`);
  };

  const onManageJobsClick = () => {
    navigate(`/profile/${currentUser.id}/jobs`);
  };

  const getToolbarOptions = () => {
    if (currentUser.role === "client") {
      return (
        <button
          className='btn btn-sm btn-outline btn-success'
          onClick={onManageJobsClick}
        >
          <label>Manage my job offers</label>
        </button>
      );
    }

    if (currentUser.role === "freelance") {
      return (
        <button
          className='btn btn-sm btn-outline btn-success'
          onClick={onMyApplicationsClick}
        >
          <label>View my applications</label>
        </button>
      );
    }

    return "";
  };

  const getContent = () => {
    if (data?.jobs?.length > 0) {
      return data?.jobs?.map((job) => (
        <ContentCard
          key={`job-${job.id}`}
          imgSrc={job.image_url}
          linkTo={`/content/jobs/${job.id}`}
          linkText={job.title}
        />
      ));
    }

    return (
      <div className='hero pt-10'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hello there</h1>
            <p className='py-6'>
              Your current job list looks kind of empty, why dont we add
              something? Once you get a job approved it will get listed here, so
              shall we?
            </p>
            <button className='btn btn-sm btn-outline btn-success'>
              Apply for a job
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Loading isLoading={isFetching}>
      <DynamicToolbar
        labelText={"User jobs profile"}
        options={
          <Fragment>
            {parseInt(currentUser.id) === parseInt(params.userId) ? (
              <div className='flex flex-row space-x-2'>
                {getToolbarOptions()}
                <button
                  className='btn btn-sm btn-outline btn-success'
                  onClick={onUserProfileClick}
                >
                  <label>Edit user data</label>
                </button>
              </div>
            ) : (
              ""
            )}
          </Fragment>
        }
      />

      <div className='flex flex-wrap justify-center'>{getContent()}</div>
    </Loading>
  );
};

export default Portfolio;
