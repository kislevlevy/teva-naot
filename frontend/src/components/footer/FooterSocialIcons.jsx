import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";


const FooterSocialIcons = () => {
    return (
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:items-center">
            <BsFacebook size={"2rem"} className="text-gray-400 hover:text-gray-600" />
            <BsInstagram size={"2rem"} className="text-gray-400 hover:text-gray-600" />
            <BsTwitter size={"2rem"} className="text-gray-400 hover:text-gray-600" />
            <BsWhatsapp size={"2rem"} className="text-gray-400 hover:text-gray-600" />
        </div>
    )
}

export default FooterSocialIcons