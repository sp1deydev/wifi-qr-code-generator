import React, { useState, useRef } from "react";
import { Input, Select, Button, Card, Typography, Space } from "antd";
import { QRCodeCanvas } from "qrcode.react";

const { Title, Text } = Typography;
const { Option } = Select;

const App: React.FC = () => {
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const qrRef = useRef<HTMLDivElement>(null);

  // Function to generate the WiFi QR Code string
  const generateWiFiQRData = (): string => {
    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  };

  // Function to download the QR Code as an image
  const downloadQRCodeCanvas = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `wifi-qr-${ssid}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw", display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f2f5" }}>
      <Card style={{ width: 400, textAlign: "center", padding: 20, borderRadius: 10 }}>
        <Title level={3}>WiFi QR Code Generator</Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Text strong>WiFi Name (SSID)</Text>
          <Input placeholder="Enter WiFi Name" value={ssid} onChange={(e) => setSsid(e.target.value)} />

          <Text strong>Password</Text>
          <Input.Password placeholder="Enter WiFi Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Text strong>Encryption Type</Text>
          <Select value={encryption} onChange={(value) => setEncryption(value)} style={{ width: "100%" }}>
            <Option value="WPA">WPA/WPA2</Option>
            <Option value="WEP">WEP</Option>
            <Option value="nopass">No Password</Option>
          </Select>
        </Space>

        <div ref={qrRef} style={{ marginTop: 20 }}>
          {ssid && <QRCodeCanvas value={generateWiFiQRData()} size={200} />}
        </div>

        {ssid && (
          <>
            <Text type="secondary">Scan the QR code to connect to <strong>{ssid}</strong></Text>
            <Button type="primary" onClick={downloadQRCodeCanvas} style={{ marginTop: 15, width: "100%" }}>
              Download QR Code
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default App;
