import { useEffect, useState } from 'react'
import { OvertimeCalculator } from './components/OvertimeCalculator'
import { OvertimePreset } from './components/OvertimePreset'

const presets = [
  { name: "Overtime Hours", description: "worked hours + 25% salary" },
  { name: "Saturday", description: "worked hours + 25% salary + 50% minimum salary" },
  { name: "Sunday", description: "worked hours + 25% salary + 100% minimum salary" },
  { name: "Bank Holiday during normal week", description: "worked hours + 25% salary + 100% minimum salary" },
  { name: "Bank Holiday Saturday", description: "worked hours + 25% salary + 100% minimum salary" },
  { name: "Bank Holiday Sunday", description: "worked hours + 25% salary + 100% minimum salary" },
]

function App() {
  const [grossSalary, setGrossSalary] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [minimumHourlyRate, setMinimumHourlyRate] = useState(0)

  useEffect(() => {
    setHourlyRate((grossSalary / 174).toFixed(2))
  }, [grossSalary])

  return (
    <>
      <header>
        <div className="input-group">
          <label htmlFor="gross-salary">gross-salary</label>
          <input value={grossSalary} onChange={(ev) => setGrossSalary(ev.target.value)} type="number" id="gross-salary" />
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

      <main>
        <div className="ot-preset-list">
          {presets.map(p => <OvertimePreset key={p.name} {...p} />)}
        </div>

        <OvertimeCalculator>test</OvertimeCalculator>
      </main>
    </>
  )
}

export default App
