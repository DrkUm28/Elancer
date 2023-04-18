import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as api from "../../../services/categoriesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/loaders/Loading";
import ToolBar from "../../../components/toolbars/HeadingToolbar";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import AddModal from "./AddModal";

const Categories = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery("categories", api.getCategories);
  const { mutate } = useMutation(api.deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
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
          labelText={"Existing Categories"}
          onAdd={() => toggleModal("add", !modals.add)}
        />
        <div className='divider' />
        <div className='overflow-x-auto shadow-md'>
          <table className='table w-full '>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category) => (
                <tr key={category.id}>
                  <td>{category.id.toString()}</td>
                  <td>{category.name}</td>
                  <td className='flex flex-row space-x-4'>
                    <button
                      className='btn btn-sm btn-square btn-outline btn-error'
                      onClick={() => onDeleteClick(category.id)}
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

export default Categories;
