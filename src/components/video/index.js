import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import webvtt from 'node-webvtt';
import axios from 'axios';

import {VodStream, LiveStream} from 'videojs-ima';
// import 'videojs-contrib-hls';

import './style.module.scss';

// ads css import 
import 'videojs-contrib-ads';
import 'videojs-ima';
import { compile } from '../../utils/compileVtt';
import { parse } from '../../utils/parseVtt';

// should get ref from <VideoJs ref={videoplayerRef} />

// const adsMarker = [
//   {
//     startTime: 0,
//     endTime: 15,
//   },
//   {
//     startTime: 15,
//     endTime: 35,
//   },
//   {
//     startTime: 40,
//     endTime: 50,
//   }
// ];

// const listCues = [
//   [
//     {
//       identifier: '1',
//       start: 0,
//       end: 10,
//       styles: '',
//       text: 'sub 1 Vn'
//     },
//     {
//       identifier: '2',
//       start: 20,
//       end: 30,
//       styles: '',
//       text: 'Text 2 Vn'
//     },
//     {
//       identifier: '3 Vn',
//       start: 40,
//       end: 50,
//       styles: '',
//       text: 'sub 3 Vn'
//     }
//   ],
//   [
//     {
//       identifier: '1',
//       start: 3,
//       end: 8,
//       styles: '',
//       text: 'Text 1 En'
//     },
//     {
//       identifier: '3',
//       start: 10,
//       end: 30,
//       styles: '',
//       text: 'Text 2 En'
//     },
//     {
//       identifier: '3',
//       start: 30,
//       end: 40,
//       styles: '',
//       text: 'Text 3 En'
//     }
//   ]
// ]

