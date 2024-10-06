
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
    const Map = useMemo(() => dynamic(
        () => import('./Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="bg-white-700  w-full h-full">
            <Map posix={[4.79029, -75.69003]} />
        </div>
    )
}
