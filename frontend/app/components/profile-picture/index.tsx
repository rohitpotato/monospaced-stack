"use client";
import Text from "../Text";
import ImageWrapper from "../Image";
import { useState } from "react";
import { cn } from "@/app/_utils/cn";

const url =
  "https://instagram.fblr12-1.fna.fbcdn.net/v/t51.2885-19/458045479_531178916533487_4882792185939084941_n.jpg?_nc_ht=instagram.fblr12-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=Tc7jjc8KZ3EQ7kNvgHzmugX&_nc_gid=e1433326e6d64ec1abab4d6ffd16fdbe&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYBsfOrsH0cYkoNaPWcXfpKlfOtpCIj-rmrF6qjrwb4GXQ&oe=676B9048&_nc_sid=7a9f4b";

const giphy =
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGV1bmM4cmhsZnpieGptYmRoeDk2dmNwcnlqbWg0Zms3Njg3NDVubyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aI2hfQOnxm5mwh9edQ/giphy.gif";

const ProfilePicture = () => {
  const [src, setSrc] = useState(url);
  return (
    <div
      onMouseEnter={() => {
        setSrc(giphy);
      }}
      onMouseLeave={() => {
        setSrc(url);
      }}
      className={cn("max-w-max")}
    >
      <ImageWrapper
        openPopupOnClick
        imageProps={{
          width: 120,
          height: 120,
          src,
          alt: "profile-picture",
          style: {
            // aspectRatio: "140/105",
            objectFit: "cover",
          },
        }}
        wrapperProps={{
          className:
            "relative animate-show-media aspect-[140/105] max-w-full w-[120px] md:w-[clamp(110px,14vh,140px)]",
          style: {
            aspectRatio: "140/105",
          },
        }}
      >
        <Text className="text-blue-800 text-center">Welcome</Text>
      </ImageWrapper>
    </div>
  );
};

export default ProfilePicture;
