import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './style.module.scss';

// ads css import 
import 'videojs-contrib-ads';
import 'videojs-ima';
import { use } from 'i18next';

// should get ref from <VideoJs ref={videoplayerRef} />
export const VideoJS = ({props, ref}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const playButton = useRef(null);

  // ads
  const adsManager = useRef(null);
  const [isAdsPlaying, setIsAdsPlaying] = useState(false);

  const imaOptions = {
    // adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator=',
    adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
    // disableAdControls: true,
  };

  const Observe = (sel, opt, cb) => {
    const Obs = new MutationObserver((m) => [...m].forEach(cb));
    document.querySelectorAll(sel).forEach(el => Obs.observe(el, opt));
  };
  

  useEffect(() => {
    // init video player
    const videoPlayer = videojs(videoRef.current, {
      controls: true,
      sources: [{
        // src: "https://stream-vod-dev.akamaized.net/vod/smil:SquidGameacousticguitar1080phEKNE6OcohojjIwWULrOFREE20211223140835mp4.smil/playlist.m3u8",
        // type: "application/x-mpegURL"
        src: 'https://storage.googleapis.com/gvabox/media/samples/android.mp4',
        type: "video/mp4"
      }]
    });
    videoPlayer.ima(imaOptions);
    playerRef.current = videoPlayer;

    playerRef.current.on('ended', function() {
      playButton.current.classList.add("vjs-ended");
    })

    // trigger volumn change 
    Observe(".vjs-volume-level", {
      attributesList: ["style"], // Only the "style" attribute
      attributeOldValue: true,   // Report also the oldValue
    }, (m) => {
      const valueVolume = (m.target.offsetWidth / 41).toFixed(1);
      adsManager.current.setVolume(valueVolume);
    });
  }, []);

  useEffect(() => {
    playerRef.current.on('ads-ad-started', function(){
      setTimeout(() => {
        playButton.current.classList.add("vjs-playing");
        playButton.current.classList.remove("vjs-paused");
        playButton.current.classList.remove("vjs-ended");
        playerRef.current.setVolumn(0);
      })
      setIsAdsPlaying(true);
    })

    playerRef.current.on('ads-manager', function(response){
      adsManager.current = response.adsManager;

      adsManager.current.addEventListener('complete', () => {
        console.log('end ad');
        setIsAdsPlaying(false);
        playerRef.current.controlBar.playToggle.off('click');
        playerRef.current.controlBar.playToggle.on('click', function(e) {
        if (playerRef.current.paused()) {
          playerRef.current.play();
        } else {
          playerRef.current.pause();
        }
        })
      });
    })
  }, [])

  useEffect(() => {
    playButton.current = document.querySelector('.vjs-play-control');
  }, [])

  useEffect(() => {
    if (isAdsPlaying) {
      document.querySelector(".vjs-progress-control").style.display = "none";
    } else {
      document.querySelector(".vjs-progress-control").style.display = "block";
    }

    // handle click button play
    if (isAdsPlaying === true) {
      let isPause = false;
      
      playerRef.current.controlBar.playToggle.on('click', function(e) {
        console.log('click when ad start', isAdsPlaying)
        if (isAdsPlaying) {
          videoRef.current.pause();
        }
        if (isPause) {
          adsManager.current.resume();
          isPause = false;
          setTimeout(() => {
            playButton.current.classList.add("vjs-playing");
            playButton.current.classList.remove("vjs-paused");
          })
        } else {
          adsManager.current.pause();
          isPause = true;
          setTimeout(() => {
            playButton.current.classList.add("vjs-paused");
            playButton.current.classList.remove("vjs-playing");
          })
        }
      })
    }
  }, [isAdsPlaying])

  return (
    <div className='video-js-custom'>
      <div>
        <video ref={videoRef} className="video-js" />
      </div>
    </div>
  );
}

export default VideoJS;
