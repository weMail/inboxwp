export default function Loading() {
    return (
        <div role="status" className="inboxwp-max-w-sm animate-pulse">
            <div className="inboxwp-h-2.5 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-w-48 inboxwp-mb-4"></div>
            <div className="inboxwp-h-2 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-max-w-[360px] inboxwp-mb-2.5"></div>
            <div className="inboxwp-h-2 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-mb-2.5"></div>
            <div className="inboxwp-h-2 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-max-w-[330px] inboxwp-mb-2.5"></div>
            <div className="inboxwp-h-2 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-max-w-[300px] inboxwp-mb-2.5"></div>
            <div className="inboxwp-h-2 inboxwp-bg-gray-200 inboxwp-rounded-full inboxwp-max-w-[360px]"></div>
            <span className="inboxwp-sr-only">Loading...</span>
        </div>
    )
}