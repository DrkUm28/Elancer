import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/jobsApi";
import InputWithLabels from "../../../components/inputs/InputWithLabels";
import SelectInput from "../../../components/inputs/SelectInput";
import { callApi } from "../../../services/DataService";
import AuthService from "../../../services/AuthService";

const currentUser = AuthService.getIsLoggedIn();

const initialState = {
  title: "",
  requirements: "",
  body: "",
  status: "",
  user_id: currentUser?.id,
  category_id: "",
};

const AddJobOffer = ({ showModal, toggle }) => {
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await callApi("get", "categories");
    setCategories(response.data);
  };

  const { mutate } = useMutation(api.addJob, {
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
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
        <h3 className='font-bold text-lg'>Crear nuevo Trabajo</h3>
        <div className='w-full'>
          <InputWithLabels
            labelText={"Title"}
            inputName={"title"}
            value={state.title}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"Requirements"}
            inputName={"requirements"}
            value={state.requirements}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"Body"}
            inputName={"body"}
            value={state.body}
            onChange={handleOnChange}
          />
          <SelectInput
            labelText={"Status"}
            inputName={"status"}
            value={state.status}
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
            value={state.category_id}
            options={categories?.map((category) => {
              return { label: category.name, value: category.id };
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
export default AddJobOffer;
