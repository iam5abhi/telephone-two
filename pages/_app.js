import Header from '../components/Header/Header'
import 'tailwindcss/tailwind.css'
import '../style/globle.css'

function MyApp({ Component, pageProps }) {
  
  return(
      <>
        <Header />
        <Component {...pageProps} />
      </> 
  )
}

export default MyApp
