const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  console.log("User data in UserCard:", user);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://placeimg.com/400/225/arch"}
          alt={`${firstName} ${lastName} Avatar`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about || "No bio available."}</p>

        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
