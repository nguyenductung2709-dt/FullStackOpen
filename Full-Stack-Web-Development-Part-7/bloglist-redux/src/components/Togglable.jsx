import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const specialInformationStyle = {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    marginLeft: 10,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {props.specialInformation && (
        <div style={hideWhenVisible}>
          <div style={specialInformationStyle}>
            <p>{props.specialInformation}</p>
            <button style={buttonStyle} onClick={toggleVisibility}>
              {props.buttonLabel}
            </button>
          </div>
        </div>
      )}

      {props.specialInformation && (
        <div style={showWhenVisible}>
          <div style={blogStyle}>
            <p>{props.specialInformation}</p>
            {props.children}
            <button onClick={toggleVisibility}>hide</button>
          </div>
        </div>
      )}

      {!props.specialInformation && (
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}

      {!props.specialInformation && (
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
