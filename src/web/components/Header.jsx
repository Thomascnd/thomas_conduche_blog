import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"
import { useRouter } from "next/router"

const MenuItem = ({ children, href, ...otherProps }) => (
  <li {...otherProps}>
    <Link styless href={href}>
      {children}
    </Link>
  </li>
)
const Header = () => {
  const { session, signOut } = useSession()
  const router = useRouter()
  const handleSignOut = () => {
    signOut()
    router.push("/sign-in")
  }

  return (
    <header className="border-b-2 bg-slate-100">
      <div className="flex md:max-w-3xl mx-auto p-4">
        <div className="text-2xl">
          <Link href="/" styless>
            Blog
          </Link>
        </div>
        <nav className="ms-auto">
          <ul className="flex h-full gap-4 items-center">
            {session ? (
              <>
                <MenuItem href="/profile">Profile</MenuItem>
                {session.role === "admin" && (
                  <MenuItem href="/admin">Admin</MenuItem>
                )}
                {session.role === "author" && (
                  <>
                    <MenuItem href="/authorPostList">Author post</MenuItem>
                    <MenuItem href="/createPost">Create post</MenuItem>
                  </>
                )}
                <li>
                  <Button
                    variant="transparent"
                    size="inherit"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <MenuItem href="/sign-up">Sign Up</MenuItem>
                <MenuItem href="/sign-in">Sign In</MenuItem>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
