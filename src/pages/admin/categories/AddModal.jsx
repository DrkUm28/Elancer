import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/categoriesApi";
import InputWithLabels from "../../../components/inputs/InputWithLabels";

const initialState = {
  name: "",
};

const AddCategory = ({ showModal, toggle }) => {
  const [state, setState] = useState(initialState);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(api.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
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
            labelText={"Category Name"}
            inputName={"name"}
            value={state.name}
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

export default AddCategory;
