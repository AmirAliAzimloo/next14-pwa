import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError, numberFormat } from "lib/helper";
import Loading from "@/components/profile/Loading";
import Image from "next/image";
import { useState } from "react";

const ProfileOrderPage = () => {
    const [pageIndex, setPageIndex] = useState(0);

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/transactions?page=${pageIndex}`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!data) return <Layout><Loading /></Layout>

    return (
        <Layout>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>شماره سفارش</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>شماره پیگیری</th>
                            <th>تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactions.map(item => (
                            <tr key={item.id}>
                                <th>
                                    {item.order_id}
                                </th>
                                <td>{numberFormat(item.amount)} تومان</td>
                                <td>
                                    <span className={item.status == 'موفق' ? 'text-success' : 'text-danger'}>{item.status}</span>
                                </td>
                                <td>{item.trans_id}</td>
                                <td>{item.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className="d-flex justify-content-center mt-5">
                <ul className="pagination">
                    {data.meta.links.slice(1, -1).map((link, index) => (
                        <li key={index} className={link.active ? 'page-item active' : 'page-item'}>
                            <button onClick={() => setPageIndex(link.label)} className="page-link">{link.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </Layout>
    )
}

export default ProfileOrderPage;