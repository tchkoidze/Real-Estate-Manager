//import clsx from "clsx";
import React, { useState } from "react";
import { TooltipProps } from "../types";

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  //className,
}) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="relative"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div className="absolute w-max bg-gray-700 text-white text-xs rounded py-1 px-2">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
