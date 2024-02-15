import { useState, useEffect } from 'react';
import { Card, Button, Form, Input } from 'antd';
import JournalEntryModel from '../../models/JournalEntry/journalEntryModel';
import journalEntryService from '../../services/JournalEntryService';


function JournalEntryPage() {
    const [journalEntry, setJournalEntry] = useState<JournalEntryModel>();
    // const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchTodaysJournalEntry = async () => {
            try {
                //setLoading(true);
                let result = await journalEntryService.getTodays();
                setJournalEntry(result.data);
                form.setFieldsValue(result.data);
                // setLoading(false);
            } catch (err) {
                console.error('Failed to fetch today\'s journal entry:', err);
                // setLoading(false);
            }
        };

        fetchTodaysJournalEntry();
    }, [form]);

    const onFinish = async (values: any) => {
        let result:any = await journalEntryService.create(values);
        console.log(result);

    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };
     
    return(
        <Card title={"Journal Entry"}>
                <Form
                    form={form}
                    name="journalEntry"
                    layout="vertical"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        answer1: journalEntry?.answer1,
                        answer2: journalEntry?.answer2,
                        answer3: journalEntry?.answer3,
                        answer4: journalEntry?.answer4,
                        notes: journalEntry?.notes,
                    }}
                >
                    <Form.Item<JournalEntryModel>
                    label="What did I do well today?"
                    name="answer1"
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item<JournalEntryModel>
                    label="What did I do poorly today?"
                    name="answer2"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What did I learn today?"
                    name="answer3"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What can I improve tomorrow?"
                    name="answer4"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="Notes"
                    name="notes"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
        </Card>
    )
};




export default JournalEntryPage;