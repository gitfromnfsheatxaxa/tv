import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './VideoPlayer.css';

/**
 * VideoPlayer Component
 * 
 * Full-screen TV-friendly video player with remote control support.
 * Uses HTML5 video element with custom controls optimized for TV navigation.
 * 
 * TV-Specific Features:
 * - All controls are focusable with useFocusable
 * - Large, clearly visible controls
 * - Focus states with red ring indicator
 * - Back button support (physical remote and UI)
 * - Video ends with replay option
 * - Progress seeking with left/right arrows
 */

function VideoPlayer({ movie, onBack }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // Focus context for the player
  const { ref: playerRef, focusKey: playerFocusKey } = useFocusable({
    focusKey: 'VIDEO-PLAYER',
    trackChildren: true,
  });

  // Reset controls visibility on interaction
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && !isVideoEnded) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying, isVideoEnded]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [resetControlsTimeout]);

  // FIX: handleBack was originally defined AFTER the useEffect that referenced it (line ~131).
  // `const` is not hoisted unlike `function` declarations — React threw
  // "Cannot access handleBack before initialization" on every render.
  // Moved here so it is defined before the useEffect that depends on it.
  const handleBack = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  // Handle physical remote Back key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVideoEnded(true);
    setShowControls(true);
    // Focus the replay button
    setTimeout(() => {
      setFocus('player-replay-btn');
    }, 100);
  };

  // Control handlers
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      resetControlsTimeout();
    }
  }, [isPlaying, resetControlsTimeout]);

  const handleSeek = useCallback((direction) => {
    if (videoRef.current) {
      const seekAmount = 10; // Seek 10 seconds
      const newTime = direction === 'left' 
        ? Math.max(0, videoRef.current.currentTime - seekAmount)
        : Math.min(duration, videoRef.current.currentTime + seekAmount);
      videoRef.current.currentTime = newTime;
      resetControlsTimeout();
    }
  }, [duration, resetControlsTimeout]);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsVideoEnded(false);
      setShowControls(true);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FocusContext.Provider value={playerFocusKey}>
      <div 
        ref={playerRef}
        className="video-player"
        onMouseMove={resetControlsTimeout}
        onTouchStart={resetControlsTimeout}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="video-element"
          src={movie?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
          poster={movie?.image || movie?.backdrop}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          onClick={togglePlay}
        />

        {/* Top Bar */}
        <div className={`player-top-bar${showControls ? ' visible' : ''}`}>
          <div className="top-bar-content">
            <TopBarBackButton onBack={handleBack} />
            <div className="top-bar-info">
              <h1 className="player-title">{movie?.title || 'Now Playing'}</h1>
              {movie?.year && <span className="player-year">{movie.year}</span>}
            </div>
          </div>
        </div>

        {/* Video Ended Overlay */}
        {isVideoEnded && (
          <div className="video-ended-overlay">
            <div className="ended-content">
              <h2 className="ended-title">Video Completed</h2>
              <p className="ended-message">You've finished watching {movie?.title}</p>
              <ReplayButton onClick={handleReplay} />
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className={`player-controls${showControls ? ' visible' : ''}`}>
          {/* Progress Bar */}
          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div 
              className="progress-bar"
              ref={(el) => {
                // Make progress bar focusable for seeking
                if (el) {
                  el.setAttribute('data-focus-key', 'player-progress');
                }
              }}
            >
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }} 
              />
              <div 
                className="progress-thumb"
                style={{ left: `${progress}%` }}
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="control-buttons">
            <ControlButton
              id="player-back-btn"
              icon="back"
              label="Back"
              onClick={handleBack}
            />
            <ControlButton
              id="player-play-btn"
              icon={isPlaying ? 'pause' : 'play'}
              label={isPlaying ? 'Pause' : 'Play'}
              onClick={togglePlay}
            />
            <ControlButton
              id="player-seek-left-btn"
              icon="seek-left"
              label="-10s"
              onClick={() => handleSeek('left')}
            />
            <ControlButton
              id="player-seek-right-btn"
              icon="seek-right"
              label="+10s"
              onClick={() => handleSeek('right')}
            />
          </div>
        </div>

        {/* Play/Pause Big Overlay (shown briefly on toggle) */}
        <div className={`play-pause-overlay${isPlaying ? '' : ' hidden'}`}>
          <div className="play-pause-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

/**
 * TopBarBackButton - Back button in the top bar
 */
function TopBarBackButton({ onBack }) {
  const { ref, focused } = useFocusable({
    focusKey: 'player-top-back',
    onEnterPress: onBack,
  });

  return (
    <div
      ref={ref}
      className={`top-back-btn${focused ? ' focused' : ''}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      <span>Back</span>
    </div>
  );
}

/**
 * ReplayButton - Shown when video ends
 */
function ReplayButton({ onClick }) {
  const { ref, focused } = useFocusable({
    focusKey: 'player-replay-btn',
    onEnterPress: onClick,
  });

  return (
    <div
      ref={ref}
      className={`replay-btn${focused ? ' focused' : ''}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
      </svg>
      <span>Replay</span>
    </div>
  );
}

/**
 * ControlButton - Reusable control button for the player
 */
function ControlButton({ id, icon, label, onClick }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: onClick,
  });

  const icons = {
    back: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    ),
    play: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    pause: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    ),
    'seek-left': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
      </svg>
    ),
    'seek-right': (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className={`control-btn${focused ? ' focused' : ''}`}
    >
      <div className="control-btn-icon">{icons[icon]}</div>
      <span className="control-btn-label">{label}</span>
    </div>
  );
}

export default VideoPlayer;