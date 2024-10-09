import googleIcon from "../../assets/icons/google.svg";
import { Button, Divider, Form, Input, message, Spin } from "antd";
import { MailOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, login, register } from "../../features/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signinWithGoogle } from "../../Services/signWithGoogle";




export default function AuthPage() {
  const { loading, error, message:responseMessage } = useSelector((state) => state.user);
  const [formType, setFormType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    // Dispatch login action if needed
    dispatch(login(values)).unwrap().then((response) => {
      if (response.success) {
        navigate('/home');
      }
    });
  };

  // Handle signup submission
  const handleSignup = (values) => {
    dispatch(register(values)).unwrap().then((response) => {
      if (response.success) {
        setFormType("login");
      }
    });
};

  // Handle Google login
  const handleGoogleLogin = async() => {
    // Implement Google login logic
    const response = await signinWithGoogle();
    if(response){
      dispatch(googleLogin()).unwrap().then((response) => {
        if (response.success) {
          navigate('/home');  
        }
      })}
  };

  //Show error or success message
  useEffect(() => {
    if (responseMessage) {
      if (error) {
        message.error(responseMessage);
      } else {
        message.success(responseMessage);
      }
    }
  }, [responseMessage,error]);


  return (
    <>
      <main className="w-full h-screen flex justify-center items-center bg-gray-50 p-5">
        <div className="md:mt-0 mt-[-150px] w-[420px] h-auto p-10 border-2 rounded-md bg-white">
          <section className="mb-5">
            <Button type="dashed" icon={<ArrowLeftOutlined />} shape="round" onClick={() => navigate('/')}>
              Invoicify
            </Button>
          </section>
          <header>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="mb-5">Please enter your details</p>
          </header>
          {formType === "login" ? (
            <div>
              <Button
                className="border-1 border-gray-300"
                type="text"
                block
                size="large"
                icon={<img src={googleIcon} alt="google icon" />}
                onClick={handleGoogleLogin}
              >
                Log in with Google
              </Button>
              <div>
                <Divider>
                  <span className="text-gray-500">or</span>
                </Divider>
              </div>
              <Form form={form} onFinish={handleLogin} name="loginForm">
                <Form.Item
                  name="email"
                  rules={[{ type: "email", required: true, message: 'Please Enter your email!' }]}
                >
                  <Input
                    placeholder="Email"
                    suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please Enter password!' }]}
                >
                  <Input.Password placeholder="Password" autoComplete="off" size="large" />
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                  Log in
                </Button>
              </Form>
              <section className="text-sm flex justify-between items-center mt-2">
                <span>Did you forget your password?</span>
                <span>
                  <Link to="forgot-password" className="text-blue-500 hover:underline text-sm">
                    Reset password
                  </Link>
                </span>
              </section>
            </div>
          ) : (
            <div className="signup-container">
              <Form form={form} onFinish={handleSignup} name="signupForm">
                <Form.Item
                  name="name"
                  rules={[{ type: "string", required: true, message: 'Please Enter your name!' }]}
                >
                  <Input
                    placeholder="Name"
                    suffix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ type: "email", required: true, message: 'Please Enter your email!' }]}
                >
                  <Input
                    placeholder="Email"
                    suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, min: 8, message: 'Please Enter password!' }]}
                >
                  <Input.Password placeholder="Password" autoComplete="off" size="large" />
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                  Sign up
                </Button>
              </Form>
            </div>
          )}
          <section className="w-full flex justify-center">
            <Button
              className="mt-3"
              type="link"
              onClick={() => setFormType(formType === "login" ? "signup" : "login")}
            >
              {formType === "login" ? "New User? Sign Up" : "Already a User? Sign In"}
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}
