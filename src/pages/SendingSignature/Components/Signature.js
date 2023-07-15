import TextInput from "../../../Components/TextInput";
import {useState} from "@wordpress/element";
import axios from "axios";
import LoadingIcon from "./LoadingIcon";
import DialogModal from "../../../components/DialogModal";
import SecondaryButton from "../../../Components/SecondaryButton";
import DangerButton from "../../../Components/DangerButton";
import classNames from "classnames";

export default function Signature({site, signature, DKIMVerified}) {
  const [emailEdit, setEmailEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showEditForm = () => {
    setEmailEdit(true);
  }

  const hideEditForm = () => {
    setEmailEdit(false);
  }

  const resendConfirmation = (e) => {
    e.preventDefault();
    setLoading(true);
    // axios.post(route('signatures.confirm.resent', {site: site, signatureId: signature?.ID}), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   }
    // })
    //   .then(response => {
    //     alert(response.data.message);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  const handleDeleteModal = () => {
    setShowDeleteModal(! showDeleteModal);
  }

  const deleteSignature = () => {
    setLoading(true)
    // deleteForm.delete(route('signatures.delete', {site: site, signatureId: signature?.ID}), {
    //   onFinish: () => {
    //     setShowDeleteModal(false);
    //     setLoading(false);
    //   }
    // });
  }
  const updateSignature = (e) => {
    e.preventDefault();
    setLoading(true);
    // form.put(route('signatures.update', {site: site, signatureId: signature?.ID}), {
    //   onFinish: () => {
    //     hideEditForm();
    //     setLoading(false);
    //   }
    // });
  }

  return (
    <div className="flex">
      <div className="flex w-1/3">
        {!signature?.Confirmed && !DKIMVerified ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>) : ''}
        <p className="text-gray-900 ml-1">{signature?.EmailAddress}</p>
      </div>

      {emailEdit ?
        (<div className="flex justify-end w-2/3">
          <form className="flex" onSubmit={updateSignature}>
            <div className="mr-2">
              <TextInput
                id="name"
                type="text"
                className=""
                // value={form.data.name}
                // onChange={e => form.setData('name', e.currentTarget.value)}
              />
            </div>
            <div>
              <TextInput
                id="email"
                type="email"
                className="w-60"
                // value={form.data.reply_to_email}
                // onChange={e => form.setData('reply_to_email', e.currentTarget.value)}
                placeholder={'Replay to Email (Optional)'}
              />
            </div>

            <button type="submit"
                    className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Save
            </button>
            <button type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={hideEditForm}
            >
              Cancel
            </button>

          </form>
        </div>)
        :
        (<div className={"flex justify-between w-2/3"}>
          <div className="flex">
            <div className={`flex hover:text-blue-500 hover:cursor-pointer`} onClick={showEditForm}>
              <p className="ml-1">{signature?.Name}</p>
            </div>

            <div className={`flex ml-3 ml-10 text-gray-900 hover:text-blue-500 hover:cursor-pointer`} onClick={showEditForm}>
              {signature?.ReplyToEmailAddress ?
                (<p className={`ml-1`}>{signature?.ReplyToEmailAddress || 'Replay to email'}</p>)
                :
                (<p className="text-gray-400 hover:text-blue-500 underline underline-offset-8 italic">Set Reply To</p>)}

            </div>
          </div>

          <div className="flex space-x-1">
            {!signature?.Confirmed ? (
              <>
                <div className="flex mr-6 text-red-600 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Not confirmed</p>
                </div>

                <button
                  type={'button'}
                  className="rounded bg-white px-2 py-1 text-xs font-bold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={resendConfirmation}
                  disabled={loading}
                >
                  {loading ?
                    (<LoadingIcon/>) : 'Resend'}
                </button>
              </>
            ): ''}

            {loading ? (<LoadingIcon/>) :
              (<svg onClick={handleDeleteModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>)
            }
          </div>
        </div>)}

      <DialogModal isOpen={showDeleteModal} maxWidth="md" onClose={handleDeleteModal}>
        <DialogModal.Content title="Delete Sender Signature">
          Are you sure you want to delete the Sender Signature?
        </DialogModal.Content>

        <DialogModal.Footer>
          <SecondaryButton onClick={handleDeleteModal}>Cancel</SecondaryButton>

          <DangerButton
            onClick={deleteSignature}
            // className={classNames('ml-2', { 'opacity-25': deleteForm.processing })}
            className={classNames('ml-2')}
            // disabled={deleteForm.processing}
          >
            Delete
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>

    </div>
  )
}
