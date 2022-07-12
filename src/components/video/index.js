import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './style.module.scss';

// ads css import 
import 'videojs-contrib-ads';
import 'videojs-ima';

var videoOptions = {
  controls: true,
  sources: [{
    src: 'PATH_TO_YOUR_CONTENT_VIDEO',
    type: 'YOUR_CONTENT_VIDEO_TYPE',
  }]
};

// --------------------- you can register component 
// videojs.registerComponent('VjsPlaceholder', VjsPlaceholder);
// videojs.registerComponent('NextVideoButton', NextVideoButton);



// ------------------------- define multiple language
// videojs.addLanguage('ja', {
//   'Play': '再生',
//   'Pause': '一時停止',
//   'Replay': 'リプレイ',
//   'Next Episode': '次のエピソード',
//   'Next': '次へ',
//   'Picture-in-Picture': 'ピクチャーインピクチャー',
//   'Mute': 'ミュート',
//   'Unmute': 'ミュートを解除',
//   'Full screen': '全画面',
//   'Exit full screen': '全画面モードの終了',
//   'Theater mode': 'シアターモード',
//   'Default view': 'デフォルト表示',
//   'Back to tab': 'タブに戻る',
//   'Expand': 'ピクチャーインピクチャーを終了'
// });


// should get ref from <VideoJs ref={videoplayerRef} />
export const VideoJS = ({props, ref}) => {
  const videoRef = useRef(null);
  const imaOptions = {
    adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
  };

  useEffect(() => {
    // init video player
    const videoPlayer = videojs(videoRef.current, {
      fill: true,
      fluid: false,
      preload: 'auto',
      html5: {
        nativeTextTracks: false,
        playsinline: true,
        vhs: {
          enableLowInitialPlaylist: true,
          overrideNative: true,
        },
      },
      controls: true,
      sources: [{
        src: "https://stream-vod-dev.akamaized.net/vod/smil:SquidGameacousticguitar1080phEKNE6OcohojjIwWULrOFREE20211223140835mp4.smil/playlist.m3u8",
        type: "application/x-mpegURL"
      }, imaOptions],
      // controlBar: {
      //   playToggle: true,
      //   currentTimeDisplay: true,
      //   durationDisplay: true,
      //   timeDivider: true,
      //   volumePanel: true,
      //   fullscreenToggle: true,
      //   playbackRateMenuButton: false,
      //   pictureInPictureToggle: false,
      //   remainingTimeDisplay: true
      // },
      // language: i18n.language
      // aspectRatio: '9:5',
      // adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
    }, () => {
      // playerRef.current.on('ended', onEndedVideo);
      // playerRef.current.on('timeupdate', onUpdateTime);
    });

    // videoPlayer.ima(imaOptions)
  }, []);

  return (
    <div className='video-js-custom'>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div>
    </div>
  );
}

export default VideoJS;
