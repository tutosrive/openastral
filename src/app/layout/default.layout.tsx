import { Outlet } from 'react-router';
import Footer from '../../components/footer.component';
import Header from '../../components/header.component';

export default function DefaultLayout() {
    return (
        <div id="default-layout" className="w-full h-full grid grid-rows-12">
            <Header />
            <main className="w-full row-span-10 py-5 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
