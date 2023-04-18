import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/applicationsApi";
import InputWithLabels from "../../../components/inputs/InputWithLabels";
import SelectInput from "../../../components/inputs/SelectInput";
import { callApi } from "../../../services/DataService";

const initialState = {
  body: "",
  offer: "",
  accepted: false,
  user_id: "",
  category_id: "",
  job_id: "",
};

const AddApplication = ({ showModal, toggle }) => {
  const [state, setState] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    loadUsers();
    loadCategories();
    loadJobs();
  }, []);

  const loadUsers = async () => {
    const response = await callApi("get", "users");
    setUsers(response.data);
  };

  const loadCategories = async () => {
    const response = await callApi("get", "categories");
    setCategories(response.data);
  };

  const loadJobs = async () => {
    const response = await callApi("get", "jobs");
    setJobs(response.data);
  };

  const { mutate } = useMutation(api.addApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries("applications");
    },
  });

  const onClose = () => {
    setState(initialState);
    toggle();
  };

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(state);

    onClose();
  };

  return (
    <div className={`modal ${showModal && "modal-open"}`}>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Crear nuevo registro</h3>
        <div className='w-full'>
          <InputWithLabels
            labelText={"Body"}
            inputName={"body"}
            value={state.body}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"Offer"}
            inputName={"offer"}
            value={state.offer}
            onChange={handleOnChange}
          />
          <SelectInput
            labelText={"Publisher"}
            inputName={"user_id"}
            value={state.user_id}
            options={users?.map((user) => {
              return { label: user.first_name, value: user.id };
            })}
            onChange={handleOnChange}
          />
          <SelectInput
            labelText={"Category"}
            inputName={"category_id"}
            value={state.category_id}
            options={categories?.map((category) => {
              return { label: category.name, value: category.id };
            })}
            onChange={handleOnChange}
          />
          <SelectInput
            labelText={"Jobs"}
            inputName={"job_id"}
            value={state.job_id}
            options={jobs?.map((jobs) => {
              return { label: jobs.title, value: jobs.id };
            })}
            onChange={handleOnChange}
          />
        </div>
        <div className='modal-action'>
          <button className='btn btn-sm btn-outline' onClick={onClose}>
            Close
          </button>
          <button
            className='btn btn-sm btn-outline btn-success'
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddApplication;
