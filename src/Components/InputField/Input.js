import React from "react";
import "../../container/Login/_account.scss";

const Input = (props) => {
  const {
    value,
    setData,
    name,
    classStyle,
    placeholder,
    inputType,
    showPass,
    autoComplete,
    register,
    errors,
  } = props;

  return (
    <>
      {inputType === "text" ? (
        <input
          placeholder={placeholder}
          className={classStyle}
          name={name}
          value={value}
          onChange={(e) => {
            setData(e.target.value);
          }}
          {...register(name, errors)}
        />
      ) : (
        <input
          type={showPass ? "text" : "password"}
          placeholder={placeholder}
          className={classStyle}
          name={name}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => {
            setData(e.target.value);
          }}
          {...register(name, errors)}
        />
      )}
    </>
  );
};

export default Input;
