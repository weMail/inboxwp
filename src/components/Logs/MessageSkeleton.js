export default function MessageSkeleton() {
  return (
    <div
      className="inboxwp-inline-block inboxwp-h-8 inboxwp-w-8 inboxwp-animate-spin inboxwp-rounded-full inboxwp-border-4 inboxwp-border-solid inboxwp-border-current inboxwp-border-r-transparent inboxwp-align-[-0.125em] motion-reduce:inboxwp-animate-[spin_1.5s_linear_infinite]"
      role="status">
  <span
    className="!inboxwp-absolute !-inboxwp-m-px !inboxwp-h-px !inboxwp-w-px !inboxwp-overflow-hidden !inboxwp-whitespace-nowrap !inboxwp-border-0 !inboxwp-p-0 !inboxwp-[clip:rect(0,0,0,0)]"
  >Loading...</span
  >
    </div>
  )
}
