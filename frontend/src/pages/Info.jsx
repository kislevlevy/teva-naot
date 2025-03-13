import { useLocation, useParams } from 'react-router-dom';
import { informationBank } from '../utils/config';
import { unslugify } from '../utils/slugify';

export default function Info() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const bankSection = pathname.split('/')[1];

  return (
    <div>
      <h2 className="w-full p-2 m-4 text-3xl text-center">{unslugify(slug)}</h2>
      <div
        className="w-10/12 m-0 mx-auto rtl md:w-8/12"
        dangerouslySetInnerHTML={{
          __html: informationBank[bankSection][unslugify(slug)],
        }}
      />
    </div>
  );
}
