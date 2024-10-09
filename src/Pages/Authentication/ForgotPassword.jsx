import { Button, Form, Input, message, Modal, Progress, Result } from "antd";
import { useState } from "react";
import authApi from "../../Apis/authApi";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ForgotPassword() {
  const { loading } = useSelector(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track the success state
  const [progress, setProgress] = useState(0); // Track progress
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    try {
      setProgress(30); // Simulate progress
      setIsModalVisible(true); // Show the modal when the form is submitted
      dispatch(showLoading(true));

      const response = await authApi.forgotPassword(values);
      setProgress(60); // Update progress while request is being made

      if (response.success) {
        setIsSuccess(true); // Success state
        setProgress(100); // Complete the progress
      } else if (response.success === false) {
        setProgress(100); // Complete the progress
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      setProgress(100); // Complete the progress even on failure
      message.error(error.message);
    } finally {
      dispatch(hideLoading(false));
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setProgress(0);
    setIsSuccess(false); // Reset the state for the next time
  };

  return (
    <>
      
      <main className="w-screen h-screen flex items-center justify-center flex-col bg-gray-50">
        <section className="bg-white border-2 rounded-lg p-10 w-[350px]">
          <Button
            type="dashed" 
            icon={<ArrowLeftOutlined className="text-xs"/>} 
            shape="circle" 
            onClick={() => navigate('/auth')}
            />
            
          <h1 className="font-bold mb-5 text-xl mt-5">Forgot Password</h1>
          <Form layout="vertical" onFinish={handleForgotPassword}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Please enter your email!" }]}
            >
              <Input placeholder="Enter your email" allowClear />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </section>
      </main>

      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
        width={400}
        closable={false}
      >
        {progress < 100 ? (

            <div className="flex flex-col items-center justify-center gap-2">
            <Progress size="small" type="circle" percent={progress} />
            <p className="text-center text-2xl">Please wait while we process your request...</p>
            </div>

        ) : (
          <Result
            status="success"
            title="Please check your email."
            size="small"
            extra={[
              <Button key="ok" type="primary" onClick={handleOk} block style={{background:'green'}}>
                OK
              </Button>
            ]}
          />
            
        )}
      </Modal>
    </>
  );
}
