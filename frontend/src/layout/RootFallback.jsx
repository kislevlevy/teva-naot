import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function RootFallback() {
  return (
    <>
      <Skeleton variant="rounded" height={400} width="100%" />
      <div className="flex justify-center mt-20">
        <Skeleton variant="rounded" className="p-6 m-1" height={370} width={230} />
        <Skeleton variant="rounded" className="p-6 m-1" height={370} width={230} />
        <Skeleton variant="rounded" className="p-6 m-1" height={370} width={230} />
        <Skeleton variant="rounded" className="p-6 m-1" height={370} width={230} />
      </div>
    </>
  );
}
