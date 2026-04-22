import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  console.log(_id);
  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(_id));

      console.log("Request sent:", res.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://placeimg.com/400/225/arch"}
          alt={`${firstName} ${lastName} Avatar`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName || lastName
            ? `${firstName || ""} ${lastName || ""}`.trim()
            : "Anonymous"}
        </h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about || "No bio available."}</p>

        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary "
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
