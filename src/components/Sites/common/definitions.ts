export const COMMON_DEFINITION = {
  button: {
    type: "object",
    properties: {
      href: {
        type: "string",
        title: "Href",
      },
      text: {
        type: "string",
        title: "Text",
      },
      type: {
        type: "string",
        title: "Button Type",
        oneOf: [
          { const: "submit", title: "submit" },
          { const: "reset", title: "reset" },
          { const: "button", title: "button" },
        ],
      },
      variant: {
        type: "string",
        title: "Button Variants",
        oneOf: ["link", "outline", "ghost", "solid"].map((value) => {
          return {
            const: value,
            title: value,
          };
        }),
      },
      color: {
        type: "string",
        title: "Color",
      },
    },
  },

  box: {
    type: "object",
    title: "样式",
    properties: {
      backgroundColor: {
        type: "string",
        title: "背景颜色",
      },
    }
  }
};


export const COMMON_UI_SCHEMA = {
  box: {
    backgroundColor: {
      "ui:widget": "color"
    },
  }
}