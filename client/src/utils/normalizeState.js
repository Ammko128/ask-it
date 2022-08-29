const normalizeState = (objects, additionalField = null) =>
  objects.reduce(
    (acc, curr) => ({
      ...acc,
      [`normal-${curr.id}`]: additionalField
        ? { ...curr, [additionalField]: normalizeState(curr[additionalField]) }
        : curr,
    }),
    {}
  );

export default normalizeState;
