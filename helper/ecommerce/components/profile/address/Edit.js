import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import axios from "axios";
import { useSWRConfig } from 'swr'
import Delete from "@/components/profile/address/Delete"

const Edit = ({ address, provinces, cities }) => {
    const { mutate } = useSWRConfig()

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            province_id: address.province_id
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses/edit`, {
                data,
                address_id: address.id
            })
            toast.success('ویرایش آدرس با موفقیت انجام شد')

            mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
                <div className="row g-4">
                    <div className="col col-md-6">
                        <label className="form-label">عنوان</label>
                        <input {...register('title', { required: 'فیلد عنوان الزامی است' })} defaultValue={address.title} type="text" className="form-control" />
                        <div className="form-text text-danger">{errors.title?.message}</div>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شماره تماس</label>
                        <input {...register('cellphone', { required: 'فیلد شماره تماس الزامی است', pattern: { value: /^(\+98|0)?9\d{9}$/i, message: 'فیلد شماره تماس معتبر نمیباشد' } })} defaultValue={address.cellphone} type="text" className="form-control" />
                        <div className="form-text text-danger">{errors.cellphone?.message}</div>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">کد پستی</label>
                        <input {...register('postal_code', { required: 'فیلد کد پستی الزامی است', pattern: { value: /^\d{5}[ -]?\d{5}$/i, message: 'فیلد کد پستی معتبر نمیباشد' } })} defaultValue={address.postal_code} type="text" className="form-control" />
                        <div className="form-text text-danger">{errors.postal_code?.message}</div>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">استان</label>
                        <select {...register('province_id', { required: 'فیلد استان الزامی است' })} defaultValue={address.province_id} className="form-select" aria-label="Default select example">
                            <option disabled value="">انتخاب استان</option>
                            {provinces.map((item) => (
                                <option key={item.id} value={item.id} >{item.name}</option>
                            ))}
                        </select>
                        <div className="form-text text-danger">{errors.province_id?.message}</div>
                    </div>
                    <div className="col col-md-6">
                        <label className="form-label">شهر</label>
                        <select {...register('city_id', { required: 'فیلد شهر الزامی است' })} defaultValue={address.city_id} className="form-select" aria-label="Default select example">
                            <option disabled value="">انتخاب شهر</option>
                            {cities.filter((item) => item.province_id == watch('province_id')).map((item) => (
                                <option key={item.id} value={item.id} >{item.name}</option>
                            ))}
                        </select>
                        <div className="form-text text-danger">{errors.city_id?.message}</div>
                    </div>
                    <div className="col col-md-12">
                        <label className="form-label">آدرس</label>
                        <textarea {...register('address', { required: 'فیلد آدرس الزامی است' })} defaultValue={address.address} type="text" rows="5" className="form-control"></textarea>
                        <div className="form-text text-danger">{errors.address?.message}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        ویرایش
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                    <Delete id={address.id} />
                </div>
            </form>
            <hr />
        </>
    )
}

export default Edit;