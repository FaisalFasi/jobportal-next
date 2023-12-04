import React from "react";
import Button from "../Button";

const UpdateProfileForm = ({
  handleSubmit,
  handleInputChange,
  updateUserData,
  handleEdit,
}) => {
  return (
    <div>
      <div className="w-screen h-screen fixed top-0 flex items-center justify-center bg-black z-50 bg-opacity-50  m-auto">
        <div className="w-full md:w-1/2 popup-color rounded-md m-6 md:m-20 p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">User Profile Update</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={updateUserData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-black text-black rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={updateUserData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-black text-black rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone:</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={updateUserData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-black text-black rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Address:
              </label>
              <input
                type="text"
                name="location"
                placeholder="location"
                value={updateUserData.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-black text-black rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <Button text={"Update Profile"} />
              <Button text={"Cancel"} onClick={handleEdit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
