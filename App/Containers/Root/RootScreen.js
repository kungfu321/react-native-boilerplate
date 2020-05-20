import * as React from 'react'
import { navigationRef, isMountedRef } from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native'

function RootScreen() {
  React.useEffect(() => {
    isMountedRef.current = true

    return () => (isMountedRef.current = false)
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer ref={navigationRef}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaProvider>
            <Layout style={Helpers.fill}>
              <AppNavigator isLoggedIn={true} />
            </Layout>
          </SafeAreaProvider>
        </ApplicationProvider>
      </NavigationContainer>
    </>
  )
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
