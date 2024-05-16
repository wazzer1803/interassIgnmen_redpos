import React from "react";
interface SendTableSelectDataPopupProps {
  onSendMail: () => void;
  onCancel: () => void;
  isErrorEmail: any;
  isLoadingEmail: any;
  isSuccessEmail: any;
  error: any;
}
interface RequestError {
  data: {
    message: string;
  };
}
const SendTableSelectDataPopupEmail: React.FC<
  SendTableSelectDataPopupProps
> = ({
  onSendMail,
  onCancel,
  isErrorEmail,
  isLoadingEmail,
  isSuccessEmail,
  error,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md mx-auto rounded-md shadow-md">
        <p className="mb-4">Send mail to "info@redpositive.in"?</p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md"
            onClick={onSendMail}
          >
            {isLoadingEmail ? "sending..." : "send Mail"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        <div>
          {isSuccessEmail && (
            <p className="text-green-500 text-sm mt-2 text-center">
              Email send ! successfully
            </p>
          )}
          {/* Display error message */}
          {isErrorEmail && (
            <p className="text-red-500 text-sm mt-2 max-w-64">
              Error! please try agin later
              <br />
              {(error as RequestError)?.data?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendTableSelectDataPopupEmail;
