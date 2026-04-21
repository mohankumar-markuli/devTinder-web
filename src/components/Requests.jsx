import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { useState } from "react";
import { removeRequest } from "../utils/requestSlice";

const Requests = () => {
  console.log("Rendering Requests component");

  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [showButtons, setShowButtons] = useState(true);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequest(_id));

      console.log("Fetched requests:", res.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log("Fetched requests:", res.data);

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log("Requests from store:", requests);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-2xl font-bold flex justify-center my-10">
        No Requests Found
      </h1>
    );

  return (
    <div className="flex flex-col my-10">
      <h1 className=" text-center text-2xl font-bold">Manage Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            className="flex m-4 mx-auto p-4 rounded-lg bg-base-300 shadow-sm w-2/3"
            key={request._id}
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 object-cover rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-lg font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="ml-auto flex items-right">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
