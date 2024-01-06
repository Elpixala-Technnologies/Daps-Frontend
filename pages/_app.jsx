import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataContext from "@/src/Context/DataContext";
import "@/styles/globals.scss";
import UserContext from "@/src/Context/UserContext";
import Preloader from "@/src/Shared/Preloader/Preloader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [loader]);

  return (
    <>
      {loader && <Preloader />}
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <DataContext>
            <UserContext>
              <Component {...pageProps} />
            </UserContext>
          </DataContext>
        </DndProvider>
      </QueryClientProvider>
    </>
  );
}
