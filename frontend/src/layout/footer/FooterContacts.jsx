import { Footer } from 'flowbite-react';

import Icon from '@mdi/react';
import { mdiCellphone, mdiEmailOutline } from '@mdi/js';

import { storeEmail, storeTel } from '../../utils/config';

export default function FooterContacts() {
  return (
    <>
      <Footer.Link
        href={`tel:${storeTel}`}
        className="w-full pb-3 mr-0 text-gray-500 md:mr-0 md:pb-0 hover:text-gray-700"
      >
        <div className="flex justify-start rtl">
          <Icon path={mdiCellphone} size={1} className="ml-2" />
          {storeTel}
        </div>
      </Footer.Link>
      <Footer.Link
        href={`mailto:${storeEmail}`}
        className="m-0 text-gray-500 hover:text-gray-700"
      >
        <div className="flex justify-start rtl">
          <Icon path={mdiEmailOutline} size={1} className="ml-2" />
          {storeEmail}
        </div>
      </Footer.Link>
    </>
  );
}
