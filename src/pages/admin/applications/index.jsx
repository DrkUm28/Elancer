import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/applicationsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/loaders/Loading";
import ToolBar from "../../../components/toolbars/HeadingToolbar";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import AddModal from "./AddModal";

const Applications = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery("applications", api.getApplications);
  const { mutate } = useMutation(api.deleteApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries("applications");
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
          labelText={"Registered Applications"}
          onAdd={() => toggleModal("add", !modals.add)}
        />
        <div className='divider' />
        <div className='overflow-x-auto shadow-md'>
          <table className='table w-full '>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Aplicant Email</th>
                <th>Offer</th>
                <th>Body</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((application) => (
                <tr key={application.id}>
                  <td>{application.job.title}</td>
                  <td>{application.user.email}</td>
                  <td>{application.offer}</td>
                  <td>{application.body}</td>
                  <td>{application.job.category.name}</td>
                  <td className='flex flex-row space-x-4'>
                    <button
                      className='btn btn-sm btn-square btn-outline btn-error'
                      onClick={() => onDeleteClick(application.id)}
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

export default Applications;
