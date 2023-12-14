import Loading from "@/components/Loading";
import DeleteCoupon from "@/components/coupon/Delete";
import { handleError } from "@/lib/helper";
import { useRouter } from "next/router"
import { toast } from "react-toastify";
import useSWR from "swr";

const ShowCoupon = () => {
    const router = useRouter();

    const { data: coupon, error } = useSWR(router.query.id && `/global?url=/coupons/${router.query.id}`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!coupon) {
        return <Loading />
    }

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">تخفیف : {coupon.code}</h4>
            </div>
            <div>
                <div className="row gy-4">
                    <div className="col-md-3">
                        <label className="form-label">کد</label>
                        <input type="text" className="form-control" disabled placeholder={coupon.code} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">درصد</label>
                        <input type="text" className="form-control" disabled placeholder={coupon.percentage} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">تاریخ انقضا</label>
                        <input type="text" className="form-control" disabled placeholder={coupon.expired_at} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">تاریخ ایجاد</label>
                        <input type="text" className="form-control" disabled placeholder={coupon.created_at} />
                    </div>
                </div>
            </div>

            <DeleteCoupon id={coupon.id} />
        </>
    )
}

export default ShowCoupon