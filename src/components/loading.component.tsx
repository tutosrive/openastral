export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-screen h-full flex items-center justify-center z-[-1]">
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    );
}
