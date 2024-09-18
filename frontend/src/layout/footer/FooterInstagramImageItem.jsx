import React, { useEffect } from 'react';

const FooterInstagramImageItem = ({ postEmbedCode, index }) => {
  useEffect(() => {
    // Load Instagram embed script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      key={index}
      className="relative w-[33%] h-[132px] px-1 mb-1 bg-white overflow-hidden"
    >
      <div
        className="instagram-post"
        style={{
          transform: "scale(0.4) translate(0%, -40%) ",
          transformOrigin: "top left",
          width: '100%',
          height: '100%',
          position: 'relative', // Ensure the post is correctly positioned
        }}
        dangerouslySetInnerHTML={{ __html: postEmbedCode }} // Insert the full embed code
      />
    </div>
  );
};

export default FooterInstagramImageItem;
