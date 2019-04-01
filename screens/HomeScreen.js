import React from 'react';
import EmojiSelector from 'react-native-emoji-selector';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import Grid from '../components/grid'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);

      this.state = {
        isEmojiSelectorOpen: false,
        activeEmoji: '😀'
      };
  }

  isEmojiSelectorOpen = () => {
    this.setState({
      isEmojiSelectorOpen: !this.state.isEmojiSelectorOpen
    });
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.emojiPickerContainer}>
            <Button 
              title={'Pick Emoji ' + this.state.activeEmoji} 
              onPress={this.isEmojiSelectorOpen}
            />
            {
              this.state.isEmojiSelectorOpen && this.state.isEmojiSelectorOpen ?
              <EmojiSelector onEmojiSelected={emoji => this.setState({
                activeEmoji:emoji,
                isEmojiSelectorOpen: !this.state.isEmojiSelectorOpen
              })}/> : 
              null
            }
            <Grid 
              activeEmoji={this.state.activeEmoji}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  q() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  emojiPickerContainer: {
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
