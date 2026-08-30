export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content py-1 row-span-1 bottom-0 textarea-xs font-mono">
            <aside>
                <a href="https://github.com/tutosrive" className="decoration-0">
                    Copyright © {new Date().getFullYear()} - All right reserved by tutosrive
                </a>
            </aside>
        </footer>
    );
}
