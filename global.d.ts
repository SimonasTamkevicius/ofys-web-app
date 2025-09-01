import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// This export makes the file a module and avoids "Cannot redeclare block-scoped variable" errors
export {};
