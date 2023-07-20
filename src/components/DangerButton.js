import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export default function DangerButton({
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={classNames(
          'inboxwp-inline-flex inboxwp-items-center inboxwp-justify-center inboxwp-px-4 inboxwp-py-2 inboxwp-bg-red-600 inboxwp-border inboxwp-border-transparent inboxwp-rounded-md inboxwp-font-semibold inboxwp-text-xs inboxwp-text-white inboxwp-uppercase inboxwp-tracking-widest hover:inboxwp-bg-red-500 focus:inboxwp-outline-none focus:inboxwp-border-red-700 focus:inboxwp-ring focus:inboxwp-ring-red-200 active:inboxwp-bg-red-600 disabled:inboxwp-opacity-25 inboxwp-transition',
          props.className,
      )}
    >
      {children}
    </button>
  );
}
