import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Color, Icons, Size} from '../constants';
import {Button} from 'react-native-paper';
import CustomButton from './CustomButton';

const CardView = ({item, index, userInfo, onClickSolve}) => {
  const [isExpense, setIsExpense] = useState(false);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      index={index}
      onPress={() => setIsExpense(!isExpense)}>
      <View style={styles.row}>
        <Text style={styles.cardHeader}>Developer: {item.assignDeveloper}</Text>
        <TouchableOpacity
          style={styles.buttonExpense}
          onPress={() => setIsExpense(!isExpense)}>
          {isExpense ? (
            <Image source={Icons.hyphen} style={styles.icon} />
          ) : (
            <Image source={Icons.downArrow} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Issue Type: </Text>
        <View style={{flex: 2}}>
          <Text style={styles.text1}>{item.issueType}</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <Text style={styles.text}>Status:</Text>
        <View style={{flex: 2}}>
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  item.status == 0 ? Color.orange : Color.green,
              },
            ]}>
            <Text style={styles.statusText}>
              {item.status == 0 ? 'Pending' : 'Solved'}
            </Text>
          </View>
        </View>
      </View>

      {
        isExpense ? (
          <View style={{width: '100%'}}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>Feedback: </Text>
              <View style={{flex: 2}}>
                <Text style={styles.text1}>{item.feedback}</Text>
              </View>
            </View>
            {item.status == 0 && userInfo.userType == 'developer' ? (
              <View style={styles.button}>
                <CustomButton
                  onClick={() => onClickSolve(item)}
                  small={true}
                  text={'Solve'}
                />
              </View>
            ) : null}
          </View>
        ) : null
        // <View style={styles.rowContainer}>
        //   <Text style={styles.text}>Feedback: </Text>
        //   <View style={{flex: 2}}>
        //     <Text style={styles.text1}>
        //       {Size.width <= 390
        //         ? item.feedback.slice(0, 32)
        //         : Size.width >= 500 ? item.feedback.slice(0, 42) : item.feedback.slice(0, 35) }
        //     </Text>
        //   </View>
        // </View>
      }
    </TouchableOpacity>
  );
};

export default CardView;

const styles = StyleSheet.create({
  cardContainer: {
    width: Size.width - 20,
    margin: 10,
    padding: 10,
    borderRadius: Size.radius,
    borderWidth: 1,
    borderColor: Color.gray3,
  },
  cardHeader: {
    fontSize: Size.h5,
    color: Color.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonExpense: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: 15,
    // ...Size.shadowStyle,
  },
  icon: {
    width: 25,
    height: 20,
    tintColor: Color.primary,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
  },
  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    color: Color.black,
    fontSize: Size.body2,
    fontWeight: 'bold',
    flex: 1,
  },
  text1: {
    color: Color.black,
    fontSize: Size.body2,
  },
  status: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: Size.radius,
  },
  statusText: {
    color: Color.white,
    fontSize: Size.body2,
  },
  button: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
