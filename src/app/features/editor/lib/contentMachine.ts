import { assign, createMachine } from "xstate";

export const contentMachine = createMachine({
  context: {
    content: "",
  },
  on: {
    SET: {
      actions: assign({
        content: ({ event }) => event.value,
      }),
    },
  },
});
