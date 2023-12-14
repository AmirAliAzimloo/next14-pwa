import Layout from "@/components/profile/Layout";
import useSWR from "swr";
import { toast } from "react-toastify";
import { handleError } from "lib/helper";
import Loading from "@/components/profile/Loading";
import Create from "@/components/profile/address/Create";
import Edit from "@/components/profile/address/Edit";

const ProfileAddressPage = () => {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/profile/addresses`)

    if (error) {
        toast.error(handleError(error))
    }

    if (!data) return <Layout><Loading /></Layout>

    return (
        <Layout>
            <Create provinces={data.provinces} cities={data.cities} />
            <hr />
            {data.addresses.map((address, index) => (
                <Edit key={index} address={address} provinces={data.provinces} cities={data.cities} />
            ))}
        </Layout>
    )
}

export default ProfileAddressPage;