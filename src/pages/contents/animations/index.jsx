import React from "react";
import Contents from "..";
import Loading from "../../../components/loaders/Loading";
import { useQuery } from "react-query";
import * as api from "../../../services/categoriesApi";

const Animation = () => {
  const { data, isFetching } = useQuery(["content", "design"], () =>
    api.getCategoryJobs(3)
  );

  return (
    <Loading isLoading={isFetching}>
      <div className='flex'>{data && <Contents data={data.jobs} />}</div>
    </Loading>
  );
};

export default Animation;
