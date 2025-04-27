import React, { useState } from 'react';
import { User, Book, BookOpen, GraduationCap, Video, Mail, Phone, Globe, Edit2, Save } from 'lucide-react';

const Profile = () => {
  //faker profile data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 (0) 7501 234567',
    university: 'University of Liverpool',
    major: 'Computer Science',
    yearOfStudy: '2nd Year',
    bio: 'Computer Science student passionate about AI and machine learning. Looking to use technology to improve education.'
  });

  //edit mode
  const [isEditing, setIsEditing] = useState(false);
  //Temporary state to hold edits
  //TODO Change this so data is dynamic with backend
  const [editData, setEditData] = useState(userData);

  //user stats
  const stats = [
    { label: 'Notes', value: 12, icon: Book, color: 'bg-blue-900' },
    { label: 'Chapters', value: 24, icon: Video, color: 'bg-pink-400' },
    { label: 'Quizzes', value: 8, icon: GraduationCap, color: 'bg-amber-200' },
    { label: 'Flashcards', value: 15, icon: BookOpen, color: 'bg-orange-200' }
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  //enable edit mode
  const enableEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  //save edits
  const saveChanges = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  //cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Profile Header */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userData.name.split(' ').map(name => name[0]).join('')}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                  <p className="text-gray-600">{userData.university} • {userData.major} • {userData.yearOfStudy}</p>
                </div>
                
                {!isEditing ? (
                  <button 
                    onClick={enableEdit}
                    className="flex items-center px-4 py-2 bg-yellow-200 text-blue-900 rounded-md hover:bg-yellow-300"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button 
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveChanges}
                      className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-gray-700">
                {userData.bio}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" />
                  {userData.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" />
                  {userData.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Profile Form */}
        {isEditing && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                <input
                  type="text"
                  name="university"
                  value={editData.university}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                <input
                  type="text"
                  name="major"
                  value={editData.major}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={editData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Usage Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Activity</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-500">Yesterday</p>
              <div className="mt-2 flex items-start">
                <Video className="text-pink-400 mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-900">Uploaded "Introduction to Machine Learning" lecture</p>
                  <p className="text-sm text-gray-500">3 chapters generated</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-500">3 days ago</p>
              <div className="mt-2 flex items-start">
                <Book className="text-blue-900 mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-900">Added "Database Systems" note</p>
                  <p className="text-sm text-gray-500">12 pages</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-500">Last week</p>
              <div className="mt-2 flex items-start">
                <GraduationCap className="text-amber-300 mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-900">Completed "Data Structures" quiz</p>
                  <p className="text-sm text-gray-500">Score: 92%</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-500">Last week</p>
              <div className="mt-2 flex items-start">
                <BookOpen className="text-orange-300 mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-900">Created "Algorithms" flashcards</p>
                  <p className="text-sm text-gray-500">24 cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;