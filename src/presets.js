export const presets = [
  {
    name: "Overtime Hours",
    description: "worked hours + 25% salary",
    calculate: ({ hours, hourlyRate }) => {
      return hours * 1.25 * hourlyRate;
    },
  },
  {
    name: "Saturday",
    description: "worked hours + 25% salary + 50% minimum salary",
    calculate: ({ hours, hourlyRate, minimumHourlyRate }) => {
      return hours * 1.25 * hourlyRate + hours * 0.5 * minimumHourlyRate;
    },
  },
  {
    name: "Sunday",
    description: "worked hours + 25% salary + 100% minimum salary",
    calculate: ({ hours, hourlyRate, minimumHourlyRate }) => {
      return hours * 1.25 * hourlyRate + hours * minimumHourlyRate;
    },
  },
  {
    name: "Bank Holiday during normal week",
    description:
      "1-8 hours: + 100% avg salary, 9-12 hours: worked hours + 100% avg salary + 25% salary",
    calculate: ({ hours, hourlyRate }) => {
      const highRate = Math.max(0, hours - 8) * 2.25 * hourlyRate;
      const lowRate = Math.min(hours, 8) * 2 * hourlyRate;
      return lowRate + highRate;
    },
  },
  {
    name: "Bank Holiday Saturday",
    description:
      "worked hours + 100% avg salary + 25% salary + 50% minimum salary",
    calculate: ({ hours, hourlyRate, minimumHourlyRate }) => {
      return hours * 2.25 * hourlyRate + hours * 0.5 * minimumHourlyRate;
    },
  },
  {
    name: "Bank Holiday Sunday",
    description:
      "worked hours + 100% avg salary + 25% salary + 100% minimum salary",
    calculate: ({ hours, hourlyRate, minimumHourlyRate }) => {
      return hours * 2.25 * hourlyRate + hours * minimumHourlyRate;
    },
  },
];

export default presets;
