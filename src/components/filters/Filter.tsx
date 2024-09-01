"use client";

import React from "react";
import { Button, Dropdown, DropdownProps } from "antd";
import classNames from "classnames";

interface FilterProps extends DropdownProps {
  component: React.ReactNode;
  hasValue?: boolean;
}

const Filter: React.FC<React.PropsWithChildren<FilterProps>> = (props) => {
  const { children, hasValue, component, ...dropdownProps } = props;

  return (
    <Dropdown trigger={["click"]} dropdownRender={() => component} {...dropdownProps}>
      <Button className={classNames({ "!border-[#0958d9] !text-[#0958d9] !border-2": hasValue })} size="large">
        {children}
      </Button>
    </Dropdown>
  );
};

export type { FilterProps };
export default Filter;
