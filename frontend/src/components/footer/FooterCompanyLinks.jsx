import { Footer } from 'flowbite-react';
import React from 'react';

export default function FooterCompanyLinks() {
  return (
    <Footer.LinkGroup col className="md:mr-5">
      <Footer.Link href="#">About Us</Footer.Link>
      <Footer.Link href="#">Delivery Information</Footer.Link>
      <Footer.Link href="#">Privacy Policy</Footer.Link>
      <Footer.Link href="#">Terms & Conditions</Footer.Link>
      <Footer.Link href="#">Contact Us</Footer.Link>
      <Footer.Link href="#">Support Center</Footer.Link>
    </Footer.LinkGroup>
  );
}
