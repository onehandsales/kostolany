import type { Passage } from './types';
import type { SelectionDocument } from './selectionDocument';
export type SelectionPosition = Readonly<{ x: number; y: number; width: number; height: number }>;
export type PassageSelection = Readonly<{ passage: Passage; position: SelectionPosition }>;
export type SelectionBridgeProps = { id: string; document: SelectionDocument; active: boolean; selectionColor: string; onSelect: (value: PassageSelection | null) => void };
