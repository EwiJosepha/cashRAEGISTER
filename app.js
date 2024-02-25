const rootContainer = document.getElementById("root-element");
const root = ReactDOM.createRoot(rootContainer);

const currencies = [
  {
    name: "ONE HUNDRED",
    value: 100.0,
  },
  {
    name: "TWENTY",
    value: 20.0,
  },
  {
    name: "TEN",
    value: 10.0,
  },
  {
    name: "FIVE",
    value: 5.0,
  },
  {
    name: "ONE",
    value: 1.0,
  },
  {
    name: "QUARTER",
    value: 0.25,
  },
  {
    name: "DIME",
    value: 0.1,
  },
  {
    name: "NICKEL",
    value: 0.05,
  },
  {
    name: "PENNY",
    value: 0.01,
  },
];
const initialCashdrawer = [
  {
    name: "PENNY",
    num: 1.01,
    id: 2,
  },
  {
    name: "NICKEL",
    num: 2.05,
    id: 3,
  },
  {
    name: "DIME",
    num: 3.1,
    id: 4,
  },
  {
    name: "QUARTER",
    num: 4.25,
    id: 5,
  },
  {
    name: "ONE",
    num: 90,
    id: 6,
  },
  {
    name: "FIVE",
    num: 55,
    id: 7,
  },
  {
    name: "TEN",
    num: 20,
    id: 8,
  },
  {
    name: "TWENTY",
    num: 60,
    id: 9,
  },
  {
    name: "ONE HUNDRED",
    num: 100,
    id: 10,
  },
];

function DrawerItem({ name, num, id }) {
  return (
    <div key={id} className="all">
      <h4>{name}</h4>
      <div className="number">
        <div className="divv">{num}</div>
      </div>
    </div>
  );
}

function App() {
  const [billAmount, setbillAmount] = React.useState();
  const [cashGiven, setcashGiven] = React.useState();
  const [cashdrawer, setcashdrawer] = React.useState(initialCashdrawer);
  // const [mone, setMone] = React.useState(cashdrawer)
  const currenciesRef = React.useRef(
    currencies.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {})
    ) 

    let result = "";
    const totalCashInDrawer = React.useMemo(
      () => cashdrawer.reduce((acc, current) => acc + current.num, 0),
      [cashdrawer]
    );

    const changeDue = React.useMemo(
      () => cashGiven - billAmount,
      [cashGiven, billAmount]
    );
    if (changeDue > totalCashInDrawer) {
      result = "Insufficient Funds";
    }
    if (changeDue === totalCashInDrawer) {
      result = "Closed";
    }

    

  //calculate change
  const calculateChange = () => {
    if (totalCashInDrawer >= changeDue && changeDue > 0) {
      const changes = [];
      let currentChangeDue = changeDue;
      for (let i = cashdrawer.length - 1; i >= 0; i--) {
        const drawerItem = cashdrawer[i];
        const baseUnit = currenciesRef.current[drawerItem.name];
        // const numberOfUnit = Math.floor(cashdrawer.number / baseUnit)
        const changeMultiple = Math.floor(currentChangeDue / baseUnit);
        const drawerItemMultiple = drawerItem.num / baseUnit;
        if (
          currentChangeDue % baseUnit === 0 &&
          drawerItem.num >= currentChangeDue
        ) {
          changes.push({
            name: drawerItem.name,
            num: currentChangeDue,
            id: drawerItem.id,
          });
          currentChangeDue = 0;
          return { status: "OPEN", changes };
        }

        if (changeMultiple > 0) {
          const newMultiple =
            changeMultiple >= drawerItemMultiple
              ? drawerItemMultiple
              : changeMultiple;
          changes.push({
            name: drawerItem.name,
            num: newMultiple * baseUnit,
            id: drawerItem.id,
          });
          currentChangeDue -= newMultiple * baseUnit;
        }
      }

    
    if (currentChangeDue > 0) {
      return { status: "INSUFFICIENT FUNDS", changes: [] };
    }
  }
  return { status: "OPEN", changes: [] };
};
// convert change to a memo value
const change = React.useMemo(() => calculateChange(), [changeDue, cashdrawer]);
function callback(event) {
  setbillAmount(event.target.value);
  console.log(billAmount);
}
function call(event) {
  setcashGiven(event.target.value);
  console.log(cashGiven);
}

  // const changed = React.useMemo(()=>{
  //   mone.forEach((mone) =>{
  //   const numberOfUnit = Math.floor(mone.number / baseUnit)
  //   const changeMultiple = Math.floor(due / baseUnit)

  //   })
  // }[changeDue, mone])

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="firstDiv">
            <h1>Bill Amount</h1>
            <div className="input1">
              <input
                type="number"
                value={billAmount}
                onChange={callback}
                className="btn5"
              />
            </div>
            <h1>Cash Given</h1>
            <div className="input2">
              <input
                value={cashGiven}
                onChange={call}
                type="number"
                className="btn2"
              />
            </div>
          </div>
          <button className="button">Return Change</button>
          <br />
          <p>{result}</p>
          <p>Total cash in drawer is:</p>
          <p>{totalCashInDrawer}</p>
          {change.changes.map((change) => (
          <DrawerItem key={change.id} num={change.num} name={change.name} />
        ))}
          <br />
          <div className="secondDiv">
            <DrawerItem  {...{
              name: "Cash($)",
              num: "Number",
              id: 1,
            }} />
              {cashdrawer.map((item) => (
            <DrawerItem key={item.id} num={item.num} name={item.name} />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

root.render(<App />);
