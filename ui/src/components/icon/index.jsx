import cx from "classnames";
import React from "react";
import SettingsIcon from "./settings";
import ChangeIcon from './change';
import BubblesIcon from './bubbles';
import CloseIcon from './close';
import BottleIcon from './bottle';
import PumpLineIcon from './pump-line';



export default function(props) {
  let icon;
  switch (props.name) {
    case "settings":
      icon = <SettingsIcon  {...props} />;
      break;
    case "change":
      icon = <ChangeIcon  {...props} />
      break;
    case "bubbles":
      icon = <BubblesIcon {...props} />
      break;
    case "close":
      icon = <CloseIcon {...props} />
      break;
    case "bottle":
      icon = <BottleIcon {...props} />
      break;
    case "pump-line":
      icon = <PumpLineIcon {...props} />
      break;
  }

  const className = cx("icon", props.className, props.name)

  return (
    <div {...props} className={className} >
      { icon }
    </div>
  );
}