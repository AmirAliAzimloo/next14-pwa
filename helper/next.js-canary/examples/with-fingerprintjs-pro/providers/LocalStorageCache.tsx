import { PropsWithChildren } from 'react'
import {
  CacheLocation,
  FpjsProvider,
  LoadOptions,
} from '@fingerprintjs/fingerprintjs-pro-react'

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string

export const LocalStorageCache: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const loadOptions: LoadOptions = {
    apiKey: fpjsPublicApiKey,
  }

  return (
    <FpjsProvider
      loadOptions={loadOptions}
      cacheLocation={CacheLocation.LocalStorage}
      cachePrefix="MY_AWESOME_PREFIX"
      cacheTimeInSeconds={60 * 10}
    >
      <div className="App">
        <header className="header">
          <h2>Solution with a local storage cache</h2>
          <div className="subheader">
            New API call made after a key expires or is cleared from the local
            storage
          </div>
        </header>
        {children}
      </div>
    </FpjsProvider>
  )
}
