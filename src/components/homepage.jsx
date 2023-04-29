import React, { useState } from "react";
import { youtube_parser } from "../utils/youtube_key_parser";

const Homepage = () => {
  const [val, setval] = useState("");
  const [download_val, set_download_val] = useState("");
  const [status, setstatus] = useState("");

  const onsubmitt = async () => {
    const youtube_id = youtube_parser(val);
    console.log(youtube_id);

    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${youtube_id}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "0243e36ec4msh14195711a7cb043p1d389fjsn2883862beac4",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const link_to_download = result.link;
      set_download_val(link_to_download);
      setstatus(result.status);
      setval("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Youtube 2 Mp3</h1>

      <div className="inner-container">
        <h3>YouTube To Mp3 Converter</h3>
        <p>Transform Youtube videos into Mp3 in just a few clicks!</p>
        <p>Paste your desired Youtube URL here</p>
        <input
          type="text"
          value={val}
          onChange={(e) => setval(e.target.value)}
        />
        <button onClick={onsubmitt}>Search</button>
        {status === "ok" ? <a href={download_val}>Click to Download</a> : null}
      </div>
    </div>
  );
};

export default Homepage;
