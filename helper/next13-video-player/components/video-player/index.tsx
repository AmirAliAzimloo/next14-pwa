import React, { FC, useRef, useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { HiOutlineVolumeUp } from 'react-icons/hi';
import { HiOutlineVolumeOff } from 'react-icons/hi';
import { CgMiniPlayer } from 'react-icons/cg';
import { RiFullscreenFill } from 'react-icons/ri';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // PLAY / PAUSE
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playingHandler = (inp: boolean): void => {
    if (inp) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setIsPlaying(inp);
  };

  // VOLUME
  const [volume, setVolume] = useState<number>(1);
  const [oldVolume, setOldVolume] = useState<number>(1);
  const volumeInputRef = useRef<HTMLInputElement>(null);

  // SPEED
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const speedHandler = (): void => {
    let newSpeed = videoSpeed + 0.25;
    if (newSpeed > 3) {
      newSpeed = 0.5;
    }
    setVideoSpeed(newSpeed);
    videoRef.current?.playbackRate = newSpeed;
  };

  // PICTURE IN PICTURE
  const pipHandler = (inp: boolean): void => {
    if (inp) {
      videoRef.current?.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  // FULL SCREEN
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const fullscreenHandler = (inp: boolean): void => {
    if (inp) {
      fullscreenRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // DURATION
  const [nowTime, setNowTime] = useState<number>(0);
  const [fullTime, setFullTime] = useState<number>(0);
  const videoTimeInput = useRef<HTMLInputElement>(null);
  const timeBe = (inp: number): string => {
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

  const intervalManager = (): void => {
    setInterval(() => {
      if (videoRef.current) {
        if (videoRef.current.currentTime != null) {
          setNowTime(videoRef.current.currentTime);
          videoTimeInput.current.value = videoRef.current.currentTime.toString();
          setFullTime(videoRef.current.duration);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    intervalManager();
  }, [src]);

  return (
    <div className="flex justify-center items-center text-blue-400">
      <div ref={fullscreenRef} className="relative w-[95%] max-w-[1000px]">
        <div className="ctrls absolute right-2 left-2 bottom-2 z-30">
          <div className="bg-[#000000cc] p-3 rounded-md flex flex-col gap-3 opacity-0 transition-all duration-300 hover:opacity-100">
            <div className="duration bar w-full flex items-center">
              <div className="w-16 min-w-20 flex items-center justify-start">
                {timeBe(fullTime)}
              </div>
              <div className="videoVolumeInputContainer w-full">
                <input
                  ref={videoTimeInput}
                  onChange={(e) => {
                    setNowTime(Number(e.target.value));
                    videoTimeInput.current.value = e.target.value;
                    videoRef.current.currentTime = Number(e.target.value);
                    playingHandler(false);
                  }}
                  type="range"
                  min={0}
                  max={fullTime}
                  step="any"
                  defaultValue={0}
                  className="videoVolumeInput"
                />
              </div>
              <div className="w-16 min-w-20 flex items-center justify-end">
                {timeBe(nowTime)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="text-xl">
                  <RiFullscreenFill
                    onClick={() => {
                      !document.fullscreenElement
                        ? fullscreenHandler(true)
                        : fullscreenHandler(false);
                    }}
                  />
                </button>
                <button className="text-2xl">
                  <CgMiniPlayer
                    onClick={() => {
                      !document.pictureInPictureElement
                        ? pipHandler(true)
                        : pipHandler(false);
                    }}
                  />
                </button>
                <button onClick={() => speedHandler()} className="text-xl">
                  {videoSpeed}x
                </button>
              </div>
              <div className="flex gap-2">
                <div className="videoVolumeInputContainer">
                  <input
                    ref={volumeInputRef}
                    onChange={(e) => {
                      volumeInputRef.current.value = e.target.value;
                      setVolume(Number(e.target.value));
                      setOldVolume(Number(e.target.value));
                      videoRef.current.volume = Number(e.target.value);
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
                  {volume === 0 ? (
                    <HiOutlineVolumeOff
                      onClick={(e) => {
                        setVolume(oldVolume);
                        volumeInputRef.current.value = oldVolume.toString();
                        videoRef.current.volume = oldVolume;
                      }}
                    />
                  ) : (
                    <HiOutlineVolumeUp
                      onClick={(e) => {
                        setVolume(0);
                        volumeInputRef.current.value = '0';
                        videoRef.current.volume = 0;
                      }}
                    />
                  )}
                </button>
                <button className="text-xl">
                  <FaPause
                    onClick={() => playingHandler(false)}
                    className={isPlaying ? 'hidden' : 'flex'}
                  />
                  <FaPlay
                    onClick={() => playingHandler(true)}
                    className={isPlaying ? 'hidden' : 'flex'}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <video
          onClick={() => (isPlaying ? playingHandler(false) : playingHandler(true))}
          ref={videoRef}
          src={src}
          loop
          className="rounded-lg w-full z-20 h-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;