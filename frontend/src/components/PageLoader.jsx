import { Loader } from "lucide-react"

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
        <Loader className="animate-spin size-10 text-primary"/>
    </div>
  )
}

export default PageLoader