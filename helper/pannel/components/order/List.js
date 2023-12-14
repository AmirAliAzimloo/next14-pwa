import { numberFormat } from "@/lib/helper";
import Image from "next/image";

const OrderList = ({ orders }) => {

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>شماره سفارش</th>
                        <th>وضعیت</th>
                        <th>وضعیت پرداخت</th>
                        <th>مبلغ پرداختی</th>
                        <th>تاریخ ایجاد</th>
                        <th>محصولات</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.payment_status}</td>
                            <td>{numberFormat(order.paying_amount)} تومان</td>
                            <td>{order.created_at}</td>                                                                       
                            <td>
                                <button type="button" className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target={`#modal-${order.id}`}>
                                    نمایش
                                </button>

                                <div className="modal fade" id={`modal-${order.id}`}>
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h6 className="modal-title">محصولات سفارش
                                                    شماره {order.id}</h6>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <table className="table align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>محصول</th>
                                                            <th>نام</th>
                                                            <th>قیمت</th>
                                                            <th>تعداد</th>
                                                            <th>قیمت کل</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.order_items.map((item) => (
                                                            <tr key={item.id}>
                                                                <th>
                                                                    <Image src={item.product_primary_image} layout="responsive" width={80} height={53} alt="" />
                                                                </th>
                                                                <td className="fw-bold">{item.product_name}</td>
                                                                <td>{numberFormat(item.price)} تومان</td>
                                                                <td>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>{numberFormat(item.subtotal)} تومان</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList;