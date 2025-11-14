import React from "react";

/**
 * Filter
 * - value: string
 * - onChange: function(value)
 */

export default function Filter({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        className="filter-input"
        placeholder="Search contacts by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}





// import React, { useCallback } from "react";

// function Filter({ value, onChange }) {
//   // Memoize the change handler to prevent unnecessary re-renders
//   const handleChange = useCallback((e) => {
//     onChange(e.target.value);
//   }, [onChange]);

//   return (
//     <input
//       type="text"
//       placeholder="Find contacts by name"
//       value={value}
//       onChange={handleChange}
//       className="filter-input"
//       aria-label="Filter contacts by name"
//     />
//   );
// }

// export default Filter;
