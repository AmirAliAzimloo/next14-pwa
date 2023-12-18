import Image from "next/image"
import Link from "next/link"

type Props = {
    id: number,
    image: string,
    title: string
    price: number
    category: string
    description: string
}
const ProductCard = (props: Props) => {
    const { image, title, description, price, category, id } = props
    return (
        <Link href={`/products/${id}`}>
            <div className="rounded p-6 overflow-hidden shadow-lg">
                <div className="w-full flex justify-center">
                    <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={400}
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">
                        {description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pirce: {price}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Category: {category}</span>
                </div>
                <div className="px-6 pt-4 pb-2"></div>
            </div>
        </Link>
    )
}

export default ProductCard