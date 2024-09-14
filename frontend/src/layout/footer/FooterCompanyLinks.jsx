import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { informationBank } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterCompanyLinks() {
  return (
    <Footer.LinkGroup col className="md:mr-5">
      {Object.keys(informationBank.company).map((subject) => (
        <Link
          to={`/company/${slugify(subject)}`}
          key={subject}
          className="footer-link"
        >
          {subject}
        </Link>
      ))}
      {Object.keys(informationBank.policy).map((subject) => (
        <Link
          to={`/policy/${slugify(subject)}`}
          key={subject}
          className="footer-link"
        >
          {subject}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
