import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState } from 'react'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from '@use-expo/font';
import { differenceInSeconds, startOfDay, addHours, setDate, getHours, startOfYesterday } from 'date-fns'

import { MonoText } from '../components/StyledText';
import usePrevious from '../hooks/usePrevious'

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    'Exan-Regular': require('../assets/fonts/Exan-Regular.ttf'),
  })

  const [date, setDate] = useState(Date.now())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now())
    }, 1000 * 0.96)
    return () => clearInterval(interval)
  })


  const prev4am = getHours(date) >= 4 ? addHours(startOfDay(date), 4) : addHours(startOfYesterday(date), 4)
  const timeMs = Date.now() - prev4am
  const timeSeco = timeMs * 0.96 / 1000


  const pad2 = num => ("0" + num).slice(-2)

  const seco1 = Math.floor(timeSeco / 10000)
  const seco23 = pad2(Math.floor(timeSeco % 10000 / 100))
  const seco45 = pad2(Math.floor(timeSeco % 100))

  const prevSeco45 = usePrevious(seco45)
  const prevTimeMs = usePrevious(timeMs)

  if (seco45 == prevSeco45) {
    console.log({ seco45, timeMs, prevTimeMs })
  }

  if (!fontsLoaded) return null

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>
        <Text style={styles.seco1}>{seco1}</Text>
        {' '}
        <Text style={styles.seco23}>{seco23}</Text>
        {' '}
        <Text style={styles.seco45}>{seco45}</Text>
      </Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },

  clock: {
    textAlign: 'center',
    fontFamily: 'Exan-Regular',
  },
  seco1: {
    fontSize: 90,
  },
  seco23: {
    fontSize: 80,
  },
  seco45: {
    fontSize: 60,
  },


  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
