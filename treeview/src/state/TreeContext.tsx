import { createContext } from "react";

import type { TreeContextType } from "../types/types";

export const defaultState = {} as TreeContextType

export const TreeContext = createContext(
    {...defaultState}
)