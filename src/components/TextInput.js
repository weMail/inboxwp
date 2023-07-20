import classNames from 'classnames';

const TextInput = ((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      'inboxwp-border-gray-300 focus:inboxwp-border-indigo-300 focus:inboxwp-ring focus:inboxwp-ring-indigo-200 focus:inboxwp-ring-opacity-50 inboxwp-rounded-md inboxwp-shadow-sm',
      props.className,
    )}
  />
));

export default TextInput;
