import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";

const RumtekVirtualTour = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      }
    }
  };

  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-md overflow-hidden">
      <iframe
        ref={iframeRef}
        src="/rumtek_tour/app-files/index.html"
        title="Rumtek Monastery Virtual Tour"
        className="w-full h-full border-0"
        allowFullScreen
      />
      <div className="absolute top-4 right-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFullscreen}
          className="bg-background/80 hover:bg-background"
        >
          <Maximize className="h-4 w-4 mr-2" />
          Fullscreen
        </Button>
      </div>
    </div>
  );
};

export default RumtekVirtualTour;