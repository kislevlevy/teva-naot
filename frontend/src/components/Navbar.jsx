import Button from "./Button"
import Logo from "./styl.comp/Logo"

const Navbar = () => {
  return (
    <div className="main-navbar">
    <div className="main-navbar-container">
     <div className="logo">
      <Logo />
     </div>
      <Button btnType='buy-now'>
        Buy now
      </Button>
    </div>
    </div>
  )
}

export default Navbar