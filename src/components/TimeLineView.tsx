import React from 'react';
import BranchingTimeline from './BranchingTimeline';

export type Version = {
    content: string;
    parentIndex: number | null;
    branchId: string;
  };

const TimelineView = ({
  versions,
  currentVersionIndex,
  setCurrentVersionIndex,
  createBranch,
  setCurrentBranchId
}: {
  versions: Version[];
  currentVersionIndex: number;
  setCurrentVersionIndex: (index: number) => void;
  createBranch: (fromVersionIndex: number) => void;
  setCurrentBranchId: (branchId: string) => void;
}) => {

  const handlePrev = () => {
    const currentVersion = versions[currentVersionIndex];
    if (currentVersion.parentIndex !== null) {
      setCurrentVersionIndex(currentVersion.parentIndex);
    }
  };

  const handleNext = () => {
    const nextVersionIndex = versions.findIndex(
      (v, idx) => v.parentIndex === currentVersionIndex && v.branchId === versions[currentVersionIndex].branchId
    );
    if (nextVersionIndex !== -1) {
      setCurrentVersionIndex(nextVersionIndex);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVersionIndex(Number(event.target.value));
  };

  const handleBranch = () => {
    createBranch(currentVersionIndex);
  };

  const handleSelectBranch = (branchId: string) => {
    const branchHead = versions.filter(v => v.branchId === branchId)[0]; // Get the first version of the branch
    if (branchHead) {
      setCurrentVersionIndex(versions.indexOf(branchHead));
      setCurrentBranchId(branchId);
    }
  };

  return (
    <div className="timeline-container">
      <h2>Timeline View (Read-Only)</h2>

      <BranchingTimeline
        versions={versions}
        currentVersionIndex={currentVersionIndex}
        setCurrentVersionIndex={setCurrentVersionIndex}
        currentBranchId={versions[currentVersionIndex].branchId}
        setCurrentBranchId={setCurrentBranchId}
      />

      <div className="timeline-controls">
        <button onClick={handlePrev} disabled={versions[currentVersionIndex].parentIndex === null}>
          ⏮️ Previous
        </button>
        <button onClick={handleNext}>
          Next ⏭️
        </button>
        <button onClick={handleBranch}>
          🌿 Create Branch from here
        </button>
      </div>

      <input
        type="range"
        min="0"
        max={versions.length - 1}
        value={currentVersionIndex}
        onChange={handleSeek}
        className="timeline-slider"
      />
      <p>Version {currentVersionIndex + 1} of {versions.length}</p>

      <div className="timeline-version">
        <pre>{versions[currentVersionIndex].content}</pre>
      </div>

      {/* Branch Selection */}
      <div className="branch-selection">
        {Array.from(new Set(versions.map(v => v.branchId))).map((branchId) => (
          <button key={branchId} onClick={() => handleSelectBranch(branchId)}>
            {branchId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
