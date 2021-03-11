import { withControls, Controls } from 'react-three-gui';
import { Brain_3D } from './Brain_3D.jsx';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import * as dat from 'dat.gui';

export function Model(props) {
  let urlParams = new URLSearchParams(window.location.search);
  let gui = new dat.GUI({
    autoPlace: false,
  });

  let guiRef = useRef();

  useEffect(() => {
    // let cu/stomContainer = document.getElementById("my-gui-container");
    guiRef.current.appendChild(gui.domElement);
  }, []);

  let activeSubject = urlParams.get('subject') || 'fsaverage';
  const YourCanvas = withControls(Canvas);

  return (
    <Controls.Provider>
      <YourCanvas style={{ backgroundColor: 'black' }} color={'black'} colorManagement>
        <div ref={guiRef}></div>

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
        defaultClosedGroups={['Grayscale', 'Transparency', 'data', 'test']}
      />
    </Controls.Provider>
  );
}
