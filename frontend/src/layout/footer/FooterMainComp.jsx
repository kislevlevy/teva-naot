import { Footer, Accordion } from 'flowbite-react';
import FooterLogo from './FooterLogo';
import FooterLinks from './FooterLinks';
import FooterCategoryLinks from './FooterCategoryLinks';
import FooterSocialIcons from './FooterSocialIcons';
import FooterContacts from './FooterContacts';
import FooterInstagramSection from './FooterInstagramSection';
import { Link } from 'react-router-dom';
import scrollToTop from '../../utils/scrollToTop';

export default function FooterComp() {
  return (
    <Footer container>
      <div className="w-full m-0 mx-auto">
        {/* Normal Footer for md and larger screens */}
        <div className="hidden md:block">
          <div className="grid justify-between w-full sm:flex sm:justify-between md:flex md:flex-row-reverse md:grid-cols-1">
            <div className="flex flex-col items-center justify-start mx-5">
              <FooterLogo />
              <div>
                <Footer.Title title="שמרו על קשר" className="text-center" />
                <Footer.LinkGroup
                  col
                  className="flex flex-col justify-start pb-3 rtl"
                >
                  <FooterContacts />
                </Footer.LinkGroup>
                <FooterSocialIcons />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mx-2 text-center w-fit">
              <div className="min-w-36">
                <Link to="/company">
                  <Footer.Title title="החברה" className="mx-auto mb-3 text-center" />
                </Link>
                <FooterLinks section="company" scrollToTop={scrollToTop} />
              </div>
              <div className="min-w-36">
                <Link to="/policy">
                  <Footer.Title
                    title="מדיניות"
                    className="w-3/6 mx-auto mb-3 text-center"
                  />
                </Link>
                <FooterLinks section="policy" scrollToTop={scrollToTop} />
              </div>
              <div className="min-w-36">
                <Link to="/category">
                  <Footer.Title
                    title="קטגוריות"
                    className="mx-auto mb-3 text-center"
                  />
                </Link>
                <FooterCategoryLinks scrollToTop={scrollToTop} />
              </div>
            </div>
            <div className="h-full my-auto">
              <FooterInstagramSection />
            </div>
          </div>
        </div>

        {/* Accordion Footer for smaller than md screens */}
        <div className="block md:hidden">
          <FooterLogo />
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title className="px-5 py-4 rtl">
                שמרו על קשר
              </Accordion.Title>
              <Accordion.Content className="px-5 py-4 list-none">
                <FooterContacts />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="px-5 py-4 rtl">החברה</Accordion.Title>
              <Accordion.Content className="px-5 py-4">
                <FooterLinks section="company" />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="px-5 py-4 rtl">מדיניות</Accordion.Title>
              <Accordion.Content className="px-5 py-4">
                <FooterLinks section="policy" />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="px-5 py-4 rtl">קטגוריות</Accordion.Title>
              <Accordion.Content className="px-5 py-4">
                <FooterCategoryLinks />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <div className="flex items-center justify-center">
            <FooterSocialIcons className="flex justify-center align-middle" />
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="https://github.com/kislevlevy/teva-naot"
            by="KYSOD R&D LTD"
            year={2024}
          />
        </div>
      </div>
    </Footer>
  );
}
