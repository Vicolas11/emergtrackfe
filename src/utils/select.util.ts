export const customStyles = () => {
  return {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      background: state.isSelected ? "#5721B7" : "white",
      color: state.isSelected ? "#f2f2f2" : "#1F2937",
      border: `1px solid #f2f2f2`,
      boxShadow: "#000",
      cursor: "pointer",
      ":hover": { background: "#F7B300", color: "#1F2937" },
    }),
    clearIndicator: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      cursor: "pointer",
      ":hover": { color: "#DC2626" },
    }),
    dropdownIndicator: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      cursor: "pointer",
      display: "none",
      ":hover": { color: "white" },
    }),
    input: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      caretColor: "transparent",
      border: "none",
    }),
    menu: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      background: "rgba(0 0 0 .8)",
    }),
    noOptionsMessage: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      background: "#374151",
      color: "white",
    }),
    singleValue: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      fontWeight: "bold",
      paddingTop: "1.2rem",
      paddingLeft: ".2rem",
      color: state.isFocused || state.isSelected ? "#DC2626" : "#374156",
      width: "100%",
    }),
    control: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      borderRadius: "10px",
      boxShadow: "#DC2626",
      border: `1px solid ${state.isSelected || state.isFocused ? "#5721B7" : "#9CA3AF"}`,
      ":hover": {
        border: `1px solid #5721B7`,
      },
    }),
    container: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      borderRadius: "10px",
      boxShadow: "#DC2626",
      border: `1px solid ${state.isSelected || state.isFocused ? "#5721B7" : "#9CA3AF"}`,
      ":hover": {
        border: `1px solid #5721B7`,
      },
    }),
  };
};
