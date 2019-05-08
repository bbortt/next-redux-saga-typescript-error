import * as React from 'react'

import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App, {AppComponentProps, Container} from 'next/app'
import {NextDocumentContext as Context} from 'next/document'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import createStore from '../configureStore'

import {END} from 'redux-saga'

// tslint:enable:no-submodule-imports

type NextPageComponent = React.ComponentType<any> & {
  getInitialProps: (props: any) => any
}

interface IProps extends AppComponentProps {
  Component: NextPageComponent
  ctx: Context & { store: any }
  intlProps: {
    locale: string
    intlMessages: {}
    initialNow: Date
  }
  pageProps: {}
  store: Store<any>
}

class Application extends App {
  public static async getInitialProps({ctx, Component}: IProps) {

    // if( isServer() ) {
    ctx.store.dispatch(END)
    await ctx.store.sagaTask.toPromise()
    // }

  }

  public render() {
    const {Component, intlProps, pageProps, store} = this.props as IProps

    return (
        <Container>
          <Provider store={store}>
            <h1>Hello World</h1>
          </Provider>
        </Container>
    )
  }
}

export default withRedux(createStore)(
    withReduxSaga({async: true})(Application)
)
