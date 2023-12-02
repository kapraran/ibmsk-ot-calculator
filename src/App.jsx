import { DndContext } from '@dnd-kit/core';
import { useEffect, useMemo, useState } from 'react';
import { OvertimeCalculator } from './components/OvertimeCalculator';
import { OvertimePreset } from './components/OvertimePreset';
import { presets } from './presets';

function App() {
  const [grossSalary, setGrossSalary] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [minimumHourlyRate, setMinimumHourlyRate] = useState(0)
  const [otItems, setOtItems] = useState([])

  const onDragEnd = (item) => {
    if (item.over === null) return
    setOtItems(currentItems => [...currentItems, { id: `${Date.now()}:${currentItems.length}`, type: item.active.id, hours: 0 }])
  }

  useEffect(() => {
    setHourlyRate((grossSalary / 174).toFixed(2))
  }, [grossSalary])

  const totalAmount = useMemo(() => {
    return (otItems.reduce((acc, item) => {
      return acc + presets.find(p => p.name === item.type).calculate({ hours: item.hours || 0, hourlyRate, minimumHourlyRate })
    }, 0) + (grossSalary || 0)).toFixed(2)
  }, [otItems, grossSalary, hourlyRate, minimumHourlyRate])

  return (
    <DndContext onDragEnd={onDragEnd} >
      <header>
        <div className="input-group">
          <label htmlFor="gross-salary">gross-salary</label>
          <input value={grossSalary} onChange={(ev) => setGrossSalary(parseInt(ev.target.value))} type="number" id="gross-salary" />
        </div>

        <div className="input-group">
          <label htmlFor="hourly-gross-salary">hourly-gross-salary</label>
          <input type="number" id="hourly-gross-salary" placeholder={hourlyRate} />
        </div>

        <div className="input-group">
          <label htmlFor="minimum-hourly-rate">minimum-hourly-rate</label>
          <input type="number" id="minimum-hourly-rate" value={minimumHourlyRate} onChange={(ev) => setMinimumHourlyRate(ev.target.value)} />
        </div>
      </header>

      <h1>Total Gross Amount: {totalAmount}€</h1>
      <div>
        <a href="https://www.platy.sk/en/calculator" rel="noreferrer" target='_blank'>gross to net salary calculator</a>
      </div>

      <main>
        <div className="ot-preset-list">
          {presets.map(p => <OvertimePreset key={p.name} {...p} />)}
        </div>

        <OvertimeCalculator items={otItems} setOtItems={setOtItems} />
      </main>
    </DndContext >
  )
}

export default App
