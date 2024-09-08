import { Footer } from 'flowbite-react';
import React from 'react';

const FooterCategoryLinks = () => {
  return (
    <Footer.LinkGroup col className='md:mr-5'>
    <Footer.Link href="#">Women</Footer.Link>
    <Footer.Link href="#">Men</Footer.Link>
    <Footer.Link href="#">Sale</Footer.Link>
    <Footer.Link href="#">Children</Footer.Link>
    <Footer.Link href="#">Accessories</Footer.Link>
    <Footer.Link href="#">New Collection</Footer.Link>
    <Footer.Link href="#">Outdoor</Footer.Link>
    <Footer.Link href="#">Vegan</Footer.Link>
  </Footer.LinkGroup>
  )
}

export default FooterCategoryLinks;
