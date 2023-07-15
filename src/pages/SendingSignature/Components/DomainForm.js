import React, {useState} from "@wordpress/element";
import InputError from '../../../components/InputError';
import DialogModal from "../../../components/DialogModal";
import InputLabel from "../../../components/InputLabel";
import useNotification from "../../../hooks/useNotification";
export default function DomainForm ({verifyDomain, cancelDomainAdding, loading}) {
    const [domain, setDomain] = useState('');
    const [errors, setErrors] = useState([]);
    const {notifySuccess, notifyError} = useNotification();

    const onSuccess = (res) => {
       notifySuccess(res.message);
        cancelDomainAdding();
    }

    const onError = (err) => {
        console.log(err);
        notifyError(err.message);
    }

    const submit = (e) => {
        e.preventDefault();
        verifyDomain({
            domain,
            onSuccess,
            onError,
        });
    }

    return (
        <form onSubmit={submit}>
            <DialogModal.Content title="Add a domain">
                <div>
                    <InputLabel htmlFor="domain">Domain</InputLabel>
                    <input
                        id="domain"
                        type="text"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full"
                        value={domain}
                        onChange={e => setDomain( e.currentTarget.value)}
                        placeholder="A valid domain name"
                    />
                    <InputError className="inboxwp-mt-2" message={errors?.domain} />
                </div>
            </DialogModal.Content>

            <DialogModal.Footer>
                <button type="button"
                        className="inboxwp-rounded-md inboxwp-bg-white inboxwp-px-2.5 inboxwp-py-2 inboxwp-text-sm inboxwp-font-semibold inboxwp-text-gray-900 inboxwp-shadow-sm inboxwp-ring-1 inboxwp-ring-inset inboxwp-ring-gray-300 hover:inboxwp-bg-gray-50"
                        onClick={cancelDomainAdding}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="hover:inboxwp-cursor-pointer inboxwp-ml-3 inboxwp-inline-flex inboxwp-items-center inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-medium inboxwp-text-center inboxwp-text-white inboxwp-bg-blue-700 inboxwp-rounded-md hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 dark:inboxwp-bg-blue-600 dark:hover:inboxwp-bg-blue-700 dark:focus:inboxwp-ring-blue-800"
                    disabled={loading}
                >
                    Verify Domain
                </button>
            </DialogModal.Footer>
        </form>
    );
}