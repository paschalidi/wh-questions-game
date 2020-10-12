import { createAction } from "@reduxjs/toolkit";

export const startLoadingFirebase = createAction(
  "[firebase] start loading firebase"
);
export const errorLoadingFirebase = createAction(
  "[firebase] error loading firebase"
);
export const completeLoadingFirebase = createAction(
  "[firebase]complete loading firebase"
);
