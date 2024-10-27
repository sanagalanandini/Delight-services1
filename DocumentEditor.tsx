// src/components/DocumentEditor.tsx
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface DocumentEditorProps {
  onSave: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ onSave }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  // Autosave every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      onSave(content); // Call the save function provided by parent
    }, 5000);

    return () => clearInterval(interval);
  }, [editorState, onSave]);

  // Handle key commands for text formatting
  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Toggle inline style (bold, italic, underline)
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>Document Editor</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
        <button onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
        <button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
      </div>
      <div
        style={{
          border: '1px solid #ddd',
          minHeight: '400px',
          padding: '10px',
          backgroundColor: '#fff',
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
export {};