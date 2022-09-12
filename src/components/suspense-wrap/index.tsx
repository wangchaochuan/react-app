import React, { Suspense, FC } from 'react';

const SuspenseWrap: FC<{ render?: React.ReactNode }> = ({ render }) => {
  return (
    <React.Fragment>
      <Suspense fallback={null}>{render}</Suspense>
    </React.Fragment>
  );
};

export default SuspenseWrap;
