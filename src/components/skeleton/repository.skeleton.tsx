import { useState } from 'react';

export default function SkeletonRepository() {
    const [els] = useState<Array<number>>(new Array<number>(10).fill(0, 0, 10));

    return (
        <div className="w-full h-full grid grid-cols-12 justify-between rounded-md gap-2 animate-pulse">
            {els.map((val, i) => {
                return (
                    <div key={`${val}-${i}`} className="w-full lg:col-span-6 md:col-span-6 col-span-10 p-5">
                        <div className="flex items-center gap-4 ">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-neutral"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20 bg-neutral"></div>
                                <div className="skeleton h-4 w-28 bg-neutral"></div>
                            </div>
                        </div>
                        <div className="skeleton mt-1 h-32 w-full bg-neutral"></div>
                    </div>
                );
            })}
        </div>
    );
}
