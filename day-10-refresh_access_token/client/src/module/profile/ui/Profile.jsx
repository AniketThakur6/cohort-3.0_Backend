import React, { useContext } from "react";
import { Auth } from './../../../shared/context/AuthContex';

const Profile = () => {
  const {user} = useContext(Auth);

  return (
    <div className="min-h-screen w-full bg-black text-white text-2xl">
      name: {user.name};
    </div>
  );
};

export default Profile;
