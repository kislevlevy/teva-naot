import { Footer } from 'flowbite-react';
import React from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { BsFillPhoneFill } from 'react-icons/bs';

import Icon from '@mdi/react';
import { mdiCellphone, mdiEmailOutline } from '@mdi/js';

import { storeEmail, storeTel } from '../../utils/config';

export default function FooterContacts() {
  return (
    <>
      <Footer.Link
        href={`tel:${storeTel}`}
        className="mr-0 md:mr-0 pb-3 md:pb-0 w-full hover:text-gray-700 text-gray-500"
      >
        <div className="flex justify-start rtl">
          <Icon path={mdiCellphone} size={1} className="ml-2" />
          {storeTel}
        </div>
      </Footer.Link>
      <Footer.Link
        href={`mailto:${storeEmail}`}
        className="m-0 hover:text-gray-700 text-gray-500"
      >
        <div className="flex justify-start rtl">
          <Icon path={mdiEmailOutline} size={1} className="ml-2" />
          {storeEmail}
        </div>
      </Footer.Link>
    </>
  );
}
