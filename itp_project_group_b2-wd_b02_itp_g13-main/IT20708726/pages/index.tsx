import { Housekeeper } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<Housekeeper[]>([]);

  const getHousekeeperData = () => {
    fetch("api/housekeeper")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getHousekeeperData();
  }, []);

  return (
  
    <div className="container">
     <div>
				<div className="cal">
					<div className="title">
                     <h1>Housekeeper Details</h1>
					</div>
			</div>
		</div>
      <table>
        <thead>
          <tr>
            <th>housekeeperId</th>
            <th>housekeeper Name</th>
            <th>Phone</th>
            <th>Password</th>
            <th>firstName</th>
            <th>lastName</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={`test-${i + 1}`}>
              <td>{item. id }</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.password}</td>P
              <td>{item.firstName }</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
