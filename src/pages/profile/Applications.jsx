import React, { Fragment } from "react";
import { getApplications } from "../../services/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/loaders/Loading";
import ApplicationCard from "../../components/cards/ApplicationCard";
import DynamicToolbar from "../../components/toolbars/DynamicToolbar";

const Applications = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isFetching } = useQuery(["profile", params.userId], () =>
    getApplications(params.userId)
  );

  return (
    <Loading isLoading={isFetching}>
      <DynamicToolbar
        labelText={"My applications"}
        options={
          <Fragment>
            <div className='flex flex-row space-x-2'>
              <button
                className='btn btn-sm btn-outline btn-info'
                onClick={() => {
                  navigate(`/profile/${params.userId}`);
                }}
              >
                <label>Go back</label>
              </button>
            </div>
          </Fragment>
        }
      />
      <div className='flex flex-wrap justify-center'>
        {data?.applications?.map((app) => (
          <ApplicationCard
            imgSrc={app.job.image_url}
            linkText={app.job.title}
            linkTo={app.job.id}
            offerAmmount={app.offer}
            offerStatus={app.accepted ? "Accepted" : "Pending"}
          />
        ))}
      </div>
    </Loading>
  );
};

export default Applications;
