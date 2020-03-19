import _ from "lodash";
//check 6-paginate the data video for this function's explanation
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  //   _.slice(items, startIndex)
  //   _.take();
}
