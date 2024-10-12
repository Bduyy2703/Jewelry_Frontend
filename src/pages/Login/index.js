import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../components/common/layout/PageWrapper';
import useTranslate from '../../components/hooks/useTranslate';
import { commonMessage } from '../../components/locales/intl';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState('');
  const translate = useTranslate();

  const handleSubmit = async () => {
    try {
      const {accessToken, userEmail} = await login(email, password);
      console.log('Đăng nhập thành công:', userEmail);
      setIsLoggedIn(true);  // Đánh dấu người dùng đã đăng nhập thành công
      setError(null);  // Xóa lỗi nếu có4
      setEmail(userEmail);
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    }
  };

  useEffect(() => {
    if (isLoggedIn && email) {  // Chỉ gọi profile nếu đã đăng nhập và có email
      getProfile();
    }
  }, [isLoggedIn, email]);
  
  const getProfile = async () => {
    try {
        // Sử dụng email đã giải mã để gọi profile
        let res = await getUserProfile(email);
        if(res) {
          setProfileData(res); // Lưu dữ liệu profile
        }
        console.log("Thông tin profile:", res);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin profile:", error);
    }
  }

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>

        

        <div className="text-center">
          <p>Not a member? <a href="#!">Register or sign up with:</a></p>
          {/* test icon */}
          <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}> 
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
          </div>
        </div>
      </div>
    // </PageWrapper>
  );
}

export default Login;
