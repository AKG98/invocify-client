import { Button, Form, Input, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { useAddClientMutation, useUpdateClientMutation } from '../../features/Slices/clientApi';

export default function CustomerModal({ isModal, setIsModal, formType, data }) {
    const user = useSelector((state) => state.user.user);
    const [updateClient] = useUpdateClientMutation();
    const [addClient] = useAddClientMutation();

    async function handleSave(values) {
        try {
            if (formType === "Add Client") {
                await addClient({ ...values, owner: user._id }).unwrap(); // Send the owner ID with the values
                message.success('Client added successfully');
            } else {
                await updateClient({ ...values, clientId: data.key || data._id }).unwrap(); // Send the ID with the values
                message.success('Client updated successfully');
            }
            setIsModal(false);
        } catch (error) {
            message.error('Failed to save client: ' + error.message);
        }
    }

    return (
        <Modal
            open={isModal}
            title={formType}
            onCancel={() => setIsModal(false)}
            footer={null}
            width={400}
        >
            <Form layout='vertical' initialValues={data || {}} onFinish={handleSave}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Name is required"
                        }
                    ]}
                >
                    <Input placeholder='Client&apos;s name' size='large' autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: "Phone is required"
                        }
                    ]}
                >
                    <Input placeholder='Client&apos;s phone number' size='large' />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: "Email is required"
                        }
                    ]}
                >
                    <Input placeholder='Client&apos;s email' size='large' autoComplete="off" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: "Address is required"
                        }
                    ]}
                >
                    <Input placeholder='city,state,country' size='large' />
                </Form.Item>
                <section className='flex justify-center gap-2'>
                    <Button
                        htmlType="button"
                        onClick={() => setIsModal(false)}
                        size='large'
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                    >
                        Submit
                    </Button>
                </section>
            </Form>
        </Modal>
    );
}
