import { withControls, Controls } from "react-three-gui";
import { Brain_3D } from "./Brain_3D.jsx";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

export function Model(props) {
  let urlParams = new URLSearchParams(window.location.search);

  let activeSubject = urlParams.get("subject") || "fsaverage";
  const YourCanvas = withControls(Canvas);

  return (
    <Controls.Provider>
      <YourCanvas
        style={{ backgroundColor: "black" }}
        color={"black"}
        colorManagement
        // pixelRatio={window.devicePixelRatio}
      >
        <Suspense fallback={null}>
          <Brain_3D
            activeSubject={activeSubject}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            position={[0, 0, 0]}
          ></Brain_3D>
        </Suspense>
      </YourCanvas>
      <Controls
        title={`Menu - ${activeSubject}`}
        anchor="bottom_right"
        collapsed={true}
        defaultClosedGroups={['Grayscale', 'Transparency']}
      />
    </Controls.Provider>
  );
}
