import { Footer } from 'flowbite-react';
import React from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { BsFillPhoneFill } from 'react-icons/bs';

export default function FooterContacts() {
  return (
    <>
      <Footer.Link href="/" className='m-0'>
        <div className="flex justify-start pb-3 rtl">
          <BsFillPhoneFill size={'1.5rem'} className="ml-2" /> 073-2120151
        </div>
      </Footer.Link>
      <Footer.Link href="/" className='m-0'>
        <div className="flex justify-start rtl">
          <TfiEmail size={'1.5rem'} className="ml-2" /> cr2@teva-naot.co.il
        </div>
      </Footer.Link>
    </>
  );
}
