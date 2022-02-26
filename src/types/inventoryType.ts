import { ReactNode } from 'react';

export interface InventoryType {
  hotkey?: string;
  id: string;
}

export interface GridType {
  id: string;
  children?: ReactNode;
}
