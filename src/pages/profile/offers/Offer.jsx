import React, { useState, useEffect } from "react";
import Loading from "../../../components/loaders/Loading";
import GridContainer from "../../../components/layout/grid/GridContainer";
import GridCard from "../../../components/layout/grid/GridCard";
import InputWithLabels from "../../../components/inputs/InputWithLabels";
import SelectInput from "../../../components/inputs/SelectInput";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getJob, updateJob, updateJobImage } from "../../../services/jobsApi";
import { callApi } from "../../../services/DataService";

const Offer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [job, setJob] = useState({
    title: "",
    requirements: "",
    body: "",
    status: "",
    user_id: params.userId,
    category_id: "",
  });

  const { data, isFetching } = useQuery(
    ["offer", params.jobId],
    () => getJob(params.jobId),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate } = useMutation(updateJob, {
    onSuccess: () => {
      navigate(-1);
    },
  });

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setJob({
      id: data?.id,
      title: data?.title,
      requirements: data?.requirements,
      body: data?.body,
      status: data?.status,
      user_id: params.userId,
      category_id: data?.category?.id,
    });
    // eslint-disable-next-line
  }, [data]);

  const loadCategories = async () => {
    const response = await callApi("get", "categories");
    setCategories(response.data);
  };

  const handleOnClose = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    mutate(job);
  };

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setJob({
      ...job,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e) => {
    setJob({
      ...job,
      image: e.target.files[0],
    });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("image", job.image);
    updateJobImage(job.id, formData);
    navigate(0);
  };

  return (
    <Loading isLoading={isFetching}>
      <div className='container mx-auto'>
        <GridContainer>
          <GridCard classes={"col-span-12"}>
            <div className='flex justify-center'>
              <span className='text-xl font-semibold'>Job Offer</span>
            </div>
            <div className='w-full'>
              <div className='grid gap-1 sm:grid-cols-1 lg:grid-cols-2'>
                <InputWithLabels
                  labelText={"Title"}
                  inputName={"title"}
                  value={job.title}
                  onChange={handleOnChange}
                />
                <InputWithLabels
                  labelText={"Requirements"}
                  inputName={"requirements"}
                  value={job.requirements}
                  onChange={handleOnChange}
                />
                <InputWithLabels
                  labelText={"Body"}
                  inputName={"body"}
                  value={job.body}
                  onChange={handleOnChange}
                />
                <SelectInput
                  labelText={"Status"}
                  inputName={"status"}
                  value={job.status}
                  options={[
                    { label: "Active", value: "active" },
                    { label: "In Progress", value: "in_progress" },
                    { label: "Complete", value: "complete" },
                  ]}
                  onChange={handleOnChange}
                />
                <SelectInput
                  labelText={"Category"}
                  inputName={"category_id"}
                  value={job.category_id}
                  options={categories?.map((category) => {
                    return { label: category.name, value: category.id };
                  })}
                  onChange={handleOnChange}
                />
              </div>

              <div className='flex justify-evenly my-5'>
                <button
                  className='btn btn-sm btn-outline'
                  onClick={handleOnClose}
                >
                  <span>Go Back</span>
                </button>

                <button
                  className='btn btn-sm  btn-outline btn-success'
                  onClick={handleUpdate}
                >
                  <span>Save</span>
                </button>
              </div>
            </div>
          </GridCard>
          <GridCard classes={"col-span-12"}>
            <div className='flex justify-center'>
              <span className='text-xl font-semibold'>Banner</span>
            </div>
            <div className='w-full'>
              <div>
                {data?.image_url ? (
                  <div className='flex justify-center'>
                    <img
                      src={data?.image_url}
                      width='360'
                      height='auto'
                      alt='this'
                    ></img>
                  </div>
                ) : (
                  "Upload a banner"
                )}
              </div>
              <div className='flex justify-evenly my-5'>
                <input
                  type='file'
                  accept='image/*'
                  placeholder='Profile picture'
                  multiple={false}
                  onChange={handleImageChange}
                />
                <button
                  className='btn btn-sm  btn-outline btn-success'
                  onClick={handleImageSubmit}
                >
                  <span>Update Banner</span>
                </button>
              </div>
            </div>
          </GridCard>
        </GridContainer>
      </div>
    </Loading>
  );
};

export default Offer;
