import React from "react";
import SettingsIcon from "./settings";

export default function(props) {
  let icon;
  switch (props.name) {
    case "settings":
      icon = <SettingsIcon {...props} />;
      break;
  }

  return (
    <div className="icon">
      { icon }
    </div>
  );
}