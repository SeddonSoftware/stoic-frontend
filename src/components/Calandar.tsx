import type { CalendarProps } from 'antd';
import { Calendar, theme, Badge, Tooltip } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import journalEntryService from '../services/JournalEntryService';


  function Calandar() {
      const { token } = theme.useToken();

      const [journalEntries, setJournalEntries] = useState<any>();
      const [month, setmonth] = useState(dayjs().month()+1)
      const [year, setYear] = useState(dayjs().year())

      useEffect(() => {
          const fetchJournalEntries = async () => {
              try {
                  const entries = await journalEntryService.getAll({year: year, month: month});
                  setJournalEntries(entries.data);
                  console.log(entries);
              } catch (error) {
                  console.error("Failed to fetch journal entries:", error);
              }
          };
          fetchJournalEntries();
      }, [month, year]);


      const onSelect = (value: Dayjs) => {
        console.log(value.format('YYYY-MM-DD'));
      };

      const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        setmonth(value.month()+1)
        setYear(value.year());
      };

      const monthCellRender = (value: Dayjs) => {
          return null
        };

        const dateCellRender = (value: Dayjs) => {
          console.log("DATE CELL RENDER")

          const formattedDate = value.format('YYYY-MM-DD');

          const hasEntry = journalEntries?.some((entry:any) => {
              const entryDateFormatted = dayjs(entry.entryDate).format('YYYY-MM-DD');
              return formattedDate === entryDateFormatted;
          });
      
          return hasEntry ? 
            <Tooltip placement="bottom" title={"Entry"}>
              <Badge status={'success'} />
            </Tooltip> : 
            null;
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
