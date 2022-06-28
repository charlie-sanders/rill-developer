import * as reduxToolkit from "@reduxjs/toolkit";
import { metricsDefinitionReducer } from "./metrics-definition/metrics-definition-slice";
import { metricsLeaderboardReducer } from "./metrics-leaderboard/metrics-leaderboard-slice";
import { readable } from "svelte/store";
import { measureDefSliceReducer } from "$lib/redux-store/measure-definition/measure-definition-slice";
import { dimensionDefSliceReducer } from "$lib/redux-store/dimension-definition/dimension-definition-slice";
import { timeSeriesReducer } from "$lib/redux-store/timeseries/timeseries-slice";

const { configureStore } = reduxToolkit;

export const store = configureStore({
  reducer: {
    metricsDefinition: metricsDefinitionReducer,
    metricsLeaderboard: metricsLeaderboardReducer,
    measureDefinition: measureDefSliceReducer,
    dimensionDefinition: dimensionDefSliceReducer,
    timeSeries: timeSeriesReducer,
  },
});

const state = store.getState();
export type RillReduxState = typeof state;

export const reduxReadable = readable(store.getState(), (set) => {
  return store.subscribe(() => {
    set(store.getState());
  });
});