import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs';

export default function FooterSocialIcons() {
  return (
    <div className="flex justify-center items-center w-full space-x-6 mt-4 md:mb-4">
      <BsFacebook size={'2rem'} className="text-gray-400 hover:text-gray-600" />
      <BsInstagram size={'2rem'} className="text-gray-400 hover:text-gray-600" />
      <BsTwitter size={'2rem'} className="text-gray-400 hover:text-gray-600" />
      <BsWhatsapp size={'2rem'} className="text-gray-400 hover:text-gray-600" />
    </div>
  );
}
