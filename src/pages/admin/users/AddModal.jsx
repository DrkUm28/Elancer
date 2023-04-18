import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/usersApi";
import InputWithLabels from "../../../components/inputs/InputWithLabels";
import SelectInput from "../../../components/inputs/SelectInput";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  user_role: 3,
};

const AddUser = ({ showModal, toggle }) => {
  const [state, setState] = useState(initialState);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(api.addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
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
            labelText={"First Name"}
            inputName={"first_name"}
            value={state.first_name}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"Last Name"}
            inputName={"last_name"}
            value={state.last_name}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"E-Mail"}
            inputName={"email"}
            value={state.email}
            onChange={handleOnChange}
          />
          <InputWithLabels
            labelText={"Temporal password"}
            inputName={"password"}
            value={state.password}
            inputType={"password"}
            onChange={handleOnChange}
          />

          <SelectInput
            labelText={"Role"}
            inputName={"user_role"}
            value={state.user_role}
            options={[
              { label: "Admin", value: 1 },
              { label: "Freelancer", value: 2 },
              { label: "Customer", value: 3 },
            ]}
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

export default AddUser;
