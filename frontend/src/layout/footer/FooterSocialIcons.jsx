import { FooterLink, FooterLinkGroup } from 'flowbite-react';
import React from 'react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

export default function FooterSocialIcons() {
  return (
    <div className="flex justify-center items-center w-full space-x-6 mt-4 md:mb-4">
      <FooterLinkGroup className='list-none'>
        <FooterLink href='https://www.facebook.com/tevanaotshoes/' ><BsFacebook size={'2rem'} className="text-gray-400 hover:text-gray-600 mr-2" /></FooterLink>
        <FooterLink href='https://www.instagram.com/tevanaot/' ><BsInstagram size={'2rem'} className="text-gray-400 hover:text-gray-600" /></FooterLink>
      </FooterLinkGroup>
    </div>
  );
}
