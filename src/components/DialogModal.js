import Modal from './Modal';

DialogModal.Content = function DialogModalContent({
                                                      title,
                                                      children,
                                                  }) {
    return (
        <div className="inboxwp-px-6 inboxwp-py-4">
            <div className="inboxwp-text-lg">{title}</div>

            <div className="inboxwp-mt-4">{children}</div>
        </div>
    );
};

DialogModal.Footer = function DialogModalFooter({
                                                    children,
                                                }) {
    return <div className="inboxwp-px-6 inboxwp-py-4 inboxwp-bg-gray-100 inboxwp-text-right">{children}</div>;
};

export default function DialogModal({
                                        children,
                                        ...modalProps
                                    }) {
    return <Modal {...modalProps}>{children}</Modal>;
}
