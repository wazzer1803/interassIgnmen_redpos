"use client";
import {
  useCreateNewItemMutation,
  useGetAllDataQuery,
} from "@/redux/api/Item_api";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  name: string;
  email: string;
  phone: string;
  hobbies: string;
};

interface RequestError {
  data: {
    message: string;
  };
}
const PopUpFROM = ({ closeAddPopup }: { closeAddPopup: any }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const [createItem, { isLoading, isError, isSuccess, error }] =
    useCreateNewItemMutation();
  const { refetch } = useGetAllDataQuery({});
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // api call
    const new_item = await createItem(data);
    refetch();
    setTimeout(() => {
      closeAddPopup();
    }, 5000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md mx-auto rounded-md shadow-md">
          <h1 className="text-2xl text-center pb-3 text-red-600">
            Create new data Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Name errors={errors} register={register} />
            <Phone errors={errors} register={register} />
            <Email errors={errors} register={register} />
            <Hobbies errors={errors} register={register} />
            <FromControls closeAddPopup={closeAddPopup} isLoading={isLoading} />
            {isSuccess && (
              <p className="text-green-500 text-sm mt-2 text-center">
                Item created successfully!
              </p>
            )}
            {/* Display error message */}
            {isError && (
              <p className="text-red-500 text-sm mt-2 max-w-64">
                Error!!!!! creating item. Please try again.
                <br />
                {(error as RequestError)?.data?.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default PopUpFROM;

const FromControls = ({
  closeAddPopup,
  isLoading,
}: {
  closeAddPopup: any;
  isLoading: any;
}) => {
  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={closeAddPopup}
        className="bg-red-500 text-white px-4 py-2 mr-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 flex items-center justify-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
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
          "Save"
        )}
      </button>
    </div>
  );
};
const Hobbies = ({ errors, register }: { errors: any; register: any }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="hobbies"
      >
        Hobbies
      </label>
      <input
        type="text"
        id="hobbies"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter hobbies"
        {...register("hobbies", {
          required: "hobbies is required",
        })}
      />
      {errors.hobbies && (
        <p className="text-red-500 text-sm mt-1">{errors?.hobbies?.message}</p>
      )}
    </div>
  );
};
const Email = ({ errors, register }: { errors: any; register: any }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter email"
        {...register("email", {
          required: "email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
            message: "invalid email",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>
      )}
    </div>
  );
};
const Phone = ({ errors, register }: { errors: any; register: any }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="phone"
      >
        Phone Number
      </label>
      <input
        type="text"
        id="phone"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter phone number"
        {...register("phone", {
          required: "phone is required",
          pattern: {
            value: /^\d+$/,
            message: "must contain only numbers",
          },
          maxLength: {
            value: 10,
            message: "number length must be 10",
          },
          minLength: {
            value: 10,
            message: "number length must be 10",
          },
        })}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors?.phone?.message}</p>
      )}
    </div>
  );
};
const Name = ({ errors, register }: { errors: any; register: any }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        Name
      </label>
      <input
        type="text"
        id="name"
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors.name ? "border-red-500" : ""
        }`}
        placeholder="Enter name"
        {...register("name", {
          required: "name is required",
        })}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
      )}
    </div>
  );
};
