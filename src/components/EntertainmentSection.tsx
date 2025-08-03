import React from 'react';
import EntertainmentCard from './EntertainmentCard';

const EntertainmentSection: React.FC = () => {
  const entertainmentData = [
    {
      imageText: "연예 이미지",
      title: "연예계 소식",
      description: "최신 연예계 동향..."
    },
    {
      imageText: "스포츠 이미지",
      title: "스포츠 뉴스",
      description: "오늘의 스포츠 소식..."
    },
    {
      imageText: "문화 이미지",
      title: "문화 소식",
      description: "문화계 주요 이슈..."
    }
  ];

  return (
    <section id="entertainment-section">
      <h2 className="text-2xl text-black mb-6">연예·스포츠</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {entertainmentData.map((item, index) => (
          <EntertainmentCard
            key={index}
            imageText={item.imageText}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default EntertainmentSection; 