// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const { message } = useRouteError() as Error;
  return (
    <div className="relative h-screen text-white text-7xl font-extrabold grid place-content-center">
      <span className="mx-auto mb-4"> ErrorPage</span>
      <p className="text-9xl text-black font-normal">message</p>
    </div>
  );
}
