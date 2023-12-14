import { handleError } from "@/lib/helper";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateUser = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await axios.post(`/global?url=/users`, {
                ...data
            })
            toast.success('کاربر مورد نظر با موفقیت ایجاد شد')

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ایجاد کاربر</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">نام</label>
                    <input {...register("name", { required: 'فیلد نام الزامی است' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.name?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">ایمیل</label>
                    <input {...register("email", { required: 'فیلد ایمیل الزامی است' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.email?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">شماره تماس</label>
                    <input {...register("cellphone", { required: 'فیلد شماره تماس الزامی است', pattern: { value: /^(\+98|0)?9\d{9}$/i, message: 'فیلد شماره تماس معتبر نمیباشد' } })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.cellphone?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">رمز عبور</label>
                    <input {...register("password", { required: 'فیلد رمز عبور الزامی است' })} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.password?.message}</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                        ایجاد کاربر
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateUser;