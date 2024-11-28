import { useState } from "react";
export default function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packingPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>You have {totalItems} items in the list. You already packed {packedItems} ({packingPercentage}%).</em>
    </footer>
  );
};