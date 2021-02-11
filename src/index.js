import "./styles.css";

const arr = [
  { count: 10, name: "one" },
  { count: 15, name: "two" }
];

const view = {
  container: null,
  wrapped: null,
  init(container, arr) {
    this.container = document.getElementById(container);
    this.wrapped = this.wrap(arr);

    this.render(this.wrapped);
  },
  wrap(arr) {
    return arr.map((object) => {
      return new Proxy(object, {
        set: (target, prop, value) => {
          target[prop] = value;
          this.render(this.wrapped);
          return true;
        }
      });
    });
  },
  render(items) {
    if (this.isRender) {
      console.log(this.isRender);
      for (let i = 0; i < items.length; i++) {
        let p = document.getElementById(items[i].name);
        p.textContent = items[i].count;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let p = document.createElement("p");
        p.classList.add("output");
        p.setAttribute("id", items[i].name);
        p.textContent = items[i].count;
        this.container.append(p);
      }
    }

    this.isRender = true;
  },

  changeHandler(name, value) {
    if (value) {
      this.wrapped.find((el) => el.name === name).count = parseInt(
        value.replace(/\D/g, ""),
        0
      );
    }
  }
};

view.init("app", arr);

const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  view.changeHandler(e.target.name, e.target.value);
});
