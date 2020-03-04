import cx from "classnames";
import React from "react";
import SettingsIcon from "./settings";
import ChangeIcon from './change';
import BubblesIcon from './bubbles';
import CloseIcon from './close';


export default function(props) {
  let icon;
  switch (props.name) {
    case "settings":
      icon = <SettingsIcon  />;
      break;
    case "change":
      icon = <ChangeIcon />
      break;
    case "bubbles":
      icon = <BubblesIcon />
      break;
    case "close":
      icon = <CloseIcon />
      break;
  }

  return (
    <div {...props} className={"icon " + props.className } >
      { icon }
    </div>
  );
}