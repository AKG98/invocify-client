import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import authApi from '../../Apis/authApi';


export default function ResetPassword() {
  const {token} = useParams();
  console.log(token);
  const navigate = useNavigate();
  
  const handleResetPassword = async (value) => {
    try {
      const response = await authApi.resetPassword(token, value);
      if(response.success){
        message.success(response.message);
        navigate('/auth');
      }
      else if(response.success == false){
        message.error(response.message);
      }

    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center flex-col bg-gray-50">
        <section className="bg-white border-2 rounded-lg p-10 w-[350px]">
          <h1 className="font-bold mb-5 text-xl">Forgot Password</h1>

          <Form layout="vertical" onFinish={handleResetPassword}>
            <Form.Item
              label="New Password"
              name="password"
              rules={[{ required: true, message: 'Enter new password!' }]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Re-enter new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Re-enter new password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>
          </Form>
        </section>
      </main>
    </>
  );
}
