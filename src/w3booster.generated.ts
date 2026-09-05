/* Generated from the W3Booster application database. Do not edit directly. */
// @w3booster-client-id app_57fc0d3d38cdfba3e10fa7c5
// @w3booster-revision df993125adda263c32f2657085b87e365b5c824a86b8300221a7f4d300bc4857

import type { W3BoosterClient } from '@w3booster/sdk';
import { defineApplication, type ApplicationConnectOptions, type ApplicationRuntime, type ApplicationRuntimeSnapshot } from '@w3booster/sdk/app';
import type { DeepPartial } from '@w3booster/sdk/settings';

export interface W3BoosterAppSettings {}
export type W3BoosterAppDeliveredSettings = DeepPartial<W3BoosterAppSettings>;
export type W3BoosterAppClient<TOverlayExtensions extends object = object> = W3BoosterClient<W3BoosterAppDeliveredSettings, TOverlayExtensions>;
export type W3BoosterAppRuntime<TOverlayExtensions extends object = object> = ApplicationRuntime<W3BoosterAppSettings, TOverlayExtensions>;
export type W3BoosterAppRuntimeSnapshot<TOverlayExtensions extends object = object> = ApplicationRuntimeSnapshot<W3BoosterAppSettings, TOverlayExtensions>;
const w3boosterAppDefinition = {
  clientId: "app_57fc0d3d38cdfba3e10fa7c5",
  revision: "df993125adda263c32f2657085b87e365b5c824a86b8300221a7f4d300bc4857",
  scopes: ["match:read","players:read","resources:read"],
  settingsDefaults: {}
} as const;

export const w3boosterApp = defineApplication<
  W3BoosterAppSettings,
  typeof w3boosterAppDefinition.scopes
>(w3boosterAppDefinition);

export type W3BoosterAppConnectOptions<TOverlayExtensions extends object = object> = ApplicationConnectOptions<
  W3BoosterAppSettings,
  typeof w3boosterAppDefinition.scopes,
  TOverlayExtensions
>;
