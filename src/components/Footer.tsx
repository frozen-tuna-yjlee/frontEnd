import React from 'react';

const Footer: React.FC = () => {
  const footerData = [
    {
      title: "회사소개",
      links: ["회사소개", "인재채용", "제휴제안"]
    },
    {
      title: "이용약관",
      links: ["서비스 이용약관", "개인정보처리방침", "청소년보호정책"]
    },
    {
      title: "고객센터",
      links: ["공지사항", "고객센터", "신고센터"]
    }
  ];

  const socialIcons = [
    { icon: "fab fa-facebook", label: "Facebook" },
    { icon: "fab fa-twitter", label: "Twitter" },
    { icon: "fab fa-instagram", label: "Instagram" }
  ];

  return (
    <footer id="footer" className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-1 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-black mb-8 text-xl font-bold">{section.title}</h4>
              <ul className="space-y-4 text-lg text-neutral-600">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <span className="hover:text-black cursor-pointer transition-colors">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-black mb-8 text-xl font-bold">SNS</h4>
            <div className="flex space-x-8">
              {socialIcons.map((social, index) => (
                <span key={index} className="text-neutral-600 hover:text-black cursor-pointer transition-colors">
                  <i className={`text-3xl ${social.icon}`} title={social.label}></i>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-300 mt-16 pt-8 text-center text-lg text-neutral-600">
          <p>© 2025 Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 