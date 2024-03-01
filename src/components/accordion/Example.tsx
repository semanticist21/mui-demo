import useInputHandle from "@kkomjang/react-simple-input";

export const Example = () => {
  // declaration
  const { values, setValues, matching, handlers, keys } = useInputHandle({
    strings: ["name", "password"],
    booleans: ["isAgreed"],
  });

  // handleString - function to handle string input change
  // handleCheck - function to handle checkbox input change
  // handleNumber - function to handle number input change
  const { handleString, handleCheck, handleNumber } = handlers;

  // stringKeys - ["name", "email"]
  // boolKeys - ["isAgreed"]
  // numberKeys - ["views"]
  const { stringKeys, boolKeys, numberKeys } = keys;

  console.log(values.name);
  console.log(values.password);
  console.log(values.isAgreed);
  console.log(numberKeys);

  return (
    <div>
      <input id={matching.name} onChange={handleString(true)} />
      <input name={matching.password} onChange={handleString()} />
      <input
        type="checkbox"
        name={matching.isAgreed}
        onChange={handleCheck()}
      />
      <input type="number" name={matching.views} onChange={handleNumber()} />
    </div>
  );
};
