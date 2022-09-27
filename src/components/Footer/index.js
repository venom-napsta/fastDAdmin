import React from 'react';
import { Footer as Ftr } from 'flowbite-react/lib/esm/components/Footer';

function Footer() {
  return (
    <Ftr container={true}>
      <Ftr.Copyright href="http://mgss.vercel.app" by="MGSS™" year={2022} />
      <Ftr.LinkGroup>
        <Ftr.Link href="mailto:malingreats@gmail.com">
          fastdelivery@gmail.com
        </Ftr.Link>
        <Ftr.Link href="http://mgss.vercel.app">About</Ftr.Link>
      </Ftr.LinkGroup>
    </Ftr>
  );
}

export default Footer;
