import React from "react";
import Image from "next/image";

const ProfilePic = ({ type, img, onClick }) => {
  const imageUrl = img ?  `/${type}/${img}`: `/${type}/user.webp` ;
  return <Image src={imageUrl} width={140} onClick={onClick} height={140} alt="Picture" />;
};

export default ProfilePic;
