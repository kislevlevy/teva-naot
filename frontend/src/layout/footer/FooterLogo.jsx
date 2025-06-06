import { Footer } from 'flowbite-react';
import { getAssetPath } from '../../utils/assets';

export default function FooterLogo() {
  return (
    <Footer.Brand
      href="/"
      src={getAssetPath('img/logoFooter.svg')}
      alt="Teva-Naot Logo"
      className="flex-col justify-center pt-1 mb-0 align-middle p-7"
    />
  );
}
