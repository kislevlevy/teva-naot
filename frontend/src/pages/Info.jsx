import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { informationBank } from '../utils/config';
import { unslugify } from '../utils/slugify';

export default function Info() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const bankSection = pathname.split('/')[1];

  return (
    <div>
      <h2 className="text-3xl m-4 p-2 w-full text-center">{unslugify(slug)}</h2>
      <div
        className="rtl w-10/12 md:w-8/12 m-0 mx-auto"
        dangerouslySetInnerHTML={{
          __html: informationBank[bankSection][unslugify(slug)],
        }}
      />
    </div>
  );
}
