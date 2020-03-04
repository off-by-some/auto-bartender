import cx from "classnames";
import React from "react";
import SettingsIcon from "./settings";
import ChangeIcon from './change';
import BubblesIcon from './bubbles';

export default function(props) {
  let icon;
  switch (props.name) {
    case "settings":
      icon = <SettingsIcon {...props} />;
      break;
    case "change":
      icon = <ChangeIcon {...props} />
      break;
    case "bubbles":
      icon = <BubblesIcon {...props} />
      break;
  }

  return (
    <div className={"icon " + props.className }>
      { icon }
    </div>
  );
}