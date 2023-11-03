// Overlay.jsx
import React from 'react';
import { OverlayView } from '@react-google-maps/api';

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
});

function Overlay({ position, label, type }) {
  if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
    console.error('Invalid position:', position);
    return null;
  }

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div style={{ background: 'white', padding:'0.5rem',display:'inline-block',boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px'}}>
        <div style={{fontSize:'18px',color:'black',whiteSpace: 'nowrap'}}>
          {type}: {label}
        </div>
      </div>
    </OverlayView>
  );
}

export default Overlay;