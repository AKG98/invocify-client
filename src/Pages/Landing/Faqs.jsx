import { faqContent } from '../../data/appData';
import { Form, Button, Input, Collapse, message } from 'antd';
import { UserOutlined, SendOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

export default function Faqs() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (values) => {
        // Create FormData object and append the access_key
        const formData = new FormData();
        formData.append("access_key", import.meta.env.VITE_FORM_ACCESS_KEY);
        formData.append("email", values.email);
        formData.append("question", values.question);

        try {
            setLoading(true); 
            // Submit form data to the API
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await response.json();
            if (res.success) {
                message.success("Question posted succcessfully") // Handle success response
                setLoading(false);
            } else {
                message.error("Something went wrong!") // Handle error response
            }
        } catch (error) {
            console.error('Error:', error); // Handle error (e.g., show an error message)
        }

    };

    const onFinish = (values) => {
        handleSubmit(values); 
    };

    return (
        <main id='faq' className='bg-white w-screen h-auto md:p-20 p-10'>
            <div className='flex gap-20 md:flex-row flex-col'>
                <div className='flex-1'>
                    <h1 className='text-4xl font-bold mb-10'>Everything You Need to Know FAQs</h1>
                    <Form
                        name="faq-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email',
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Enter your email"
                                size='large'
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item
                            name="question"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your question',
                                },
                                {
                                    min: 10,
                                    message: 'Please describe more',
                                }
                            ]}
                        >
                            <TextArea
                                rows={5}
                                placeholder="Write your questions here."
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                shape='round'
                                htmlType="submit"
                                className='rounded-button'
                                size='large'
                                loading={loading}
                                icon={<SendOutlined />}
                                iconPosition='end'
                            >
                                Send
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex-1'>
                    <Collapse 
                        accordion 
                        items={faqContent} 
                        defaultActiveKey={[0]} 
                    />
                </div>
            </div>
            <div className='bg-black mt-20 rounded-xl h-[30vh] flex md:flex-row flex-col items-center justify-around p-5'>
                <h1 className='text-white font-semibold text-5xl'>Let&apos;s give it a try.</h1>
                <Button
                    className='md:text-xl md:h-20'
                    color="default"
                    variant="outlined"
                    shape='round'
                    size={window.innerWidth < 768 ? 'large' : ''}
                    icon={<ArrowRightOutlined />}
                    iconPosition='end'
                    onClick={() => navigate('/auth')}
                >
                    Get Started
                </Button>
            </div>
        </main>
    );
}
