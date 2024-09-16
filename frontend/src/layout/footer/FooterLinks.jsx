import { Footer } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { informationBank } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterLinks({section} ) {
  const location = useLocation()
  return (
    <Footer.LinkGroup col>
      {Object.keys(informationBank[section]).map((subject) => (
        <Link
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
