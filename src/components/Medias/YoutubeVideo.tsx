import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

interface YoutubeVideoProps {
  src: string;
  className?: string;
}

export function YoutubeVideo(props: YoutubeVideoProps): React.JSX.Element {
  const { src, className } = props;
  const videoNode = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = useRef(null) as React.MutableRefObject<any>;
  const initialized = useRef(false);

  useEffect(() => {
    if (videoNode.current && !initialized.current) {
      initialized.current = true; //prevent duplicate initialization
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...videoJsOptions,
      }).ready(function () {
        console.log("Player Ready");
      });
    }
    //clear up player on dismount
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, []);

  const initialOptions = {
    controls: true,
    fluid: true,
    controlBar: {
      volumePanel: {
        inline: false,
      },
    },
  };

  const videoJsOptions = {
    sources: [
      {
        type: "video/youtube", //important
        src: src,
      },
    ],
  };

  return (
    <div className={`w-full ${className}`}>
      <video
        ref={videoNode}
        style={{
          overflow: "hidden",
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
        }}
        className={"video-js"}
      />
    </div>
  );
}
