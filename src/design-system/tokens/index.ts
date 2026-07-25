export const moduleZones = ['hjartat', 'familjen', 'vardagen', 'valvet'] as const;
export type ModuleZone = (typeof moduleZones)[number];

export const capacityModes = ['low', 'normal', 'high'] as const;
export type CapacityMode = (typeof capacityModes)[number];

export const densityModes = ['calm', 'balanced', 'full'] as const;
export type DensityMode = (typeof densityModes)[number];

export const depthModes = ['flat', 'soft-3d', 'instrument'] as const;
export type DepthMode = (typeof depthModes)[number];
