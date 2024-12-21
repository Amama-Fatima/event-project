"use client";

import { usePathname } from "next/navigation";
import SearchInput from "../search-input";

const HeaderSearchWrapper = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <SearchInput />;
};

export default HeaderSearchWrapper;
