import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <Image
      src="/falcon.png"
      className="img-contain"
      alt="favicon icon"
      width="100"
      height="45"
    />
  );
};
