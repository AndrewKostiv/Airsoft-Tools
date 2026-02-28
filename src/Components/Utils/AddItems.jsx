// import { useState } from "react";

// export default function AddItems({
//   getNewItem,
//   dispatch,
//   collection,
//   addItemBtnText,
// }) {
//   const [itemName, setItemName] = useState("");
//   function handleSubmit() {
//     dispatch({
//       type: "addItem",
//       collection: collection,
//       payload: getNewItem(itemName),
//     });
//     setItemName("");
//   }
//   return (
//     <div>
//       <form action={handleSubmit}>
//         <input
//           type="text"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//         />
//         <button type="submit">{addItemBtnText}</button>
//       </form>
//     </div>
//   );
// }
