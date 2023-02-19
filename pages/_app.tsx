import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ChakraProvider,
  refineTheme,
  ReadyPage,
  ErrorComponent,
  AuthPage,
  Box,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-nextjs-router";
// import dataProvider, { GraphQLClient } from "@pankod/refine-graphql";
import dataProvider from "@pankod/refine-simple-rest";
import { Title, Sider, Layout, Header } from "@components/layout";
import { authProvider } from "src/authProvider";
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";
import { SundayProvider } from "@sunday/core/components/SundayProvider";
import "react-virtualized/styles.css";
import "react-grid-layout/css/styles.css";
import { SundayComponent } from "@sunday/core/components/Component";
import { registerComponent } from "@sunday/core/utils/register";
import { Custom } from "@components/custom";
import { Create } from "@components/Create";

const API_URL = "https://api.fake-rest.refine.dev";

// const client = new GraphQLClient(API_URL);
// const gqlDataProvider = dataProvider(client);

registerComponent(Custom);
registerComponent(Create);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={refineTheme}>
      <SundayProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider()}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          authProvider={authProvider}
          LoginPage={AuthPage}
          resources={[
            {
              name: "posts",
              list: ChakraUIInferencer,
              show: ChakraUIInferencer,
              create: ChakraUIInferencer,
              edit: ChakraUIInferencer,
            },
            { name: "help", list: () => null },
            {
              name: "stat",
              list: () => (
                <Box flex={1} minH={0}>
                  <SundayComponent id="stat" />
                </Box>
              ),
            },
          ]}
        >
          <Component {...pageProps} />
        </Refine>
      </SundayProvider>
    </ChakraProvider>
  );
}

export default MyApp;
