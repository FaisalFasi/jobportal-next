import Image from "next/image";
import React from "react";

const professionalLinks = [
  {
    name: "linkedIn",
    link: "https://www.linkedin.com/in/faisalrehman18/",
  },
  {
    name: "github",
    link: "empty",
  },
  {
    name: "personal website",
    link: "empty",
  },
];

const page = () => {
  return (
    <div>
      <div className="h-full w-full md:w-2/3 flex justify-center items-center m-auto">
        <div className=" w-full m-4 p-4 bg-gray-300 flex flex-col items-center gap-10">
          <div className="w-full flex justify-between ">
            <h1 className="font-bold text-xl">Profile</h1>
            <h2>Edit</h2>
          </div>
          <div className="flex w-full items-start gap-20">
            <div className="flex flex-col gap-8 items-center">
              <Image
                src="/myImage.png"
                priority
                alt="profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h1 className="font-bold">Upload</h1>
            </div>
            <div>
              <h3 className="font-bold">User Name</h3>
              <div className="">
                <p>email</p>
                <p>phone</p>
                <p>address</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full  flex justify-center items-center">
        <div className="w-full md:w-1/2 h-1/2 m-4 p-4 bg-gray-300 flex flex-col items-start ">
          <div>
            <h1 className="text-xl font-semibold"> CV</h1>
          </div>
          <div className="w-full p-4 ">
            <p>
              This CV will by default be used for your future applications. Of
              course, you will always have the option to upload another CV
              during each application process.
            </p>
            <div className="flex gap-4 items-center p-4 mt-4 border-2 border-gray-200 shadow-lg  rounded-md ">
              <div>icon</div>
              <div className="w-full flex justify-between">
                <div>
                  <h2>CV</h2>
                  <p>name of uploaded cv i.e(Faisal_CV.pdf)</p>
                </div>
                <div className="flex flex-col">
                  <button>watch</button>
                  <button>delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-full md:w-1/2 h-1/2 m-4 p-4 bg-gray-300 flex flex-col items-start gap-10">
          <div className="w-full flex justify-between">
            <h1 className="font-semibold text-xl">Professional Links</h1>
            <button> edit</button>
          </div>
          <div>
            {professionalLinks.map((link) => {
              return (
                <div className="pb-4">
                  <h2 className=" text-gray-500">{link.name} </h2>
                  <a href={link.link}>
                    <p>{link.link}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
{
  /* <div className="w-full h-60 flex flex-col items-center gap-10   m-8  border-4 border-red-300">
  <div className="w-full">
    <h2 className="w-full text-right">Edit</h2>
  </div>
  <div className="flex w-full items-center gap-4">
    <div>
      <Image
        src="/myImage.png"
        priority
        alt="profile picture"
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
    <div>
      <h3>Username</h3>
      <p>email</p>
      <p>phone</p>
      <p>address</p>
    </div>
  </div>
</div>; */
}
