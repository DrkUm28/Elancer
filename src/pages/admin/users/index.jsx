import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/usersApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/loaders/Loading";
import ToolBar from "../../../components/toolbars/HeadingToolbar";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import AddModal from "./AddModal";

const Users = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery("users", api.getUsers);
  const { mutate } = useMutation(api.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    confirm: false,
  });

  const toggleModal = (modal, value) => {
    setModals({
      ...modals,
      [modal]: value,
    });
  };

  const onConfirmModalToggle = () => {
    toggleModal("confirm", !modals.confirm);
    setDeleteTarget(null);
  };

  const onDeleteClick = (id) => {
    onConfirmModalToggle();
    setDeleteTarget(id);
  };

  const onDeleteConfirm = () => {
    mutate(deleteTarget);
    onConfirmModalToggle();
  };

  return (
    <Loading isLoading={isFetching}>
      <div className='container mx-auto'>
        <ToolBar
          labelText={"Registered Users"}
          onAdd={() => toggleModal("add", !modals.add)}
        />
        <div className='divider' />
        <div className='overflow-x-auto shadow-md'>
          <table className='table w-full '>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_role}</td>
                  <td className='flex flex-row space-x-4'>
                    <button
                      className='btn btn-sm btn-square btn-outline btn-error'
                      onClick={() => onDeleteClick(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} size='sm' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmModal
          showModal={modals.confirm}
          toggle={onConfirmModalToggle}
          onConfirm={onDeleteConfirm}
        />
        <AddModal
          showModal={modals.add}
          toggle={() => toggleModal("add", !modals.add)}
        />
      </div>
    </Loading>
  );
};

export default Users;
