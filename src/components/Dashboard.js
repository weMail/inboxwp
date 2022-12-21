import rest from "../core/REST";
import MediaCard from "./MediaCard";

export default function Dashboard() {
  const disconnectSite = () => {
        rest.get(`${inboxwp.ajaxurl}?action=inboxwp_app_disconnect&hash=${inboxwp.hash}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

  return(
    <div className="inboxwp-container inboxwp-pr-[20px] inboxwp-py-[15px]">
      <div className="inboxwp-w-full inboxwp-min-h-[50px] inboxwp-flex inboxwp-justify-between">
        <div className="inboxwp-w-32">
          <h2 className="inboxwp-text-lg">Dashboard</h2>
        </div>
        <div className="inboxwp-w-32">
          <select
            id="location"
            name="location"
            className="inboxwp-mt-1 inboxwp-block inboxwp-w-full inboxwp-rounded-md inboxwp-border-gray-300 inboxwp-py-2 inboxwp-pl-3 inboxwp-pr-10 inboxwp-text-base focus:inboxwp-border-indigo-500 focus:inboxwp-outline-none focus:inboxwp-ring-indigo-500 sm:inboxwp-text-sm inboxwp-text-red-800"
            defaultValue="Canada"
          >
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
      </div>
      <div className="inboxwp-w-full inboxwp-flex">
        <MediaCard title="Delivered Email" description="71,897" />
        <MediaCard title="Delivered Email" description="71,897" img="https://picsum.photos/200"/>
        <MediaCard title="Delivered Email" description="71,897" img="https://picsum.photos/seed/picsum/200/200"/>
      </div>
      <div className="inboxwp-flex inboxwp-min-h-[400px] inboxwp-justify-between">
        <div className="inboxwp-w-2/3 inboxwp-p-3 inboxwp-bg-white inboxwp-rounded-lg inboxwp-m-2 inboxwp-ml-0">
          left Contents
        </div>
        <div className="inboxwp-w-1/3 inboxwp-p-3 inboxwp-bg-white inboxwp-rounded-lg inboxwp-m-2">
          right contents
        </div>
      </div>
      <div className="inboxwp-bg-white inboxwp-flex inboxwp-justify-between inboxwp-m-2 inboxwp-rounded-lg inboxwp-ml-0 inboxwp-p-6">
        <div className=" inboxwp-text-gray-900">
          <h2 className="inboxwp-mt-2 inboxwp-text-lg inboxwp-font-medium">Disconnect your site</h2>
          <p>Disconnect you site from inboxwp app. If you want to cancel your subscription please go to <a href="http://app.inboxwp.test/dashboard">dashboard of IboxWP app</a></p>
        </div>
        <button className="inboxwp-inline-flex inboxwp-items-center inboxwp-rounded-md inboxwp-border inboxwp-border-transparent inboxwp-bg-red-600 inboxwp-px-4 inboxwp-text-sm inboxwp-font-medium inboxwp-text-white inboxwp-shadow-sm hover:inboxwp-bg-red-700 focus:inboxwp-outline-none focus:inboxwp-ring-2 focus:inboxwp-ring-red-500 focus:inboxwp-ring-offset-2" onClick={disconnectSite}>Disconnect</button>
      </div>
    </div>
  );
}