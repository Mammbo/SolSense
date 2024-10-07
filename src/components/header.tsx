import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Tractor } from "lucide-react";
import Image from "next/image";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex gap-10 justify-items-center justify-between items-center border-b-2 border-green-800">
            <Image
                src="logo.svg"
                style={{ objectFit: "contain" }}
                width={200}
                height={200}
                alt="SolSense"
                className="flex align-l"
            />
        

            <div className="flex gap-10">

                <div className="flex">
                    <button className="text-emerald-600">
                        <Tractor size={30}/>
                    </button>
                </div>
                <div className="">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Header;