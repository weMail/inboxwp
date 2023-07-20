export default function InputError({
  message,
  className,
  children,
}) {
  if (!message && !children) {
    return null;
  }
  return (
    <div className={className}>
      <p className="inboxwp-text-sm inboxwp-text-red-600">{message || children}</p>
    </div>
  );
}
