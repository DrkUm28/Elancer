import React from "react";
import Contents from "..";
import Loading from "../../../components/loaders/Loading";
import { useQuery } from "react-query";
import * as api from "../../../services/categoriesApi";

const Websites = () => {
  const { data, isFetching } = useQuery(["content", "design"], () =>
    api.getCategoryJobs(1)
  );

  return (
    <Loading isLoading={isFetching}>
      <div className='flex'>{data && <Contents data={data.jobs} />}</div>
    </Loading>
  );
};

export default Websites;