export const VideoJS = ({props, ref}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const playButton = useRef(null);

  const previousTime = useRef();
  const currentTime = useRef();
  const seekStart = useRef(0);
  const totalSeektime = useRef(0);
  const totalWatchTime = useRef(0);
  const timerCount = useRef();
  // ads
  const adsManager = useRef(null);
  // const [isAdsPlaying, setIsAdsPlaying] = useState(false);

  // const Observe = (sel, opt, cb) => {
  //   const Obs = new MutationObserver((m) => [...m].forEach(cb));
  //   document.querySelectorAll(sel).forEach(el => Obs.observe(el, opt));
  // };
  const [vtt, setVtt] = useState();
  const adsMarker = useRef([
    {
      startTime: 10,
      endTime: 15,
    },
    {
      startTime: 15,
      endTime: 35,
    },
    {
      startTime: 40,
      endTime: 50,
    }
  ]);

  const listCues = useRef([
    [
      {
        identifier: '1',
        start: 0,
        end: 10,
        styles: '',
        text: 'sub 1 Vn'
      },
      {
        identifier: '1',
        start: 10,
        end: 20,
        styles: '',
        text: 'sub inset Vn'
      },
      {
        identifier: '2',
        start: 20,
        end: 30,
        styles: '',
        text: 'Text 2 Vn'
      },
      {
        identifier: '3 Vn',
        start: 40,
        end: 50,
        styles: '',
        text: 'sub 3 Vn'
      }
    ],
    [
      {
        identifier: '1',
        start: 3,
        end: 8,
        styles: '',
        text: 'Text 1 En'
      },
      {
        identifier: '3',
        start: 10,
        end: 30,
        styles: '',
        text: 'Text 2 En'
      },
      {
        identifier: '3',
        start: 30,
        end: 40,
        styles: '',
        text: 'Text 3 En'
      }
    ]
  ])

  // init video has ads
  useEffect(() => {
    // const imaOptions = {
    //   // adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator=',
    //   adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
    // };

    // init video player
    const videoPlayer = videojs(videoRef.current, {
      controls: true,
      muted: true,
      sources: [{
        // src: "http://techslides.com/demos/sample-videos/small.mp4",
        // type: "video/mp4"
        src: 'https://d2f4esnoce5l6k.cloudfront.net/vod/smil:BoXzsVoOXMqqDXZhMJbCMEDIA202210070925281665109528904ktzCUmp4.smil/playlist.m3u8',
        type: "application/x-mpegURL"
        // src: 'http://techslides.com/demos/sample-videos/small.mp4',
        // type: "video/mp4"
      }],
      textTrackSettings: true,
    });
    // videoPlayer.ima(imaOptions);
    playerRef.current = videoPlayer;

    // playerRef.current.on('ended', function() {
    //   playButton.current.classList.add("vjs-ended");
    // })

    // trigger volumn change 
    // Observe(".vjs-volume-level", {
    //   attributesList: ["style"], // Only the "style" attribute
    //   attributeOldValue: true,   // Report also the oldValue
    // }, (m) => {
    //   const valueVolume = (m.target.offsetWidth / 41).toFixed(1);
    //   adsManager.current.setVolume(valueVolume);
    // });

    // Calulate time watch video

    playerRef.current.ready(function(){
      // playerRef.current.addRemoteTextTrack({
      //   src: 'https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt', 
      //   kind: "captions",
      //   srclang: 'vn',
      //   label: 'VietNamese',
      // }, false);
      handleGenerateNewCues();
    });
  }, []);

  const handleGenerateNewCues = () => {
    console.log('info', adsMarker, listCues)
    let newListCues = JSON.parse(JSON.stringify([...listCues.current]));

    adsMarker.current.forEach((adMarkerItem, index) => {
      const duration = adMarkerItem.endTime - adMarkerItem.startTime;
      console.log(listCues, 'run ads: ', index, 'duation', duration)

      newListCues = [...newListCues].map((listCue, indexListCue) => {
        let newListCueAdsInSub = [...listCue];

        const cueAdsIn = newListCueAdsInSub.find((item) => item.start < adMarkerItem.startTime && item.end > adMarkerItem.startTime );
        const indexCueAdsIn = newListCueAdsInSub.findIndex((item) => item.start < adMarkerItem.startTime && item.end > adMarkerItem.startTime );
        console.log({cueAdsIn, indexCueAdsIn, adMarkerItem})

        if (cueAdsIn) {
          const newList = JSON.parse(JSON.stringify(Array(2).fill(cueAdsIn)));
          newList[0].end = adMarkerItem.startTime;
          newList[1].start = adMarkerItem.startTime;

          newListCueAdsInSub.splice(indexCueAdsIn, 1, ...newList);
          newListCueAdsInSub = [...newListCueAdsInSub].map((item, index) => {
            return { ...item, identifier: `${index + 1}` };
          });
        }
        console.log(newListCueAdsInSub, '//////')

        const newListCue = newListCueAdsInSub.map((cue, index) => {
          if (newListCueAdsInSub[index]?.start >= adMarkerItem.startTime) {
            return {
              ...cue,
              start: cue.start + duration,
              end: cue.end + duration,
            };
          }
          return cue;
        })
        console.log({newListCue})
        return newListCue;
      })
      console.log('listCueRef:', listCues, newListCues)
    })

    console.log({newListCues}, '=====')

    handleCompile(newListCues);
  };

  const handleCompile = (data) => {
    data.forEach((listCue, index) => {
      const input = {
        cues: listCue,
        valid: true
      };
      const vttText = compile(input);
      const vttBlob = new Blob([vttText], {
        type: 'text/plain'
      });
      playerRef.current.addRemoteTextTrack({
        src: URL.createObjectURL(vttBlob), 
        kind: "captions",
        srclang: 'vn',
        label: 'Vietnamese',
      }, false);
    })
  };

  // init video livestream
  // useEffect(() => {
  //   const videoOptions = {
  //     controls: true,
  //   };

  //   const player = videojs(videoRef.current, videoOptions);
  //   // Example of a Live and VOD stream using IMA's samples streams.
  //   const vodStream = new VodStream('hls', '2528370', 'tears-of-steel');
  //   const liveStream = new LiveStream('hls', 'sN_IYUG8STe1ZzhIIE_ksA');

  //   const imaOptions = {
  //     fallbackStreamUrl: 'http://storage.googleapis.com/testtopbox-public/video_content/bbb/master.m3u8',
  //     // Include other IMA DAI options as needed.
  //   };
    
  //   player.imaDai(liveStream, imaOptions);
  //   playerRef.current = player;
  // }, [])

  // useEffect(() => {
  //   playerRef.current.on('ads-ad-started', function() {
  //     setTimeout(() => {
  //       playButton.current.classList.add("vjs-playing");
  //       playButton.current.classList.remove("vjs-paused");
  //       playButton.current.classList.remove("vjs-ended");
  //       playerRef.current.setVolumn(0);
  //     })
  //     setIsAdsPlaying(true);
  //   })

  //   playerRef.current.on('ads-manager', function(response){
  //     adsManager.current = response.adsManager;

  //     adsManager.current.addEventListener('complete', () => {
  //       setIsAdsPlaying(false);
  //       playerRef.current.controlBar.playToggle.off('click');
  //       playerRef.current.controlBar.playToggle.on('click', function(e) {
  //       if (playerRef.current.paused()) {
  //         playerRef.current.play();
  //       } else {
  //         playerRef.current.pause();
  //       }
  //       })
  //     });
  //   })
  // }, [])

  // useEffect(() => {
  //   playButton.current = document.querySelector('.vjs-play-control');
  // }, [])

  // useEffect(() => {
  //   if (isAdsPlaying) {
  //     document.querySelector(".vjs-progress-control").style.display = "none";
  //   } else {
  //     document.querySelector(".vjs-progress-control").style.display = "block";
  //   }

  //   // handle click button play
  //   if (isAdsPlaying === true) {
  //     let isPause = false;
      
  //     playerRef.current.controlBar.playToggle.on('click', function(e) {
  //       if (isAdsPlaying) {
  //         videoRef.current.pause();
  //       }
  //       if (isPause) {
  //         adsManager.current.resume();
  //         isPause = false;
  //         setTimeout(() => {
  //           playButton.current.classList.add("vjs-playing");
  //           playButton.current.classList.remove("vjs-paused");
  //         })
  //       } else {
  //         adsManager.current.pause();
  //         isPause = true;
  //         setTimeout(() => {
  //           playButton.current.classList.add("vjs-paused");
  //           playButton.current.classList.remove("vjs-playing");
  //         })
  //       }
  //     })
  //   }
  // }, [isAdsPlaying])

  return (
    <div className='video-js-custom'>
      <div>
        <video ref={videoRef} className="video-js">
            {/* <track
              src="https://kot-politiken.s3-eu-west-1.amazonaws.com/2019/114_en.vtt.txt"
              kind="captions"
              srcLang="en"
              label="English"
            />
            <track src="./vttFile.vtt" kind="captions" srcLang="ja" label="japan" /> */}
        </video>
      </div>
    </div>
  );
}

export default VideoJS;
