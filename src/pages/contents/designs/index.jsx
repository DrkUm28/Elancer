import React from "react";
import Contents from "..";
import Loading from "../../../components/loaders/Loading";
import { useQuery } from "react-query";
import * as api from "../../../services/categoriesApi";

const Design = () => {
  const { data, isFetching } = useQuery(["content", "design"], () =>
    api.getCategoryJobs(2)
  );

  return (
    <Loading isLoading={isFetching}>
      <div className='flex'>{data && <Contents data={data.jobs} />}</div>
    </Loading>
  );
};

export default Design;
