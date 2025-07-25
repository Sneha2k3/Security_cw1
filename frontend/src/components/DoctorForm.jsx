import {
  Button,
  Col,
  Form,
  Input,
  Row,
  TimePicker,
  Divider,
  Card,
  Typography,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  TrophyOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React from "react";
import "./DoctorForm.css"; // We'll create this CSS file

const { Title } = Typography;

function DoctorForm({ onFinish, initialValues }) {
  return (
    <Card className="doctor-form-card" bordered={false}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...initialValues,
          ...(initialValues && {
            timings: [
              moment(initialValues?.timings[0], "HH:mm"),
              moment(initialValues?.timings[1], "HH:mm"),
            ],
          }),
        }}
        className="doctor-form"
      >
        <Title level={3} className="section-title">
          <MedicineBoxOutlined className="section-icon" /> Personal Information
        </Title>
        <Divider />

        <Row gutter={[24, 16]}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Website"
              name="website"
              rules={[{ required: true, message: "Please enter your website" }]}
            >
              <Input prefix={<GlobalOutlined />} placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={16} xs={24} sm={24} lg={16}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>

        <Title level={3} className="section-title mt-4">
          <TrophyOutlined className="section-icon" /> Professional Information
        </Title>
        <Divider />

        <Row gutter={[24, 16]}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[
                { required: true, message: "Please enter your specialization" },
              ]}
            >
              <Input
                prefix={<MedicineBoxOutlined />}
                placeholder="Specialization"
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Experience (years)"
              name="experience"
              rules={[
                { required: true, message: "Please enter your experience" },
              ]}
            >
              <Input
                prefix={<TrophyOutlined />}
                placeholder="Experience"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Fee Per Consultation"
              name="feePerCunsultation"
              rules={[
                { required: true, message: "Please enter consultation fee" },
              ]}
            >
              <Input
                prefix={<DollarOutlined />}
                placeholder="Fee Per Consultation"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Available Timings"
              name="timings"
              rules={[
                {
                  required: true,
                  message: "Please select your available timings",
                },
              ]}
            >
              <TimePicker.RangePicker
                format="HH:mm"
                className="full-width"
                placeholder={["Start Time", "End Time"]}
                suffixIcon={<ClockCircleOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="form-actions">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="submit-button"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default DoctorForm;
