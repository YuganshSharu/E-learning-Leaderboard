import React from "react";

const YoutubeEmbed = ({ embedId }) => (
  <iframe
    style={{
      width: "100%",
      aspectRatio: "16/9",
      padding: "0% 2% 2% 2%",
    }}
    src={`https://www.youtube.com/embed/${embedId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default YoutubeEmbed;
