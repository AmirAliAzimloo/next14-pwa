import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { SWRConfig } from 'swr'

const Layout = ({ children }) => {
    const router = useRouter();

    if (router.pathname == "/auth/login") {
        return (
            <div>{children}</div>
        )
    }

    return (
        <SWRConfig
            value={{
                fetcher: (url) => axios.get(url).then(res => res.data)
            }}
        >
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </SWRConfig>
    )
}

export default Layout;