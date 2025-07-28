import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative p-24 flex items-center justify-center">
      <Image 
        src="/images/hero-image.jpg"
        alt="BallerFit"
        fill
        className="object-cover"
      />
    </main>
  );
}
