import {useState} from "@wordpress/element";
import LoadingIcon from "./LoadingIcon";
import DialogModal from "../../../components/DialogModal";
import SecondaryButton from "../../../Components/SecondaryButton";
import DangerButton from "../../../Components/DangerButton";
import classNames from "classnames";
import {Post} from "../../../core/Ajax";
import useNotification from "../../../hooks/useNotification";

export default function Signature({site, signature, setSignature, DKIMVerified}) {
  const [emailEdit, setEmailEdit] = useState(false);
  const {notifyError, notifySuccess} = useNotification();

  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({name: signature.Name, reply_to_email: signature.ReplyToEmailAddress});

  const updateFormData = (e, name) => {
    setFormData({...formData, [name]: e.target.value})
  }

  const showEditForm = () => {
    setEmailEdit(true);
  }

  const hideEditForm = () => {
    setEmailEdit(false);
  }

  const resendConfirmation = (e) => {
    e.preventDefault();
    setLoading(true);
    const response = Post(inboxwp.ajaxurl, { signature_id: signature?.ID, action: 'inboxwp_resend_confirmation', hash: inboxwp.hash });
    response.then((res) => {
        notifySuccess(res?.data?.message || 'Confirmation email sent successfully');
    })
        .catch((err) => {
            notifyError(err?.data?.message || 'Something went wrong')
        })
        .finally(() => {
            setLoading(false)
        })
  }

  const handleDeleteModal = () => {
    setShowDeleteModal(! showDeleteModal);
  }

  const deleteSignature = () => {
    setLoading(true)
    const response = Post(inboxwp.ajaxurl, {
      signature_id: signature?.ID,
      action: 'inboxwp_delete_signature',
      hash: inboxwp.hash
    });
    response.then((res) => {
      handleDeleteModal();
      notifySuccess(res?.data?.message || 'Signature deleted successfully');
      setTimeout(() => {
        window.location.reload();
        }, 1000);
    })
        .catch((err) => {
            notifyError(err?.data?.message || 'Something went wrong')
        })
        .finally(() => {
            setLoading(false)
        })
  }
  const updateSignature = (e) => {
    e.preventDefault();
    setLoading(true);
    const response = Post(inboxwp.ajaxurl, {
        signature_id: signature?.ID,
        action: 'inboxwp_update_signature',
        hash: inboxwp.hash,
        ...formData
    });
    response.then((res) => {
        notifySuccess(res?.data?.message || 'Signature updated successfully');
        const signature = res?.data?.signature;
        if (signature) {
            setSignature(signature);
        }
        hideEditForm();
    })
        .catch((err) => {
            notifyError(err?.data?.message || 'Something went wrong')
        })
        .finally(() => {
            setLoading(false)
        })
  }

  return (
      <div className="inboxwp-flex">
        <div className="inboxwp-flex inboxwp-w-1/3">
          {!signature?.Confirmed && !DKIMVerified ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>) : ''}
          <p className="inboxwp-text-[15px] inboxwp-text-gray-900 inboxwp-ml-1">{signature?.EmailAddress}</p>
        </div>

        {emailEdit ?
            (<div className="inboxwp-flex inboxwp-justify-end inboxwp-w-2/3">
              <form className="inboxwp-flex" onSubmit={updateSignature}>
                <div className="inboxwp-mr-2">
                  <input
                      id="name"
                      type="text"
                      className=""
                      value={formData.name}
                      onChange={e => updateFormData(e, 'name')}
                  />
                </div>
                <div>
                  <input
                      id="email"
                      type="email"
                      className="inboxwp-w-60"
                      value={formData.reply_to_email}
                      onChange={e => updateFormData(e, 'reply_to_email')}
                      placeholder={'Replay to Email (Optional)'}
                  />
                </div>

                  {loading ?
                      <div className={'inboxwp-w-4 inboxwp-ml-4 inboxwp-mr-8'}><LoadingIcon /></div>
                      :
                      <button type="submit"
                              className="inboxwp-ml-2 inboxwp-text-white inboxwp-bg-blue-700 hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-ring-blue-300 inboxwp-font-medium inboxwp-rounded-md inboxwp-text-sm inboxwp-px-5 inboxwp-py-1.5 inboxwp-mr-2 inboxwp-mb-2 dark:inboxwp-bg-blue-600 dark:hover:inboxwp-bg-blue-700 focus:inboxwp-outline-none dark:focus:inboxwp-ring-blue-800">
                          Save
                      </button>
                  }
                <button type="button"
                        className="inboxwp-text-gray-900 inboxwp-bg-white inboxwp-border inboxwp-border-gray-300 focus:inboxwp-outline-none hover:inboxwp-bg-gray-100 focus:inboxwp-ring-4 focus:inboxwp-ring-gray-200 inboxwp-font-medium inboxwp-rounded-md inboxwp-text-sm inboxwp-px-5 inboxwp-py-1.5 inboxwp-mr-2 inboxwp-mb-2 dark:inboxwp-bg-gray-800 dark:inboxwp-text-white dark:inboxwp-border-gray-600 dark:hover:inboxwp-bg-gray-700 dark:hover:inboxwp-border-gray-600 dark:focus:inboxwp-ring-gray-700"
                        onClick={hideEditForm}
                >
                  Cancel
                </button>

              </form>
            </div>)
            :
            (<div className={"inboxwp-flex inboxwp-justify-between inboxwp-w-2/3"}>
              <div className="inboxwp-flex">
                <div className={`flex hover:inboxwp-text-blue-500 hover:inboxwp-cursor-pointer`} onClick={showEditForm}>
                  <p className="inboxwp-text-[15px] inboxwp-ml-1">{signature?.Name}</p>
                </div>

                <div className={`inboxwp-flex inboxwp-ml-3 inboxwp-ml-10 inboxwp-text-gray-900 hover:inboxwp-text-blue-500 hover:inboxwp-cursor-pointer`} onClick={showEditForm}>
                  {signature?.ReplyToEmailAddress ?
                      (<p className={`inboxwp-ml-1 inboxwp-text-[15px]`}>{signature?.ReplyToEmailAddress || 'Replay to email'}</p>)
                      :
                      (<p className="inboxwp-text-gray-400 inboxwp-text-[15px] hover:inboxwp-text-blue-500 inboxwp-underline underline-offset-8 inboxwp-italic">Set Reply To</p>)}

                </div>
              </div>

              <div className="inboxwp-flex inboxwp-space-x-1">
                {!signature?.Confirmed ? (
                    <>
                      <div className="inboxwp-flex inboxwp-mr-6 inboxwp-text-red-600 inboxwp-font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-6 inboxwp-h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className={'inboxwp-text-[15px]'}>Not confirmed</p>
                      </div>

                      {loading ?
                          <LoadingIcon/>
                          :
                          <button
                              type={'button'}
                              className="inboxwp-rounded inboxwp-bg-white inboxwp-px-2 inboxwp-py-1 inboxwp-text-xs inboxwp-font-bold inboxwp-text-gray-600 inboxwp-shadow-sm inboxwp-ring-1 inboxwp-ring-inset inboxwp-ring-gray-300 hover:inboxwp-bg-gray-50"
                              onClick={resendConfirmation}
                              disabled={loading}
                          >
                            Resend
                          </button>
                      }
                    </>
                ): ''}

                {loading ? (<LoadingIcon/>) :
                    (<svg onClick={handleDeleteModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inboxwp-w-5 inboxwp-h-5 inboxwp-text-gray-400 hover:inboxwp-text-gray-900 hover:inboxwp-cursor-pointer">
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
                className={classNames('inboxwp-ml-2')}
            >
              Delete
            </DangerButton>
          </DialogModal.Footer>
        </DialogModal>

      </div>
  )
}
