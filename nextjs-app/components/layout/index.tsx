import FloatContact from "../ui/floating-contact"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div>
        <FloatContact />
        <Header />
        <div className="min-h-screen pb-20">{children}</div>
        <Footer />
    </div>
}

export default Layout