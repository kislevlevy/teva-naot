import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterCompanyLinks() {
  return (
    <Footer.LinkGroup col className="md:mr-5">
      <Link to={"/company/אודות"} className="footer-link">אודות</Link>
      <Link to={"/policy/משלוחים"} className="footer-link">משלוחים</Link>
      <Link to={"/policy/מדיניות-פרטיות"} className="footer-link">מדיניות פרטיות</Link>
      <Link to={"/policy/תנאי-שימוש-באתר"} className="footer-link">תנאי שימוש באתר</Link>
      <Link to={"/company/צור-קשר"} className="footer-link">צור קשר</Link>
      <Link to={"/company/דרושים"} className="footer-link">דרושים</Link>
    </Footer.LinkGroup>
  );
}
