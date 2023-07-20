import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
export default function SecondaryButton({
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={classNames(
          'inboxwp-inline-flex inboxwp-items-center inboxwp-px-4 inboxwp-py-3 inboxwp-bg-white inboxwp-border inboxwp-border-gray-300 inboxwp-rounded-md inboxwp-font-semibold inboxwp-text-xs inboxwp-text-gray-700 inboxwp-uppercase inboxwp-shadow-sm hover:inboxwp-text-gray-500 focus:inboxwp-outline-none focus:inboxwp-border-blue-300 focus:inboxwp-ring focus:inboxwp-ring-blue-200 active:inboxwp-text-gray-800 active:inboxwp-bg-gray-50 disabled:inboxwp-opacity-25 inboxwp-transition',
          props.className,
      )}
    >
      {children}
    </button>
  );
}
