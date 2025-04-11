// src/components/Editor.tsx
import React, { useState, useEffect } from 'react';

const Editor = ({ onSaveVersion }: { onSaveVersion: (newVersion: string) => void }) => {
  const [content, setContent] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (content.trim().length > 0) {
        onSaveVersion(content);
      }
    }, 5000); // Auto-save every 5 seconds

    return () => clearInterval(interval);
  }, [content, onSaveVersion]);

  const calculateWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    setWordCount(calculateWordCount(newContent));
  };

  const handleSave = () => {
    onSaveVersion(content);
  };

  return (
    <div className="editor-container">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your document here..."
        className="editor-area"
      />
  
      <div className="word-count">
        <p>Word Count: {wordCount}</p>
      </div>
  
      <div className="button-container">
        <button onClick={handleSave}>Save Version</button>
      </div>
    </div>
  );

};

export default Editor;
