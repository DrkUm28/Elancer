import React from "react";
import Loading from "../../../components/loaders/Loading";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProfile } from "../../../services/usersApi";

const Seller = () => {
  const params = useParams();

  const { data, isFetching } = useQuery(["seller", params.sellerId], () =>
    getProfile(params.sellerId)
  );

  return (
    <Loading isLoading={isFetching}>
      <div className='p-10 '>
        <div className='flex flex-row justify-center'>
          <div className='overflow-x-auto'>
            <h2 className='card-title '>Posted jobs</h2>
            <table className='table  w-full'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job title</th>
                  <th>Status</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {data?.jobs?.map((job) => (
                  <tr key={`sl-jb-${job.id}`}>
                    <th>{job.id}</th>
                    <td>{job.title}</td>
                    <td>{job.status}</td>
                    <th>
                      <Link
                        to={`/content/jobs/${job.id}`}
                        className={`btn ${
                          job.status === "complete"
                            ? "btn-disabled"
                            : "btn-primary"
                        }`}
                      >
                        View
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='pl-20 '>
            <div className='card w-96 bg-neutral'>
              <div className='card-body w-96'>
                <h1 className='card-title '>{`${data?.first_name} ${data?.last_name}`}</h1>
                <p>{data?.email}</p>
              </div>
              <figure>
                <img
                  src={data?.avatar_url}
                  width='360'
                  height='auto'
                  alt='this'
                ></img>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Seller;
