import { useEffect, useRef, useState } from "react";
//redux
import { dispatch, useSelector } from "../../redux/store";
import {
  endSongLoading,
  nextSong,
  prevSong,
  startSongLoading,
  toggleLoop,
  toggleMute,
  togglePlayingSong,
  toggleRandom,
} from "../../redux/slices/song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { current } from "@reduxjs/toolkit";

function Footer() {
  const {
    songs,
    songSelected,
    isPlaying,
    isRandom,
    isMute,
    isLoop,
    isLoading,
  } = useSelector((state) => state.song);

  const handleCheckToggleRandom = () => {
    dispatch(toggleRandom(!isRandom));
  };

  const handleTogglePlaying = () => {
    dispatch(togglePlayingSong(!isPlaying));
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };

  const handleToggleMute = () => {
    dispatch(toggleMute(!isMute));

    if (!isMute) {
      setVolume(0);
    } else {
      setVolume(0.5);
    }
  };

  const handleToggleLoop = () => {
    dispatch(toggleLoop(!isLoop));
  };

  const handleNextSong = () => {
    const currentSongIndex = songs.findIndex(
      (song: any) => song.id === songSelected?.id
    );
    if (isRandom) {
      return dispatch(nextSong(songs[handleRandom()]));
    }
    if (currentSongIndex == songs.length - 1) {
      return dispatch(nextSong(songs[0]));
    }

    return dispatch(nextSong(songs[currentSongIndex + 1]));
  };

  const handlePrevSong = () => {
    const currentSongIndex = songs.findIndex(
      (song: any) => song.id === songSelected?.id
    );
    if (isRandom) {
      return dispatch(prevSong(songs[handleRandom()]));
    }
    if (currentSongIndex === 0) {
      //last
      return dispatch(prevSong(songs[songs.length - 1]));
    }
    //minutes
    return dispatch(prevSong(songs[currentSongIndex - 1]));
  };

  const handleRandom = () => {
    const min = 0;
    const max = Math.floor(songs.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleChangeVolume = (volumeValue: number) => {
    setVolume(volumeValue);
    audioRef.current.volume = volume;

    if (volumeValue === 0) {
      return dispatch(toggleMute(true));
    }
    if (isMute) {
      return dispatch(toggleMute(false));
    }
  };

  const audioRef: any = useRef();

  const [currentTime, setCurrentTime] = useState<string>("0:00");

  const [duration, setDuration] = useState<string>("0:00");

  const [progressValue, setProgressValue] = useState<number>(0);

  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (songSelected) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const str_pad_left = (string: any, pad: any, length: any) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const minutes = Math.floor(audioRef.current.duration / 60);
      const seconds = Math.floor(audioRef.current.duration - minutes * 60);
      const durationValue =
        str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
      setDuration(durationValue);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressValue =
        (audioRef.current.currentTime * 100) / audioRef.current.duration;
      setProgressValue(progressValue);

      const minutes = Math.floor(audioRef.current.currentTime / 60);
      const seconds = Math.floor(audioRef.current.currentTime - minutes * 60);
      const currentTimeValue =
        str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
      setCurrentTime(currentTimeValue);
    }
  };

  const handleEnd = () => {
    if (isLoop) {
      console.log("loop end");
      const loopSong = songSelected;
      return dispatch(nextSong(loopSong!));
    }
    if (isRandom) {
      console.log("random end");
      return dispatch(nextSong(songs[handleRandom()]));
    }
    handleNextSong();
  };

  const handleChangeProgress = (progressValue: number) => {
    const currentTime = (progressValue * audioRef.current.duration) / 100;
    dispatch(startSongLoading());
    audioRef.current.currentTime = currentTime;
  };

  return (
    <div className="footer-height px-3 py-5  bg-gray-900">
      <div className="text-gray-500 text-2xl flex justify-between items-center">
        <div className="flex-1 text-left">
          <i
            className={` ${
              isRandom && "active-icon"
            } bx bx-shuffle  hover-icon active:text-opacity-60`}
            onClick={handleCheckToggleRandom}
          ></i>

          <i
            className={` ${
              isLoop && "active-icon"
            } bx bx-revision hover-icon active:text-opacity-60`}
            onClick={handleToggleLoop}
          ></i>
        </div>

        <div className="space-x-1 text-5xl">
          <i
            className="bx bx-skip-previous hover-icon active:text-opacity-60"
            onClick={handlePrevSong}
          ></i>
          {isPlaying ? (
            <i
              className="bx bx-stop-circle hover-icon active:text-opacity-60"
              onClick={handleTogglePlaying}
            ></i>
          ) : (
            <i
              className="bx bxs-caret-right-circle hover-icon active:text-opacity-60"
              onClick={handleTogglePlaying}
            ></i>
          )}
          <i
            className="bx bx-skip-next hover-icon "
            onClick={handleNextSong}
          ></i>
        </div>

        <div className="flex justify-end items-center flex-1 text-right w-full">
          {isMute ? (
            <i
              className="bx bxs-volume-mute hover-icon active:text-opacity-60"
              onClick={handleToggleMute}
            ></i>
          ) : (
            <i
              className="bx bxs-volume-full hover-icon active:text-opacity-60"
              onClick={handleToggleMute}
            ></i>
          )}
          <input
            type="range"
            min={0}
            max={100}
            value={volume * 100}
            onChange={(e) => handleChangeVolume(Number(e.target.value) / 100)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse flex space-x-4 text-white mt-3">
          Loading ...
        </div>
      ) : (
        <div className="flex items-center justify-between text-white mt-3 text-lg">
          <span>{currentTime}</span>
          <input
            className="flex-1 mx-3"
            type="range"
            value={progressValue}
            min={0}
            max={100}
            onChange={(e) => {
              handleChangeProgress(Number(e.target.value));
            }}
          />
          <span>{duration}</span>
        </div>
      )}
      <audio
        ref={audioRef}
        src={songSelected?.url}
        autoPlay={isPlaying}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnd}
        onCanPlayThrough={() => dispatch(endSongLoading())}
        // onTimeUpdateCapture
      ></audio>
    </div>
    // <AudioPlayer
    //   className="player-music bg-gray-900 text-white"
    //   src={songSelected ? songSelected.url : ""}
    //   layout="stacked-reverse"
    //   showSkipControls={true}
    //   showJumpControls={false}
    //   onClickNext={handleNextSong}
    //   onClickPrevious={handlePrevSong}
    // />
  );
}

export default Footer;
