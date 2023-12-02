import { DndContext } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { InputGroup } from "./components/InputGroup";
import { OvertimeCalculator } from "./components/OvertimeCalculator";
import { OvertimePreset } from "./components/OvertimePreset";
import { presets } from "./presets";

function App() {
  const [grossSalary, setGrossSalary] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [minimumHourlyRate, setMinimumHourlyRate] = useState(4.02);
  const [otItems, setOtItems] = useState([]);

  const onDragEnd = (item) => {
    if (item.over === null) return;
    setOtItems((currentItems) => [
      ...currentItems,
      {
        id: `${Date.now()}:${currentItems.length}`,
        type: item.active.id,
        hours: 0,
      },
    ]);
  };

  useEffect(() => {
    setHourlyRate((grossSalary / 174).toFixed(2));
  }, [grossSalary]);

  const totalAmount = useMemo(() => {
    return (
      otItems.reduce((acc, item) => {
        return (
          acc +
          presets
            .find((p) => p.name === item.type)
            .calculate({
              hours: item.hours || 0,
              hourlyRate,
              minimumHourlyRate,
            })
        );
      }, 0) + (grossSalary || 0)
    ).toFixed(2);
  }, [otItems, grossSalary, hourlyRate, minimumHourlyRate]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <h1 className="repo-title">ibmsk-ot-calculator</h1>

      <header>
        <InputGroup
          name="Gross salary"
          value={grossSalary}
          setValue={setGrossSalary}
        />
        <InputGroup
          name="Hourly gross salary"
          value={hourlyRate}
          setValue={setHourlyRate}
        />
        <InputGroup
          name="Minimum hourly rate"
          value={minimumHourlyRate}
          setValue={setMinimumHourlyRate}
        />
      </header>

      <div className="total-amount">
        <h3>Total Gross Amount: {totalAmount}€</h3>
        <div>
          <a
            href="https://www.platy.sk/en/calculator"
            rel="noreferrer"
            target="_blank"
          >
            gross to net salary calculator
          </a>
        </div>
      </div>

      <main>
        <div className="ot-preset-list">
          {presets.map((p) => (
            <OvertimePreset key={p.name} {...p} />
          ))}
        </div>

        <OvertimeCalculator
          items={otItems}
          setOtItems={setOtItems}
          hourlyRate={hourlyRate}
          minimumHourlyRate={minimumHourlyRate}
        />
      </main>
    </DndContext>
  );
}

export default App;
