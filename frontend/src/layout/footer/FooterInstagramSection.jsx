import React from 'react';

import { instagramPosts } from '../../utils/config';

export default function FooterInstagramSection() {
  return (
    <div className="flex w-52 flex-wrap justify-center ">
      {instagramPosts.href.map((_, i) => (
        <PostItem
          key={'post-' + i}
          image={instagramPosts.images[i]}
          href={instagramPosts.href[i]}
        />
      ))}
    </div>
  );
}

function PostItem({ image, href }) {
  return (
    <a href={href} className="w-16 h-16 m-0.5 shadow-md hover:brightness-90">
      <img src={image} alt="instegram-post" />
    </a>
  );
}
