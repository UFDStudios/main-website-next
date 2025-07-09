import Footer from "./components/footer"
import Navbar from "./components/navbar"
import Home from "./home/page"


const Page = () => {
  return (
    <div className="bg-main min-h-screen">
      <div>
        <Navbar />
         <Home />
        <Footer/>
      </div>
    </div>
  )
}

export default Page
