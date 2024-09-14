import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/config';
import { slugify } from '../../utils/slugify';

export default function FooterCategoryLinks() {
  return (
    <Footer.LinkGroup col className="md:mr-5">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={`/products/category/${slugify(cat)}`}
          className="footer-link"
        >
          {cat}
        </Link>
      ))}
    </Footer.LinkGroup>
  );
}
