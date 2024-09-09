import { Footer } from 'flowbite-react';
import React from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { BsFillPhoneFill } from 'react-icons/bs';

export default function FooterContacts() {
  return (
    <>
      <Footer.Link href="#">
        <div className="flex justify-start pb-3">
          <BsFillPhoneFill size={'1.5rem'} className="mr-2" /> 073-2120151
        </div>
      </Footer.Link>
      <Footer.Link href="#">
        <div className="flex justify-start">
          <TfiEmail size={'1.5rem'} className="mr-2" /> cr2@teva-naot.co.il
        </div>
      </Footer.Link>
    </>
  );
}
