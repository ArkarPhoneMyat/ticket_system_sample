import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const Color = {
  primary: '#27568A',
  secondaryBlue: '#00cccc',
  white: '#ffffff',
  black: '#000000',
  darkGray: '#525C67',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  green: '#00BF00',
  red: '#ff0000',
  orange: '#F3A509',
  transparentPrimary: 'rgba(0, 0, 0, 0.4)',
};

export const Size = {
  h1: 34,
  h2: 30,
  h3: 28,
  h4: 24,
  h5: 20,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,

  width,
  height,

  radius: 10,

  shadowStyle: {
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1.8,
    shadowOpacity: 0.5,
    elevation: 5,
  },
};
