import React from 'react';
import {instagramPosts} from '../../utils/config';
import FooterInstagramImageItem from './FooterInstagramImageItem';

const FooterInstagramSection = () => {
  return (
    <div className="flex flex-wrap justify-center p-5">
      {instagramPosts.map((postEmbedCode, index) => (
        <FooterInstagramImageItem
          key={index}
          postEmbedCode={postEmbedCode}
          index={index}
        />
      ))}
    </div>
  );
};

export default  FooterInstagramSection;
