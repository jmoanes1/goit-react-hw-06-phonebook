import React, { useState, useCallback, useEffect } from "react";

/**
 * ContactForm
 * - onAdd({ id, name, number })
 * - formats phone number as XXX-XX-XX-X (max 8 digits)
 */

function formatPhoneDigits(digits) {
  // allow up to 8 digits
  const d = digits.slice(0, 8);
  const parts = [];
  if (d.length >= 3) {
    parts.push(d.slice(0, 3));
    if (d.length >= 5) {
      parts.push(d.slice(3, 5));
      if (d.length >= 7) {
        parts.push(d.slice(5, 7));
        if (d.length >= 8) {
          parts.push(d.slice(7, 8));
        } else if (d.length > 7) {
          parts.push(d.slice(7));
        }
      } else {
        parts.push(d.slice(5));
      }
    } else {
      parts.push(d.slice(3));
    }
  } else {
    parts.push(d);
  }
  return parts.filter(Boolean).join("-");
}

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rawNumber, setRawNumber] = useState(""); // digits only string
  const [displayNumber, setDisplayNumber] = useState("");

  // update displayNumber when rawNumber changes
  useEffect(() => {
    setDisplayNumber(formatPhoneDigits(rawNumber));
  }, [rawNumber]);

  const handleNumberChange = useCallback((e) => {
    // accept only digits
    const input = e.target.value;
    // remove non-digits
    const digits = input.replace(/\D/g, "");
    // limit to 8 digits for the format
    setRawNumber(digits.slice(0, 8));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmedName = name.trim();
      if (!trimmedName) {
        alert("Please enter a name.");
        return;
      }
      if (rawNumber.length < 8) {
        const proceed = window.confirm(
          "Number seems short. Do you want to add anyway?"
        );
        if (!proceed) return;
      }

      const id = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2);

      onAdd({
        id,
        name: trimmedName,
        number: formatPhoneDigits(rawNumber),
      });

      // clear
      setName("");
      setRawNumber("");
    },
    [name, rawNumber, onAdd]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          className="input"
          placeholder="Phone (digits only, will format)"
          value={displayNumber}
          onChange={handleNumberChange}
          // allow pasting digits
        />
        <button type="submit" className="button small">
          Add
        </button>
      </div>

      <div style={{ color: "#6b6f76", fontSize: 13 }}>
        Format: <strong>XXX-XX-XX-X</strong> — up to 8 digits. Non-digit characters are ignored.
      </div>
    </form>
  );
}






// This is the previous code for ContactForm.jsx before the recent edits: //

// import React, { useState, useCallback } from "react";

// function ContactForm({ onAdd }) {
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");

//   // Format phone number as XXX-XX-XX-X
//   const formatNumber = useCallback((value) => {
//     const onlyNumbers = value.replace(/\D/g, ""); // remove non-numeric

//     const part1 = onlyNumbers.substring(0, 3);
//     const part2 = onlyNumbers.substring(3, 5);
//     const part3 = onlyNumbers.substring(5, 7);
//     const part4 = onlyNumbers.substring(7, 8);

//     let formatted = part1;
//     if (part2) formatted += `-${part2}`;
//     if (part3) formatted += `-${part3}`;
//     if (part4) formatted += `-${part4}`;

//     return formatted;
//   }, []);

//   // Handle form submission
//   const handleSubmit = useCallback((e) => {
//     e.preventDefault();

//     if (!name.trim() || !number.trim()) {
//       alert("Please enter both name and phone number");
//       return;
//     }

//     onAdd({ name, number });
//     setName("");
//     setNumber("");
//   }, [name, number, onAdd]);

//   // Handle input changes with formatting for phone number
//   const handleNameChange = useCallback((e) => {
//     setName(e.target.value);
//   }, []);

//   const handleNumberChange = useCallback((e) => {
//     const formatted = formatNumber(e.target.value);
//     setNumber(formatted);
//   }, [formatNumber]);

//   return (
//     <form onSubmit={handleSubmit} className="contact-form">
//       <input
//         type="text"
//         placeholder="Enter name"
//         value={name}
//         onChange={handleNameChange}
//         required
//       />

//       <input
//         type="text"
//         placeholder="Enter phone number"
//         value={number}
//         onChange={handleNumberChange}
//         maxLength={10} // XXX-XX-XX-X is 10 characters
//         required
//       />

//       <button type="submit">Add Contact</button>
//     </form>
//   );
// }

// export default ContactForm;
