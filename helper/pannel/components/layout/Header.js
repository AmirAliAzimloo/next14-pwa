import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="navbar text-center navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link href="/">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">webprog.io</a>
            </Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="w-100"></div>
            <div className="navbar-nav">
                {user &&
                    <div className="nav-item text-nowrap d-flex align-items-center">
                        <span className="nav-link">{user.name}</span>
                        <a onClick={() => logout()} className="nav-link px-3 cursor-pointer">خروج</a>
                    </div>}
            </div>
        </header>
    )
}

export default Header;