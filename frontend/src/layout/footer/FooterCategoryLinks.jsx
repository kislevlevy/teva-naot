import { Footer } from 'flowbite-react';
import React from 'react';
import {Link} from "react-router-dom"

export default function FooterCategoryLinks() {
  return (
    <Footer.LinkGroup col className="md:mr-5">
      <Link to={"/products/category/נשים"} className="footer-link">נשים</Link>
      <Link to={`/products/category/גברים`} className="footer-link">גברים</Link>
      <Link to={`/products/category/Sale`} className="footer-link">Sale</Link>
      <Link to={`/products/category/ילדים`} className="footer-link">ילדים</Link>
      <Link to={`/products/category/אקססוריז`} className="footer-link">אקססוריז</Link>
      <Link to={`/products/category/קולקציה-חדשה`} className="footer-link">קולקציה חדשה</Link>
      <Link to={`/products/category/Outdoor`} className="footer-link">Outdoor</Link>
      <Link to={`/products/category/Vegan`} className="footer-link">Vegan</Link>
    </Footer.LinkGroup>
  );
}
