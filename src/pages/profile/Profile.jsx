import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { omit } from "lodash";
import * as api from "../../services/usersApi";
import AuthService from "../../services/AuthService";
import GridContainer from "../../components/layout/grid/GridContainer";
import GridCard from "../../components/layout/grid/GridCard";
import InputWithLabels from "../../components/inputs/InputWithLabels";
import SelectInput from "../../components/inputs/SelectInput";
import Loading from "../../components/loaders/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  user_role: 3,
  avatar: null,
};

const Profile = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(api.updateUser, {
    onSuccess: () => navigate(-1),
  });

  useEffect(() => {
    async function fetchUser() {
      const usrData = await getUserData();
      setState({ ...usrData, password: "" });
    }

    fetchUser();
  }, []);

  const getUserData = async () => {
    const user = await AuthService.getCurrentUser();
    const userData = omit(user, ["password", "createdAt", "updatedAt"]);
    return userData;
  };

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e) => {
    setState({
      ...state,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(state);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("avatar", state.avatar);

    api.updateProfilePic(state.id, formData);
    navigate(0);
  };

  return (
    <Loading isLoading={isLoading}>
      <div className='container mx-auto'>
        <GridContainer>
          <GridCard classes={"col-span-12"}>
            <div className='flex justify-center'>
              <span className='text-xl font-semibold'>
                <FontAwesomeIcon icon={faUser} size='sm' /> Profile
              </span>
            </div>
            <GridContainer>
              <GridCard classes={"col-span-8"}>
                <div>
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
                    labelText={"Password (required)"}
                    inputName={"password"}
                    value={state.password}
                    inputType={"password"}
                    onChange={handleOnChange}
                  />

                  {state.user_role === 1 && (
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
                  )}

                  <div className='modal-action'>
                    <button
                      className='btn btn-sm btn-outline'
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='btn btn-sm btn-outline btn-success'
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </GridCard>

              <GridCard classes={"col-span-4"}>
                {state.avatar_url ? (
                  <div className='flex justify-center'>
                    <div className='avatar'>
                      <div className='w-24 rounded'>
                        <img src={state.avatar_url} alt='profile avatar' />
                      </div>
                    </div>
                  </div>
                ) : (
                  "Upload a profile picture"
                )}

                <input
                  type='file'
                  accept='image/*'
                  placeholder='Profile picture'
                  multiple={false}
                  onChange={handleImageChange}
                />
                <button
                  className='btn btn-sm btn-outline btn-success'
                  onClick={handleImageSubmit}
                >
                  Save avatar
                </button>
              </GridCard>
            </GridContainer>
          </GridCard>
        </GridContainer>
      </div>
    </Loading>
  );
};

export default Profile;
