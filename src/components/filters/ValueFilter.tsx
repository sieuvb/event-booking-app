"use client";

import React from "react";
import Filter from "./Filter";
import { Menu, MenuProps, Select } from "antd";

interface ValueFilterProps {
  placeholder: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

const ALL_ITEM = { label: "All", key: "" };

const ValueFilter: React.FC<React.PropsWithChildren<ValueFilterProps>> = (props) => {
  const { options, placeholder, value, onChange } = props;

  const filterText = React.useMemo(() => value || placeholder, [value, placeholder]);

  const onSelect = React.useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      onChange(key);
    },
    [onChange]
  );

  const selectedKeys = React.useMemo(() => (value ? [value] : []), [value]);

  const menuItems = React.useMemo(() => {
    const items = options.map((option) => ({ label: option, key: option }));
    return [ALL_ITEM, ...items];
  }, [options]);

  return (
    <Filter hasValue={!!value} component={<Menu selectedKeys={selectedKeys} items={menuItems} onClick={onSelect} />}>
      {filterText}
    </Filter>
  );
};

export type { ValueFilterProps };
export default ValueFilter;
