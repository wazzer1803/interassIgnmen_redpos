"use client";
import MainComponent from "@/components/MainComponent";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </main>
  );
}
