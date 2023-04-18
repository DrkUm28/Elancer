import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as api from "../../../services/jobsApi";
import { addApplication } from "../../../services/applicationsApi";
import Loading from "../../../components/loaders/Loading";
import Authservice from "../../../services/AuthService";
import InputWithLabels from "../../../components/inputs/InputWithLabels";

const Job = () => {
  const [offer, setOffer] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const localUser = Authservice.getIsLoggedIn();

  const { data, isFetching } = useQuery(["job", params.jobId], () =>
    api.getJob(params.jobId)
  );

  const { mutate } = useMutation(addApplication, {
    onSuccess: () => {
      navigate(`/profile/${localUser.id}/applications`);
    },
  });

  const onJobOffer = async () => {
    const currentUser = await Authservice.getCurrentUser();
    const application = {
      body: `User: ${currentUser.first_name} ${currentUser.last_name} - Applied for this job. E-Mail for contact is: ${currentUser.email}`,
      offer: offer,
      accepted: false,
      user_id: currentUser.id,
      job_id: data.id,
    };

    mutate(application);
  };

  return (
    <Loading isLoading={isFetching}>
      {data && (
        <div className='flex flex-wrap justify-center'>
          <div className='p-20 '>
            <div className='card card-side bg-neutral'>
              <img
                src={data.image_url}
                width='auto'
                height='auto'
                alt='Company Banner'
              />
              <div className='card-body w-96'>
                <h1 className='card-title '>{data.title}</h1>
                <div className='card-actions justify-start pb-10'>
                  <Link
                    to={`/content/sellers/${data.user.id}`}
                    className='btn-sm- btn-ghost'
                  >
                    Scholastics
                  </Link>
                </div>
                <p>{data.body}</p>
                <p className='pt-10'>Status: {data.status}</p>
                <p>Category: {data.category.name}</p>
                <div className='card-actions justify-center pt-10'>
                  <InputWithLabels
                    labelText={"Offer Ammount"}
                    inputName={"offer"}
                    inputType={"number"}
                    value={offer}
                    onChange={(e) => {
                      e.preventDefault();
                      setOffer(e.target.value);
                    }}
                  />
                  <button className='btn btn-primary' onClick={onJobOffer}>
                    Make an offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Loading>
  );
};

export default Job;
