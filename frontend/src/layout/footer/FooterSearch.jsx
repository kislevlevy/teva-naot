import React from 'react';
import { TextInput } from 'flowbite-react';
import { TiLocationArrowOutline } from 'react-icons/ti';

export default function FooterSearch() {
  return (
    <TextInput
      className="min-w-40 md:min-w-80"
      id="footer-search-input"
      type="email"
      rightIcon={TiLocationArrowOutline}
      placeholder="Search here..."
      required
    />
  );
}
