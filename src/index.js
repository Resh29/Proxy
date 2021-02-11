import "./styles.css";

const arr = [
  { count: 10, name: "one" },
  { count: 15, name: "two" }
];

const view = {
  container: null,
  init(container, arr) {
    this.container = document.getElementById(container);
    this.wrapped = this.wrap(arr);

    this.render(this.wrapped);
  },
  wrap(arr) {
    return arr.map((object) => {
      return new Proxy(object, {
        set(target, prop, value) {
          console.log(`Hi, my name is ${value}`);
          return (target[prop] = value);
        }
      });
    });
  },
  render(items) {
    console.log(items);
    for (let i = 0; i < items.length; i++) {
      let p = document.createElement("p");
      p.classList.add("output");
      p.textContent = items[i].count;
      console.log(items[i]);
      this.container.append(p);
    }
  },
  changeHandler(value) {}
};

view.init("app", arr);
