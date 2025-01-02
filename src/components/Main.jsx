import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main className="relative min-h-screen w-full z-40">
      <Outlet />
    </main>
  );
}

export default Main;

