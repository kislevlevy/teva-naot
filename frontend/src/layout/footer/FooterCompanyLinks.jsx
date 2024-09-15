import { Footer } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { informationBank } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterCompanyLinks() {
  const location = useLocation()
  return (
    <Footer.LinkGroup col className="md:mr-5">
      {Object.keys(informationBank.company).map((subject) => (
        <Link
          to={`/company/${slugify(subject)}`}
          key={subject}
          className="footer-link"
          state={{...location.state, from: location.pathname}}
        >
          {subject}
        </Link>
      ))}
      {Object.keys(informationBank.policy).map((subject) => (
        <Link
          to={`/policy/${slugify(subject)}`}
          key={subject}
          className="footer-link"
          state={{...location.state, from: location.pathname}}
        >
          {subject}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
