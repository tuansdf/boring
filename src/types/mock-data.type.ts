export type MockDataFn = (...args: any[]) => any;
export type MockDataRequest = Record<string, string>;
export type MockDataFns = Record<string, MockDataFn>;
export type MockDataResult = Record<string, any>;
