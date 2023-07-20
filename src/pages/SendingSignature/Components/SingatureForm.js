import InputLabel from "../../../components/InputLabel";
import {Link, useNavigate} from "react-router-dom";
import InputError from "../../../components/InputError";
import {useState} from "@wordpress/element";
import {Post} from "../../../core/Ajax";
import useNotification from "../../../hooks/useNotification";
import LoadingIcon from "./LoadingIcon";

export default function SignatureForm({setCreateSignature}) {
    const [formData, setFormData] = useState({
        email: '',
        from_name: '',
        replay_to_email: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {notifyError, notifySuccess} = useNotification();

    const setFormValue = (e, name) => {
        setFormData({...formData, [name]: e.target.value})
    }

    const [errors, setErrors] = useState({});

    const addSignature = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.email) {
            setErrors({...errors, email: 'Email is required'});
            setLoading(false);
            return;
        }
        if (!formData.from_name) {
            setErrors({...errors, from_name: 'From Name is required'});
            setLoading(false);
            return;
        }

        const response = Post(inboxwp.ajaxurl, {...formData, action: 'inboxwp_add_signature', hash: inboxwp.hash});
        response.then((res) => {
            notifySuccess(res?.data?.message || 'Signature added successfully');
            navigate('/sending-signatures');
        })
            .catch((err) => {

                notifyError(err?.data?.message || 'Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="inboxwp-w-2/4 inboxwp-overflow-hidden inboxwp-p-5 inboxwp-bg-white inboxwp-shadow inboxwp-border sm:inboxwp-rounded inboxwp-mb-8">
            <div className="inboxwp-mb-10">
                <h2 className="inboxwp-text-xl inboxwp-font-bold inboxwp-text-gray-900">Add a new Signature</h2>
                <p className="text-md">Sender Signatures are the From addresses that your subscribers see when they receive email from you. You need to be confirmed to verify ownership.</p>
            </div>

            <form onSubmit={addSignature}>
                <div className="">
                    <InputLabel htmlFor="email">"From" Email</InputLabel>
                    <input
                        id="email"
                        type="email"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full"
                        value={formData.email}
                        onChange={e => setFormValue(e, 'email')}
                        placeholder={'Enter from email address'}
                        onFocus={() => setErrors({...errors, email: ''})}
                    />
                    <InputError className="inboxwp-mt-2" message={errors.email} />
                </div>

                <div className="inboxwp-mt-4">
                    <InputLabel htmlFor="fromName">"From" Name (Optional)</InputLabel>
                    <input
                        id="formName"
                        type="text"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full"
                        value={formData.from_name}
                        onChange={e => setFormValue(e, 'from_name')}
                        placeholder={'Enter from name'}
                        onFocus={() => setErrors({...errors, from_name: ''})}
                    />
                    <InputError className="inboxwp-mt-2" message={errors.from_name} />
                </div>

                <div className="inboxwp-mt-4">
                    <InputLabel htmlFor="fromEmail">"Reply To" Email (Optional)</InputLabel>
                    <input
                        id="fromEmail"
                        type="email"
                        className="inboxwp-mt-1 inboxwp-block inboxwp-w-full"
                        value={formData.replay_to_email}
                        onChange={e => setFormValue(e, 'replay_to_email_email')}
                        placeholder={'Enter reply to email address'}
                    />
                    <InputError className="inboxwp-mt-2" message={errors.replay_to_email} />
                </div>

                <div className="inboxwp-flex inboxwp-flex-col inboxwp-space-y-2 md:inboxwp-flex-row md:inboxwp-items-center md:inboxwp-justify-between md:inboxwp-space-y-0 inboxwp-mt-4">
                    <div>
                        {loading ?
                            <LoadingIcon />
                        :
                            <button
                                className="hover:inboxwp-cursor-pointer inboxwp-inline-flex inboxwp-items-center inboxwp-px-3 inboxwp-py-3 inboxwp-text-sm inboxwp-font-medium inboxwp-text-center inboxwp-text-white inboxwp-bg-blue-600 inboxwp-rounded-lg hover:inboxwp-bg-blue-800 focus:inboxwp-ring-4 focus:inboxwp-outline-none focus:inboxwp-ring-blue-300 dark:inboxwp-bg-blue-600 dark:hover:inboxwp-bg-blue-700 dark:focus:inboxwp-ring-blue-800"
                                type="submit"
                                disabled={loading}
                            >
                                Create Signature
                            </button>
                        }
                    </div>

                    <div className="">
                        <button
                            type={'button'}
                            className="inboxwp-mt-1 inboxwp-text-gray-900 inboxwp-bg-white inboxwp-border inboxwp-border-gray-300 focus:inboxwp-outline-none hover:inboxwp-bg-gray-100 focus:inboxwp-ring-4 focus:inboxwp-ring-gray-200 inboxwp-font-medium inboxwp-rounded-lg inboxwp-text-sm inboxwp-px-5 inboxwp-py-2.5 inboxwp-mr-2 inboxwp-mb-2 dark:inboxwp-bg-gray-800 dark:inboxwp-text-white dark:inboxwp-border-gray-600 dark:hover:inboxwp-bg-gray-700 dark:hover:inboxwp-border-gray-600 dark:focus:inboxwp-ring-gray-700"
                            onClick={() => setCreateSignature(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}