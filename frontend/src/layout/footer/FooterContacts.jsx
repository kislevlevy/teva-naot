import { Footer } from 'flowbite-react';
import React from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { BsFillPhoneFill } from 'react-icons/bs';
import {storeEmail, storeTel} from '../../utils/config'

export default function FooterContacts() {
  return (
    <>
      <Footer.Link href="/" className='mr-0 md:mr-0 pb-3 md:pb-0'>
        <div className="flex justify-start rtl">
          <BsFillPhoneFill size={'1.5rem'} className="ml-2" /> {storeTel}
        </div>
      </Footer.Link>
      <Footer.Link href="/" className='m-0'>
        <div className="flex justify-start rtl">
          <TfiEmail size={'1.5rem'} className="ml-2" />{storeEmail}
        </div>
      </Footer.Link>
    </>
  );
}
