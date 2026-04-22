import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return;
  if (connection.length === 0)
    return (
      <h1 className="text-2xl font-bold flex justify-center my-10">
        No Connections Found
      </h1>
    );

  console.log("Connections from store:", connection);

  return (
    <div className="flex flex-col my-10">
      <h1 className=" text-center text-2xl font-bold">Connections</h1>

      {connection.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            className="flex m-4 mx-auto p-4 rounded-lg bg-base-300 shadow-sm"
            key={connection._id}
          >
            <img
              alt="photo"
              className="w-20 h-20 object-cover rounded-full"
              src={photoUrl}
            />

            <div className="ml-4 text-left">
              <h2 className="text-lg font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="ml-auto">
              <button className="btn btn-primary mt-2">Chat</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
