import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //   ref={this{props.name}
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

// import React from "react";

// const Input = ({ name, label, value, type, error, onChange }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <input
//         //   ref={this{props.name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         name={name}
//         id={name}
//         className="form-control"
//       />
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// };

// const Input = props => {
//     return (
//       <div className="form-group">
//         <label htmlFor={props.name}>{label}</label>
//         <input
//           //   ref={this{props.name}
//           value={account.username}
//           onChange={this.handleChange}
//           name={props.name}
//           id={props.name}
//           type="text"
//           className="form-control"
//         />
//       </div>
//     );
//   };
