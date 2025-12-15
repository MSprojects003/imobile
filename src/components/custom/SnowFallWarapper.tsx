'use client'; // Mark as Client Component

import Snowfall from 'react-snowfall';

interface SnowfallWrapperProps {
  children?: React.ReactNode;
}

export default function SnowfallWrapper({ children }: SnowfallWrapperProps) {
  return (
    <>
      {children}
      {/* Full-viewport snow overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none', // Clicks pass through
          zIndex: -1, // Behind all content
        }}
      >
        <Snowfall
          color="rgba(255, 255, 255, 0.8)" // Soft white flakes
          snowflakeCount={100} // Adjust for density (50 for mobile)
          speed={[0.5, 2]} // Gentle fall
          wind={[-0.2, 0.2]} // Light breeze
          radius={[0.5, 1.5]} // Natural sizes
          opacity={[0.8, 1]} // Varied transparency
          style={{ width: '100%', height: '100%' }} // Full canvas fill
        />
      </div>
    </>
  );
}