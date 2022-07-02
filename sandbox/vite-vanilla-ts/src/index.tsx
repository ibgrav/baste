import "./style.css";
import { template, render } from "baste";

export const Main = template(() => {
  return (
    <>
      <main className={{ true: true }} css={{ color: "red" }}>
        <h1>Hello Vite!</h1>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
          Documentation
        </a>
      </main>
      <script>{`console.log('hello world';)`}</script>
    </>
  );
});

const app = document.querySelector<HTMLDivElement>("#app")!;

render({ stylesheet: [] }, <Main />).then((result) => {
  app.innerHTML = result;
});
