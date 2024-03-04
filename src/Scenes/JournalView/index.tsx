import { useState, useEffect } from 'react';
import { Card, Form, Input} from 'antd';
import JournalEntryModel from '../../models/JournalEntry/journalEntryModel';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

function JournalViewPage() {
    const [form] = Form.useForm();
    const location = useLocation();
    const entryData = location.state?.entryData;

    return(
        <Card title={`Journal Entry ${dayjs(entryData.entryDate).format('YYYY-MM-DD')}`}>
                <Form
                    form={form}
                    name="journalEntry"
                    layout="vertical"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 800, padding: 15 }}
                    autoComplete="off"
                    initialValues={{
                        answer1: entryData?.answer1,
                        answer2: entryData?.answer2,
                        answer3: entryData?.answer3,
                        answer4: entryData?.answer4,
                        notes: entryData?.notes,
                    }}
                >
                    <Form.Item<JournalEntryModel>
                    label="What did I do well today?"
                    name="answer1"
                    >
                        <Input.TextArea readOnly/>
                    </Form.Item>
                    <Form.Item<JournalEntryModel>
                    label="What did I do poorly today?"
                    name="answer2"
                    >
                        <Input.TextArea readOnly/>
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What did I learn today?"
                    name="answer3"
                    >
                        <Input.TextArea readOnly/>
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What can I improve tomorrow?"
                    name="answer4"
                    >
                        <Input.TextArea readOnly/>
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="Notes"
                    name="notes"
                    >
                        <Input.TextArea readOnly/>
                    </Form.Item>
                    <Form.Item>
                    
                    </Form.Item>
                </Form>
        </Card>
    )
};




export default JournalViewPage;