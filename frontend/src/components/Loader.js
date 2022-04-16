import { CircularProgress } from '@mui/material';
import React from 'react';

export default function Loader() {
  return (
    <div
      className="loader"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </div>
  );
}
