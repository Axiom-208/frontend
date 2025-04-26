import React, { useState, useRef } from 'react';
import { X, Upload, File, AlertCircle } from 'lucide-react';

interface UploadNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, title: string) => void;
}

const UploadNoteModal: React.FC<UploadNoteModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection via the file input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Validate file type and size
  const validateAndSetFile = (file: File) => {
    setError(null);
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB.');
      return;
    }
    
    setSelectedFile(file);
    // Auto-set title from filename (without extension)
    if (!noteTitle) {
      setNoteTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  // Trigger file input click
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    
    if (!noteTitle.trim()) {
      setError('Please enter a title for your note.');
      return;
    }
    
    onUpload(selectedFile, noteTitle);
    resetForm();
    onClose();
  };

  // Reset the form
  const resetForm = () => {
    setSelectedFile(null);
    setNoteTitle('');
    setError(null);
  };

  // Close modal and reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-blue-900">Upload Note</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-blue-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1">
              Note Title
            </label>
            <input
              id="note-title"
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter a title for your note"
            />
          </div>

          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
              dragActive ? 'border-blue-900 bg-blue-50' : 'border-gray-300'
            } ${selectedFile ? 'bg-yellow-50' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <File size={48} className="text-blue-900 mb-2" />
                <p className="text-blue-900 font-medium mb-1">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="mt-2 text-sm text-pink-500 hover:text-pink-600"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload size={48} className="text-gray-400 mb-2" />
                <p className="mb-2 text-gray-700">Drag and drop your PDF here, or</p>
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="bg-yellow-200 text-blue-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
                >
                  Browse Files
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Max file size: 10MB. PDF files only.
                </p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Upload Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadNoteModal;