import { Footer } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { informationBank } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterLinks({section, scrollToTop} ) {
  const location = useLocation()
  return (
    <Footer.LinkGroup col className='space-y-1'>
      {Object.keys(informationBank[section]).map((subject) => (
        <Link
          onClick={scrollToTop}
          to={`/${section}/${slugify(subject)}`}
          key={subject}
          className="footer-link rtl"
          state={{...location.state, from: location.pathname}}
        >
          {subject}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
