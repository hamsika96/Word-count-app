import React from 'react';
import { Version } from './TimeLineView';  // You can import `Version` type from the existing file

type BranchingTimelineProps = {
  versions: Version[];
  currentVersionIndex: number;
  setCurrentVersionIndex: (index: number) => void;
  currentBranchId: string;
  setCurrentBranchId: (branchId: string) => void;
};

const BranchingTimeline = ({
  versions,
  currentVersionIndex,
  setCurrentVersionIndex,
  currentBranchId,
  setCurrentBranchId,
}: BranchingTimelineProps) => {

  // This will help us visualize all the versions as a branching structure
  const getBranches = () => {
    const branches: Record<string, Version[]> = {};

    versions.forEach(version => {
      if (!branches[version.branchId]) {
        branches[version.branchId] = [];
      }
      branches[version.branchId].push(version);
    });

    return branches;
  };

  const branches = getBranches();

  const handleBranchClick = (branchId: string) => {
    const branchHead = branches[branchId]?.[0]; // The latest version in that branch
    if (branchHead) {
      setCurrentBranchId(branchId);
      setCurrentVersionIndex(versions.indexOf(branchHead));
    }
  };

  return (
    <div className="branching-timeline">
      {Object.keys(branches).map((branchId) => (
        <div key={branchId} className="branch">
          <h3>{branchId}</h3>
          <div className="branch-line">
            {branches[branchId].map((version, index) => (
              <div
                key={index}
                className={`version-dot ${version.branchId === currentBranchId && index === currentVersionIndex ? 'current' : ''}`}
                onClick={() => setCurrentVersionIndex(versions.indexOf(version))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchingTimeline;
