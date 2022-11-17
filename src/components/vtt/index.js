import axios from 'axios';
import React, { useEffect } from 'react';
import webvtt from 'node-webvtt';

const VTT = () => {
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://videos.dev2.lunativi.com/4/NkGWhbHC4JAn1J19oSkt_SUBTITLE_20221109-154202_1667983322754.vtt?Expires=1668588398&Signature=HnIGhY6bf8zSxj2bUgejkv9GTPO60RfUzRzbXjsS3DxXv044Aqay3T50NAnoozUTGpI6eMJakkC0uzA-BbBKy9oYcEIhXJGAVDzsxTlrBpRgGQr6-Ul8ZJgWdYVddAobHc0a9SXPK3xvnnpN3fXAUjcKJk-np0KndkBc0Bpg-OKDMw5gBsKoYu1sbCiSKGh6WcGKaKVv2ockFHlP9Y7tJzSX~-K9ZlCNKggt8GJWWu4EgmRmHCZUNcSH47XqKNegCvjOJxRpA0CIor0vkLxYrItieNN3OoKfkx2Kocbv5IZ2tnwAwl1YmnvH8bSaGcdtqkxpqin3RYaBR-hkZ6HlBQ__&Key-Pair-Id=KOQI970OR8HW2';
      const data = await axios.get(url);
      // console.log(data)
      const listCues = webvtt.parse(data.data).cues;

      //
      const input = {
        cues: listCues,
        valid: true
      };
      const newVtt = webvtt.compile(input);
      console.log(newVtt)
    }
    fetchData();
  }, []);

  return (
    <div>
      vtt
    </div>
  )
}

export default VTT