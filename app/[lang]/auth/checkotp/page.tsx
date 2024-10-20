import { Locale } from '@/i18n-config'
import CheckOtp from '../components/CheckOtp'

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale } 
}) {


  return (
    <div>
    <CheckOtp />
    </div>
  )
}
