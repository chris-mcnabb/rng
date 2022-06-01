import '../styles/globals.css'

import AdminLayout from "../components/layouts/AdminLayout";
import OtherLayout from "../components/layouts/OtherLayout"
import { SessionProvider } from "next-auth/react"
import {Provider} from "react-redux";
import {store, persistor} from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'


const layouts = {

  L2: AdminLayout,
  L3: OtherLayout
};
function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const Layout = layouts[Component.layout] || ((children)=><>{children}</>)
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </SessionProvider>
      </PersistGate>
    </Provider>

  )
}

export default MyApp
