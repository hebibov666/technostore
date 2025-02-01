import { SessionProvider } from 'next-auth/react';
import "@/styles/globals.css";
import { store } from '@/redux/store';
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster position='top-ight' toastOptions={
          {
            style:{
              width:"100%",
              fontFamily: 'Arial, sans-serif',
            },
            success:{
              duration: 2000,
              style: {
                background: '#018320',
                color: 'white',
              },
            },
            error:{
              duration: 2000,
              style: {
                background: '#bd0404',
                color: 'white',
              },
            }
          }
        }/>
         <div className={roboto.variable}>
     <Component {...pageProps}/>
     </div>
      </Provider>
    </SessionProvider>
  );
}
