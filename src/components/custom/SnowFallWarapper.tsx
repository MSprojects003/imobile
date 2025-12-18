'use client';

import Snowfall from 'react-snowfall';

interface SnowfallWrapperProps {
  children?: React.ReactNode;
}

export default function SnowfallWrapper({ children }: SnowfallWrapperProps) {
  return (
    <>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',  // ✅ Dynamic viewport height (better for mobile/scrollbars)
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',  // ✅ Prevent canvas overflow
        }}
      >
        <Snowfall
          color="#ADD8E6"
          snowflakeCount={200}
          speed={[0.5, 2]}
          wind={[0.4, 0.2]}
          radius={[0.5, 1.5]}
          opacity={[0.9, 1]}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
}