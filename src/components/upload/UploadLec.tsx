import React, {useState} from 'react';
import {X, Video, AlertCircle, Youtube} from 'lucide-react';

interface UploadLectureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (youtubeUrl: string, title: string) => void;
}

const UploadLectureModal: React.FC<UploadLectureModalProps> = ({isOpen, onClose, onUpload}) => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [lectureTitle, setLectureTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isValidUrl, setIsValidUrl] = useState(false);

    //reset form
    const resetForm = () => {
        setYoutubeUrl('');
        setLectureTitle('');
        setError(null);
        setIsValidUrl(false);
    };

    //close modal and reset
    const handleClose = () => {
        resetForm();
        onClose();
    };

    //youtube link check
    const validateYoutubeUrl = (url: string) => {
        setError(null);

        if (!url) {
            setIsValidUrl(false);
            return;
        }

        //check if link contains youtube.com or youtu.be
        const isYoutubeUrl = url.includes('youtube.com') || url.includes('youtu.be');

        if (!isYoutubeUrl) {
            setError('Please enter a valid YouTube URL');
            setIsValidUrl(false);
            return;
        }

        setIsValidUrl(true);

        // Try to extract a title from the URL if possible
        if (!lectureTitle) {
            try {
                // Extract video ID and try to generate a title
                const urlObj = new URL(url);
                const videoId = urlObj.searchParams.get('v');
                if (videoId) {
                    setLectureTitle(`Lecture: ${videoId}`);
                }
            } catch {
                // If URL parsing fails, don't set a title
            }
        }
    };

    // Handle YouTube URL input
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setYoutubeUrl(url);
        validateYoutubeUrl(url);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!youtubeUrl) {
            setError('Please enter a YouTube URL');
            return;
        }

        if (!isValidUrl) {
            setError('Please enter a valid YouTube URL');
            return;
        }

        if (!lectureTitle.trim()) {
            setError('Please enter a title for your lecture');
            return;
        }

        onUpload(youtubeUrl, lectureTitle);
        resetForm();
        onClose();
    };

    // Try to extract video ID from URL for preview
    const getVideoId = (url: string) => {
        try {
            if (url.includes('youtube.com')) {
                const urlObj = new URL(url);
                return urlObj.searchParams.get('v');
            } else if (url.includes('youtu.be')) {
                // Handle shortened youtu.be URLs
                const urlParts = url.split('/');
                return urlParts[urlParts.length - 1];
            }
        } catch {
            return null;
        }
        return null;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-blue-900">Upload Lecture</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-blue-900 transition-colors"
                    >
                        <X size={24}/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    {/* Title Input */}
                    <div className="mb-4">
                        <label htmlFor="lecture-title" className="block text-sm font-medium text-gray-700 mb-1">
                            Lecture Title
                        </label>
                        <input
                            id="lecture-title"
                            type="text"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Enter a title for your lecture"
                        />
                    </div>

                    {/* YouTube URL Input */}
                    <div className="mb-4">
                        <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube URL
                        </label>
                        <input
                            id="youtube-url"
                            type="text"
                            value={youtubeUrl}
                            onChange={handleUrlChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                isValidUrl && youtubeUrl ? 'border-green-500 focus:ring-green-500' : 'border-gray-300 focus:ring-pink-400'
                            }`}
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                        {isValidUrl && youtubeUrl && (
                            <p className="text-green-600 text-sm mt-1 flex items-center">
                                <Youtube size={16} className="mr-1"/> Valid YouTube URL
                            </p>
                        )}
                    </div>

                    {/* Video Preview */}
                    {isValidUrl && youtubeUrl && (
                        <div className="mb-4 border rounded-md p-3 bg-gray-50">
                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                            <div className="flex items-center gap-3">
                                <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">
                                    {getVideoId(youtubeUrl) ? (
                                        <img
                                            src={`https://img.youtube.com/vi/${getVideoId(youtubeUrl)}/default.jpg`}
                                            alt="Video thumbnail"
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <Video className="text-gray-400" size={24}/>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 truncate">{lectureTitle || "Your lecture"}</p>
                                    <p className="text-xs text-gray-500 truncate">{youtubeUrl}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Our AI will process this lecture to create bite-sized chapters
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md flex items-start">
                            <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0"/>
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
                            className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors"
                        >
                            Upload Lecture
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadLectureModal;