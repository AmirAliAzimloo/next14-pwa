import Loading from '@/components/Loading';
import CategoryList from '@/components/category/List';
import { handleError } from '@/lib/helper';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const CategoriesPage = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error } = useSWR(`/global?url=/categories&page=${pageIndex}`)

  if (error) {
    toast.error(handleError(error))
  }

  if (!data) {
    return <Loading />
  }

  return (
    <>
      <div
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4 className="fw-bold">دسته بندی</h4>
        <Link href="/categories/create">
          <a className="btn btn-sm btn-outline-dark">ایجاد دسته بندی</a>
        </Link>
      </div>

      <CategoryList categories={data.categories} />

      <div className="d-flex justify-content-center">
        <nav aria-label="navigation">
          <ul className="pagination">
            {data.meta.links.slice(1, -1).map((link, index) => (
              <li key={index} className={link.active ? "page-item active" : "page-item"}>
                <button onClick={() => setPageIndex(link.label)} className="page-link" disabled={link.active ? true : false}>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </>
  )
}

export default CategoriesPage;