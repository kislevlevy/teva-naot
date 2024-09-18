import { Footer } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterCategoryLinks({scrollToTop}) {
  const location = useLocation()
  return (
    <Footer.LinkGroup col  className='space-y-1'>
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/products/category/${slugify(cat)}`}
          state={{...location.state, from: location.pathname}}
          className="footer-link rtl"
          onClick={scrollToTop}
        >
          {cat}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
