import { useState } from "react"
import { Link } from "react-router-dom"
import { FaTimes, FaGithub } from "react-icons/fa"
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {

    const [navClick, setNavClick] = useState(false);

    const handleNavClick = () => setNavClick(!navClick);

    const dropContent = (
        <>
            <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
                <ul className="text-center text-xl p-20">
                    <Link to="/issues">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Issues</li>
                    </Link>
                    <Link to="/logs">
                        <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Logs</li>
                    </Link>
                </ul>
            </div>
        </>
    )

    return (
      <nav>
        <div className="h-10vh bg-slate-900 flex justify-between z-50 text-white lg:py-5 px-20 py-4">
            <div className="flex items-center flex-1">
                <span className="text-3xl font-bold flex"><FaGithub className="mr-2"/> issues</span>
            </div>
            <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
                <div className="flex-10">
                    <ul className="flex gap-8 mr-16 text-[18px]">
                        <Link to="/issues">
                            <li className="hover:text-indigo-300 transition border-b-2 border-slate-900 hover:border-indigo-300 cursor-pointer">Issues</li>
                        </Link>
                        <Link to="/logs">
                            <li className="hover:text-indigo-300 transition border-b-2 border-slate-900 hover:border-indigo-300 cursor-pointer">Logs</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div>
                {navClick && dropContent}
            </div>

            <button className="block sm:hidden transition" onClick={handleNavClick}>
                {navClick ? <FaTimes /> : <CiMenuFries />}
            </button>
        </div>
      </nav>
    )
  }
  
  export default Navbar