import Image from "next/image";
import Link from "next/link";
export default function SidebarLogo() {
  return (
    <Link href="/">
      <Image src={"/logo-1.png"} width={"156"} height={"32"} alt={"Xpacy Logo"} />
    </Link>
  );
}
