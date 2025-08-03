import React from 'react';

const ProfileWidget: React.FC = () => {
  return (
    <section id="profile-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg mb-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-neutral-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <i className="fas fa-user text-3xl text-neutral-600"></i>
        </div>
        <h3 className="text-black mb-2 text-lg font-bold">사용자님</h3>
        <p className="text-neutral-600 text-sm mb-4">user@example.com</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
            프로필 편집
          </button>
          <button className="bg-neutral-200 text-black px-4 py-2 rounded-lg text-sm hover:bg-neutral-300 transition-colors">
            설정
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileWidget; 