import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-full z-30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <div className="mr-4">
            <Link to="/" className="cursor-pointer font-bold text-blue-500">
              Interview Creation Portal
            </Link>
          </div>

          <nav className="flex flex-grow justify-end">
            <ul className="flex flex-wrap items-center">
              <li>
                <Link
                  to="/upcoming"
                  className="cursor-pointer mr-4 btn-sm bg-blue-500 text-white"
                >
                  Upcoming Interviews
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="bg-blue-500 text-white cursor-pointer btn-sm"
                >
                  Schedule Interview
                </Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
