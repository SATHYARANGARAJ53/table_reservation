import Image from '../food.png'

const Header = () => {
  return (
    <>
    <div className="Heading">
      <img src={Image} alt="Yummy"className='logo'/>RESERVATION
      <nav className ="Body">
        <a href="#">HOME</a>
        <a href="#">ABOUTUS</a>
        <a href="#">CONTACT</a>
      </nav>
    </div>
    </>
  )
}

export default Header