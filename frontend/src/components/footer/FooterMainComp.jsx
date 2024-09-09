import { Footer, Blockquote, Accordion } from 'flowbite-react';
import FooterLogo from './FooterLogo';
import FooterCompanyLinks from './FooterCompanyLinks';
import FooterCategoryLinks from './FooterCategoryLinks';
import FooterSocialIcons from './FooterSocialIcons';
import FooterContacts from './FooterContacts';
import FooterSearch from './FooterSearch';

export default function FooterComp() {
  return (
    <Footer container>
      <div className="w-full">
        {/* Normal Footer for md and larger screens */}
        <div className="hidden md:block">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="flex flex-col justify-evenly items-center mx-5 group">
              <FooterLogo />
              <p className="m-2 text-wrap text-center text-lg hidden group-hover:block transition-opacity duration-300">
                Shoes are our professionality.
                <br /> Walk with us!
              </p>
              <div>
                <Footer.Title title="Contact Us" />
                <Footer.LinkGroup col>
                  <FooterContacts />
                </Footer.LinkGroup>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <Footer.Title title="Company" />
                <FooterCompanyLinks />
              </div>
              <div>
                <Footer.Title title="Category" />
                <FooterCategoryLinks />
              </div>
            </div>
            <div className="mx-2 p-3 max-w-md flex flex-col justify-around">
              <FooterSearch />
              <FooterSocialIcons />
              <div className="grid grid-cols-1 gap-4 sm:mt-4 sm:grid-cols-2">
                <Blockquote className="p-4 text-sm text-center bg-teal-100 text-teal-900 rounded-md">
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatem, eveniet corrupti laborum eos quibusdam accusantium."
                </Blockquote>
                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold">
                    "Amazing quality and fast shipping!"
                  </p>
                  <span className="block mt-2 text-gray-400">— Customer Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Footer for smaller than md screens */}
        <div className="block md:hidden">
          <FooterLogo />
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5">Contact Us</Accordion.Title>
              <Accordion.Content className="list-none py-4 px-5">
                <FooterContacts />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5">Company</Accordion.Title>
              <Accordion.Content className="py-4 px-5">
                <FooterCompanyLinks />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="py-4 px-5">Category</Accordion.Title>
              <Accordion.Content className="py-4 px-5">
                <FooterCategoryLinks />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <div className="flex justify-center items-center">
            <FooterSocialIcons className="flex align-middle justify-center" />
          </div>{' '}
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="KYSOD R&D LTD" year={2024} />
        </div>
      </div>
    </Footer>
  );
}
