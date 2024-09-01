import { Badge, BadgeProps, Tooltip } from "antd";
import React, { PropsWithChildren } from "react";

interface CountBadgeProps extends BadgeProps {
  tooltip?: string;
}

const CountBadge: React.FC<PropsWithChildren<CountBadgeProps>> = (props) => {
  const { tooltip, children, ...badgeProps } = props;

  return (
    <Tooltip title={tooltip}>
      <Badge size="small" {...badgeProps}>
        {children}
      </Badge>
    </Tooltip>
  );
};

export default CountBadge;
