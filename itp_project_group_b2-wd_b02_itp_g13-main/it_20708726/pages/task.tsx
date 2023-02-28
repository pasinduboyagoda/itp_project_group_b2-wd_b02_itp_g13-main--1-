import { Attendance } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<Attendance[]>([]);
  const router = useRouter();



  const AttendanceSchema = object({
    employeeId: number().nullable(),
    firstName: string().required("firstName is required"),
    lastName: string().required("lastName is required"),
    Date: string().required("Date is required"),
    in_time: string().required("time is required"),
      out_time: string().required()
   
    
  });

  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof AttendanceSchema> = {
    employeeId: null,
    firstName: "",
    lastName: "",
    Date: "",
    in_time: "",
    out_time: "",
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof AttendanceSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/eventApi?type=Attendance_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        Date: data.Date,
        in_time: data.in_time,
        out_time: data.out_time,
        ...(data?.employeeId && { employeeId: data.employeeId }),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("res: =-->", res);
        getOfferData();
      })
      .catch((error) => {
        console.log(error.message);
      });
    // getOfferData();
  };

  const getOfferData = () => {
    fetch("api/eventApi?type=customer_get")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getOfferData();
  }, []);

  return (
    <div className="ctr">
      <div className="ctr_left">
        <div className="profile">A</div>
        <div
          className="ctr_item selected"
          onClick={() => {
            router.push("/Attendance");
          }}
        >
          Attendance Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/task");
          }}
        >
          Task
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/review");
          }}
        >
          Review
        </div>
      </div>
      <div className="ctr_right">
        <div className="container">  
          <table>
            <thead>
              <tr>
                <th>employeeId</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Date</th>
                <th>in_time</th>
                <th>out_time</th>

              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.employeeId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.Date}</td>
                  <td>{item.in_time}</td>
                  <td>{item.out_time}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/attendanceapi?type=Attendance_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            cuId: item.cuId,
                          }),
                        })
                          .then((res) => res.json())
                          .then(() => {
                            getOfferData();
                          })
                          .catch(() => {});
                      }}
                    >
                      Delete
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        setFormState("update");
                        setInitialData({
                            employeeId: +item.employeeId,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            Date: item.Date,
                            in_time: item.in_time,
                            out_time: item.out_time,
                         
                        });
                      }}
                    >
                      Update
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
