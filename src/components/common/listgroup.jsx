import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onGenreSelect
  } = props;
  return (
    <React.Fragment>
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenreSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;

// From movies.jsx inside render(). Adding defaultProps as shown above we can remove them from the attributes inside <ListGroup /> component

// <ListGroup
// items={this.state.genres}
// textProperty="name" //this is to help the listGroup component be more flexible, not stuck to just one interface (check out commented code in listGroup.jsx). If listGroup receives an object that doesnt have name or id properties, we use these two props textProperty and valueProperty to appropriately set listGroup
// valueProperty="_id"
// onItemSelect={this.handleGenreSelect}
// />

// import React from "react";

// const ListGroup = props => {
//   const { items, textProperty, valueProperty } = props;
//   return (
//     <React.Fragment>
//       <ul className="list-group">
//         {items.map(item => (
//           <li
//             key={item._id}
//             className="list-group-item"
//             onClick={props.onGenreSelect}
//           >
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </React.Fragment>
//   );
// };

// export default ListGroup;
