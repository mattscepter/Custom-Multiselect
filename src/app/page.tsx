import Link from "next/link";
import Multiselect from "./components/multiselect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl md:text-6xl font-bold mb-16 text-center">Custom Multi-Select</h1>
        <div className="w-full md:w-3/4 lg:w-1/2">
          <Multiselect />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <h4>Made with efforts by <Link href="https://www.linkedin.com/in/utkarsh2510/" className="text-blue-600">Utkarsh Chaudhary</Link></h4>
        <h5><Link href="https://drive.google.com/file/d/17A-5KrRuxsFcQ4wgv76tXoQ-corbGTRV/view" className="text-blue-600">Resume</Link></h5>
      </div>
    </main>
  )
}
