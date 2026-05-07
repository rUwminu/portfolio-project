import NavLogo from "../_assets/images/nav-logo.svg";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 p-3 md:p-9">
      <NavLogo className="w-20 md:w-24" />
    </nav>
  );
};

export default NavBar;
