import { useState } from 'react';
import { Card, Button, Form, Input, Alert } from 'antd';
import JournalEntryModel from '../../models/JournalEntry/journalEntryModel';


function JournalEntryPage() {

    const onFinish = async (values: any) => {

    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };
    
    return(
        <Card title={"Journal Entry"}>
                <Form
                    name="journalEntry"
                    layout="vertical"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<JournalEntryModel>
                    label="What did I do well today?"
                    name="Answer1"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item<JournalEntryModel>
                    label="What did I do poorly today?"
                    name="Answer2"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What did I learn today?"
                    name="Answer3"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item<JournalEntryModel>
                    label="What can I improve tomorrow?"
                    name="Answer4"
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