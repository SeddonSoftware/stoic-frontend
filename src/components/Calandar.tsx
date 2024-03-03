import type { CalendarProps } from 'antd';
import { Calendar, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const onSelect = (value: Dayjs) => {
        console.log(value.format('YYYY-MM-DD'));
    };



  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const processData = async (data:any) => {

  }


function Calandar(data:any) {
    const { token } = theme.useToken();



    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return <span>MONTH TOTAL</span>
      };

      const dateCellRender = (value: Dayjs) => {
        return (
            <span>test</span>
        );
      };

      const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };

      const wrapperStyle: React.CSSProperties = {
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
      };

    


    return (
        <Calendar style={wrapperStyle} onSelect={onSelect} className='calandar' fullscreen={false} cellRender={cellRender} onPanelChange={onPanelChange} />
    );
}

export default Calandar;
