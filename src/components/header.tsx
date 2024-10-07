import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Tractor } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex gap-10 justify-items-center justify-between items-center border-b-2 border-customDarkBlue">
            <img
                src="./assets/logo.svg"
                width={200}
                height={200}
                alt="SolSense"
                className="flex align-l"
            />
    
            <div className="flex gap-10">
                <div className="flex">
                    <button className="text-customMediumBlue">
                        <Tractor size={30}/>
                    </button>
                </div>
                <div className="text-customMediumBlue">
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
