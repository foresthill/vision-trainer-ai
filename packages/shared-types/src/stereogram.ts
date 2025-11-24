export type PatternType =
  | 'random-dots'
  | 'horizontal-lines'
  | 'vertical-lines'
  | 'texture'
  | 'custom';

export type ViewType = 'parallel' | 'cross';

export interface StereogramConfig {
  width: number;
  height: number;
  depth: number;
  separation: number;
  pattern: PatternType;
  viewType: ViewType;
}

export interface GeneratedStereogram {
  id: string;
  config: StereogramConfig;
  imageData: string; // base64
  createdAt: Date;
}
