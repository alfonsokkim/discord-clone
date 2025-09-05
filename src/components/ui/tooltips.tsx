import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const StyledTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--color-dropdown)",
    color: "rgba(255, 255, 255, 1)",
    border: "1px solid var(--color-dropdown-border)",
    fontSize: 13,
    fontWeight: 600,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "var(--color-dropdown)",
  },
}));

type LightTooltipProps = {
  title: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  children: React.ReactElement;
};

export default function LightTooltip({
  title,
  placement = "right",
  children,
}: LightTooltipProps) {
  return (
    <StyledTooltip title={title} placement={placement} arrow>
      {children}
    </StyledTooltip>
  );
}
