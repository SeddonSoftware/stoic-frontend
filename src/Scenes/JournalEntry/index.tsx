import { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Alert, Modal } from 'antd';
import JournalEntryModel from '../../models/JournalEntry/journalEntryModel';
import journalEntryService from '../../services/JournalEntryService';


function JournalEntryPage() {
    const [journalEntry, setJournalEntry] = useState<JournalEntryModel|null>();
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [successMessage, setSuccessMessage] = useState<string|null>(null);
    const [entryId, setEntryId] = useState<number|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if(!journalEntry){
            const fetchTodaysJournalEntry = async () => {
                try {
                    let result = await journalEntryService.getTodays();
                    setJournalEntry(result.data);
                    setEntryId(result.data.id);
                    form.setFieldsValue(result.data);
                } catch (err) {
                    console.error('Failed to fetch today\'s journal entry:', err);
                }
            };
    
            fetchTodaysJournalEntry();
        }
    }, [form]);

    const showDeleteModal = () => {
        setIsModalOpen(true);
      };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteEntry = async () => {
        try {
            await journalEntryService.delete(entryId);
            
        } catch (err) {
            setErrorMessage("Failed to delete")
            messageTimeOut()
        }
        finally{
            setIsModalOpen(false);
            setJournalEntry(null)
            setSuccessMessage("Entry Deleted")
            messageTimeOut()
            form.setFieldsValue({
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                notes: ''
            });
            setEntryId(null)
        }
      };

    const messageTimeOut = async () => {
        setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null)
          }, 5000);
    }

    const onFinish = async (values: any) => {
        let result;
        if(journalEntry){
            try{
                result = await journalEntryService.update(values, journalEntry.id);
                setSuccessMessage("Update Success")
                messageTimeOut()
            }catch(e){
                console.log(e)
                setErrorMessage("Failed to Update");
                messageTimeOut()
            }
            
        }else{
            try{
                result = await journalEntryService.create(values);
                setSuccessMessage("Save Success")
                messageTimeOut()
            }catch(e){
                setErrorMessage("Failed to Save");
                messageTimeOut();
            }
            finally{
                setJournalEntry(
                    {
                        answer1: result?.answer1,
                        answer2: result?.answer2,
                        answer3: result?.answer3,
                        answer4: result?.answer4,
                        notes: result?.notes,
                        id: result?.id
                    }
                )
                setEntryId(result.id)
            }
        }
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
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 800, padding: 15 }}
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
                    <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginBottom: 5}}>
                        {journalEntry ? 'Update' : "Submit"}
                    </Button>
                    {journalEntry && (
                    <Button type="default" onClick={showDeleteModal} style={{marginBottom: 5, marginLeft: 15}}>
                        Delete
                    </Button>
                    )}
                    {successMessage && (
                        <Alert message={successMessage} type="success" />
                    )}
                    {errorMessage && (
                        <Alert message={errorMessage} type="error" />
                    )}
                    
                    </Form.Item>
                </Form>
                <Modal title="Delete Entry?" open={isModalOpen} onOk={deleteEntry} onCancel={handleCancel}>
                    <p>Are you sure you want to delete your journal entry?</p>
                </Modal>
        </Card>
    )
};




export default JournalEntryPage;