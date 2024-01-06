import { MainLogo } from "@/src/Assets";
import useMediaHooks from "@/src/Hooks/useMediaHooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import Stories from 'stories-react';
import 'stories-react/dist/index.css';


const stories = [
  {
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    duration: 28000,
  },
  {
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
    duration: 10000,
  },
  {
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
    duration: 10000,
  },
  {
    type: 'video',
    duration: 6000,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
  },
  {
    duration: 30000,
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
  },
];

const FullscreenStory = () => {
  const { storyData } = useMediaHooks();
  const router = useRouter();
  const { index } = router?.query;

  // Assuming storyData is an array and index is the identifier you're matching against
  const filteredStoryData = storyData?.filter(story => story?._id === index);

  // Initialize mainStory as an empty array if filteredStoryData is empty
  let mainStory = filteredStoryData?.length > 0 ? filteredStoryData[0].storyData : [];

  console.log(mainStory, "mainStory");
  console.log(filteredStoryData)



  return (
    <div
      className="h-screen w-full  container"
      style={{
        zIndex: 99999,
      }}
    >
      <div className="relative">
        <div className="top-nav flex items-center justify-between">
          <div>
            <Link href={"/"}>
              <Image
                src={MainLogo}
                alt="logo"
                width={130}
                height={80}
                className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform"
              />
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <RxCross1 className="text-[2rem]" />
            </Link>
          </div>
        </div>

        <div className="w-full flex-col mx-auto my-auto flex items-center justify-center">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '16px',
            }}
          >
            <Stories width="400px" height="600px" stories={mainStory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenStory;
