import React, {useState, useContext, Fragment} from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {Item, Label, Input} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '@styles/color';
import theme from '@styles/theme.style';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {LocalizationContext} from '@context/index';
import IconCalendar from '@assets/svg/icons/SvgIconCalendar';

export default function PickerDateItem({
  title = 'from_hour',
  value = '',
  disabled = false,
  setValue,
  font = true,
  colorText = Colors.BLACK,
}) {
  const {t, locale} = useContext(LocalizationContext);
  const [showDate, setShowDate] = useState(false);

  const onShowPickerDatetime = () => {
    setShowDate(true);
  };

  const onChangeDate = (event, date) => {
    setShowDate(false);
    setValue(moment(date).format(VN_FORMAT_DATE));
  };

  const optionByOS = () => {
    return (
      <Fragment>
        {showDate && (
          <DateTimePicker
            locale={locale}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            value={new Date()}
          />
        )}
      </Fragment>
    );
  };

  return (
    <Item onPress={onShowPickerDatetime} disabled={disabled}>
      {title !== '' && <Label style={styles.title(font)}>{t(title)} :</Label>}
      {optionByOS()}
      <Fragment>
        <Input
          disabled={true}
          style={styles.value}
          value={value === '' ? '' : value}
          defaultValue={value === '' ? '' : value}
        />
        <View style={styles.IconCalendar}>
          <IconCalendar color={'#000000'} />
        </View>
      </Fragment>
    </Item>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontFamily: theme.FONT_FAMILY,
    color: Colors.BLACK,
    fontSize: 14,
  },
  IconCalendar: {marginRight: 10},
  imageIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginRight: 10,
  },
  disabled: {
    backgroundColor: Colors.WHITE,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  date: {
    flex: 1,
  },
  title: font => ({
    fontFamily: font === true ? theme.FONT_BOLD : theme.FONT_FAMILY,
    fontSize: 14,
    color: Colors.BLACK,
    flex: 3.5,
  }),
  value: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: 14,
    color: Colors.BLACK,
    flex: 6.5,
  },
});
