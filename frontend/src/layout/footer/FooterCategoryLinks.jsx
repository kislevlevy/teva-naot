import { Footer } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterCategoryLinks() {
  const location = useLocation()
  return (
    <Footer.LinkGroup col >
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/products/category/${slugify(cat)}`}
          state={{...location.state, from: location.pathname}}
          className="footer-link rtl"
        >
          {cat}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
