import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Tractor } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex gap-10 justify-items-center justify-between items-center border-b-2 border-green-800">
            <img
                src="https://img.logoipsum.com/243.svg"
                alt="SolSense"
                className="flex align-l"
            />
            
            <div className="flex items-center w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search For Loacation . . . . . ."
                    className="p-2  rounded border-2 bg-slate-700 border-green-800 w-full"
                />
            </div>

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

