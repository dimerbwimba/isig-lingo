import Footer from "./_component/footer"
import Header from "./_component/header"

type Props = {
    children: React.ReactNode
}

const MarketingLayout = ({children}:Props) =>{
    return (
        <div className=" min-h-screen flex flex-col ">
            <Header/>
            <main className=" flex-1 flex flex-col">
                {children}
            </main>
            <Footer/>
        </div>
    )
}
export default MarketingLayout