import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default ({ size, color, onClick }) => {
  return (
    <PlaceTwoTone onClick={onClick} style={{ fontSize: size, color }} />
  );
};
