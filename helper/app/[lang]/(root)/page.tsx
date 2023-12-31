import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Counter from '@/components/counter'
import LocaleSwitcher from '@/components/locale-switcher'
import Link from 'next/link'

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale } 
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div>
       <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server:{' '}
        {dictionary['home'].title}
      </p>
      <Counter dictionary={dictionary.home} />
    </div>
  )
}
