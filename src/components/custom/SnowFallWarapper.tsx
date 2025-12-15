'use client'; // Mark as Client Component

import Snowfall from 'react-snowfall';

interface SnowfallWrapperProps {
  children?: React.ReactNode;
}

export default function SnowfallWrapper({ children }: SnowfallWrapperProps) {
  return (
    <>
      {children}
      {/* Full-viewport overlay for always-visible snow (better than relative for scrolling sites) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none', // Lets clicks pass through to your content
          zIndex: -1, // Behind everything
        }}
      >
        <Snowfall
          // DEBUG: Obvious styling to test visibility
          color="#ff0000" // Bright red flakes (change to "rgba(255, 255, 255, 0.8)" once working)
          snowflakeCount={50} // Low for testing (no lag)
          speed={[0.1, 0.5]} // Super slow fall
          wind={[0, 0]} // No wind for straight drop
          radius={[3, 6]} // Bigger flakes
          opacity={[1, 1]} // Fully solid
          style={{ width: '100%', height: '100%' }} // Force full canvas size
        />
      </div>
      {/* DEBUG: Green badge to confirm component loads */}
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 9999,
          background: 'green',
          color: 'white',
          padding: '5px',
          fontSize: '12px',
        }}
      >
        Snow Loaded! ❄️
      </div>
    </>
  );
}