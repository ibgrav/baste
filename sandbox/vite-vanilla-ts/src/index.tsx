import "./style.css";
import { defineComponent, renderToString } from "baste";

export const Main = defineComponent(() => {
  return (
    <>
      <main className={{ true: true }}>
        <h1>Hello Vite!</h1>
        <div onclick="alert('hello world!');return;" onmouseover="alert('hover!');return;">
          click me!
        </div>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
          Documentation
        </a>
      </main>
      <script>{`console.log('hello world';)`}</script>
    </>
  );
});

const app = document.querySelector<HTMLDivElement>("#app")!;

renderToString({ stylesheet: [] }, <Main />).then((result) => {
  app.innerHTML = result;
});
