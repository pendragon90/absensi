import { DateInput } from '@mantine/dates';
import React from 'react';
import { CiCalendar } from 'react-icons/ci';

function MonthInput({ value, onChange, label = "Tanggal Lahir", placeholder = "Pilih Tanggal Lahir" }) {
  const dateValue = value ? new Date(value) : null;

  const handleChange = (date) => {
    onChange(date ? date.toISOString().split('T')[0] : null);
  };

  return (
    <DateInput
    valueFormat="DD MMMM YYYY  "
      leftSection={<CiCalendar className="h-4" />}
      label={label}
      placeholder={placeholder}
      mt="md"
      value={dateValue}
      onChange={handleChange}
    />
  );
}

export default MonthInput;
