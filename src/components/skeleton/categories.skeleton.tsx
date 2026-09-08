export default function SkeletonCategories() {
    return (
        <div className="flex w-full h-full flex-wrap gap-2 animate-pulse">
            <div className="skeleton badge badge-lg w-full"></div>
            <div className="flex w-full gap-5">
                <div className="skeleton badge badge-lg w-full"></div>
                <div className="skeleton badge badge-lg w-full"></div>
                <div className="skeleton badge badge-lg w-full"></div>
            </div>
            <div className="flex w-full gap-7">
                <div className="skeleton badge badge-lg w-full"></div>
                <div className="skeleton badge badge-lg w-76"></div>
                <div className="skeleton badge badge-lg w-full"></div>
            </div>
            <div className="w-full flex gap-20">
                <div className="skeleton badge badge-lg w-50"></div>
                <div className="skeleton badge badge-lg w-full"></div>
            </div>
        </div>
    );
}
