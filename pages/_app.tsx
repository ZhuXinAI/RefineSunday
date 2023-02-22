import React, { useEffect, useState } from "react";
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
import {
  SundayComponent,
  SundayRefineComponent,
} from "@sunday/core/components/Component";
import { registerComponent } from "@sunday/core/utils/register";
import { Create } from "@components/Create";
import { useSundayLocalStateProvider } from "@sunday/core/hooks/useSundayProvider";
import { Progress } from "@components/Stats/Progress";
import { List } from "@components/List";

registerComponent([Create, Progress, List]);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const provider = useSundayLocalStateProvider();

  return (
    <ChakraProvider theme={refineTheme}>
      <SundayProvider
        provider={provider}
      >
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
              list: SundayRefineComponent,
              show: ChakraUIInferencer,
              create: SundayRefineComponent,
              edit: ChakraUIInferencer,
            },
            { name: "help", list: () => null },
            {
              name: "stat",
              list: SundayRefineComponent,
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
