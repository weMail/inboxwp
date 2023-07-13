import TopSection from "../components/TopSection";

export default function DefaultLayout({children}) {
    return (
        <>
            <TopSection/>
            <div className="inboxwp-mr-[15px] inboxwp-py-2 inboxwp-pt-[80px]">
                {children}
            </div>
        </>
    );
}