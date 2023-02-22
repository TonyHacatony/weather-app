import React from 'react';

interface SkeletonProps {
  className: string;
}

interface SkeletonColumnProps {
  rowsCount: number;
}

const Skeleton = ({ className }: SkeletonProps) => <span className={`skeleton ${className}`}></span>;

export const SkeletonText = () => <Skeleton className='skeleton-text skeleton-row ' />;
export const SkeletonHeaderText = () => <Skeleton className='skeleton-head skeleton-title' />;
export const SkeletonHeaderTempText = () => <Skeleton className='skeleton-head skeleton-title-temp' />;
export const SkeletonBtnText = () => <Skeleton className='skeleton-text skeleton-btn-row' />;

export const SkeletonColumn = ({ rowsCount }: SkeletonColumnProps) => {
  const arr = Array.from(Array(rowsCount + 1).keys()).slice(1);
  return (
    <>
      {arr.map((i) => <SkeletonText key={i} />)}
    </>
  );
}
