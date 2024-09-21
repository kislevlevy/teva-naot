import { Footer, Blockquote, Accordion } from 'flowbite-react';
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
      <div className="w-full  m-0 mx-auto">
        {/* Normal Footer for md and larger screens */}
        <div className="hidden md:block">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:flex-row-reverse md:grid-cols-1">
            <div
              className="flex flex-col justify-start
             items-center mx-5"
            >
              <FooterLogo />
              <div>
                <Footer.Title title="שמרו על קשר" className="text-center" />
                <Footer.LinkGroup
                  col
                  className="flex flex-col justify-start rtl pb-3"
                >
                  <FooterContacts />
                </Footer.LinkGroup>
                <FooterSocialIcons />
              </div>
            </div>
            <div className="grid text-center grid-cols-3 mx-2 w-fit gap-5">
              <div className="min-w-36">
                <Link to="/company">
                  <Footer.Title title="החברה" className="mb-3 mx-auto text-center" />
                </Link>
                <FooterLinks section="company" scrollToTop={scrollToTop} />
              </div>
              <div className="min-w-36">
                <Link to="/policy">
                  <Footer.Title
                    title="מדיניות"
                    className="w-3/6 mb-3 mx-auto text-center"
                  />
                </Link>
                <FooterLinks section="policy" scrollToTop={scrollToTop} />
              </div>
              <div className="min-w-36">
                <Link to="/category">
                  <Footer.Title
                    title="קטגוריות"
                    className="mb-3 mx-auto text-center"
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
              <Accordion.Title className="py-4 px-5 rtl">
                שמרו על קשר
              </Accordion.Title>
              <Accordion.Content className="list-none py-4 px-5">
                <FooterContacts />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5 rtl">החברה</Accordion.Title>
              <Accordion.Content className="py-4 px-5">
                <FooterLinks section="company" />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5 rtl">מדיניות</Accordion.Title>
              <Accordion.Content className="py-4 px-5">
                <FooterLinks section="policy" />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5 rtl">קטגוריות</Accordion.Title>
              <Accordion.Content className="py-4 px-5">
                <FooterCategoryLinks />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <div className="flex justify-center items-center">
            <FooterSocialIcons className="flex align-middle justify-center" />
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
