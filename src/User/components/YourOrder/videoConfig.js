export const getVideoConfig = () => ({
    controls: true,
    responsive: true,
    fluid: true,
    aspectRatio: '16:9',
    playbackRates: [0.5, 1, 1.5, 2],
    html5: {
      vhs: {
        overrideNative: true,
        enableLowInitialPlaylist: false,
        smoothQualityChange: true,
      },
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false
    },
    controlBar: {
      children: [
        'playToggle',
        'volumePanel',
        'currentTimeDisplay',
        'timeDivider',
        'durationDisplay',
        'progressControl',
        'playbackRateMenuButton',
        'fullscreenToggle',
      ]
    }
  });