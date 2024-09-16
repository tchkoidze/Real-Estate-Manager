import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-[#DBDBDB] py-[38px] pl-[162px]">
      <Link to={"/"}>
        <img src="/LOGO.svg" alt="logo" />
      </Link>
    </header>
  );
};
export default Header;
