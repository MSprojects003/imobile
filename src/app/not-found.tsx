import Image from "next/image";
import nopage from "@/pictures/background/404.gif"

export default function NotFound() {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div className="flex flex-col items-center justify-center   px-4">
        <Image src={nopage} alt="404 Not Found" width={250} height={300} />
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div></div>
    );
  }