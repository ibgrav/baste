import "./style.css";
import { defineComponent, renderToString } from "baste";

export const Button = defineComponent("button", () => {
  return <button>click me!</button>;
});

export const Main = defineComponent("main", (props, context) => {
  return (
    <main>
      <style jsx>{`
        .test {
          color: red;
        }
      `}</style>

      <Button />
      <h1 className="test" data-test={true}>
        hello world!
      </h1>
      <Button />
      <pre>{JSON.stringify({ props, context }, null, 2)}</pre>
    </main>
  );
});

const app = document.querySelector<HTMLDivElement>("#app")!;

const context: BasteContext = {
  config: { name: true },
};

renderToString(context, <Main />).then((result) => {
  app.innerHTML = result;
  postRender();
});

function postRender() {
  const buttons = document.querySelectorAll("[data-baste-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click!", button);
    });
  });
}
