/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Color, Size} from '../constants';

const CustomDropdown = ({
  value,
  setValue,
  data,
  valueCol,
  labelCol,
  placeholder,
  title,
  search = false,
  errorText = '',
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <View style={styles.labelContainer}>
        <Text style={[styles.label, isFocus && {color: Color.primary}]}>
          {title}
        </Text>
      </View>
    );
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: Color.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField={labelCol}
        valueField={valueCol}
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={renderItem}
      />
      {errorText !== '' && (
        <Text style={{fontSize: Size.body3, color: Color.red, marginLeft: 10}}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    width: '90%',
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: Color.gray,
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: Color.white,
  },
  labelContainer: {
    width: 140,
    backgroundColor: Color.white,
    zIndex: 2,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  label: {
    color: Color.primary,
    fontSize: Size.body2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: Size.body2,
    color: Color.primary,
  },
  placeholderStyle: {
    fontSize: Size.body2,
    color: Color.gray2,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: Size.body2,
    color: Color.black,
    marginLeft: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Size.body2,
  },
});
