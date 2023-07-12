import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
export default function Modal({
  isOpen,
  onClose,
  maxWidth = '2xl',
  children,
}) {
  const maxWidthClass = {
    sm: 'sm:inboxwp-max-w-sm',
    md: 'sm:inboxwp-max-w-md',
    lg: 'sm:inboxwp-max-w-lg',
    xl: 'sm:inboxwp-max-w-xl',
    '2xl': 'sm:inboxwp-max-w-2xl',
    '3xl': 'sm:inboxwp-max-w-3xl',
    '4xl': 'sm:inboxwp-max-w-4xl',
    '5xl': 'sm:inboxwp-max-w-5xl',
    '6xl': 'sm:inboxwp-max-w-6xl',
    '7xl': 'sm:inboxwp-max-w-7xl',
  }[maxWidth];

  if (typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
      <Transition.Root show={isOpen} as={React?.Fragment}>
        <Dialog
            as="div"
            static
            className="inboxwp-fixed inboxwp-z-10 inboxwp-inset-0 inboxwp-overflow-y-auto"
            open={isOpen}
            onClose={onClose}
        >
          <div className="inboxwp-flex inboxwp-items-end inboxwp-justify-center inboxwp-min-h-screen inboxwp-pt-4 inboxwp-px-4 inboxwp-pb-20 inboxwp-text-center sm:inboxwp-block sm:inboxwp-p-0">
            <Transition.Child
                as={React?.Fragment}
                enter="inboxwp-ease-out inboxwp-duration-300"
                enterFrom="inboxwp-opacity-0"
                enterTo="inboxwp-opacity-100"
                leave="inboxwp-ease-in inboxwp-duration-200"
                leaveFrom="inboxwp-opacity-100"
                leaveTo="inboxwp-opacity-0"
            >
              <Dialog.Overlay className="inboxwp-fixed inboxwp-inset-0 inboxwp-bg-gray-500 inboxwp-bg-opacity-75 inboxwp-transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal inboxwp-contents. */}
            <span
                className="inboxwp-hidden sm:inboxwp-inline-block sm:inboxwp-align-middle sm:inboxwp-h-screen"
                aria-hidden="true"
            >
         &#8203;
         </span>
            <Transition.Child
                as={React?.Fragment}
                enter="inboxwp-ease-out inboxwp-duration-300"
                enterFrom="inboxwp-opacity-0 inboxwp-translate-y-4 sm:inboxwp-translate-y-0 sm:inboxwp-scale-95"
                enterTo="inboxwp-opacity-100 inboxwp-translate-y-0 sm:inboxwp-scale-100"
                leave="inboxwp-ease-in inboxwp-duration-200"
                leaveFrom="inboxwp-opacity-100 inboxwp-translate-y-0 sm:inboxwp-scale-100"
                leaveTo="inboxwp-opacity-0 inboxwp-translate-y-4 sm:inboxwp-translate-y-0 sm:inboxwp-scale-95"
            >
              <div
                  className={classNames(
                      'inboxwp-inline-block inboxwp-align-bottom inboxwp-bg-white inboxwp-rounded-lg inboxwp-text-left inboxwp-overflow-hidden inboxwp-shadow-xl inboxwp-transform inboxwp-transition-all sm:inboxwp-my-8 sm:inboxwp-align-middle sm:inboxwp-w-full',
                      maxWidthClass,
                  )}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>,
    document.body,
  );
}
