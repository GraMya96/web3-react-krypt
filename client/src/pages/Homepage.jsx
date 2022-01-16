import { Navbar, Welcome, Footer, Services, Transactions } from '../components/index';

const Homepage = () => {
    return (
        <div>
            <div className="gradient-bg-welcome">
                <Navbar />
                <Welcome />
            </div>
            <Services />
            <Transactions />
            <Footer />
        </div>
    )
}

export default Homepage;