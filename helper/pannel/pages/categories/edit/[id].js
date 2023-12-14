import Loading from "@/components/Loading";
import { handleError } from "@/lib/helper";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const EditCategory = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const { data: category, error, mutate } = useSWR(router.query.id && `/global?url=/categories/${router.query.id}`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!category) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await axios.put(`/global?url=/categories/${router.query.id}`, {
                ...data
            })

            mutate(res.data)

            toast.success('دسته بندی مورد نظر با موفقیت ویرایش شد')

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
                <h4 className="fw-bold">ویرایش دسته بندی : {category.name}</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">نام</label>
                    <input {...register("name", { required: 'فیلد نام الزامی است' })} defaultValue={category.name} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.name?.message}</div>
                </div>
                <div className="col-md-3">
                    <label className="form-label">توضیحات</label>
                    <input {...register("description")} defaultValue={category.description} type="text" className="form-control" />
                    <div className="form-text text-danger">{errors.description?.message}</div>
                </div>
                
                
                <div>
                    <button type="submit" disabled={loading} className="btn btn-outline-dark mt-3">
                        ویرایش دسته بندی
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditCategory;