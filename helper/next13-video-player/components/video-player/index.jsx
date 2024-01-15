
"use client"
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { HiOutlineVolumeOff } from "react-icons/hi";
import { CgMiniPlayer } from "react-icons/cg";
import { RiFullscreenFill } from "react-icons/ri";

import { useState, useRef, useEffect } from "react";
 
const VideoPlayer = ({ src }) => {
   const videoRef = useRef();

   // PLAY / PAUSE
   const [ispalying, setispalying] = useState(0);
   const playingHandler = (inp) => {
      inp == 1 ? videoRef.current.play() : videoRef.current.pause();
      setispalying(inp);
   };

   // VOLUME
   const [volume, setvolume] = useState(1);
   const [oldVolume, setoldVolume] = useState(1);
   const volumeInputRef = useRef();

   // SPEED
   const [videoSpeed, setvideoSpeed] = useState(1);
   const speedHandler = () => {
      let newSpeed = videoSpeed + 0.25;
      if (newSpeed > 3) {
         newSpeed = 0.5;
      }
      setvideoSpeed(newSpeed);
      videoRef.current.playbackRate = newSpeed;
   };

   // PICTRUE IN PICTURE
   const pipHandler = (inp) => {
      if (inp == 1) {
         videoRef.current.requestPictureInPicture();
      } else {
         document.exitPictureInPicture();
      }
   };

   // FULL SCREEN
   const fullscreenRef = useRef();
   const fullscreenHandler = (inp) => {
      if (inp == 1) {
         fullscreenRef.current.requestFullscreen();
      } else {
         document.exitFullscreen();
      }
   };

   // DURATION
   const [nowTime, setnowTime] = useState(0);
   const [fullTime, setfullTime] = useState(0);
   const videoTimeInput = useRef();
   const timeBe = (inp) => {
      let minutes = Math.floor(inp / 60);
      let seconds = Math.floor(inp % 60);

      if (minutes < 10) {
         minutes = `0${minutes}`;
      }
      if (seconds < 10) {
         seconds = `0${seconds}`;
      }
      let output = `${minutes}:${seconds}`;
      return output;
   };

   const intervalManager=()=>{
      setInterval(() => {
         if (videoRef.current) {
            if(videoRef.current.currentTime != null) {
               setnowTime(videoRef.current.currentTime);
               videoTimeInput.current.value = videoRef.current.currentTime;
               setfullTime(videoRef.current.duration);
            }
         }
      }, 1000);
   }

   useEffect(()=>{
      intervalManager();
   },[src]);

   return (
      <div className=" flex justify-center items-center text-blue-400">
         <div ref={fullscreenRef} className=" relative w-[95%] max-w-[1000px] ">
            <div className=" ctrls absolute right-2 left-2 bottom-2 z-30 ">
               <div className=" bg-[#000000cc] p-3 rounded-md flex flex-col gap-3 opacity-0 transition-all duration-300 hover:opacity-100  ">
                  <div className="duration bar w-full flex items-center">
                     <div className=" w-16 min-w-20 flex items-center justify-start">
                        {timeBe(fullTime)}
                     </div>
                     <div className="videoVolumeInputContainer w-full">
                        <input
                           ref={videoTimeInput}
                           onChange={(e) => {
                              setnowTime(e.target.value);
                              videoTimeInput.current.value = e.target.value;
                              videoRef.current.currentTime = e.target.value;
                              playingHandler(0);
                           }}
                           type="range"
                           min={0}
                           max={fullTime}
                           step="any"
                           defaultValue={0}
                           className="videoVolumeInput"
                        />
                     </div>
                     <div className=" w-16 min-w-20 flex items-center justify-end">
                        {timeBe(nowTime)}
                     </div>
                  </div>
                  <div className=" flex justify-between items-center">
                     <div className=" flex gap-2">
                        <button className="text-xl">
                           <RiFullscreenFill
                              onClick={() => {
                                 !document.fullscreenElement
                                    ? fullscreenHandler(1)
                                    : fullscreenHandler(0);
                              }}
                           />
                        </button>
                        <button className="text-2xl">
                           <CgMiniPlayer
                              onClick={() => {
                                 !document.pictureInPictureElement
                                    ? pipHandler(1)
                                    : pipHandler(0);
                              }}
                           />
                        </button>
                        <button
                           onClick={() => speedHandler()}
                           className="text-xl"
                        >
                           {videoSpeed}x
                        </button>
                     </div>
                     <div className=" flex gap-2">
                        <div className="videoVolumeInputContainer">
                           <input
                              ref={volumeInputRef}
                              onChange={(e) => {
                                 volumeInputRef.current.value = e.target.value;
                                 setvolume(e.target.value);
                                 setoldVolume(e.target.value);
                                 videoRef.current.volume = e.target.value;
                              }}
                              type="range"
                              min={0}
                              max={1}
                              step="any"
                              defaultValue={1}
                              className="videoVolumeInput"
                           />
                        </div>
                        <button className="text-2xl">
                           {volume == 0 ? (
                              <HiOutlineVolumeOff
                                 onClick={(e) => {
                                    setvolume(oldVolume);
                                    volumeInputRef.current.value = oldVolume;
                                    videoRef.current.volume = oldVolume;
                                 }}
                              />
                           ) : (
                              <HiOutlineVolumeUp
                                 onClick={(e) => {
                                    setvolume(0);
                                    volumeInputRef.current.value = 0;
                                    videoRef.current.volume = 0;
                                 }}
                              />
                           )}
                        </button>
                        <button className="text-xl">
                           <FaPause
                              onClick={() => playingHandler(0)}
                              className={ispalying == 0 ? "hidden" : "flex"}
                           />
                           <FaPlay
                              onClick={() => playingHandler(1)}
                              className={ispalying == 1 ? "hidden" : "flex"}
                           />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <video
            onClick={()=>ispalying==1?playingHandler(0):playingHandler(1)}
               ref={videoRef}
               src={src}
               loop
               className=" rounded-lg w-full z-20  h-full "
            />
         </div>
      </div>
   );
};

export default VideoPlayer;
