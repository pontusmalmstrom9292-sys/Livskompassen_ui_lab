import type {
  CapacityMode,
  DensityMode,
  DepthMode,
  ModuleZone,
} from '@/design-system/tokens';

export type SuperModuleStatus = 'locked' | 'configurable' | 'experimental' | 'reference' | 'candidate' | 'merged' | 'archived';
export type SuperModuleLayout = 'stack' | 'grid' | 'kanban' | 'focus' | 'dashboard' | 'writing';

export interface SuperModuleSection {
  id: string;
  title: string;
  order: number;
  visible: boolean;
  locked?: boolean;
}

export interface SuperModuleAction {
  id: string;
  label: string;
}

export interface SuperModuleManifest {
  id: string;
  title: string;
  zone: ModuleZone;
  status: SuperModuleStatus;
  layout: SuperModuleLayout;
  density: DensityMode;
  depth: DepthMode;
  sections: SuperModuleSection[];
  primaryAction?: SuperModuleAction;
  capacityModes: Record<CapacityMode, string[]>;
  lockedFeatures: string[];
}
