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
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider, { GraphQLClient } from "@pankod/refine-graphql";
import { Title, Sider, Layout, Header } from "@components/layout";
import { authProvider } from "src/authProvider";

const API_URL = "https://your-graphql-url/graphql";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={gqlDataProvider}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        Title={Title}
        Sider={Sider}
        Layout={Layout}
        Header={Header}
        authProvider={authProvider}
        LoginPage={AuthPage}
      >
        <Component {...pageProps} />
      </Refine>
    </ChakraProvider>
  );
}

export default MyApp;
