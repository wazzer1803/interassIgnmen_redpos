import React, { useState } from "react";
import {
  useDeleteItemByIdQuery,
  useGetAllDataQuery,
  useLazyDeleteItemByIdQuery,
} from "@/redux/api/Item_api";
import UpdatePopu from "./UpdatePopu";

const Table = ({
  handleSelectAll,
  selectAll,
  selectedRows,
  handleRowSelection,
  fetchData,
  refetch,
}: {
  handleSelectAll: any;
  selectAll: any;
  selectedRows: any;
  handleRowSelection: any;
  fetchData: any;
  refetch: any;
}) => {
  //delete

  //api call
  // console.log(fetchData?.data);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
            </th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone </th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Hobbies</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row, replace with your data mapping */}
          {fetchData?.data?.map((item: any, i: any) => {
            const id = i + 1;
            return (
              <TableRow
                key={i}
                id={id}
                handleRowSelection={handleRowSelection}
                item={item}
                i={i}
                selectedRows={selectedRows}
                refetch={refetch}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;

const TableRow = ({
  id,
  handleRowSelection,
  item,
  i,
  selectedRows,
  refetch,
}: {
  id: any;
  handleRowSelection: any;
  item: any;
  i: any;
  selectedRows: any;

  refetch: any;
}) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  //api
  const [
    deleteItemById,
    { isLoading: isLoadingForDelete, isError: isErrorForDelete, error },
  ] = useLazyDeleteItemByIdQuery();

  return (
    <>
      {isAddModalOpen && (
        <UpdatePopu item={item} closeAddPopup={closeAddModal} />
      )}
      <tr key={i}>
        <td className="px-4 py-2">
          <input
            type="checkbox"
            checked={selectedRows.includes(id)}
            onChange={() => handleRowSelection(id)}
          />
        </td>
        <td className="px-4 py-2">{i + 1}</td>
        <td className="px-4 py-2">{item.name}</td>
        <td className="px-4 py-2">{item.phone}</td>
        <td className="px-4 py-2">{item.email}</td>
        <td className="px-4 py-2">{item.hobbies}</td>
        <td className="px-4 py-2 flex">
          <button
            onClick={openAddModal}
            className="bg-yellow-500 text-white px-2 py-1 mr-2"
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 w-16 flex justify-center items-center"
            onClick={async () => {
              let deleteData = await deleteItemById({
                id: item?._id,
              });
              refetch();
            }}
          >
            {isLoadingForDelete ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
                ></path>
              </svg>
            ) : (
              "Delete"
            )}
          </button>
        </td>
      </tr>
    </>
  );
};
