'use strict';

var React = require('react-native');

var {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text
} = React;

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },

  getImageSize: function() {
    return {
      height: this.props.height,
      width: this.props.width,
    }
  },

  render: function() {
    return (
      <View style={styles.thumb}>
        <Image style={this.getImageSize()} source={{uri:this.props.uri}} resizeMode={'contain'}></Image>
      </View>
    );
  }
});

var ImageViewer = React.createClass({
  createThumbRow: function(uri, i) {
    return <Thumb key={i} uri={uri} width={this.props.width} height={this.props.height}/>;
  },

  getInitialState: function() {
      return {
        index: 1,
      };
  },

  createPointRow: function(filled, i) {
    if (filled) {
      return <View key={i} style={{marginLeft: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFFFFF'}}></View>;
    } else {
      return <View key={i} style={{marginLeft: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: '#A8A8A8'}}></View>;
    }
  },

  onScroll: function(a) {
    var i = Math.round(a.nativeEvent.contentOffset.x / this.props.width) + 1;
    this.setState({index: i});
  },

  render: function() {
    var points = [];
    for (var i = 1; i <= this.props.data.length; i++) {
      if (i == this.state.index) {
        points.push(true);
      } else {
        points.push(false);
      }
    }

    return (
      <View style={{backgroundColor: '#F0F0F0'}}>
        <View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.onScroll}
            scrollEventThrottle={1}
            bounces={false}>
            {this.props.data.map(this.createThumbRow)}
          </ScrollView>
        </View>
        <View style={{top: -20, backgroundColor: 'rgba(0,0,0,0)'}}>
          <View style={[styles.mainImageBox]}>
            {points.map(this.createPointRow)}
          </View>
        </View>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  thumb: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  mainImageBox: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

module.exports = ImageViewer;
