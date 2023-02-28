import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="ctr">
      <div className="ctr_left">
        <div className="profile">A</div>
        <div
          className="ctr_item "
          onClick={() => {
            router.push("/customer");
          }}
        >
          Parking Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/event");
          }}
        >
          Pool Details
        </div>
        <div
          className="ctr_item selected"
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </div>
      </div>
      <div className="ctr_right">
        <div className="event_page">Settings</div>
      </div>
    </div>
  );
};

export default Home;
