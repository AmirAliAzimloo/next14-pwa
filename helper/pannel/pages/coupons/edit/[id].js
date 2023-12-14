import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { handleError } from "@/lib/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "@/components/Loading";

import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"

const EditCoupon = () => {
    const [loading, setLoading] = useState(false)
    const [dateExpire, setDateExpire] = useState('');

    const router = useRouter();

    const { data: coupon, error, mutate } = useSWR(router.query.id && `/global?url=/coupons/${router.query.id}`)

    useEffect(() => {
        if (coupon) {
            setDateExpire(coupon.expired_at)
        }
    }, [coupon])

    if (error) {
        toast.error(handleError(error))
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true)
            const res = await axios.put(`/global?url=/coupons/${router.query.id}`, {
                ...data,
                expired_at: dateExpire instanceof DateObject ? dateExpire.convert(gregorian, gregorian_en).format('YYYY-MM-DD HH:mm:ss') : null
            })
            mutate(res.data)

            toast.success('تخفیف مورد نظر با موفقیت ویرایش شد')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    if (!coupon) return <Loading />

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ویرایش تخفیف : {coupon.name} </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-md-3">
                    <label className="form-label">کد</label>
                    <input {...register("code", { required: 'فیلد کد الزامی است' })} type="text" defaultValue={coupon.code} className="form-control" />
                    <div className="form-text text-danger">{errors.code?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">درصد</label>
                    <input {...register("percentage", { required: 'فیلد درصد الزامی است' })} type="text" defaultValue={coupon.percentage} className="form-control" />
                    <div className="form-text text-danger">{errors.percentage?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">تاریخ انقضا</label>
                    <DatePicker
                        inputClass="form-control"
                        calendar={persian}
                        locale={persian_fa}
                        value={dateExpire}
                        onChange={setDateExpire}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                        ویرایش تخفیف
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditCoupon;