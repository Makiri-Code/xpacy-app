import { cookies } from "next/headers";
import Link from "next/link";

const MobileHeaderCta = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return (
        <>
            {token ? (
                <li className="py-2 border-b border-primary-100 text-primary font-bold">
                    <Link href={"/dashboard/user"}>Dashboard</Link>
                </li>
            ) : (
                <>
                    <li className="py-2 border-b border-primary-100 text-secondary font-bold">
                        <Link href={"/auth/log-in"}>Log In </Link>
                    </li>
                    <li className="py-2 border-b border-primary-100 text-primary font-bold">
                        <Link href={"/auth/sign-up"}>Sign Up </Link>
                    </li>
                </>
            )}
        </>
    );
};

export default MobileHeaderCta;