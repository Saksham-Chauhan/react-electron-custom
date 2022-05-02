export const selectStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    boxSizing: "border-box",
    border: state.isFocused ? "1px solid #30e2e7" : "1px solid  #121638",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#ffffff",
    fontFamily: "Poppins",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "var(--placeholder)",
    fontSize: "13px",
    fontFamily: "Poppins",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "rgba(255, 255, 255, 0.5)",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "var(--scrollbar-bg)",
    },
    padding: "0px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#121538",
    border: "1px solid  var(--active-input)",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "var(--primary)" : "var(--scrollbar-bg)",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
    fontWeight: "400",
    backgroundColor: state.isSelected ? "var(--sidebar-bg)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    borderBottom: "1px solid rgba(56, 110, 180, 0.5)",
  }),
};

export const selectCustomStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    boxSizing: "border-box",
    backgroundColor: "#121538",
    border: state.isFocused ? "1px solid #30e2e7" : "1px solid transparent",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#ffffff",
    fontFamily: "Poppins",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "13px",
    fontFamily: "Poppins",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "rgba(255, 255, 255, 0.5)",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "var(--scrollbar-bg)",
    },
    padding: "0px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#10172c",
    border: "1px solid #30e2e7",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "var(--primary)" : "var(--scrollbar-bg)",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
    fontWeight: "400",
    backgroundColor: state.isSelected ? "var(--sidebar-bg)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    borderBottom: "1px solid rgba(56, 110, 180, 0.5)",
  }),
};

export const groupCustomStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    boxSizing: "border-box",
    border: state.isFocused ? "1px solid #30e2e7" : "1px solid  #121638",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#ffffff",
    fontFamily: "Poppins",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "var(--placeholder)",
    fontSize: "13px",
    fontFamily: "Poppins",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "rgba(255, 255, 255, 0.5)",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "var(--scrollbar-bg)",
    },
    padding: "0px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#121538",
    border: "1px solid  var(--active-input)",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "var(--primary)" : "var(--scrollbar-bg)",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
    fontWeight: "400",
    paddingLeft: "20px",
    backgroundColor: state.isSelected ? "var(--sidebar-bg)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    borderBottom: "1px solid rgba(56, 110, 180, 0.5)",
    overflowX: "hidden",
    textOverflow: "ellipsis",
  }),
};

export const lightMode_selectStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    boxSizing: "border-box",
    border: state.isFocused ? "1px solid #30e2e7" : "1px solid  #121638",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#ffffff",
    fontFamily: "Poppins",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: " #706A6A",
    fontSize: "13px",
    fontFamily: "Poppins",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#706A6A",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "#706A6A",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "#706a6a",
    },
    paddingRight: "3px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#FFFFFF",
    border: "1px solid  var(--active-input)",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "var(--primary)" : "#706A6A",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
    fontWeight: "400",
    backgroundColor: state.isSelected ? "#6940BB" : "transparent",
    "&:hover": {
      backgroundColor: "#6940BB",
      color: "#E4E7EA",
    },
    borderBottom: "1px solid #e4e7ea",
  }),
};
export const LightMode_selectCustomStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    boxSizing: "border-box",
    backgroundColor: "#E4E7EA",
    border: state.isFocused ? "1px solid #30e2e7" : "1px solid transparent",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#706A6A",
    fontFamily: "Poppins",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#706A6A",
    fontSize: "13px",
    fontFamily: "Poppins",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#706A6A",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "#706A6A",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "var(--scrollbar-bg)",
    },
    padding: "0px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#6940BB",
    border: "1px solid #30e2e7",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "#706A6A",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "Poppins",
    fontWeight: "400",
    backgroundColor: state.isSelected ? "#6940BB" : "transparent",
    "&:hover": {
      backgroundColor: "#6940BB",
    },
    borderBottom: "1px solid rgba(56, 110, 180, 0.5)",
  }),
};
