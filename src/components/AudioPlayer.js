import React, {useState, useRef, useEffect} from 'react'
import styles from '../styles/AudioPlayer.module.css';

function AudioPlayer({audioFile}) {
  // State  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // References
  const audioPlayer = useRef();   // reference to audio componente
  const progressBar = useRef();   // reference to progress bar
  const animationRef = useRef();  // reference to animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60)
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

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }


  return (
    <div className={styles.audioPlayer}>
      <div className={styles.top}>
        <audio ref={audioPlayer} src={audioFile} preload="metadata"></audio>
        <button className={styles.forwardBackward} onClick={backThirty}>
          <img src='../../icons/back.png' alt="back 30" width="12"/> 30
        </button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? (
            <img src='../../icons/pause.png' alt="pause button"/>
          ) : (
            <img src='../../icons/play.png' alt="play button"/>
          )}
        </button>
        <button className={styles.forwardBackward}>30
          <img src='../../icons/forward.png' alt="forward 30" width="12" onClick={forwardThirty}/>
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        <div>
          <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange}/>
        </div>

        <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
    </div>
  )
}

export {AudioPlayer}
