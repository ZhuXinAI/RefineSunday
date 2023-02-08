export const COMMON_DEFINITION = {
  button: {
    type: "object",
    properties: {
      href: {
        type: "string",
        title: "链接",
      },
      text: {
        type: "string",
        title: "文字",
      },
      type: {
        type: "string",
        title: "按钮类型",
        oneOf: [
          { const: "submit", title: "submit" },
          { const: "reset", title: "reset" },
          { const: "button", title: "button" },
        ],
      },
      variant: {
        type: "string",
        title: "按钮类型",
        oneOf: ["link", "outline", "ghost", "solid"].map((value) => {
          return {
            const: value,
            title: value,
          };
        }),
      },
      color: {
        type: "string",
        title: "颜色",
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