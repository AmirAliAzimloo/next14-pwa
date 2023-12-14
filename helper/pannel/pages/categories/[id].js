import Loading from "@/components/Loading";
import DeleteCategory from "@/components/category/Delete";
import { handleError } from "@/lib/helper";
import { useRouter } from "next/router"
import { toast } from "react-toastify";
import useSWR from "swr";

const ShowCategory = () => {
    const router = useRouter();

    const { data: category, error } = useSWR(router.query.id && `/global?url=/categories/${router.query.id}`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!category) {
        return <Loading />
    }

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">دسته بندی : {category.name}</h4>
            </div>
            <div>
                <div className="row gy-4">
                    <div className="col-md-3">
                        <label className="form-label">نام</label>
                        <input type="text" className="form-control" disabled placeholder={category.name} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">توضیحات</label>
                        <input type="text" className="form-control" disabled placeholder={category.description} />
                    </div>
                </div>
            </div>

            <DeleteCategory id={category.id} />
        </>
    )
}

export default ShowCategory