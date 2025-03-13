import { FooterLink, FooterLinkGroup } from 'flowbite-react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

export default function FooterSocialIcons() {
  return (
    <div className="flex items-center justify-center w-full mt-4 space-x-6 md:mb-4">
      <FooterLinkGroup className="list-none">
        <FooterLink href="https://www.facebook.com/tevanaotshoes/">
          <BsFacebook
            size={'2rem'}
            className="mr-2 text-gray-400 hover:text-gray-600"
          />
        </FooterLink>
        <FooterLink href="https://www.instagram.com/tevanaot/">
          <BsInstagram size={'2rem'} className="text-gray-400 hover:text-gray-600" />
        </FooterLink>
      </FooterLinkGroup>
    </div>
  );
}
