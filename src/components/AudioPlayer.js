import React, { useState, useRef, useEffect } from 'react'
import styles from "../styles/AudioPlayer.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { AiOutlinePauseCircle } from "react-icons/ai"

const AudioPlayer = ({file}) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); 
  const progressBar = useRef();  
  const animationRef = useRef(); 

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backFifteen = () => {
    progressBar.current.value = Number(progressBar.current.value - 15);
    changeRange();
  }

  const forwardFifteen = () => {
    console.log(progressBar.current.value)
    console.log("progresBar", progressBar.current.value)
    progressBar.current.value = Number(progressBar.current.value + 15);
    console.log(progressBar.current.value)
    changeRange();
  }

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={file} preload="metadata" onLoadedMetadata={onLoadedMetadata}></audio>
      <div className={styles.top}>
        <button className={styles.forwardBackward} onClick={backFifteen}><AiOutlineArrowLeft /> 15</button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <AiOutlinePauseCircle/> : <AiOutlinePlayCircle className={styles.play} />}
        </button>
        <button className={styles.forwardBackward} onClick={forwardFifteen}>15 <AiOutlineArrowRight /></button>

      </div>
      <div className={styles.top}>
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div>
          <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
        </div>

        {/* duration */}
        <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

      </div>

    </div>
  )
}

export { AudioPlayer }