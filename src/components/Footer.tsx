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
    <footer id="footer" className="bg-neutral-100 border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-black mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <span className="hover:text-black cursor-pointer">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-black mb-4">SNS</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <span key={index} className="text-neutral-600 hover:text-black cursor-pointer">
                  <i className={`text-xl ${social.icon}`} title={social.label}></i>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-300 mt-8 pt-8 text-center text-sm text-neutral-600">
          <p>© 2025 Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 