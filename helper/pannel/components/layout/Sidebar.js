import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/">
                            <a className={router.pathname == '/' ? "nav-link active" : "nav-link"} aria-current="page">
                                <i className="bi bi-grid me-2"></i>
                                داشبورد
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/users">
                            <a className={router.pathname.includes('/users') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-people me-2"></i>
                                کاربران
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/products">
                            <a className={router.pathname.includes('/products') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-box-seam me-2"></i>
                                محصولات
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/categories">
                            <a className={router.pathname.includes('/categories') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-grid-3x3-gap me-2"></i>
                                دسته بندی
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/orders">
                            <a className={router.pathname.includes('/orders') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-basket me-2"></i>
                                سفارشات
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/transactions">
                            <a className={router.pathname.includes('/transactions') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-currency-dollar me-2"></i>
                                تراکنش ها
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/coupons">
                            <a className={router.pathname.includes('/coupons') ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-percent me-2"></i>
                                تخفیف ها
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;