import React, { Fragment, useState } from "react";
import Loading from "../../components/loaders/Loading";
import DynamicToolbar from "../../components/toolbars/DynamicToolbar";
import AddModal from "./offers/AddModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProfile } from "../../services/usersApi";
import { deleteJob } from "../../services/jobsApi";

const JobOffers = () => {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery(["jobs", params.userId], () =>
    getProfile(params.userId)
  );

  const { mutate } = useMutation(deleteJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs", params.userId]);
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

  const onShowClick = (id) => {
    navigate(`/profile/${params.userId}/jobs/${id}`);
  };

  return (
    <Loading isLoading={isFetching}>
      <DynamicToolbar
        labelText={"My applications"}
        options={
          <Fragment>
            <div className='flex flex-row space-x-2'>
              <button
                className='btn btn-sm btn-outline btn-success'
                onClick={() => toggleModal("add", !modals.add)}
              >
                <label>Add +</label>
              </button>

              <button
                className='btn btn-sm btn-outline btn-info'
                onClick={() => {
                  navigate(`/profile/${params.userId}`);
                }}
              >
                <label>Go back</label>
              </button>
            </div>
          </Fragment>
        }
      />

      <div className='container mx-auto'>
        <div className='overflow-x-auto shadow-md'>
          <table className='table w-full '>
            <thead>
              <tr>
                <th>Title</th>
                <th>Requirements</th>
                <th>Status</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.jobs?.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.requirements}</td>
                  <td>{job.status}</td>
                  <td>{job.category.name}</td>
                  <td className='flex flex-row space-x-4'>
                    <button
                      className='btn btn-sm btn-square btn-outline btn-info'
                      onClick={() => onShowClick(job.id)}
                    >
                      <FontAwesomeIcon icon={faEye} size='sm' />
                    </button>

                    <button
                      className='btn btn-sm btn-square btn-outline btn-error'
                      onClick={() => onDeleteClick(job.id)}
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

export default JobOffers;
