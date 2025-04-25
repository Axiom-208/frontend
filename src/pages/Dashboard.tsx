import React, { useState } from 'react';
import { FolderPlus, FileText, BookOpen, GraduationCap, Search, Grid, List, Upload, Video } from 'lucide-react';


//Faker data 
//TODO @Delcio make this be the real data from the backend
const mockNotes = [
  { id: 1, title: 'Project Ideas', updatedAt: '2 days ago' },
  { id: 2, title: 'Meeting Notes', updatedAt: '1 week ago' },
  { id: 3, title: 'Research Summary', updatedAt: 'Yesterday' },
];

const mockQuizzes = [
  { id: 1, title: 'JavaScript Basics', updatedAt: '3 days ago' },
  { id: 2, title: 'React Fundamentals', updatedAt: '5 days ago' },
];

const mockFlashcards = [
  { id: 1, title: 'Spanish Vocabulary', updatedAt: '1 day ago' },
  { id: 2, title: 'CS Concepts', updatedAt: '4 days ago' },
  { id: 3, title: 'Design Patterns', updatedAt: '1 week ago' },
];

// Added mock data for Chapters/shorts
const mockChapters = [
  { id: 1, title: 'Introduction to Algorithms', duration: '3:45', updatedAt: '2 days ago' },
  { id: 2, title: 'Data Structures Fundamentals', duration: '5:20', updatedAt: '1 week ago' },
  { id: 3, title: 'Web Development Basics', duration: '4:10', updatedAt: 'Yesterday' },
  { id: 4, title: 'Machine Learning Concepts', duration: '6:30', updatedAt: '3 days ago' },
];

type ItemType = 'note' | 'quiz' | 'flashcard' | 'chapter';

interface ItemProps {
  id: number;
  title: string;
  updatedAt: string;
  type: ItemType;
  duration?: string;
}

const ItemCard: React.FC<ItemProps> = ({ title, updatedAt, type, duration }) => {
  //TODO Include this? Think of better icodns?
  const getIcon = () => {
    switch (type) {
      case 'note':
        return <FileText className="text-white" size={24} />;
      case 'quiz':
        return <GraduationCap className="text-white" size={24} />;
      case 'flashcard':
        return <BookOpen className="text-white" size={24} />;
      case 'chapter':
        return <Video className="text-white" size={24} />;
      default:
        return <FileText className="text-white" size={24} />;
    }
  };

  //Color palette
  const getColor = () => {
    switch (type) {
      case 'note':
        return 'bg-blue-900';
      case 'quiz':
        return 'bg-amber-200';
      case 'flashcard':
        return 'bg-orange-200';
      case 'chapter':
        return 'bg-pink-400';
      default:
        return 'bg-blue-900';
    }
  };

  return (
    <div 
      className="flex flex-col rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => console.log(`Opening ${type}: ${title}`)}
    >
      <div className={`${getColor()} p-6 flex items-center justify-center`}>
        {getIcon()}
      </div>
      <div className="bg-white p-4 flex-1">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{title}</h3>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">Updated {updatedAt}</p>
          {duration && <p className="text-xs text-pink-500">{duration}</p>}
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; count: number }> = ({ title, count }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    <span className="text-sm text-gray-500">{count} items</span>
  </div>
);

function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Study Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <Search className="absolute left-3 top-2.5 text-blue-300" size={18} />
              </div>
              <button 
                className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-800' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-800' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
            <FolderPlus size={18} className="mr-2" />
            New Folder
          </button>
          <button className="flex items-center px-4 py-2 bg-amber-200 text-blue-900 rounded-md hover:bg-amber-300">
            <FileText size={18} className="mr-2" />
            New Note
          </button>
          <button className="flex items-center px-4 py-2 bg-orange-200 text-blue-900 rounded-md hover:bg-orange-300">
            <GraduationCap size={18} className="mr-2" />
            New Quiz
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-md hover:bg-blue-200">
            <BookOpen size={18} className="mr-2" />
            New Flashcards
          </button>
          <button className="flex items-center px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500">
            <Upload size={18} className="mr-2" />
            Upload Lecture
          </button>
        </div>

        {/* Chapters Section (Added new section) */}
        <section className="mb-12">
          <SectionHeader title="Chapters" count={mockChapters.length} />
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {mockChapters.map(chapter => (
              <ItemCard 
                key={chapter.id}
                id={chapter.id}
                title={chapter.title}
                updatedAt={chapter.updatedAt}
                type="chapter"
                duration={chapter.duration}
              />
            ))}
          </div>
        </section>

        {/* Notes Section */}
        <section className="mb-12">
          <SectionHeader title="Notes" count={mockNotes.length} />
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {mockNotes.map(note => (
              <ItemCard 
                key={note.id}
                id={note.id}
                title={note.title}
                updatedAt={note.updatedAt}
                type="note"
              />
            ))}
          </div>
        </section>

        {/* Quizzes Section */}
        <section className="mb-12">
          <SectionHeader title="Quizzes" count={mockQuizzes.length} />
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {mockQuizzes.map(quiz => (
              <ItemCard 
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                updatedAt={quiz.updatedAt}
                type="quiz"
              />
            ))}
          </div>
        </section>

        {/* Flashcards Section */}
        <section className="mb-12">
          <SectionHeader title="Flashcards" count={mockFlashcards.length} />
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {mockFlashcards.map(flashcard => (
              <ItemCard 
                key={flashcard.id}
                id={flashcard.id}
                title={flashcard.title}
                updatedAt={flashcard.updatedAt}
                type="flashcard"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;