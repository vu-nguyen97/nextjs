import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  const socialPlatform = [
    {
      url: "https://www.facebook.com/falcon.global.ltd",
      name: "facebook",
      icon: "/icons/facebook.png",
    },
    {
      url: "https://www.youtube.com/channel/UCntKkW8tNILk3oSF0E446JQ",
      name: "youtube",
      icon: "/icons/youtube-icon.svg",
    },
  ];

  return (
    <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
      <div className="d-block mb-3">
        <Link href="/">
          <span>
            <Image
              src="/falcon.png"
              className="img-contain cursor-pointer"
              alt="falcon logo"
              width="140"
              height="60"
            />
          </span>
        </Link>

        <div className="text-dark-theme">Falcon Game Studio</div>
      </div>

      <ul className="d-flex justify-content-center list-unstyled p-0 m-0">
        {socialPlatform.map((platform, id) => (
          <li className="mx-2" key={id}>
            <a href={platform.url} target="_blank">
              <Image
                src={platform.icon}
                alt={platform.name}
                width="28"
                height="28"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
