import UserNav from "@/components/nav/user-nav";
import MainNav from "@/components/nav/main-nav";

export const Nav = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 dark:bg-gray-900 text-white">
        <img
          src="/f22_rotated_180.png"
          alt="f22"
          loading="lazy"
          className="h-8 w-auto pl-2"
        />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Nav
