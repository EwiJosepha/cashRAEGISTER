const rootContainer = document.getElementById("root-element");
const root = ReactDOM.createRoot(rootContainer);

const money = [
  {
    id: 1,
    name: "Cash $",
    number: "number",
  },
  {
    id: 2,
    name: "Penny",
    number: " ",
  },
  {
    id: 3,
    name: "Nickel",
    number: "",
  },
  {
    id: 4,
    name: "Dime",
    number: "",
  },
  {
    id: 5,
    name: "Quarter",
    number: "",
  },
  {
    id: 6,
    name: "One",
    number: "",
  },
  {
    id: 7,
    name: "Five",
    number: "",
  },
  {
    id: 8,
    name: "Ten",
    number: "",
  },
  {
    id: 9,
    name: "Twenty",
    number: "",
  },
  {
    id: 10,
    name: "One Hundred",
    number: "",
  },
];

function App() {
  let [bill, setBill] = React.useState(0);
  let [bill2, setBill2] = React.useState(0);

  function change(event) {
    setBill(event.target.value);
    console.log(bill);
  }

  function bil2(event) {
    setBill2(event.target.value);
    console.log(bill2);
  }

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="firstDiv">
            <h1>Bill Amount</h1>
            <div className="input1">
              <input
                type="number"
                value={bill}
                onChange={(e) => change(e)}
                className="btn1"
              />
              <input className="submit1" type="submit" placeholder="Submit" />
            </div>
            <h1>Cash Given</h1>
            <div className="input2">
              <input onChange={bil2} type="number" className="btn2" />
              <input className="submit2" type="submit" placeholder="Submit" />
            </div>
          </div>
          <button className="button">Return Change</button>
          <div className="secondDiv">
            {money.map((money) => (
              <div  key={money.id} className="all">
                <h4>{money.name}</h4>
                <div className="number">
                  <div className="divv">{money.number}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

root.render(<App />);
