import Link from "next/link";

const CouponList = ({ coupons }) => {

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>کد</th>
                        <th>درصد</th>
                        <th>تاریخ انقضا</th>
                        <th>تاریخ ایجاد</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.percentage}</td>
                            <td>{coupon.expired_at}</td>
                            <td>{coupon.created_at}</td>
                            <td>
                                <div className="d-flex">
                                    <Link href={`coupons/${coupon.id}`}>
                                        <a className="btn btn-sm btn-outline-dark me-2">نمایش</a>
                                    </Link>
                                    <Link href={`/coupons/edit/${coupon.id}`}>
                                        <a className="btn btn-sm btn-dark">ویرایش</a>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CouponList;