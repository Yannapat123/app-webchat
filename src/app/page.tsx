import { Container } from "../libs/components/container";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-100 font-sans dark:bg-yellow-900">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-yellow-50 dark:bg-yellow-800 sm:items-start">
        <Container />
      </main>
    </div>
  );
}
