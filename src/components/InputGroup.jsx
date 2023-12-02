/* eslint-disable react/prop-types */
export function InputGroup({ name, value, setValue }) {
  const cname = name.trim().toLowerCase().replace(/ /g, "-");
  return (
    <div className="input-group">
      <label htmlFor={cname}>{name}</label>
      <input
        type="number"
        id={cname}
        value={value}
        onChange={(ev) => setValue(parseFloat(ev.target.value))}
      />
    </div>
  );
}

export default InputGroup;
