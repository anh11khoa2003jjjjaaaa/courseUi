import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { getVideoConfig } from './videoConfig';

export const useVideoPlayer = (videoUrl) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (playerRef.current) {
      playerRef.current.dispose();
    }

    const player = videojs(videoRef.current, {
      ...getVideoConfig(),
      sources: [{
        src: videoUrl,
        type: 'video/mp4'
      }]
    });

    player.ready(() => {
      console.log('Player is ready');
      player.play().catch(error => {
        console.log('Playback failed:', error);
      });
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl]);

  return videoRef;
};