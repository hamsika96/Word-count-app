// src/App.tsx
import React, { useState } from 'react';
import Editor from './components/Editor';
import TimelineView from './components/TimeLineView'; // Fixed the import to TimelineView
import './style.css';

type Version = {
  content: string;
  parentIndex: number | null;
  branchId: string;
};

const App = () => {
  // Feature 3: Change versions to array of Version objects
  const [versions, setVersions] = useState<Version[]>([
    {
      content: '',
      parentIndex: null,
      branchId: 'main', // default branch
    },
  ]);

  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [isTimelineView, setIsTimelineView] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState('main');
  const [branchCounter, setBranchCounter] = useState(1); // for unique branch ids

  // Save new version (extend to include branch info)
  const saveNewVersion = (newContent: string) => {
    setVersions((prevVersions) => {
      const newVersion: Version = {
        content: newContent,
        parentIndex: currentVersionIndex,
        branchId: currentBranchId,
      };

      const updatedVersions = [...prevVersions, newVersion];
      setCurrentVersionIndex(updatedVersions.length - 1); // Move to latest version
      return updatedVersions;
    });
  };

  // Start a new branch from the current point
  const createNewBranch = () => {
    const newBranchId = `branch-${branchCounter}`;
    setBranchCounter((prev) => prev + 1);
    setCurrentBranchId(newBranchId);

    // Optionally, create a starting version for the new branch
    setVersions((prevVersions) => {
      const newVersion: Version = {
        content: prevVersions[currentVersionIndex].content,
        parentIndex: currentVersionIndex,
        branchId: newBranchId,
      };

      const updatedVersions = [...prevVersions, newVersion];
      setCurrentVersionIndex(updatedVersions.length - 1); // Move to latest version of the new branch
      return updatedVersions;
    });
  };

  return (
    <div className="App">
      <h1>Plain Text Editor with Timeline View</h1>

      <button onClick={() => setIsTimelineView(!isTimelineView)}>
        {isTimelineView ? 'Back to Editor' : 'Switch to Timeline View'}
      </button>

      {isTimelineView ? (
        <TimelineView
          versions={versions}
          currentVersionIndex={currentVersionIndex}
          setCurrentVersionIndex={setCurrentVersionIndex}
          createBranch={createNewBranch}
          setCurrentBranchId={setCurrentBranchId}
        />
      ) : (
        <Editor onSaveVersion={saveNewVersion} />
      )}
    </div>
  );
};

export default App;
