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
          Customer Details
        </div>
        <div
          className="ctr_item selected"
          onClick={() => {
            router.push("/Contact");
          }}
        >
          Contact Us
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </div>
      </div>
      <div className="ctr_right">
        <div className="contactUs">Contact us- 011 523 55 22</div>
      </div>
    </div>
  );
};

export default Home;
