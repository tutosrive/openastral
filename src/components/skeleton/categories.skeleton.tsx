export default function SkeletonCategory() {
    return (
        <div className="flex w-full h-full flex-wrap gap-2 animate-pulse">
            <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
            <div className="flex w-full gap-5">
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
            </div>
            <div className="flex w-full gap-7">
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
                <div className="skeleton badge border-none outline-nonebadge-lg w-76 bg-neutral"></div>
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
            </div>
            <div className="w-full flex gap-20">
                <div className="skeleton badge border-none outline-nonebadge-lg w-50 bg-neutral"></div>
                <div className="skeleton badge border-none outline-nonebadge-lg w-full bg-neutral"></div>
            </div>
        </div>
    );
}
