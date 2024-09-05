import { Footer, TextInput, Blockquote } from "flowbite-react";
import { BsFacebook, BsWhatsapp, BsInstagram, BsTwitter, BsFillPhoneFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { TiLocationArrowOutline } from "react-icons/ti";

const FooterComp = () => {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex flex-col justify-between items-center mx-5">
            <Footer.Brand
              href="#"
              src="https://res.cloudinary.com/drxtaxnkr/image/upload/v1725452130/logoMain_bz64nt.svg"
              alt="Teva-Naot Logo"
              name="Teva-Naot"
              className="flex-col p-7 justify-center align-middle mb-0 "
            />
            <p className='m-2 text-wrap text-center text-lg'>Shoes are our professionality.<br/> Walk with us!</p>
            <div>
              <Footer.Title title="Contact Us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">
                    <div className="icon-inline"><BsFillPhoneFill  size={"1.5rem"}  className="mr-2"/> 073-2120151</div></Footer.Link>      
                  <Footer.Link href="#"><div className="icon-inline"><TfiEmail size={"1.5rem"} className="mr-2"/> cr2@teva-naot.co.il</div></Footer.Link>
                </Footer.LinkGroup>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <Footer.Title title="Company" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">About Us</Footer.Link>
                <Footer.Link href="#">Delivary Information</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
                <Footer.Link href="#">Support Center</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Category" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Women</Footer.Link>
                <Footer.Link href="#">Men</Footer.Link>
                <Footer.Link href="#">Sale</Footer.Link>
                <Footer.Link href="#">Children</Footer.Link>
                <Footer.Link href="#">Classic</Footer.Link>
                <Footer.Link href="#">Excessories</Footer.Link>
                <Footer.Link href="#">New Collection</Footer.Link>
                <Footer.Link href="#">Outdoor</Footer.Link>
                <Footer.Link href="#">Vegan</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="mx-2 p-3 max-w-md flex flex-col justify-around">
             <TextInput className="min-w-40 md:min-w-80" id="footer-search-input" type="email" rightIcon ={TiLocationArrowOutline} placeholder="Search here..." required />
             <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
               <BsFacebook size={"2rem"} color={"grey"}/>
               <BsInstagram size={"2rem"} color={"grey"}/>
               <BsTwitter size={"2rem"} color={"grey"}/>
               <BsWhatsapp size={"2rem"} color={"grey"}/>
            </div>  
            <div className="grid grid-cols-4 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-6">             
              <Blockquote className="p-2 text-xs text-center border bg-red-200 text-cyan-950 rounded-md">
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, eveniet corrupti laborum eos quibusdam accusantium. Deserunt natus reiciendis, iste voluptas quaerat rerum. Debitis eos officiis blanditiis, pariatur eum vero molestias!."
              </Blockquote>
              <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <p class="text-xs font-semibold">"Amazing quality and fast shipping!"</p>
                <span class="block mt-4 text-gray-400">— Customer Review</span>
              </div>
              
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="KYSOD R&D LTD" year={2024} />
        </div>
      </div>
    </Footer>
  )
}

export default FooterComp