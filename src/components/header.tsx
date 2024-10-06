import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Tractor, ChartColumnIncreasing, CircleAlert, Mails, CircleHelp, FileStack, Settings, Activity, Component } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-8 flex items-center justify-between border-b-2 border-green-800">
            <img
                src="https://img.logoipsum.com/243.svg"
                alt="SolSense"
            />
            
            <div className="flex items-center w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search For Loacation . . . . . ."
                    className="p-2  rounded border-2 bg-slate-700 border-green-800 w-full"
                />
            </div>

            <div className="flex gap-7">
                <button className="text-emerald-600">
                    <Tractor size={30}/>
                </button>
            </div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
        </header>
    );
};

export default Header;

