import { cookies } from "next/headers";
import Link from "next/link";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ProfileDisplay from "./ProfileDisplay";
import { FaBarsStaggered } from "react-icons/fa6";
import MobileNav from "./MobileNav";
export default async function AppHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return (
    <header className="flex items-center justify-between px-[7%] py-6 sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg ">
      <Logo />
      <Navigation>
        {
          token ? <ProfileDisplay /> : (
            <div className=" hidden md:flex items-center space-x-5">
              <Link
                href="/auth/log-in"
                className={`bg-white text-primary border border-primary cursor-pointer  px-5 py-3 font-semibold flex space-x-2.5 font-mono items-center justify-center rounded-md hover:shadow-md`}
              >
                Log in
              </Link>
              <Link
                href="/auth/sign-up"
                className={`bg-primary text-white border border-primary cursor-pointer  px-5 py-3 font-semibold flex space-x-2.5 font-mono items-center justify-center rounded-md hover:shadow-md`}
              >
                Sign up
              </Link>
            </div>
          )
        }
      </Navigation>
      <MobileNav/>
    </header >
  );
}
