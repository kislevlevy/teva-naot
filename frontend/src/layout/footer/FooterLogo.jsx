import React from 'react';

import { Footer } from 'flowbite-react';

export default function FooterLogo() {
  return (
    <Footer.Brand
      href="/"
      src="/img/logoFooter.svg"
      alt="Teva-Naot Logo"
      className="flex-col p-7 pt-1 justify-center align-middle mb-0"
    />
  );
}
