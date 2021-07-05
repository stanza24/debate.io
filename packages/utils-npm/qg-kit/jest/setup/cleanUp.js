afterEach(() => {
    // чтобы не делать после .spyOn каждый раз .mockClear
    jest.restoreAllMocks();
    // чтобы не делать после .useFakeTimers каждый раз .useRealTimers
    jest.useRealTimers();
});
