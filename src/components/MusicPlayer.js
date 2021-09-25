import React, {useState, useEffect} from 'react'

function MusicPlayer({file}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const audioFile = new Audio(file)

  useEffect(() => {
    if(isPlaying) {
      this.audioFile.pause()
    } else {
      this.audioFile.play()
    }
  }, [isClicked])

  const onClick = () => {
    setIsPlaying(!isPlaying)
    setIsClicked(!isClicked)
  }

  console.log("playing", isPlaying)
  console.log("isClicked", isClicked)


  return (
    <div>
      <button onClick={onClick}>
        {isPlaying === true ? (
          <img src="../../icons/pause.png" alt="pause-button"/>
        ) : (
          <img src="../../icons/play-button.png" alt="play-button"/>
        )}
      </button>
    </div>
  )
}

export default MusicPlayer
