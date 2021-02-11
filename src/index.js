import "./styles.css";

const arr = [
  { count: 10, name: "one" },
  { count: 15, name: "two" }
];

// const some = wrap(arr);

const view = {
  container: null,
  init(container, arr) {
    this.container = document.getElementById(container);
    const wrapped = arr.map((el) => {
      return (el.setValue = (value) => {
        this.count = value;
      });
    });
    return this.wrap(wrapped);
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
    let p = document.createElement("p");
    p.classList.add("output");
    for (let i = items.length - 1; i < 0; i--) {
      p.textContent = items[i].count;
      this.container.append(p);
    }
  }
};
